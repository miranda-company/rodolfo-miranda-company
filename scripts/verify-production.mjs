import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import { relative, resolve, sep } from "node:path"

const root = process.cwd()
const dist = resolve(root, "dist")

const canonicalRoutes = [
  "/",
  "/yo",
  "/notas",
  "/notas/umbral",
  "/notas/margen",
  "/notas/archivo",
  "/mediateca",
  "/mediateca/modulor",
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
  "/biblioteca/modulor",
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

const notesHtml = await readRoute("/notas")
const mediaHtml = await readRoute("/mediateca")
const portfolioHtml = await readRoute("/portafolio")

assert.equal(countCards(notesHtml, "data-note-card"), 3, "Producción debe contener tres Notas.")
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

console.log(
  `Producción verificada: ${canonicalRoutes.length} rutas canónicas, ${redirectRoutes.length} redirects, 3 Notas, 3 referencias y 6 proyectos.`,
)
