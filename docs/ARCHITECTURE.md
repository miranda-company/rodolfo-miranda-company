# Architecture

## Runtime

The site is a static Astro application. Pages render to HTML at build time, and
the production output does not ship React, React Router, Tailwind, a CMS, a
database, or an authentication layer.

Minimal browser JavaScript is limited to the responsive navigation menu and
route-aware fragment scrolling. Both features are implemented as small,
framework-free scripts.

## Presentation

- `src/layouts/BaseLayout.astro` owns Spanish metadata, development noindex
  directives, locally bundled fonts, and global page behavior.
- `src/components/` contains the reusable header, archive cards, artwork,
  homepage previews, and provisional-page shell.
- `src/styles/global.css` contains the approved design tokens and custom CSS.
- `src/pages/index.astro` preserves the design-approved homepage.
- `/notas` and `/notas/umbral` are design-approved visual baselines with a
  dedicated, route-scoped stylesheet. The remaining secondary routes use
  deliberately minimal semantic scaffolding. Every route remains excluded from
  indexing.

The baseline screenshots under `docs/figma-baseline/` and
`docs/notas-baseline/` remain the visual references. The tagged Figma export is
a behavioral reference only.

## Content

Astro content collections validate editorial entries at build time. Notes and
library entries currently provide the approved homepage preview content and
development routes. Portfolio and experiment collections contain only filtered
draft templates, never invented published entries.

The Notas index deliberately includes draft fixtures only when Astro is running
in development mode. Static production builds emit the three non-draft design
anchors and omit the 24 fixture cards and their detail routes. The homepage
always reads only non-draft featured notes, so its three existing links do not
change between environments.

Editable site copy is separated from templates:

- `src/content/site/homepage.json`
- `src/content/site/ahora.json`
- `src/content/pages/yo.md`
- `src/content/pages/contacto.md`

Spanish remains at root URLs. Schemas include a language and optional
translation key so English content can be added later without introducing
`/en/` routing in this phase.

## URL generation

Astro generates static index and detail routes from content entries. Dynamic
portfolio routes are ready for real content but generate no fabricated project
pages. Experiments have an index route only, as required for Phase 1.
