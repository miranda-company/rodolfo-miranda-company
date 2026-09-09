import { expect, test, type Page } from "@playwright/test"
import {
  buildConnectionGraph,
  createConnectionNodeKey,
  type ConnectionNode,
} from "../../src/lib/connection-graph"

const primaryRoutes = [
  "/",
  "/colofon",
  "/yo",
  "/notas",
  "/mediateca",
  "/portafolio",
  "/registro",
  "/notas/el-magnifico-mundo-de-los-jardines-digitales",
  "/mediateca/the-age-of-the-image",
  "/portafolio/syra-coffee",
] as const

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const

const collectBrowserProblems = (page: Page) => {
  const problems: string[] = []
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      const source = message.location().url
      const isExternalFrame =
        source.startsWith("http") &&
        !source.startsWith("http://127.0.0.1") &&
        !source.startsWith("http://localhost")
      if (!isExternalFrame) problems.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`))
  return problems
}

test("connection graph derives backlinks, mutual links, and stable deduplication", () => {
  const nodes: ConnectionNode[] = [
    {
      key: createConnectionNodeKey("notas", "a"),
      collection: "notas",
      id: "a",
      title: "Nota A",
      href: "/notas/a",
      archiveNumber: "N.001",
    },
    {
      key: createConnectionNodeKey("mediateca", "b"),
      collection: "mediateca",
      id: "b",
      title: "Referencia B",
      href: "/mediateca/b",
      archiveNumber: "M.001",
    },
    {
      key: createConnectionNodeKey("portafolio", "c"),
      collection: "portafolio",
      id: "c",
      title: "Proyecto C",
      href: "/portafolio/c",
      archiveNumber: "P.001",
    },
  ]
  const noteKey = createConnectionNodeKey("notas", "a")
  const mediaKey = createConnectionNodeKey("mediateca", "b")
  const projectKey = createConnectionNodeKey("portafolio", "c")
  const graph = buildConnectionGraph(nodes, [
    { source: noteKey, target: mediaKey },
    { source: noteKey, target: mediaKey },
    { source: mediaKey, target: noteKey },
    { source: projectKey, target: noteKey },
    { source: projectKey, target: projectKey },
    { source: projectKey, target: createConnectionNodeKey("notas", "missing") },
  ])

  expect(graph.get(noteKey).mutual.map((connection) => connection.key)).toEqual([mediaKey])
  expect(graph.get(noteKey).incoming.map((connection) => connection.key)).toEqual([projectKey])
  expect(graph.get(noteKey).outgoing).toEqual([])
  expect(graph.get(projectKey).outgoing.map((connection) => connection.key)).toEqual([noteKey])
  expect(graph.get(projectKey).incoming).toEqual([])
  expect(graph.get(projectKey).mutual).toEqual([])
  expect(graph.get(createConnectionNodeKey("notas", "missing"))).toEqual({
    outgoing: [],
    incoming: [],
    mutual: [],
  })
})

for (const viewport of viewports) {
  for (const route of primaryRoutes) {
    test(`${viewport.name}: ${route} renders without structural regressions`, async ({ page }) => {
      await page.setViewportSize(viewport)
      const problems = collectBrowserProblems(page)
      const response = await page.goto(route)

      expect(response?.ok(), `${route} should return a successful response`).toBe(true)
      await expect(page.locator("html")).toHaveAttribute("lang", "es")
      await expect(page.locator("main")).toHaveCount(1)
      await expect(page.locator(".site-footer")).toHaveCount(1)
      await expect(page.locator("h1")).toHaveCount(1)

      const overflow = await page.evaluate(
        () =>
          Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - innerWidth,
      )
      expect(
        overflow,
        `${route} should not create page-level horizontal overflow`,
      ).toBeLessThanOrEqual(1)

      const brokenVisibleImages = await page.locator("img").evaluateAll((elements) =>
        (elements as HTMLImageElement[])
          .filter((image) => {
            const bounds = image.getBoundingClientRect()
            const visible = bounds.bottom > 0 && bounds.top < innerHeight && bounds.right > 0
            return visible && image.complete && image.naturalWidth === 0
          })
          .map((image) => image.currentSrc || image.src),
      )
      expect(brokenVisibleImages, `${route} should not show broken images`).toEqual([])
      expect(problems, `${route} should not log browser errors or warnings`).toEqual([])
    })
  }
}

for (const viewport of viewports) {
  test(`${viewport.name}: an unknown route renders the custom 404`, async ({ page }) => {
    await page.setViewportSize(viewport)
    const problems = collectBrowserProblems(page)
    const response = await page.goto("/ruta-que-no-existe")

    expect(response?.status()).toBe(404)
    await expect(page.locator("html")).toHaveAttribute("lang", "es")
    await expect(page.locator("main")).toHaveCount(1)
    await expect(page.locator("h1")).toHaveText("Esta página no existe.")
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    )

    const overflow = await page.evaluate(
      () => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - innerWidth,
    )
    expect(overflow).toBeLessThanOrEqual(1)
    const unexpectedProblems = problems.filter(
      (problem) =>
        problem !==
        "error: Failed to load resource: the server responded with a status of 404 (Not Found)",
    )
    expect(unexpectedProblems).toEqual([])
  })
}

test("backlink hash navigation works directly and from another route", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/yo")
  await page.locator(".page-back").click()
  await expect(page).toHaveURL(/\/#indice$/)
  await expect(page.locator("#indice")).toBeInViewport()

  await page.goto("/#indice")
  await expect(page.locator("#indice")).toBeInViewport()
})

test("desktop header links to the four primary sections", async ({ page }) => {
  await page.goto("/")

  const links = page.locator(".desktop-nav a")
  await expect(links).toHaveText(["Yo", "Portafolio", "Notas", "Mediateca"])
  expect(
    await links.evaluateAll((items) => items.map((item) => item.getAttribute("href"))),
  ).toEqual(["/yo", "/portafolio", "/notas", "/mediateca"])

  await page.locator(".desktop-nav").getByRole("link", { name: "Portafolio" }).click()
  await expect(page).toHaveURL(/\/portafolio$/)
})

test("footer exposes social, contact, Colofón, and Registro links", async ({ page }) => {
  await page.goto("/")

  const footer = page.locator(".site-footer")
  await expect(footer.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/rodolfo-miranda-company/",
  )
  await expect(footer.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "href",
    "https://github.com/miranda-company",
  )
  await expect(footer.getByRole("link", { name: "Email" })).toHaveAttribute(
    "href",
    "mailto:hi@rodolfomiranda.company",
  )
  await expect(footer.getByRole("link", { name: "Colofón" })).toHaveAttribute("href", "/colofon")
  await expect(footer.getByRole("link", { name: "Registro" })).toHaveAttribute("href", "/registro")

  await page.goto("/colofon")
  await expect(page.locator('.site-footer a[aria-current="page"]')).toHaveText("Colofón")
})

test("Registro mirrors the sitemap and orders routes alphabetically", async ({ page }) => {
  await page.goto("/registro")

  const registryPaths = await page.locator(".registry-index code").allTextContents()
  const alphabeticalPaths = [...registryPaths].sort((first, second) =>
    first.localeCompare(second, "es"),
  )
  const sitemapResponse = await page.request.get("/sitemap.xml")
  const sitemap = await sitemapResponse.text()
  const sitemapPaths = Array.from(
    sitemap.matchAll(/<loc>([^<]+)<\/loc>/g),
    (match) => new URL(match[1]!).pathname,
  ).sort((first, second) => first.localeCompare(second, "es"))

  expect(registryPaths).toEqual(alphabeticalPaths)
  expect(registryPaths).toEqual(sitemapPaths)
  expect(new Set(registryPaths).size).toBe(registryPaths.length)
  await expect(page.locator('.site-footer a[aria-current="page"]')).toHaveText("Registro")
})

test("header identifies the current section on indexes and detail pages", async ({ page }) => {
  await page.goto("/notas")
  await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveText("Notas")

  await page.goto("/mediateca/the-age-of-the-image")
  await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveText("Mediateca")
  await expect(page.locator('#mobile-menu a[aria-current="page"]')).toHaveText("Mediateca")
})

test("mobile detail titles use the compact H1 scale and safe word wrapping", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/notas/zettelkasten-un-metodo-para-organizar-nuestro-conocimiento")

  const title = page.locator(".entry-detail-intro h1")
  const typography = await title.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      fontSize: Number.parseFloat(style.fontSize),
      hyphens: style.hyphens,
      overflowWrap: style.overflowWrap,
      wordBreak: style.wordBreak,
      overflows: element.scrollWidth > element.clientWidth,
    }
  })

  expect(typography.fontSize).toBeGreaterThanOrEqual(48)
  expect(typography.fontSize).toBeLessThanOrEqual(56)
  expect(typography.hyphens).toBe("none")
  expect(typography.overflowWrap).toBe("break-word")
  expect(typography.wordBreak).toBe("normal")
  expect(typography.overflows).toBe(false)
})

test("mobile primary content blocks keep the compact vertical rhythm", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })

  const verticalGap = async (beforeSelector: string, afterSelector: string) =>
    page.evaluate(
      ({ beforeSelector, afterSelector }) => {
        const before = document.querySelector(beforeSelector)
        const after = document.querySelector(afterSelector)
        if (!before || !after) return null

        return after.getBoundingClientRect().top - before.getBoundingClientRect().bottom
      },
      { beforeSelector, afterSelector },
    )

  await page.goto("/")
  expect(await verticalGap(".home-intro__description", ".hero-image")).toBeGreaterThanOrEqual(28)

  await page.goto("/notas/scrum")
  expect(
    await verticalGap(".note-growth-notice", ".entry-detail-reading > .rich-content"),
  ).toBeGreaterThanOrEqual(28)

  await page.goto("/portafolio/syra-coffee")
  expect(
    await verticalGap(".portfolio-cover", ".entry-detail-reading > .rich-content"),
  ).toBeGreaterThanOrEqual(28)
})

test("homepage portfolio wildcard uses a published project and its cover", async ({ page }) => {
  await page.goto("/")

  const wildcard = page.locator("[data-portfolio-wildcard]")
  const selectedProject = await wildcard.getAttribute("data-selected-project")
  const candidates = await wildcard.getAttribute("data-portfolio-projects")
  const publishedProjects = JSON.parse(candidates ?? "[]") as Array<{
    id: string
    href: string
    cover: { src: string; alt: string }
  }>
  const selectedCandidate = publishedProjects.find((project) => project.id === selectedProject)

  expect(publishedProjects.length).toBeGreaterThan(0)
  expect(selectedCandidate).toBeDefined()
  await expect(wildcard).toHaveAttribute("href", selectedCandidate?.href ?? "")
  await expect(wildcard.locator("img")).toHaveAttribute("src", selectedCandidate?.cover.src ?? "")
  await expect(wildcard.locator("img")).toHaveAttribute("alt", selectedCandidate?.cover.alt ?? "")
})

test("homepage shows the three most recently updated published notes", async ({ page }) => {
  await page.goto("/")

  const notes = page.locator(".growing-section .latest-notes li")
  await expect(notes).toHaveCount(3)
  await expect(notes.locator("a")).toHaveText([
    "Scrum",
    "Métodos para descubrir el problema",
    "El magnífico mundo de los jardines digitales",
  ])
  await expect(notes.locator("time")).toHaveText(["03.09.2026", "01.09.2026", "28.08.2026"])
  expect(
    await notes
      .locator("time")
      .evaluateAll((items) => items.map((item) => item.getAttribute("datetime"))),
  ).toEqual(["2026-09-03", "2026-09-01", "2026-08-28"])
})

test("mobile menu opens from the keyboard and Escape restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const trigger = page.locator(".mobile-menu-button")
  await expect(trigger).toHaveAccessibleName("Menú")
  await trigger.focus()
  await page.keyboard.press("Enter")
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(trigger).toHaveAccessibleName("Cerrar")
  await expect(page.locator("#mobile-menu")).toBeVisible()
  await expect(page.locator("#mobile-menu a")).toHaveText([
    "Yo",
    "Portafolio",
    "Notas",
    "Mediateca",
  ])

  await page.keyboard.press("Escape")
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await expect(page.locator("#mobile-menu")).toBeHidden()
  await expect(trigger).toBeFocused()
})

test("Notas disclosure and filters retain their accessible state", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/notas")

  const disclosure = page.locator("[data-note-disclosure]")
  const summary = disclosure.locator("summary")
  await expect(disclosure).not.toHaveAttribute("open", "")
  await expect(summary).toHaveCSS("min-height", "48px")
  await summary.click()

  const seed = page.getByRole("button", { name: "Semilla" })
  await expect(seed).toHaveCSS("min-height", "48px")
  await seed.click()
  await expect(seed).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("[data-note-card]:visible")).toHaveCount(
    await page.locator('[data-note-card][data-state="semilla"]').count(),
  )
  await expect(page.locator("[data-filter-summary]")).toContainText("filtros activos")
})

test("external Notas use compact links and filtering", async ({ page }) => {
  await page.goto("/notas")

  const externalCards = page.locator('[data-note-kind="external"]')
  await expect(externalCards).toHaveCount(4)
  await expect(externalCards.locator("h3")).toHaveCount(4)

  const externalLinks = externalCards.locator("a")
  await expect(externalLinks.first()).toHaveAttribute("target", "_blank")
  await expect(externalLinks.first()).toHaveAttribute("rel", "noopener noreferrer")
  await expect(externalLinks.first()).toHaveAttribute("href", /^https:\/\/eloquent\.es\//)

  const strategy = page.getByRole("button", { name: "Estrategia" })
  await strategy.click()
  await expect(strategy).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("[data-note-card]:visible")).toHaveCount(4)
  await expect(page.locator('[data-note-kind="external"]:visible')).toHaveCount(4)
})

test("editorial connections derive backlinks and deduplicate mutual relationships", async ({
  page,
}) => {
  await page.goto("/mediateca/the-turbulent-ai-era-is-here")

  const turbulentConnections = page.locator("[data-editorial-connections]")
  await expect(turbulentConnections).toHaveAttribute("data-connection-count", "1")
  await expect(
    turbulentConnections.locator(
      '[data-connection-direction="incoming"] a[href="/mediateca/magnifica-humanitas"]',
    ),
  ).toHaveCount(1)

  await page.goto("/mediateca/bird-by-bird")
  const birdConnections = page.locator("[data-editorial-connections]")
  await expect(birdConnections).toHaveAttribute("data-connection-count", "1")
  await expect(
    birdConnections.locator(
      '[data-connection-direction="incoming"] a[href="/mediateca/wild-rose-poem"]',
    ),
  ).toHaveCount(1)
})

test("Mediateca format filtering handles empty and populated results", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto("/mediateca")

  const websites = page.getByRole("button", { name: "Sitios" })
  await websites.click()
  await expect(websites).toHaveAttribute("aria-pressed", "true")
  await expect(page.locator("[data-media-card]:visible")).toHaveCount(0)
  await expect(page.locator("[data-media-empty]")).toBeVisible()
  await expect(page.locator("[data-result-count]")).toHaveText("0 referencias visibles")

  await page.locator("[data-media-reset]").click()
  const books = page.getByRole("button", { name: "Libros" })
  await books.click()
  await expect(books).toHaveAttribute("aria-pressed", "true")
  const visibleCards = page.locator("[data-media-card]:visible")
  expect(await visibleCards.count()).toBeGreaterThan(0)
  expect(
    await visibleCards.evaluateAll((cards) =>
      cards.every((card) => card.getAttribute("data-format") === "book"),
    ),
  ).toBe(true)
  await expect(page.locator("[data-result-count]")).toContainText("referencia")
})

test("Portafolio empty search state has a working recovery action", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/portafolio")

  const search = page.getByPlaceholder("Buscar proyectos")
  await search.fill("resultado-imposible")
  await expect(page.locator("[data-portfolio-count]")).toHaveText("0 proyectos")
  await expect(page.locator("[data-portfolio-empty]")).toBeVisible()

  const reset = page.getByRole("button", { name: "Restablecer filtros" })
  await expect(reset).toHaveCSS("min-height", "48px")
  await reset.click()
  await expect(search).toHaveValue("")
  await expect(search).toBeFocused()
  await expect(page.locator("[data-portfolio-empty]")).toBeHidden()
})

test("portfolio case-study links resolve from trailing-slash URLs", async ({ page }) => {
  await page.goto("/portafolio/syra-coffee/")

  const article = page.locator(".rich-content")
  const destinations = [
    { label: "Eloquent", href: "/portafolio/eloquent" },
    { label: "Modulab Barcelona", href: "/portafolio/modulab-barcelona" },
  ]

  for (const destination of destinations) {
    const link = article.getByRole("link", { name: destination.label, exact: true })
    await expect(link).toHaveAttribute("href", destination.href)
    await link.click()
    await expect(page).toHaveURL(new RegExp(`${destination.href}/?$`))
    await page.goto("/portafolio/syra-coffee/")
  }
})

test("carousel controls expose correct disabled states and respect reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/portafolio/syra-coffee")

  const carousel = page.locator("[data-image-carousel]").first()
  const secondCarousel = page.locator("[data-image-carousel]").nth(1)
  const previous = carousel.getByRole("button", { name: "Mostrar imagen anterior" })
  const next = carousel.getByRole("button", { name: "Mostrar imagen siguiente" })
  const counter = carousel.locator("[data-carousel-counter]")

  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await expect(previous).toHaveCSS("min-height", "48px")
  await expect(next).toHaveCSS("min-height", "48px")
  await next.click()
  await expect(counter).toHaveText("02 / 03")
  await expect(secondCarousel.locator("[data-carousel-counter]")).toHaveText("01 / 05")
  await next.click()
  await expect(counter).toHaveText("03 / 03")
  await expect(next).toBeDisabled()
  await expect(previous).toBeEnabled()
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto")
})
