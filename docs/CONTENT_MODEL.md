# Content model

All collection schemas live in `src/content.config.ts` and are checked by
`pnpm run check` and every production build.

## Notas

Markdown entries contain a title, summary, publication and update dates, growth
state (`semilla`, `en-crecimiento`, or `perenne`), stable archive number, card
format (`compact`, `standard`, `visual`, or `featured`), tags, related-note
references, featured and draft flags, language, an optional translation key,
and a Markdown body. Card format controls presentation in the garden without
changing the editorial meaning or URL of an entry.

The `draft` field is also the publication boundary for the garden. Development
includes draft entries so the complete 27-card design fixture can be reviewed;
normal production builds exclude draft cards and their detail routes. The 24
generated demonstration entries are drafts and must not be treated as Rodolfo's
approved writing.

`umbral`, `margen`, and `archivo` remain the three non-draft design anchors used
by the approved homepage. Their summaries and any article bodies are
provisional editorial copy that requires Rodolfo's review and approval before
launch; currently only `umbral` contains a demonstration body.

## Mediateca

Markdown entries contain a title, author or creator, format, engagement mode,
summary, personal commentary, reason for inclusion, recurring ideas, optional
publication year, catalogue status, archival number, update date, optional
canonical external URL and local cover image, tags, related notes, related
Mediateca entries, featured and draft flags, language, an optional translation
key, and an optional Markdown body.

Formats cover books, articles, websites, tools, videos, podcasts, and other
useful references. Status values are `en-curso`, `consultado`,
`de-referencia`, and `por-explorar`. Engagement mode is a separate presentation
and consumption cue. Its internal values are `read`, `watch`, and `listen`,
shown in the Spanish interface as `LEER`, `VER`, and `ESCUCHAR` respectively.
It does not replace format and is not part of catalogue filtering. Status also
remains editorial metadata but is not exposed as a catalogue filter.

Development includes ten draft design fixtures so the complete 13-entry
catalogue demonstrates every requested format, theme, and engagement treatment. Normal production
builds include only the three non-draft design anchors: `modulor`, `cosas`, and
`orden`. Draft fixtures and their detail routes are excluded from production.

The annotations and commentary for all three anchors, including the El Modulor
reading page, are provisional editorial copy. They must be reviewed and
approved by Rodolfo before launch and do not contain fabricated quotations.

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
