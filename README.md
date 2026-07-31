# Rodolfo Miranda Company

Production-oriented Astro rebuild of the Rodolfo Miranda Company website. The
homepage, Notas garden, and Umbral reading template are design-approved visual
baselines; all other secondary routes remain provisional.

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
