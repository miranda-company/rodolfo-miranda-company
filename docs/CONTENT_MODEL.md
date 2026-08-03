# Content model

All collection schemas live in `src/content.config.ts` and are checked by
`pnpm run check` and every production build.

## Notas

Markdown and MDX entries share one validated schema:

- `title` and `summary`: required editorial text;
- `publishedAt` and `updatedAt`: coerced dates;
- `state`: `semilla`, `en-crecimiento`, or `perenne`;
- `archiveNumber`: a stable `N.###` identifier;
- `cardFormat`: `compact`, `standard`, `visual`, or `featured`;
- `tags`: an optional array that defaults to empty;
- `relatedNotes`: validated references to other Notas entries;
- `relatedLinks`: optional labeled internal URLs beginning with `/`;
- `featured`, `draft`, and `fixture`: booleans that default to `false`;
- `language`: `es` or `en`, defaulting to `es`;
- `translationKey`: an optional non-empty cross-language identifier;
- the Markdown or MDX body.

`cardFormat` controls presentation in the garden without changing hierarchy,
editorial meaning, or URL. Renaming an entry from `.md` to `.mdx` preserves its
content ID, slug, and public route.

Every visible Spanish entry uses the shared `NoteArticle.astro` reading layout.
The default index order and circular previous/next navigation both use
`updatedAt` descending, with `archiveNumber` as the deterministic tie-breaker.
`relatedNotes` stores note IDs and resolves their current titles and routes;
`relatedLinks` stores an optional visible `label` and an internal `href` that
begins with `/`. Empty Markdown bodies render an interface-only editorial state
without storing fabricated prose in the content file. Both formats render
through `render(entry)` and the same `NoteArticle.astro` component.

Ordinary notes should remain `.md`; MDX is reserved for approved Astro content
components. `VideoEmbed.astro` allowlists YouTube and Vimeo. It validates IDs,
constructs player and fallback URLs internally, exposes a required accessible
title, and never accepts arbitrary iframe URLs or scripts. `ImageCarousel.astro`
accepts only locally imported Astro image metadata and provides the shared
image-carousel behavior described below. Future providers or component types
require their own reviewed implementation, an explicit allowlist decision,
meaningful fallback content, and the minimum client-side JavaScript necessary.

Fenced code blocks in Markdown and MDX use Astro's built-in Shiki highlighter
with the `github-light` theme. JavaScript, TypeScript, HTML, CSS, JSON, Bash, and
plain text require no client-side runtime. Long lines scroll within the code
block instead of expanding the reading column.

`draft` is the publication boundary, while `fixture` separates technical
verification content from genuine editorial content. Ordinary authors normally
omit `fixture`; its default is `false`. Validation requires every
`fixture: true` entry to remain `draft: true`. It also reserves `N.999` for the
technical fixture and rejects `N.999` on an ordinary note.

Development contains 27 ordinary entries: the three non-draft anchors and 24
draft design entries. `ejemplo-mdx` is one additional, directly reviewable
technical route. It uses `fixture: true`, `draft: true`, and `N.999`, so it is
absent from the garden, counts, filters, related-note lists, homepage previews,
and genuine circular navigation. Production contains only `umbral`, `margen`,
and `archivo`; it generates no fixture route or artifact. `N.028` remains
available for the next genuine note.

The 24 generated demonstration entries are drafts and must not be treated as
Rodolfo's approved writing. The external videos inside `ejemplo-mdx` are
platform-owned technical demonstrations and do not imply Rodolfo's authorship
or endorsement.

`umbral`, `margen`, and `archivo` remain the three non-draft design anchors used
by the approved homepage. Their summaries and any article bodies are
provisional editorial copy that requires Rodolfo's review and approval before
launch; currently only `umbral` contains a demonstration body.

See [WRITING_NOTES.md](WRITING_NOTES.md), [templates/nota.md](templates/nota.md),
and [templates/nota-mdx.mdx](templates/nota-mdx.mdx) for the authoring workflow
and safe starter files outside the content collection.

## Shared editorial body

Notas, Portafolio and Mediateca retain different schemas and metadata, but their
Markdown/MDX bodies render inside the same `.rich-content` context from
`src/styles/rich-content.css`. It covers paragraphs, H2/H3, lists, links,
blockquotes, inline and fenced code, horizontal rules, local images, figures,
captions, footnotes and tables at a maximum measure of approximately 70ch.

Astro renders fenced code statically with Shiki and the `github-light` theme;
there is no client-side highlighter. Long lines scroll inside their block.
`VideoEmbed.astro` is collection-neutral and allowlists only YouTube and Vimeo,
with validated IDs, required accessible titles, visible fallback links,
`youtube-nocookie.com`, Vimeo `dnt=1`, lazy loading and no autoplay. Arbitrary
iframes and pasted scripts remain unsupported.

`src/components/content/ImageCarousel.astro` is also collection-neutral and is
supported inside Notas, Portafolio, and Mediateca MDX bodies. Its typed API is:

