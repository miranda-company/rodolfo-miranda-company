import { expect, test, type Page } from "@playwright/test"

const primaryRoutes = [
  "/",
  "/yo",
  "/notas",
  "/mediateca",
  "/portafolio",
  "/notas/umbral",
  "/mediateca/modulor",
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

for (const viewport of viewports) {
  for (const route of primaryRoutes) {
    test(`${viewport.name}: ${route} renders without structural regressions`, async ({ page }) => {
      await page.setViewportSize(viewport)
      const problems = collectBrowserProblems(page)
      const response = await page.goto(route)

      expect(response?.ok(), `${route} should return a successful response`).toBe(true)
      await expect(page.locator("html")).toHaveAttribute("lang", "es")
      await expect(page.locator("main")).toHaveCount(1)
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

test("hash navigation works directly and from another route", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/yo")
  await page.locator(".page-back").click()
  await expect(page).toHaveURL(/\/#indice$/)
  await expect(page.locator("#indice")).toBeInViewport()

  await page.goto("/yo")
  await page.locator(".desktop-nav").getByRole("link", { name: "Ahora" }).click()
  await expect(page).toHaveURL(/\/#ahora$/)
  await expect(page.locator("#ahora")).toBeInViewport()

  await page.goto("/#indice")
  await expect(page.locator("#indice")).toBeInViewport()
})

test("mobile menu opens from the keyboard and Escape restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")

  const trigger = page.locator(".mobile-index-button")
  await expect(trigger).toHaveAccessibleName("Índice")
  await trigger.focus()
  await page.keyboard.press("Enter")
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(trigger).toHaveAccessibleName("Cerrar")
  await expect(page.locator("#mobile-menu")).toBeVisible()

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

test("Mediateca format filtering handles empty and populated results", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 })
  await page.goto("/mediateca")

  const videos = page.getByRole("button", { name: "Videos" })
  await videos.click()
  await expect(videos).toHaveAttribute("aria-pressed", "true")
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
