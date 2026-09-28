# Typography system

This document defines the semantic typography contract for Rodolfo Miranda Company. Choose heading levels from the document structure first; their appearance comes from the global tokens and selectors in `src/styles/global.css`.

## Font responsibilities

- **Helvetica Neue**, falling back to Helvetica, Arial and any sans-serif font:
  headings, body copy, controls, metadata and interface text.
- **Georgia**, falling back to Times New Roman and any serif font: editorial
  emphasis inside headings. Use an `em` element for this treatment.

The project uses system fonts and does not require bundled font files or remote
font requests. The semantic `--font-mono` token is retained for technical-label
roles, but it intentionally resolves to the same Helvetica stack.

## Heading scale

| Level | Semantic role                                   | Token       | Value                               | Line height | Letter spacing |
| ----- | ----------------------------------------------- | ----------- | ----------------------------------- | ----------: | -------------: |
| H1    | Page title                                      | `--text-h1` | `clamp(2.75rem, 5.2vw, 5.75rem)`    |         `1` |      `-0.03em` |
| H2    | Primary page section or top-level content card  | `--text-h2` | `clamp(2.125rem, 3vw, 3.25rem)`     |         `1` |      `-0.03em` |
| H3    | Subsection or content item nested beneath an H2 | `--text-h3` | `clamp(1.625rem, 2.15vw, 2.25rem)`  |      `1.05` |      `-0.02em` |
| H4    | Nested item                                     | `--text-h4` | `clamp(1.375rem, 1.65vw, 1.75rem)`  |       `1.1` |      `-0.02em` |
| H5    | Minor nested heading                            | `--text-h5` | `clamp(1.125rem, 1.35vw, 1.375rem)` |      `1.15` |     `-0.015em` |
| H6    | Deepest meaningful heading                      | `--text-h6` | `clamp(1rem, 1.1vw, 1.125rem)`      |       `1.2` |     `-0.015em` |

Every level uses the main Helvetica stack at weight 500. An emphasized fragment
inside any heading switches to the Georgia stack, stays weight 400 and becomes
italic. At any one viewport, rendered instances of a heading level use the
same computed font family, size, weight, line height and letter spacing.

Component selectors may change only layout concerns such as margin, width,
color, position and wrapping. A component variant must never override a
heading's font family, size, weight, line height or letter spacing, and
component heading selectors must not use the `font` shorthand.

The fluid scale is shared across breakpoints. H1 reaches its `44px` minimum on
compact screens and can grow to `92px` on wide screens. Detail-page titles
preserve normal word boundaries, disable automatic hyphenation so
mixed-language titles do not split at unnatural points, and keep
`overflow-wrap: break-word` only as a last-resort safeguard for a word wider
than its container.

## Choosing a heading level

1. H1 names the page. Each page has one H1.
2. H2 starts a primary section under the page title or names a top-level content card.
3. H3 names a subsection or item belonging to an H2 section.
4. H4 through H6 are reserved for genuinely deeper content nesting.
5. Never select a heading level to obtain a particular size.
6. Never use H4 through H6 for small technical labels. Use a non-heading element and the mono role instead.
7. Do not skip a level when the content has an intermediate parent section.

## Non-heading roles

The shared roles below are tokens in `src/styles/global.css`. Elements may have different margins, widths and colors while retaining the same typographic role.

| Role                | Font            | Size                                         | Weight | Line height | Typical use                                                           |
| ------------------- | --------------- | -------------------------------------------- | -----: | ----------- | --------------------------------------------------------------------- |
| Introduction / lead | Helvetica stack | `clamp(18px, 2vw, 22px)`; `18px` below 768px |  `300` | `1.32`      | Archive introductions, article summaries and editorial leads          |
| Standard body       | Helvetica stack | `18px`                                       | normal | `1.62`      | Biography, note prose, reference commentary and provisional body copy |
| Small / supporting  | Helvetica stack | `13px`                                       | normal | `1.4`       | Section explanations and supporting descriptions                      |
| Metadata            | Helvetica stack | `10px`                                       | normal | `1.4`       | Shared hero and record metadata                                       |
| Kicker              | Helvetica stack | `12px`                                       | normal | normal      | Page eyebrow above an archive-index H1                                |

