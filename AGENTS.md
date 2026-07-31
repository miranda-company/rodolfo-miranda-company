# rodolfo-miranda-company

Static Astro website for Rodolfo Miranda Company.

## Development Server

Use `pnpm run dev`. Astro listens on `$PORT` (default 8443).

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/pages/` - Astro routes
- `src/components/` - Reusable Astro components
- `src/layouts/` - Shared page layouts
- `src/styles/global.css` - Design tokens and global custom CSS
- `src/content.config.ts` - Validated content collection schemas
- `src/content/` - Markdown and JSON content
- `astro.config.ts` - Static-output and local-server configuration
- `package.json` - Astro development, check, build, preview, and formatting scripts
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: Astro with static HTML output and minimal framework-free JavaScript
- Styling: Custom CSS
- Build tooling: Astro and strict TypeScript
- Formatting: oxfmt

## Styling

Keep global design tokens and reusable rules in `src/styles/global.css`. Fonts
are bundled locally through Fontsource imports in the base layout.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Keep Astro component frontmatter strictly typed.
- Run `pnpm run check` and `pnpm run build` before handoff.
