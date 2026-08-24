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
title, and never accepts arbitrary iframe URLs or scripts. `ContentImage.astro`
provides semantic, captioned standalone images from locally imported Astro image
metadata. `ImageCarousel.astro` accepts the same kind of local assets and provides
the shared image-carousel behavior described below. Future providers or component types
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
image objects fail rendering with a Spanish error. Each slide uses its single
imported source file and preserves that file's intrinsic dimensions.

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
images and use the same single-source policy. Normal static images work in `.md`;
`ImageCarousel` requires `.mdx`. Authors should prepare assets at their final useful
dimensions, keep them below 200 KB when practical, and strip unnecessary personal,
EXIF/GPS, and location metadata before committing image files.

`src/components/content/ContentImage.astro` is the collection-neutral component
for one inline editorial image. Its typed API is `src: ImageMetadata`, `alt: string`,
and `caption?: string`. It rejects remote or malformed sources, requires meaningful
non-empty alternative text, preserves intrinsic dimensions, and delegates single-image
metadata validation to Astro without generating a `srcset` or transformed copy. It renders a semantic figure and uses the same shared
mono caption treatment as videos and carousel slides. A captioned static image therefore
requires `.mdx`; normal uncaptioned Markdown images remain supported in `.md`.

## Mediateca

Markdown and MDX entries contain a title, author or creator, format, engagement
mode, editorial state, summary, personal commentary, reason for inclusion,
recurring ideas, optional publication year, catalogue status, archival number,
update date, optional canonical external URL and local cover image with required
alternative text and optional visible caption, tags,
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

When a Mediateca entry supplies `coverImage`, validation also requires
`coverAlt`; optional `coverCaption` appears below the cover on the detail page.
The caption provides context or credit and never replaces alternative text.

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

The five timeline records render as normal career history. Exactly one entry
must use `current: true`; completed historical roles use `current: false` and
`placeholder: false`. The additional personal-history paragraph remains pending
editorial content. A timeline entry may retain a pending case-study label without
a URL; verified case studies use both `caseStudyLabel` and `caseStudyUrl`.

The approved portrait lives at
`src/assets/images/retrato-rodolfo-miranda.jpg`. `YoPortrait.astro` imports this
local source and renders that single file at its intrinsic dimensions.

For a future approved replacement, overwrite that repository asset with a
sanitized local image, preserve the outer `figure`, field dimensions, border
and caption, and update the `alt` and annotation in `src/content/site/yo.json`
when the visible subject or provenance changes. Do not substitute a remote URL,
upscale beyond the replacement source, or commit EXIF/GPS metadata.

To add a genuine case-study link, set both `caseStudyLabel` and an internal
`caseStudyUrl` on a non-placeholder timeline entry. Validation rejects URLs on
placeholder entries, rejects a case-study URL without visible link text, and
prevents the current role from being marked as provisional.

## Portafolio

La referencia práctica y campo por campo está en
[PORTFOLIO_PROJECT_GUIDE.md](PORTFOLIO_PROJECT_GUIDE.md).

Markdown entries model a deliberately curated project rather than a complete
chronological archive. Fields include title, summary, start year (`year`), optional
end year (`endYear`), role, one or more
disciplines, optional client or organization, project status, `P.###` archive
number, tags, optional cover image, required companion alternative text, optional cover caption, update
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

- Development includes 14 ordinary projects: six published case studies and
  eight provisional placeholders.
- All eight placeholders use `draft: true` and `placeholder: true`. Their copy,
  organizations, roles and disciplines remain pending, and they contain no
  external project URLs.
- A placeholder must be a draft and cannot contain project links. Schema
  validation rejects either violation.
- Production excludes every draft and placeholder card and detail route. It
  currently generates `syra-coffee`, `bsc`, `minka-icm`, `cn-sant-andreu`,
  `modulab-barcelona`, and `eloquent`.
- A genuine non-draft project requires `coverImage` and `coverAlt` and must use
  `placeholder: false`.
- `ejemplo-mdx` is a separate technical fixture. It must remain a draft, uses
  reserved number `P.999`, and is excluded centrally from the index, search,
  filters, counts, connections, previous/next navigation and production.

When no genuine project is published, the production index remains valid and
shows “La selección de proyectos está en preparación.”

The six published projects currently use the ordered identifiers `P.001` to
`P.006` and matching `displayOrder` values. Several draft placeholders still
reuse identifiers or ordering values. Those fields must be made unique before a
placeholder becomes a genuine project. The schema validates the `P.###` shape
and individual field rules; uniqueness across entries is currently an editorial
requirement rather than a schema-enforced invariant.

`draft: false` controls route generation; it does not constitute editorial
approval by itself. Every published case still requires verified text, results,
rights, credits, links, alternative text, and captions before launch.

### Adding a genuine project

Copy `docs/templates/portafolio.md` or `portafolio-mdx.mdx` into
`src/content/portafolio/`. Give it a unique slug, unique `P.###` archive number and
`displayOrder`, replace every pending value with approved information, set
`placeholder: false`, and keep it as `draft: true` until editorial and visual
review is complete. Publish only by changing `draft` to `false` after adding an
approved cover and alternative text.

Project images should live under `src/assets/images/portafolio/<slug>/` and be
referenced as local assets. A cover requires `coverAlt` that describes the
visible image rather than repeating the project title. Optional `coverCaption`
renders below the detail-page cover for context or credits and is intentionally
omitted from compact index cards. Do not use remote images,
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

`relatedNotes` and `relatedMedia` contain validated content-entry IDs, and
`projectLinks` contains labeled, verified external URLs. Portafolio no longer
renders a right-hand connections rail, so these three relationship fields are
currently stored for future cross-linking but are not visible on project pages.

See [PORTFOLIO_PROJECT_GUIDE.md](PORTFOLIO_PROJECT_GUIDE.md),
[WRITING_PORTFOLIO.md](WRITING_PORTFOLIO.md),
[templates/portafolio.md](templates/portafolio.md), and
[templates/portafolio-mdx.mdx](templates/portafolio-mdx.mdx) for the complete
workflow. Templates omit the internal `fixture` field.

## Site copy

Homepage and Ahora copy use validated JSON collections. Yo uses its own
validated JSON profile collection. These files are intentionally editable
without changing Astro components.

`homepage.json` requires exactly one archive panel for each validated kind:
`yo`, `notas`, `mediateca`, and `portafolio`. Static titles, descriptions,
routes, images and accessible image descriptions remain in JSON. Static
metadata stays with Yo, Mediateca and Portafolio; Yo also keeps its static
reveal label. Collection-driven values are intentionally absent from JSON and
`src/pages/index.astro` derives them from published Spanish entries at build
time:

- Notas: latest `publishedAt` date and total published-note count;
- Mediateca: total published-reference count;
- Portafolio: total published-project count.

The Ahora section uses the most recently updated visible Portafolio entry for
its third preview. Development includes ordinary project drafts for design
review. Production uses only published projects and shows the validated empty
copy from `ahora.json` when none are available.

The derived statistics use `getVisibleSpanishNotes(false)`,
`getVisibleSpanishMedia(false)`, and `getVisibleSpanishProjects(false)`. Drafts
and `fixture: true` entries therefore never contribute to homepage publication
statistics.
