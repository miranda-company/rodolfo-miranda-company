# Rodolfo Miranda Company

Source code and editable content for Rodolfo Miranda’s personal digital garden.
The site brings together a biography, working notes, a media reference library,
and selected portfolio case studies.

The first release is written in Spanish. The project is still in development:
search-engine indexing is disabled, hosting is not configured, and some content
still requires editorial review.

## Main sections

| Route | Purpose |
| --- | --- |
| `/` | Entrance to the garden and overview of its four sections. |
| `/yo` | Biography, current work, portrait, and professional timeline. |
| `/notas` | Notes organized by maturity, theme, and update date. |
| `/mediateca` | Books, articles, websites, videos, podcasts, and tools. |
| `/portafolio` | Selected projects with search and tag filtering. |

Legacy `/biblioteca` URLs redirect to `/mediateca`.

## Current state

- Production includes 3 Notas, 3 Mediateca references, and 6 Portafolio case
  studies.
- Development also shows editorial drafts and one isolated MDX fixture per
  editorial collection.
- Drafts and technical fixtures are excluded from production routes, homepage
  statistics, filters, connections, and sequence navigation.
- Homepage publication counts and recent-content previews are derived from the
  validated content collections.
- The project builds to static HTML with minimal framework-free JavaScript.

See [Project status](docs/PROJECT_STATUS.md) for exact counts, editorial limits,
known issues, and launch work.

## Local development

The expected toolchain is Node.js 22 and pnpm 10, declared in `.mise.toml`.

```sh
pnpm install
pnpm run dev
```

Astro starts at `http://localhost:8443/` by default. Source and content changes
reload automatically.

Useful commands:

```sh
pnpm run format   # format TypeScript and project configuration
pnpm run check    # run Astro and TypeScript diagnostics
pnpm run build    # check and generate the production site
pnpm run preview  # serve the latest production build
```

If Astro reports that another development server is running, open the URL and
PID shown in the message or stop it with `pnpm exec astro dev stop` before
starting a replacement.

## Editing content

Editable content lives in `src/content/`:

| Content | Location | Guide |
| --- | --- | --- |
| Homepage and Ahora | `src/content/site/homepage.json`, `ahora.json` | [Content model](docs/CONTENT_MODEL.md) |
| Yo | `src/content/site/yo.json` | [Content model](docs/CONTENT_MODEL.md) |
| Notas | `src/content/notas/` | [Writing Notas](docs/WRITING_NOTES.md) |
| Mediateca | `src/content/mediateca/` | [Writing Mediateca](docs/WRITING_MEDIATECA.md) |
| Portafolio | `src/content/portafolio/` | [Portfolio project guide](docs/PORTFOLIO_PROJECT_GUIDE.md) |

Use Markdown for normal editorial content. Use MDX only when a page needs an
approved component such as `ContentImage`, `ImageCarousel`, or `VideoEmbed`.
Images remain local and pass through Astro’s image pipeline.

## Project structure

- `src/pages/` — Astro routes.
- `src/components/` — shared page and content components.
- `src/content/` — validated editorial content and development fixtures.
- `src/styles/` — design tokens, shared typography, and section styles.
- `src/assets/images/` — local source images processed by Astro.
- `public/` — static public files such as `robots.txt`.
- `docs/` — editorial and technical documentation.

Start with the [documentation guide](docs/README.md) to find the right document
for a writing, design, development, or launch task.

## Technology

- Astro 7 with static output.
- Strict TypeScript and validated content collections.
- Markdown and MDX with build-time Shiki highlighting.
- Custom CSS and locally bundled fonts.
- Minimal JavaScript for navigation, filters, search, and image carousels.
- pnpm for dependency and task management.

## Inspiration and authorship

[Maggie Appleton’s digital garden](https://maggieappleton.com/) influenced the
exploratory organization of Notas and the biographical approach of Yo. The
visual system, content model, and Astro implementation are specific to Rodolfo
Miranda Company.
