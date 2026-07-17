## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Architecture

- Astro 7, static output. Tailwind v4 via `@tailwindcss/vite` (not the PostCSS plugin) + DaisyUI v5,
  configured entirely in `src/styles/app.css` (no `tailwind.config.js`). Default DaisyUI theme: `bluebird`.
- Path aliases (see tsconfig.json): `@components/*`, `@assets/*`, `@layouts/*`, `@data/*`, `@utils/*`.
- Layouts: `BaseLayout.astro` (html shell + SEO) -> `DefaultLayout.astro` (nav/main/footer) and
  `LegalLayout.astro` (nav/TOC sidebar/back-to-top/footer). Pages either import a layout directly as a
  component (`.astro` pages) or set it via `.mdx` frontmatter `layout: "@layouts/DefaultLayout.astro"`.
  Both patterns are normalized through `src/utils/frontmatter.ts#resolveFrontmatter` — do not bypass it
  when adding new layouts.
- SEO: single `src/components/SEO.astro`, exports the shared `PageFrontmatter` interface
  (`src/utils/types.ts`) every layout/page reuses.
- Structured data: `src/components/Schema.astro` + builder functions in `src/utils/schema.ts`
  (`buildBreadcrumbSchema`, `buildEventSchema`, `buildPerformingGroupSchema`). Inline per-page, not global.
- ALL editable copy lives in Astro content collections under `src/content/*` (schemas in
  `src/content.config.ts`) — never hardcode marketing copy directly in components or pages. Pages read
  collections via `getCollection()`/`getEntry()` from `astro:content` (see `src/utils/shows.ts` for the
  one non-trivial query helper, `getCurrentShow()`). Content is editable either by hand-editing the YAML
  under `src/content/*` or through the Decap CMS admin at `/admin` (entry point `src/pages/admin.html`,
  config at `public/admin/config.yml`) — see
  [Astro + Decap CMS](https://docs.astro.build/en/guides/cms/decap-cms/) before touching either.
- Icons: FontAwesome free-solid-svg-icons only, rendered via `src/components/Icon.astro` /
  `src/utils/icon.ts#iconToSvg` as inline SVG. No astro-icon, no sprite system, no React icon libs.
- Brand constants (colors, theme name) live in `src/styles/app.css`. Several values are still TODO/
  placeholder pending real brand/content decisions (secondary light-blue hex, production domain
  `optp.org`, self-hosted fonts in `public/fonts/`, real photography) — search for `TODO` before
  treating any of these as final.
- Never invent real show titles, dates, addresses, or contact details — use the placeholder tokens
  already established in `src/data/*.ts` (e.g. `[SHOW TITLE]`, `555-000-0000`).
- NPM/npx commands (`npm install`, `npm run build`, `npx astro check`, etc.) are run by the human
  operator in WSL, not executed directly by an agent in this repo — hand off exact commands and wait
  for their output rather than running them yourself.