The shared `.intro-lead` utility applies the Introduction / lead role. Use it
alongside a route-specific layout hook—for example
`class="intro-lead home-intro__description"`—so page CSS controls only width
and spacing. The homepage hero, archive introductions, standalone page
introductions and editorial detail summaries all use this common treatment.

The shared `.kicker` utility in `src/styles/global.css` is the source of truth for page kickers. It sets the metadata family, `12px` size, `0.045em` letter spacing and `17px` bottom margin. Use it alongside the route-specific hook when one is useful, for example `class="kicker notes-kicker"`, `class="kicker media-kicker"`, `class="kicker portfolio-kicker"` or `class="kicker yo-kicker"`. The route-specific classes should not duplicate or override the shared typography and spacing unless a documented design requirement calls for a genuine exception.

Dense card copy, display positioning statements, bylines and micro-annotations are distinct roles because their available space or purpose differs. They must have dedicated selectors and must not be implemented with semantic heading elements.

## Current page examples

### Homepage

- H1: the sans-serif “Rodolfo Miranda,” fragment followed by the Georgia italic
  “estrategia digital” positioning statement.
- H2: “Portafolio” and “Acceso rápido”. Both inherit the shared global H2
  typography without a component-level override.
- H3 beneath “Acceso rápido”: “Notas”, “Anaquel” and “Proyectos”.
- Archive numbers and dates are metadata non-headings.

### Yo

- H1: “Rodolfo Miranda Company”.
- H2: “Sobre el trabajo”, “En este momento”, “Trayectoria” and “¿Cómo llegué hasta aquí?”.
- H3 beneath “Trayectoria”: each career role.
- Organization names are subordinate paragraphs, not part of the H3.

### Notas

- Index H1: “Notas”.
- Each garden card title is H2, including featured, standard, compact and visual variants.
- Detail H1: the note title.
- Markdown article sections and “Conexiones” are H2. Future subsections within those sections use H3.

### Mediateca

- Index H1: “Mediateca”.
- H2: “Anaquel” and “Repositorio”.
- H3: each shelf title and catalogue-card title beneath its H2 section.
- Detail H1: the reference title.
- H2: commentary, context, recurring ideas, editorial content and the parent “Conexiones” area.
- H3 beneath “Conexiones”: populated groups such as “Relaciones mutuas”, “Enlaces directos”,
  “Menciones” and “Otros enlaces”.

### Portafolio

- Index H1: “Portafolio”.
- Index H2: the visually hidden “Buscar y filtrar proyectos” section label.
- Index H3: each project title within that selection.
- Detail H1: the project title.
- Detail H2: Markdown case-study sections and the inline parent “Conexiones” area.
- Detail H3: genuine Markdown subsections and populated connection groups.
- Archive numbers, years, statuses, roles and dates remain metadata non-headings.
- Portfolio CSS controls layout and spacing only; it does not override the
  global family, size, weight, line height or letter spacing of headings.

### Standalone routes

- Colofón, Registro and the 404 page each use one H1 for the route title.
- Sections begin at H2 and nest in order. Kickers, counts and status labels
  remain non-heading metadata text.

## Review checklist

- Confirm the page has exactly one H1.
- Read the complete H1–H6 outline without considering visual size.
- Confirm that each H3 has a meaningful H2 parent and that no level is skipped.
- Compare the computed five-property typography tuple for every rendered H1, H2 and H3 at the target viewport.
- Confirm `em` fragments use Georgia italic while the surrounding heading uses
  the Helvetica stack.
- Reject component variants that alter heading typography, even when the result looks visually convenient.