```ts
interface CarouselImage {
  src: ImageMetadata
  alt: string
  caption?: string
}

interface Props {
  label: string
  images: CarouselImage[]
}
```

The component requires a non-empty accessible `label`, at least two locally
imported images, and meaningful non-empty alternative text for every image.
Optional captions must contain text when supplied. Remote strings and malformed
image objects fail rendering with a Spanish error. Astro generates responsive
image sources without exceeding each local source's useful dimensions.

The carousel uses a stable 16:10 contained-image stage, ordered-list and figure
semantics, visible Spanish previous/next controls, an independently updated live
counter, CSS scroll snap, touch and trackpad scrolling, and reduced-motion-aware
movement. It never autoplays or loops. Without JavaScript every image, caption,
and alternative text remains available through native horizontal scrolling;
the small framework-free script adds one-slide controls, counter synchronization,
responsive recalculation, and support for multiple independent instances.

Preferred local-image folders are:

- `src/assets/images/notas/<slug>/`;
- `src/assets/images/portafolio/<slug>/`;
- `src/assets/images/mediateca/<slug>/`.

Every meaningful image needs useful alternative text. Captions are optional.
Structured Portfolio covers and galleries remain separate from inline editorial
images and continue through Astro's image pipeline. Normal static images work in
`.md`; `ImageCarousel` requires `.mdx`. Authors should strip unnecessary personal,
EXIF/GPS, and location metadata before committing image files.

## Mediateca

Markdown and MDX entries contain a title, author or creator, format, engagement
mode, editorial state, summary, personal commentary, reason for inclusion,
recurring ideas, optional publication year, catalogue status, archival number,
update date, optional canonical external URL and local cover image, tags,
related notes, related Mediateca entries, featured, draft and technical-fixture
flags, language, an optional translation key, and an optional editorial body.

Formats cover books, articles, websites, tools, videos, podcasts, and other
useful references. Status values are `en-curso`, `consultado`,
`de-referencia`, and `por-explorar`. Engagement mode is a separate presentation
and consumption cue. Its internal values are `read`, `watch`, and `listen`,
shown in the Spanish interface as `LEER`, `VER`, and `ESCUCHAR` respectively.
It does not replace format and is not part of catalogue filtering. Status also
remains editorial metadata but is not exposed as a catalogue filter.

`editorialState` is separate from publication. `provisional` shows the current
copy warning and labels the first section “Comentario provisional”. `revisado`
removes that warning and uses “Comentario”. `draft` remains the production
boundary in both cases. All current references are marked honestly as
`provisional`; this changes no editorial claim silently.

Development includes ten draft design entries so the complete 13-entry
catalogue demonstrates every requested format, theme, and engagement
treatment. Normal production builds include only the three non-draft design
anchors: `modulor`, `cosas`, and `orden`. Draft entries and their detail routes
are excluded from production.

`ejemplo-mdx` is an additional technical route in development. Validation
requires `fixture: true` entries to remain drafts, reserves `M.999` for that
fixture, and rejects the number on genuine references. Central collection
helpers keep it out of catalogue cards, counts, filters, homepage previews,
related entries and production. It is not a recommendation.

The annotations and commentary for all three anchors, including the El Modulor
reading page, are provisional editorial copy. They must be reviewed and
approved by Rodolfo before launch and do not contain fabricated quotations.

Every canonical reference, including `/mediateca/modulor`, is generated by
`src/pages/mediateca/[slug].astro`; there is no route-specific renderer. See
[WRITING_MEDIATECA.md](WRITING_MEDIATECA.md),
[templates/mediateca.md](templates/mediateca.md), and
[templates/mediateca-mdx.mdx](templates/mediateca-mdx.mdx).

## Yo profile

`src/content/site/yo.json` contains the complete editable `/yo` prototype:
hero labels, linked prose segments, portrait metadata, current context, five
timeline records, personal history, the pending editorial paragraph, and the
three closing links. The `profile` collection validates this file separately
from the minimal provisional-page collection.

The supplied hero, context, current-context, first timeline entry, history
paragraph, and closing-link labels are approved copy. Four timeline records are
explicit placeholders, and the additional personal-history paragraph remains
pending editorial content. Eloquent has no organization URL because none has
been verified. The placeholder case-study labels also have no URLs and render
as text rather than anchors.

The approved portrait lives at
`src/assets/images/retrato-rodolfo-miranda.jpg`. `YoPortrait.astro` imports this
local source and uses Astro's image pipeline to generate responsive AVIF and
WebP variants with a JPEG fallback, capped at the source's intrinsic 2267 ×
2267 dimensions.

For a future approved replacement, overwrite that repository asset with a
sanitized local image, preserve the outer `figure`, field dimensions, border
and caption, and update the `alt` and annotation in `src/content/site/yo.json`
when the visible subject or provenance changes. Do not substitute a remote URL,
upscale beyond the replacement source, or commit EXIF/GPS metadata.

