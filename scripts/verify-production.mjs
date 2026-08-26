import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import { relative, resolve, sep } from "node:path"

const root = process.cwd()
const dist = resolve(root, "dist")
const siteOrigin = process.env.SITE_URL ?? "https://www.rodolfomiranda.company"
const indexingEnabled = process.env.PUBLIC_INDEXING_ENABLED === "true"
const robotsDirective = indexingEnabled ? "index, follow" : "noindex, nofollow"

const canonicalRoutes = [
  "/",
  "/yo",
  "/notas",
  "/notas/umbral",
  "/notas/margen",
  "/notas/archivo",
  "/mediateca",
  "/mediateca/the-age-of-the-image",
  "/mediateca/cosas",
  "/mediateca/orden",
  "/portafolio",
  "/portafolio/syra-coffee",
  "/portafolio/bsc",
  "/portafolio/minka-icm",
  "/portafolio/cn-sant-andreu",
  "/portafolio/modulab-barcelona",
  "/portafolio/eloquent",
]

const redirectRoutes = [
  "/biblioteca",
  "/biblioteca/the-age-of-the-image",
  "/biblioteca/cosas",
  "/biblioteca/orden",
]

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name)
      return entry.isDirectory() ? walk(path) : [path]
    }),
  )
  return files.flat()
}

const toRoute = (file) => {
  const path = relative(dist, file).split(sep).join("/")
  if (path === "index.html") return "/"
  return `/${path.replace(/\/index\.html$/, "")}`
}

const files = await walk(dist)
const actualRoutes = files
  .filter((file) => file.endsWith("index.html"))
  .map(toRoute)
  .sort()
const expectedRoutes = [...canonicalRoutes, ...redirectRoutes].sort()

assert.deepEqual(
  actualRoutes,
  expectedRoutes,
  "Las rutas de producción no coinciden con el límite editorial documentado.",
)

const readRoute = (route) =>
  readFile(resolve(dist, route === "/" ? "index.html" : `.${route}/index.html`), "utf8")
const countCards = (html, marker) =>
  html.match(new RegExp(`<[a-z][^>]*\\b${marker}\\b`, "g"))?.length ?? 0
const countAttributeValue = (html, attribute, value) =>
  html.match(new RegExp(`<[a-z][^>]*\\b${attribute}="${value}"`, "g"))?.length ?? 0

const notesHtml = await readRoute("/notas")
const mediaHtml = await readRoute("/mediateca")
const portfolioHtml = await readRoute("/portafolio")
const marginHtml = await readRoute("/notas/margen")
const imageAgeHtml = await readRoute("/mediateca/the-age-of-the-image")

assert.equal(
  countAttributeValue(notesHtml, "data-note-kind", "note"),
  3,
  "Producción debe conservar las tres Notas locales.",
)

assert.ok(
  marginHtml.includes('data-connection-direction="incoming"') &&
    marginHtml.includes('href="/notas/umbral"') &&
    marginHtml.includes('href="/mediateca/the-age-of-the-image"'),
  "Las Notas deben incluir backlinks derivados de otras colecciones.",
)
assert.equal(
  marginHtml.includes('href="/portafolio/grupo-hem"'),
  false,
  "Los proyectos draft no pueden generar backlinks en producción.",
)
assert.ok(
  imageAgeHtml.includes('data-connection-direction="mutual"') &&
    imageAgeHtml.includes('href="/mediateca/cosas"') &&
    imageAgeHtml.includes('href="/mediateca/orden"'),
  "Las relaciones mutuas de Mediateca deben renderizarse una sola vez.",
)
assert.equal(
  countAttributeValue(notesHtml, "data-note-kind", "external"),
  4,
  "Producción debe contener los cuatro artículos externos de Notas.",
)
assert.equal(
  countCards(mediaHtml, "data-media-card"),
  3,
  "Producción debe contener tres referencias de Mediateca.",
)
assert.equal(
  countCards(portfolioHtml, "data-portfolio-card"),
  6,
  "Producción debe contener seis proyectos de Portafolio.",
)

const renderedHtml = await Promise.all(
  files.filter((file) => file.endsWith(".html")).map((file) => readFile(file, "utf8")),
)
const combinedHtml = renderedHtml.join("\n")
const forbiddenFixtureMarkers = ["ejemplo-mdx", "N.999", "M.999", "P.999"]

for (const marker of forbiddenFixtureMarkers) {
  assert.equal(
    combinedHtml.includes(marker),
    false,
    `La fixture técnica ${marker} no puede aparecer en dist.`,
  )
}

for (const route of canonicalRoutes) {
  const html = await readRoute(route)
  const canonicalUrl = new URL(route, siteOrigin).href

  assert.match(
    html,
    new RegExp(`<meta name="robots" content="${robotsDirective}">`),
    `${route} debe respetar la configuración de indexación del build.`,
  )
  assert.ok(
    html.includes(`<link rel="canonical" href="${canonicalUrl}">`),
    `${route} debe declarar su URL canónica.`,
  )
  assert.ok(
    html.includes(`<meta property="og:url" content="${canonicalUrl}">`),
    `${route} debe declarar una URL Open Graph canónica.`,
  )
  assert.match(html, /<meta property="og:image" content="https:\/\//, `${route} requiere og:image.`)
  assert.match(
    html,
    /<meta name="twitter:card" content="summary_large_image">/,
    `${route} requiere una tarjeta social grande.`,
  )

  const jsonLd = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]
  assert.ok(jsonLd, `${route} debe incluir datos estructurados JSON-LD.`)
  const parsed = JSON.parse(jsonLd)
  assert.equal(parsed["@context"], "https://schema.org", `${route} debe usar Schema.org.`)
  assert.ok(Array.isArray(parsed["@graph"]), `${route} debe publicar un grafo JSON-LD.`)
}

const notFoundHtml = await readFile(resolve(dist, "404.html"), "utf8")
assert.match(
  notFoundHtml,
  /<meta name="robots" content="noindex, nofollow">/,
  "La página 404 debe permanecer fuera del índice en cualquier build.",
)
assert.ok(
  notFoundHtml.includes(`<link rel="canonical" href="${new URL("/404", siteOrigin).href}">`),
  "La página 404 debe declarar una URL estable.",
)

const robots = await readFile(resolve(dist, "robots.txt"), "utf8")
assert.match(
  robots,
  indexingEnabled ? /^User-agent: \*\nAllow: \/$/m : /^User-agent: \*\nDisallow: \/$/m,
  "robots.txt debe respetar la configuración de indexación del build.",
)
assert.ok(
  robots.includes(`Sitemap: ${new URL("/sitemap.xml", siteOrigin).href}`),
  "robots.txt debe señalar el sitemap canónico.",
)

const sitemap = await readFile(resolve(dist, "sitemap.xml"), "utf8")
const sitemapLocations = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1])
assert.deepEqual(
  sitemapLocations,
  canonicalRoutes.map((route) => new URL(route, siteOrigin).href),
  "El sitemap debe contener exactamente las rutas canónicas de producción.",
)

console.log(
  `Producción verificada: ${canonicalRoutes.length} rutas canónicas con metadatos, una página 404 no indexable, sitemap verificado, indexación ${indexingEnabled ? "activa" : "bloqueada"}, ${redirectRoutes.length} redirects, 3 Notas locales, 4 artículos externos, 3 referencias y 6 proyectos.`,
)
