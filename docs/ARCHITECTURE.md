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
- `/mediateca` and `/mediateca/modulor` form a design-approved catalogue and
  reference baseline with a dedicated route-scoped stylesheet.

The baseline screenshots under `docs/figma-baseline/` and
`docs/notas-baseline/`, and `docs/mediateca-baseline/` remain the visual
references. The tagged Figma export is a behavioral reference only.

## Content

Astro content collections validate editorial entries at build time. Notes and
Mediateca entries currently provide the approved homepage preview content and
development routes. Portfolio and experiment collections contain only filtered
draft templates, never invented published entries.

The Notas index deliberately includes draft fixtures only when Astro is running
in development mode. Static production builds emit the three non-draft design
anchors and omit the 24 fixture cards and their detail routes. The homepage
always reads only non-draft featured notes, so its three existing links do not
change between environments.

The Mediateca follows the same publication boundary. Development includes ten
draft design fixtures so every format, theme, consultation mode, and card
variant can be reviewed. Production emits only the three non-draft anchors
(`modulor`, `cosas`, and `orden`) and their detail routes. Status remains visible
metadata but is not a filter. The old `/biblioteca` routes remain only as
permanent redirect sources for the canonical `/mediateca` URLs.

Editable site copy is separated from templates:

- `src/content/site/homepage.json`
- `src/content/site/ahora.json`
- `src/content/pages/yo.md`
- `src/content/pages/contacto.md`

Spanish remains at root URLs. Schemas include a language and optional
translation key so English content can be added later without introducing
`/en/` routing in this phase.

## URL generation

Astro generates static index and detail routes from content entries. Configured
redirects preserve the former `/biblioteca` paths while Mediateca owns the
canonical index and detail URLs. Dynamic
portfolio routes are ready for real content but generate no fabricated project
pages. Experiments have an index route only, as required for Phase 1.
