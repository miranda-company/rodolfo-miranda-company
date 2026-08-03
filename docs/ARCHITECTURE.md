# Architecture

## Runtime

The site is a static Astro application. Pages render to HTML at build time; the
production output does not ship React, React Router, Tailwind, a CMS, a database,
or authentication. Browser JavaScript remains small and framework-free. It
handles navigation, route-aware fragment scrolling, the Notas and Mediateca
filters and sorting, Portafolio search and tag filtering, and synchronization
of author-inserted image carousels.

## Presentation

- `src/layouts/BaseLayout.astro` owns Spanish metadata, the current site-wide
  `noindex` directive, locally bundled fonts, and global page behavior.
- `src/components/PageShell.astro` owns the canonical visible page structure.
- `src/styles/global.css` contains design tokens and the semantic typography
  system.
- `src/pages/index.astro` retains the established homepage composition while
  intentionally replacing the historical Contacto panel with Portafolio. The
  current four-panel index links to Yo, Notas, Mediateca, and Portafolio.
- `/notas` and `NoteArticle.astro` preserve the approved Notas garden and reading
  baseline.
- `/mediateca` and `/mediateca/modulor` preserve the approved catalogue and
  reference baseline; all references now use the canonical dynamic route.
- `/yo` is a coded editorial prototype driven by validated profile content.
- `/portafolio` is a curated case-file index with framework-free search and tag
  filtering; each case uses the shared detail geometry.
- `/experimentos` remains provisional semantic scaffolding.

Historical screenshots under `docs/figma-baseline/`, `docs/notas-baseline/`,
`docs/mediateca-baseline/`, and `docs/integrated-baseline/` remain historical
visual references and are not rewritten to describe later implementation work.

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

## Shared editorial detail system

`src/components/EditorialDetailLayout.astro` composes `BaseLayout` and
`PageShell` for Notas, Portafolio and Mediateca. Named slots carry each
collection's header metadata, summary, left metadata rail, central article,
right connections, and optional sequence navigation. No collection-specific
labels live in the shared component.

`src/styles/editorial-detail.css` owns the outer layout:

- desktop: `170px / minmax(0, 720px) / 210px` for metadata, article and
  connections;
- tablet: metadata plus article, with connections under the article;
- mobile: one column in logical metadata, article and connections DOM order;
- sticky side rails only when the viewport supports them.

`src/styles/rich-content.css` owns the route-independent `.rich-content`
presentation used around the rendered Markdown or MDX body in all three
collections. It covers body text, semantic H2/H3 spacing, lists, links and focus,
blockquotes, code, horizontal rules, images, figures, captions, footnotes,
tables, videos, and image carousels at approximately 70ch. Collection stylesheets retain index
interfaces and structured elements such as maturity notices, project galleries,
recurring ideas and metadata rails.

## Content and MDX

Astro content collections validate editorial entries at build time. Markdown
and MDX share each collection schema and render through the same collection
renderer. The schemas remain distinct: a note's maturity, a project's client and
disciplines, and a reference's consultation metadata keep their own meanings.

`@astrojs/mdx` enables reviewed Astro components in Notas, Portafolio and
Mediateca. `VideoEmbed.astro` is collection-neutral and allowlists YouTube and
Vimeo only. It validates IDs, builds `youtube-nocookie.com` or Vimeo `dnt=1`
URLs, requires a meaningful accessible title, lazy-loads without autoplay, and
shows a visible fallback link. Arbitrary iframe URLs and pasted scripts are not
supported.

`ImageCarousel.astro` is the shared MDX component for local editorial image
sequences. It accepts typed Astro `ImageMetadata`, validates its accessible label,
image count, local sources, alternative text, and optional captions during
rendering, and delegates responsive optimization to Astro's `Image` component.
Presentation stays in `rich-content.css`; one scoped framework-free script
initializes every instance, advances exactly one scroll-snap slide, updates the
polite status after native scrolling, recalculates after resizing, and respects
reduced motion. The no-JavaScript path remains a readable native horizontal
scroller. Structured Portafolio covers and galleries stay outside this inline
narrative component.

Astro generates fenced-code highlighting statically with Shiki and the
`github-light` theme. JavaScript, TypeScript, HTML, CSS, JSON, Bash and plain
text require no client runtime. Long lines scroll inside the code block rather
than expanding the page.

The Notas index includes 27 ordinary entries in development and three in a
normal production build. Mediateca includes 13 ordinary references in
development and three (`modulor`, `cosas`, `orden`) in production. Portafolio
includes three draft placeholders in development and no production details.
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

The homepage panel titles, descriptions, metadata labels, routes, and kinds are
validated in `homepage.json`. `src/pages/index.astro` replaces collection-driven
values at build time: the Notas panel receives the latest published-note date
and published-note count, while Mediateca and Portafolio receive their published
entry counts. These statistics use the same centralized helpers and production
boundary as route generation, so drafts and technical fixtures are excluded.

Spanish remains at root URLs. Schemas include language and optional translation
keys so English can be added later without activating `/en/` routes now.

## URL generation and counts

Static paths come from centralized visible-entry helpers. Genuine Notas receive
circular previous/next props. Portfolio sequence follows `displayOrder`.
Development appends explicitly typed fixture routes without inserting fixtures
into editorial navigation; production never appends them.

Excluding redirect aliases, development exposes 52 canonical routes: six
indexes or standalone pages, 27 ordinary Notas plus one note fixture, 13
Mediateca references plus one media fixture, and three Portfolio placeholders
plus one project fixture. A normal production build exposes 12 canonical routes:
the six standalone routes, three Notas and three Mediateca references.
