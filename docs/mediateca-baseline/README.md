# Mediateca design baseline

Mediateca replaces Biblioteca as the approved terminology and coded design.
Canonical routes use `/mediateca`; the legacy `/biblioteca` routes redirect to
their canonical equivalents. Hosting-level permanent redirects must be
configured and verified during deployment.

`Libros favoritos` contains the three prominent book references. `Otras
cosicas interesantes` uses compact horizontal catalogue cards. Their visible
consultation modes are `LEER`, `VER`, and `ESCUCHAR`, while content keeps the
internal enum values `read`, `watch`, and `listen`.

Status remains visible catalogue metadata but is not a filter. The available
catalogue filters are format and theme, and the existing sorting and result
count behavior form part of this baseline.

Development displays 13 references and their detail routes. Normal production
builds contain only `modulor`, `cosas`, and `orden`; the ten additional entries
are draft design fixtures and their routes are excluded. Commentary, summaries,
and reading copy for the three production anchors remain provisional until
Rodolfo approves them.

## Captures

- `mediateca-desktop-1440x900-full.png` — complete desktop catalogue.
- `mediateca-tablet-1024x768.png` — tablet layout.
- `mediateca-mobile-390x844-filters-collapsed.png` — collapsed mobile controls.
- `mediateca-mobile-390x844-filters-expanded.png` — expanded mobile controls.
- `mediateca-mobile-390x844-full.png` — complete mobile catalogue.
- `mediateca-desktop-1440x900-filter-videos-ver.png` — desktop Videos result and `VER` mode.
- `mediateca-desktop-1440x900-filter-podcasts-escuchar.png` — desktop Podcasts result and `ESCUCHAR` mode.
- `mediateca-mobile-390x844-filter-podcasts-escuchar.png` — mobile `ESCUCHAR` fit.
- `modulor-desktop-1440x900-full.png` — complete desktop reference page.
- `modulor-mobile-390x844.png` — first mobile reference viewport.
- `modulor-mobile-390x844-full.png` — complete mobile reference page.
- `homepage-desktop-1440x900-mediateca-card.png` — approved homepage Mediateca card.
- `homepage-mobile-390x844-mediateca-card-menu-full.png` — homepage Mediateca card and mobile-menu terminology.

All PNG files in this directory are stored through the repository's existing
Git LFS rules. Future visual changes to Mediateca, the Modulor reading template,
or the homepage terminology should be compared against these captures.
