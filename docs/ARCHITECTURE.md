# Architecture

## Runtime

The site is a static Astro application. Pages render to HTML at build time; the
production output does not ship React, React Router, Tailwind, a CMS, a database,
or authentication. Browser JavaScript remains small and framework-free. It
handles navigation, route-aware fragment scrolling, the Notas and Mediateca
filters and sorting, Portafolio search and tag filtering, and synchronization
of author-inserted image carousels.

## Presentation

- `src/layouts/BaseLayout.astro` owns Spanish metadata, canonical and social
  URLs, JSON-LD, the safe-by-default indexing directive, locally bundled fonts,
  and global page behavior.
- `src/components/PageShell.astro` owns the canonical visible page structure.
- `src/styles/global.css` contains design tokens and the semantic typography
  system.
- `src/styles/home.css` contains the homepage hero, panels, and Ahora previews;
  it is imported only by `src/pages/index.astro`.
- `src/pages/index.astro` renders the four-panel homepage index for Yo, Notas,
  Mediateca, and Portafolio.
- `/notas` and `NoteArticle.astro` implement the reviewed Notas index and
  reading layout.
- `/mediateca` and `/mediateca/[slug]` implement the reviewed catalogue and
  reference layout.
- `/yo` is a coded editorial prototype driven by validated profile content.
- `/portafolio` is a curated case-file index with framework-free search and tag
  filtering; each case uses the shared detail geometry.
- `/404` uses the same page shell and introduction hierarchy, stays outside the
  sitemap and always forces `noindex, nofollow`.

## Page DOM contract

`BaseLayout.astro` remains the document layer for HTML, metadata, fonts, and
global behavior. Every rendered content route uses `PageShell.astro` as the
visible canvas:

```html
<div class="page-shell [route-page-class]">
  <header class="site-header">...</header>
  <main class="page-main [route-main-class]" id="contenido">...</main>
</div>
```

`Header.astro` and the main landmark are direct siblings. A rendered route has
exactly one `.page-shell`, one `.page-main`, one site header, and one `main`.
Redirect-only URLs do not render this structure. `.page-shell` owns the viewport,
responsive gutters, background, technical pattern, overflow and isolation;
`.page-main` supplies common width and stacking behavior.

Page introductions use a shared semantic and styling contract. Each is a
labelled `<section>` with the shared `.page-intro` class plus a route-specific
`*-intro` class: `.notes-intro`, `.mediateca-intro`, `.portfolio-intro`, or
`.yo-intro`; the error route uses `.not-found-intro` under the same contract.
The shared class owns the `40px 0` vertical padding;
route-specific classes only define the internal composition and visual elements
unique to that page. Editorial detail pages add `.entry-detail-intro` for their
shared title, summary and metadata arrangement while retaining their collection
class.

Pages with a return link use `.page-main--with-back` on the main landmark and
the semantic `.page-back` class on the link itself. Both are global contracts:
the main modifier owns the shared block offset, while `.page-back` owns the mono
type, underline, color and focus treatment. Index and editorial detail routes
must not introduce separate backlink classes or spacing overrides.

Archive indexes use the shared `.archive-control` class on filter buttons,
search fields and sorting selects. The global rule owns their square geometry,
type and `34px` minimum height; mobile viewports and coarse pointers increase
the minimum target to `48px`. `--outline-strong` separates essential
control boundaries from the quieter decorative `--line`, and shared pressed
states combine a surface change with a cobalt boundary. Empty filtered results
provide a keyboard-accessible `.filter-reset` recovery action. Collection
styles continue to own grouping, selected states and collection-specific
symbols. General Yo sections use the shared section rhythm tokens from
`global.css`, while genuinely compact or composition-specific sections retain
an explicit variant.

Notas and Mediateca initialize their disclosure, primary filter, optional theme
filter, result count, reset behavior, and DOM ordering through the typed
framework-free controller in `src/scripts/archive-controls.ts`. Their route
scripts provide only collection selectors and sorting rules, so labels and
content-specific behavior remain local without duplicating interaction state.

The root token layer keeps the original palette names for authored artwork and
decorative compositions, then maps interface meaning onto semantic roles:
`--surface`, `--surface-container`, `--on-surface`,
`--on-surface-variant`, `--primary`, `--on-primary` and `--outline-strong`.
Interactive focus uses the shared
`--focus-ring-*` contract. Short, standard and medium interaction timings use
`--motion-duration-*` with `--motion-easing-standard`; the global reduced-motion
query disables non-essential animation without hiding content.

