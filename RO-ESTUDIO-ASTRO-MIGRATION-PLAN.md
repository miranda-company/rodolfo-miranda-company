# Rô Estudio: WordPress → Astro migration

## Summary

Rebuild the current site as a static Astro website on the existing host,
preserving its visual design and routes while removing WordPress, WPML, Slider
Revolution, and other runtime dependencies.

The migrated scope is:

- Spanish and English landing pages: `/` and `/en/`
- Six bilingual portfolio case studies, based on the current `/proyectos/*/`
  routes
- Spanish legal, privacy, and cookie pages, plus English equivalents
- Existing booking experience, Vimeo embeds, before/after components, and
  portfolio galleries
- Google Tag Manager and Google Analytics behind a custom bilingual consent
  banner

The current homepage and six portfolio projects will be treated as the source
of truth for content and visual behavior. [Homepage](https://roestudio.es/),
[example project](https://roestudio.es/proyectos/bubble/).

## Implementation changes

- Build Astro in static-output mode with content collections separated from all
  page and layout components:
  - locale-specific site copy and legal copy;
  - translated project entries with shared translation IDs;
  - local image metadata, gallery order, Vimeo URLs, and before/after-image
    pairs.
- Preserve the Spanish root URL structure and use `/en/` for English:
  - `/proyectos/[slug]/` and `/en/projects/[slug]/`;
  - keep existing Spanish legal URLs;
  - add English legal routes under `/en/`;
  - add permanent redirects for every legacy WordPress URL that changes.
- Recreate the existing header, footer, sections, typography, grids,
  responsive behavior, image treatments, and language selector from route
  screenshots—not from WordPress theme markup.
- Replace Slider Revolution with a dependency-free gallery component that
  visually matches it: drag/swipe, arrow controls, keyboard operation, focus
  states, touch support, image preloading, reduced-motion behavior, and a
  responsive mobile layout.
- Build reusable `VimeoEmbed`, `BeforeAfter`, `BookingEmbed`, and gallery
  components. Vimeo and the booking provider will use click-to-load
  placeholders so no third-party iframe loads until the visitor explicitly
  interacts.
- Self-host fonts and optimise imported images with Astro’s image pipeline;
  ship JavaScript only for gallery behavior, comparison controls, embeds,
  consent, and GTM loading.

## Consent, analytics, and legal

- Add a bilingual accessible cookie banner with **Accept analytics** and
  **Reject** actions, plus a persistent “Cookie settings” control in the
  footer.
- Store the decision in a first-party necessary consent record. Default all
  Google Consent Mode v2 values to denied before any Google tag loads.
- Load GTM and GA only after analytics consent. On acceptance, grant only
  `analytics_storage`; keep `ad_storage`, `ad_user_data`, and
  `ad_personalization` denied because the plan does not include advertising.
- Add a bilingual cookie policy documenting the consent record, GA/GTM, Vimeo,
  and booking provider. Legal, privacy, and cookie text must receive final
  business and legal review before launch.
- Implement and validate Google’s required default/update consent sequence
  before tags run, using Tag Assistant after deployment. [Google’s Consent
  Mode implementation guide](https://developers.google.com/tag-platform/security/guides/consent)

## SEO, AEO, and GEO

- Produce clean, fully static HTML with one H1 per page, semantic section
  headings, descriptive image alt text, and no indexable WordPress residue.
- Add localized titles, descriptions, canonical URLs, `hreflang` alternate
  links (`es`, `en`, and `x-default`), Open Graph/Twitter metadata,
  `robots.txt`, and a generated XML sitemap.
- Add schema only where supported by visible content: `ProfessionalService` or
  organization data, `WebSite`, `Service`, `BreadcrumbList`, and portfolio
  `CreativeWork` data. Use the existing verified business name, contact
  details, and Barcelona location.
- Strengthen answer-engine and generative-search readability with clear
  service summaries, concise project metadata, structured headings,
  author/credentials context, and internally linked project/service
  relationships. Do not add fabricated FAQs or unsupported claims.

## Delivery and verification

- Capture desktop and mobile visual baselines for every Spanish and English
  route before implementation.
- Build and preview locally; upload the static `dist` output manually to the
  existing host only after route, redirect, and asset verification.
- Preserve a complete WordPress/files/database backup until the static site is
  verified live.
- Before public-root cutover, verify:
  - every bilingual route, language alternate, legal page, gallery, Vimeo
    embed, booking CTA, and before/after control;
  - gallery drag, touch, keyboard, and reduced-motion behavior;
  - consent rejection blocks GTM/GA and acceptance enables GA;
  - responsive visual comparisons, Lighthouse performance,
    accessibility/keyboard checks, sitemap, canonical/hreflang tags,
    structured-data validation, and HTTP redirects.
- After launch, monitor Search Console indexing/coverage and GA events for two
  weeks; retain the WordPress backup for rollback during that period.

## Assumptions

- The current host can serve static files and preserve Apache-style redirects;
  no server-side WordPress functionality will remain.
- Content changes will be made by the delivery team through version-controlled
  Astro content files, not a browser CMS.
- All six project case studies and all legal/cookie content launch in both
  Spanish and English.
- The current booking provider remains in use, embedded only after a visitor
  chooses to load it.
- “Exact visual clone” means visual and interaction parity for the existing
  Slider Revolution galleries, implemented as custom lightweight Astro and
  TypeScript components rather than retaining Slider Revolution.
