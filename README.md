# Rodolfo Miranda Company

This repository contains the source code and editable content for Rodolfo
Miranda's personal digital garden. It brings together personal context and
professional experience, notes at different stages of maturity, a mixed-media
collection, and selected projects.

The site is designed as a growing, interconnected body of work rather than a
chronological blog or a conventional portfolio.

## The garden

The garden gives ideas, references, and projects a shared place to
evolve and connect. An entry can begin incomplete, gain context, and link to
other parts of the archive as it develops. The content architecture
intentionally allows unfinished material and makes its status visible without
presenting it as final work.

Notes use three maturity states:

- **Semilla (Seed):** an initial observation or idea.
- **En crecimiento (Growing):** a developed note that can still change.
- **Perenne (Perennial):** a stable piece that remains open to revision.

These states belong to Notas. Mediateca and Portafolio use their own editorial
fields and publication boundaries.

## Routes

- `/` — entrance to the garden and overview of its main areas. Reviewed design.
- `/yo` — biography, current work, and professional timeline. Implemented
  prototype with editorial content still pending.
- `/notas` — evolving notes and connected ideas. Reviewed index and reading
  template.
- `/mediateca` — books and other references to read, watch, or listen to.
  Reviewed catalogue and reference template.
- `/portafolio` — selected projects and case studies. Implemented prototype
  using provisional development placeholders.

## Current status

- The homepage retains the established visual system while intentionally
  replacing the former Contacto panel with Portafolio. Its four panels now link
  to Yo, Notas, Mediateca, and Portafolio.
- Homepage panel statistics are derived from published collection entries: the
  latest Nota publication date, the number of published Notas, the number of
  published Mediateca items, and the number of published Portfolio projects.
- The homepage Ahora section links its Portafolio preview to the most recently
  updated visible project. Development can show draft projects for review;
  production never exposes them.
- Yo includes a biography, local portrait, and professional timeline; four
  career stages and one biographical passage still require editing.
- Notas displays 27 ordinary entries in development, plus one isolated technical
  MDX reference at `/notas/ejemplo-mdx`. Production generates only `umbral`,
  `margen`, and `archivo`; their copy still requires editorial approval.
- Mediateca displays 13 references plus one isolated technical MDX route in
  development. Production generates only `modulor`, `cosas`, and `orden`; their
  commentary remains provisional.
- Portafolio includes search, tag filters, three fictional cases for design
  review, and one isolated technical MDX route. None are included in the
  production build.
- The first release is in Spanish. The structure allows for a future English
  version, but translated routes do not exist yet.
- Search-engine indexing remains disabled through `noindex` and `robots.txt`
  while the project is in development.
- No deployment or hosting provider is documented. The intended domain is
  `www.rodolfomiranda.company`, but repository evidence does not show it as
  connected yet.

The detailed and current source of truth is
[docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md).

## How content grows

Content is edited through Astro content collections and Markdown, MDX, or JSON
files inside `src/content/`. Notas, Portafolio, and Mediateca share one detail-page
scaffold and one rich-content presentation while retaining their own metadata and
editorial semantics. Markdown is the default; MDX is used only when an approved
Astro component is required. The approved component set includes allowlisted
YouTube/Vimeo embeds and a shared local-image carousel for Notas, Mediateca, and
Portfolio bodies. Carousels use Astro's image pipeline, native horizontal
scrolling, accessible controls, and no autoplay. Development fixtures make it
possible to verify images, carousels, videos, code, filters, and routes without
presenting them as published work. Entries with `draft: true` are excluded from
normal production builds.

Notes and references can link to related material. Portfolio projects use their
own content model. Complete schemas and editorial instructions are documented in
[docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md). Practical workflows live in
[Writing Notas](docs/WRITING_NOTES.md),
[Writing Portafolio](docs/WRITING_PORTFOLIO.md), and
[Writing Mediateca](docs/WRITING_MEDIATECA.md).

## Technology

- Astro with static output.
- Strict TypeScript and validated content collections.
- Markdown, MDX, and JSON content with built-in Shiki syntax highlighting.
- Custom CSS without a visual component framework.
- Minimal framework-free JavaScript for navigation, filters, search, and editorial image carousels.
- Fonts bundled locally through Fontsource.
- `pnpm` for dependencies and project tasks.

## Local development

The project uses Node.js 22 and pnpm 10. The versions are declared in
`.mise.toml`.

```sh
pnpm install
pnpm run dev
pnpm run check
pnpm run build
pnpm run preview
```

- `pnpm run dev` starts Astro at `http://localhost:8443/` by default.
- `pnpm run check` runs Astro and TypeScript strict diagnostics.
- `pnpm run build` checks the project again and generates the static site.
- `pnpm run preview` serves the latest production build locally.

## Structure and documentation

- `src/pages/` — Astro routes.
- `src/components/` — shared components and renderers.
- `src/content/` — editable content and development fixtures.
- `src/styles/` — visual system and section-specific styles.
- `public/` — public files that do not pass through the asset pipeline.
- `docs/` — architecture, editorial models, project status, and visual
  references.

Main documentation:

- [Architecture](docs/ARCHITECTURE.md)
- [Content model](docs/CONTENT_MODEL.md)
- [Writing notes](docs/WRITING_NOTES.md)
- [Writing portfolio projects](docs/WRITING_PORTFOLIO.md)
- [Writing Mediateca references](docs/WRITING_MEDIATECA.md)
- [Typography system](docs/TYPOGRAPHY_SYSTEM.md)
- [Project status](docs/PROJECT_STATUS.md)
- [Launch checklist](docs/LAUNCH_CHECKLIST.md)
- [Integrated baseline](docs/integrated-baseline/README.md)

Earlier visual references are preserved in `docs/figma-baseline/`,
`docs/notas-baseline/`, and `docs/mediateca-baseline/`.

## Inspiration and authorship

This garden is designed for Rodolfo Miranda's identity, content, and needs.
[Maggie Appleton's digital garden](https://maggieappleton.com/) influenced the
exploratory density of Notas and the biographical and chronological approach of
Yo. The visual identity, design system, content model, and Astro implementation
are specific to this project.

Maggie Appleton's reference source code is available at
[MaggieAppleton/maggieappleton.com-V3](https://github.com/MaggieAppleton/maggieappleton.com-V3).