Responsive CSS follows three named ranges even though native media queries must
repeat their literal values: compact is `<= 767px`, medium is `768px–1100px`,
and expanded is `>= 1101px`. A small number of documented component-specific
thresholds remain where a composition needs to change before or after those
ranges, such as the homepage panel grid and wide archive controls. These are
layout decisions, not additional global breakpoint tiers.

## Shared editorial detail system

`src/components/EditorialDetailLayout.astro` composes `BaseLayout` and
`PageShell` for Notas, Portafolio and Mediateca. Named slots carry each
collection's header metadata, summary, left metadata rail, central article,
right connections, and optional sequence navigation. No collection-specific
labels live in the shared component.

`src/styles/editorial-detail.css` owns the outer layout:

- desktop with connections: `1fr / 2fr / 1fr` for metadata, article and
  connections, spanning the full width of `.page-main`;
- desktop and tablet without connections: `1fr / 2fr` for metadata and article,
  also spanning the full width of `.page-main`;
- tablet: metadata plus article, with connections under the article;
- mobile: one column in logical metadata, article and connections DOM order;
- sticky side rails only when the viewport supports them.

Portfolio intentionally passes `hasConnections={false}` and therefore uses the
shared two-column modifier: the metadata rail occupies one third of the grid
tracks and the reading article occupies the remaining two thirds. Notas and
Mediateca use the shared three-column layout at desktop widths and retain their
right-hand connections rail. At tablet widths those connection layouts reduce
to metadata plus article, with connections placed beneath the article; all
three collections stack in logical DOM order on mobile.

`src/styles/rich-content.css` owns the route-independent `.rich-content`
presentation used around the rendered Markdown or MDX body in all three
collections. It covers body text, semantic H2/H3 spacing, lists, links and focus,
blockquotes, code, horizontal rules, images, figures, captions, footnotes,
tables, captioned standalone images, videos, and image carousels at approximately 70ch. Collection stylesheets retain index
interfaces and structured elements such as maturity notices, project galleries,
recurring ideas and metadata rails.

Collection presentation is split by route responsibility. `*-index.css` is
loaded only by the collection index, `*-detail.css` only by individual entries,
and `*-shared.css` contains the small visual primitives reused by both. This
keeps index controls out of article CSS and article metadata out of index CSS.

## Content and MDX

Astro content collections validate editorial entries at build time. Markdown
and MDX share each collection schema and render through the same collection
renderer. The schemas remain distinct: a note's maturity, a project's client and
disciplines, and a reference's consultation metadata keep their own meanings.

`@astrojs/mdx` enables reviewed Astro components in Notas, Portafolio and
Mediateca. `ContentImage.astro` is the shared component for one locally imported
editorial image with required alternative text and an optional semantic caption.
It emits the single imported source file with its intrinsic dimensions rather
than generating a responsive source set.
`VideoEmbed.astro` is collection-neutral and allowlists YouTube and
Vimeo only. It validates IDs, builds `youtube-nocookie.com` or Vimeo `dnt=1`
URLs, requires a meaningful accessible title, lazy-loads without autoplay, and
shows a visible fallback link. Arbitrary iframe URLs and pasted scripts are not
supported.

`ImageCarousel.astro` is the shared MDX component for local editorial image
sequences. It accepts typed Astro `ImageMetadata`, validates its accessible label,
image count, local sources, alternative text, and optional captions during
rendering, and emits each imported source file once with intrinsic dimensions.
Presentation stays in `rich-content.css`; one scoped framework-free script
initializes every instance, advances exactly one scroll-snap slide, updates the
polite status after native scrolling, recalculates after resizing, and respects
reduced motion. The no-JavaScript path remains a readable native horizontal
scroller. Structured Portafolio and Mediateca covers stay outside this inline
narrative component: their schemas pair a local `coverImage` with required
`coverAlt` and optional `coverCaption`, rendered only on detail pages. Portafolio
galleries also remain a separate structured field.

Astro generates fenced-code highlighting statically with Shiki and the
`github-light` theme. JavaScript, TypeScript, HTML, CSS, JSON, Bash and plain
text require no client runtime. Long lines scroll inside the code block rather
than expanding the page.