To add a genuine case-study link, set both `caseStudyLabel` and an internal
`caseStudyUrl` on a non-placeholder timeline entry. Validation rejects URLs on
placeholder entries and rejects a case-study URL without visible link text.

## Portafolio

Markdown entries model a deliberately curated project rather than a complete
chronological archive. Fields include title, summary, year, role, one or more
disciplines, optional client or organization, project status, `P.###` archive
number, tags, optional cover image and required companion alternative text, update
date, structured gallery, verified project links, related Notas and Mediateca
references, display order, placeholder and draft flags, language, optional
translation key, and the case-study body.

Portfolio has no `featured` field or visual state. Every selected project uses
the same index proportions, hierarchy and interaction. `displayOrder` is the
only ordering mechanism for both the index and previous/next navigation. Tags
feed the index filter and remain separate from the longer discipline metadata.
The text search matches project titles, summaries, organizations, disciplines
and tags without changing route generation or editorial order.

### Publication boundary

- Development includes three equal placeholders (`proyecto-seleccionado-01` through
  `proyecto-seleccionado-03`) so cards and detail routes can be reviewed.
- All three placeholders use `draft: true` and `placeholder: true`. Their copy,
  organizations, roles and disciplines are visibly pending, and they contain no
  external project URLs.
- A placeholder must be a draft and cannot contain project links. Schema
  validation rejects either violation.
- Production excludes every draft and placeholder card and detail route.
- A genuine non-draft project requires `coverImage` and `coverAlt` and must use
  `placeholder: false`.
- `ejemplo-mdx` is a separate technical fixture. It must remain a draft, uses
  reserved number `P.999`, and is excluded centrally from the index, search,
  filters, counts, connections, previous/next navigation and production.

When no genuine project is published, the production index remains valid and
shows “La selección de proyectos está en preparación.”

### Adding a genuine project

Copy `docs/templates/portafolio.md` or `portafolio-mdx.mdx` into
`src/content/portafolio/`. Give it a unique slug, unique `P.###` archive number and
`displayOrder`, replace every pending value with approved information, set
`placeholder: false`, and keep it as `draft: true` until editorial and visual
review is complete. Publish only by changing `draft` to `false` after adding an
approved cover and alternative text.

Project images should live under `src/assets/images/portafolio/<slug>/` and be
referenced as local assets. A cover requires `coverAlt` that describes the
visible image rather than repeating the project title. Do not use remote images,
stock imagery, generic mockups or unverified client material.

Gallery entries are objects with:

- `image`: the local image asset;
- `alt`: required descriptive alternative text;
- `caption`: optional editorial caption.

Gallery figures render after the Markdown body in the reading flow. Authors may
also use semantic Markdown/HTML figures within the body when an image belongs to
a specific section; those figures require alternative text and should include a
caption when the surrounding prose does not provide enough context.
An inline `ImageCarousel` in the MDX body is an additional narrative component;
it does not replace `coverImage`, convert `gallery`, or change their rendering.

Markdown H2 sections form the primary case-study sequence (for example,
Contexto, El reto, Enfoque, Lo que construimos, and Resultado y aprendizajes).
H3 is reserved for genuine subsections within an H2. Paragraphs, ordered and
unordered lists, links and editorial figures inherit the shared reading
typography.

`relatedNotes` and `relatedMedia` contain content-entry IDs and render only when
populated. `projectLinks` contains labeled, verified external URLs. Empty groups
are omitted for genuine projects; a connection-free development placeholder
shows one restrained pending state instead.

See [WRITING_PORTFOLIO.md](WRITING_PORTFOLIO.md),
[templates/portafolio.md](templates/portafolio.md), and
[templates/portafolio-mdx.mdx](templates/portafolio-mdx.mdx) for the complete
workflow. Templates omit the internal `fixture` field.

## Experimentos

Markdown entries model a current or recently released experiment: title, short
description, status (`en-curso`, `publicado`, or `pausado`), start,
release, and update dates, optional GitHub and live URLs, tags, featured and
draft flags, display order, language, and optional translation key.

The draft `_template.md` entry documents the editable shape without generating
a public experiment in development or production. The index route is semantic
scaffolding only; card design and outbound-link behavior are deferred.

## Site copy

Homepage and Ahora copy use validated JSON collections. Yo uses its own
validated JSON profile collection. These files are intentionally editable
without changing Astro components.

`homepage.json` requires exactly four archive panels with the validated kinds
`yo`, `notas`, `mediateca`, and `portafolio`. Contacto is no longer a homepage
panel or a content route. Static panel copy remains in JSON, while
`src/pages/index.astro` derives these values from published Spanish entries at
build time:

- Notas: latest `publishedAt` date and total published-note count;
- Mediateca: total published-reference count;
- Portafolio: total published-project count.

The derived statistics use `getVisibleSpanishNotes(false)`,
`getVisibleSpanishMedia(false)`, and `getVisibleSpanishProjects(false)`. Drafts
and `fixture: true` entries therefore never contribute to homepage publication
statistics.
