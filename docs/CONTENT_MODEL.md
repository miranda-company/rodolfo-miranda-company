# Content model

All collection schemas live in `src/content.config.ts` and are checked by
`pnpm run check` and every production build.

## Notas

Markdown entries contain a title, summary, publication and update dates, growth
state (`semilla`, `en-crecimiento`, or `perenne`), tags, related-note
references, featured and draft flags, language, an optional translation key,
and a Markdown body.

## Biblioteca

Markdown entries contain a title, author or creator, resource type, summary,
Rodolfo's commentary, canonical external URL, optional local cover image, tags,
featured and draft flags, language, an optional translation key, and an
optional Markdown body.

The seeded references keep commentary empty until Rodolfo supplies it; the site
does not invent an editorial opinion.

## Portafolio

Markdown entries model a deliberately curated completed project: title,
summary, year, role, disciplines, optional client, project status, required
cover image, gallery, labeled project links, featured and draft flags, display
order, language, optional translation key, and case-study body.

The draft `_template.md` entry documents the editable shape without generating
a public project route. Published entries must provide a cover image.

## Experimentos

Markdown entries model a current or recently released experiment: title, short
description, status (`en-curso`, `publicado`, or `pausado`), start,
release, and update dates, optional GitHub and live URLs, tags, featured and
draft flags, display order, language, and optional translation key.

The draft `_template.md` entry documents the editable shape without generating
a public experiment. Its route is semantic scaffolding only; card design and
outbound-link behavior are deferred.

## Site copy

Homepage and Ahora copy use validated JSON collections. Yo and Contacto use a
small validated Markdown page collection. These files are intentionally
editable without changing Astro components.