The Notas index includes 27 ordinary entries in development and three in a
normal production build. Mediateca includes 13 ordinary references in
development and three (`modulor`, `cosas`, `orden`) in production. Portafolio
includes 14 ordinary development entries: six published case studies and eight
draft placeholders. Production includes `syra-coffee`, `bsc`, `minka-icm`,
`cn-sant-andreu`, `modulab-barcelona`, and `eloquent`.
Each collection also has an isolated `ejemplo-mdx` technical route in
development where applicable: one for Notas, one for Mediateca and one for
Portafolio.

Central collection helpers separate `fixture: true` entries from genuine
editorial content. Fixtures stay out of indexes, search, filters, counts,
homepage previews, related suggestions, previous/next navigation and production.
Schemas require them to remain drafts and reserve `N.999`, `M.999` and `P.999`.

Mediateca uses `editorialState` independently of `draft`. `provisional` controls
the warning and “Comentario provisional” label; `revisado` removes the warning
and uses “Comentario”. `/mediateca/[slug].astro` generates all references,
including `/mediateca/modulor`. Legacy `/biblioteca` routes remain redirect
sources for the canonical `/mediateca` URLs.

Editable site copy remains separate from templates:

- `src/content/site/homepage.json`
- `src/content/site/ahora.json`
- `src/content/site/yo.json`

The homepage panel titles, descriptions, routes, kinds, local images and image
alternatives are validated in `homepage.json`. Only genuinely static metadata
and reveal labels live there. `src/pages/index.astro` supplies collection-driven
values at build time: the Notas panel receives the latest published-note date
and published-note count, while Mediateca and Portafolio receive their published
entry counts. These statistics use the same centralized helpers and production
boundary as route generation, so drafts and technical fixtures are excluded.
The Ahora section also presents the most recently updated visible Portafolio
entry. Development includes ordinary drafts for design review; production uses
the published collection boundary and retains an explicit empty state for any
future build with no published project.

Spanish remains at root URLs. Schemas include language and optional translation
keys so English can be added later without activating `/en/` routes now.

## URL generation and counts

Static paths come from centralized visible-entry helpers. Genuine Notas receive
circular previous/next props. Portfolio sequence follows `displayOrder`.
Development appends explicitly typed fixture routes without inserting fixtures
into editorial navigation; production never appends them.

Excluding redirect aliases, development exposes 62 canonical routes: five
indexes or standalone pages, 27 ordinary Notas plus one note fixture, 13
Mediateca references plus one media fixture, and 14 ordinary Portfolio entries
plus one project fixture. A normal production build exposes 17 canonical routes:
the five standalone routes, three Notas, three Mediateca references, and six
Portfolio cases.

Astro also writes four legacy `/biblioteca` redirect artifacts. The dynamic
`/biblioteca/[slug]` route covers `modulor`, `cosas`, and `orden`; no overlapping
explicit redirect is required.

## Metadata, sitemap and indexing

`src/lib/site.ts` is the canonical source for the site name, description,
language, locale and intended origin. `astro.config.ts` uses that origin unless
`SITE_URL` is supplied to the build. `BaseLayout.astro` turns page props into
canonical links, Open Graph metadata, Twitter cards and a Schema.org graph.
Collection details pass their validated dates, tags, covers and entity type
through `EditorialDetailLayout.astro`; index routes use `CollectionPage` and
`/yo` uses `ProfilePage`.

`src/pages/sitemap.xml.ts` derives its 17 production URLs from the same visible
collection helpers as route generation. `src/pages/robots.txt.ts` and the HTML
metadata share the build-time `PUBLIC_INDEXING_ENABLED` switch, which is false
unless explicitly set to `true`. This keeps both surfaces blocked during
development and review. Deployment behavior and the permanent redirect
contract are documented in `docs/LAUNCH_READINESS.md`.

## Automated quality safeguards

Playwright exercises primary routes, responsive layouts and shared interactions
against an isolated Astro preview of the generated production build. axe-core
scans the same rendered DOM for automatically detectable WCAG A/AA failures.
Framework-free Node scripts verify the exact production route set, collection
counts, fixture exclusion and conservative output-size budgets after Astro
builds `dist/`.

The canonical workflow is `pnpm run verify`. GitHub Actions runs it on pull
requests and pushes to `main`; browser artifacts are uploaded only after a
failure. See `docs/QUALITY_ASSURANCE.md` for the test scope, budget values and
maintenance rules. `pnpm run verify:launch` adds repeatable Lighthouse audits
for the final pre-deployment review.
