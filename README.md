# Rodolfo Miranda Company

Production-oriented Astro rebuild of the Rodolfo Miranda Company website. The
homepage, Notas garden, Umbral reading template, Mediateca catalogue, and
Modulor reference template are design-approved visual baselines. All other
secondary routes remain provisional.

## Local development

Requirements: Node.js 22 and pnpm 10 (see `.mise.toml`).

```sh
pnpm install
pnpm run dev
```

The development server uses `http://localhost:8443/` by default and respects
the `PORT` environment variable.

Development shows the full 27-card Notas design fixture. Production builds
exclude draft notes and generate only the three non-draft design anchors.
Development also shows the complete 13-entry Mediateca catalogue; production
keeps only `modulor`, `cosas`, and `orden` and excludes every draft fixture and
its detail route.

## Verification

```sh
pnpm run check
pnpm run build
pnpm run preview
```

`pnpm run check` runs Astro's strict diagnostics. The production build always
runs the same check before generating the static site.

## Project notes

- Architecture: `docs/ARCHITECTURE.md`
- Content schemas: `docs/CONTENT_MODEL.md`
- Approved homepage baseline: `docs/figma-baseline/README.md`
- Approved Notas baseline: `docs/notas-baseline/README.md`
- Approved Mediateca baseline: `docs/mediateca-baseline/README.md`
- Pre-launch requirements: `docs/LAUNCH_CHECKLIST.md`
