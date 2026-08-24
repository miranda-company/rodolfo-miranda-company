import type { APIRoute } from "astro"
import { getVisibleSpanishMedia } from "../lib/media"
import { getVisibleSpanishNotes } from "../lib/notes"
import { getVisibleSpanishProjects } from "../lib/portfolio"
import { SITE_ORIGIN } from "../lib/site"

export const prerender = true

interface SitemapEntry {
  path: string
  updatedAt?: Date
}

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    }
    return entities[character] ?? character
  })

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL(SITE_ORIGIN)
  const [notes, media, projects] = await Promise.all([
    getVisibleSpanishNotes(false),
    getVisibleSpanishMedia(false),
    getVisibleSpanishProjects(false),
  ])

  const latest = (dates: Date[]) =>
    dates.reduce<Date | undefined>(
      (current, date) => (!current || date.getTime() > current.getTime() ? date : current),
      undefined,
    )

  const entries: SitemapEntry[] = [
    {
      path: "/",
      updatedAt: latest([
        ...notes.map((entry) => entry.data.updatedAt),
        ...media.map((entry) => entry.data.updatedAt),
        ...projects.map((entry) => entry.data.updatedAt),
      ]),
    },
    { path: "/yo" },
    { path: "/notas", updatedAt: latest(notes.map((entry) => entry.data.updatedAt)) },
    ...notes.map((entry) => ({ path: `/notas/${entry.id}`, updatedAt: entry.data.updatedAt })),
    { path: "/mediateca", updatedAt: latest(media.map((entry) => entry.data.updatedAt)) },
    ...media.map((entry) => ({ path: `/mediateca/${entry.id}`, updatedAt: entry.data.updatedAt })),
    { path: "/portafolio", updatedAt: latest(projects.map((entry) => entry.data.updatedAt)) },
    ...projects.map((entry) => ({
      path: `/portafolio/${entry.id}`,
      updatedAt: entry.data.updatedAt,
    })),
  ]

  const urls = entries
    .map(({ path, updatedAt }) => {
      const location = escapeXml(new URL(path, siteUrl).href)
      const lastModified = updatedAt
        ? `\n    <lastmod>${updatedAt.toISOString().slice(0, 10)}</lastmod>`
        : ""
      return `  <url>\n    <loc>${location}</loc>${lastModified}\n  </url>`
    })
    .join("\n")

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
