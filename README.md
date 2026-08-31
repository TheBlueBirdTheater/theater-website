# Blue Bird Theatre / Orangeburg Part-Time Players

Website for the Blue Bird Theatre (Orangeburg, SC) and its resident troupe, the Orangeburg
Part-Time Players (OPTP) — an all-volunteer community theater founded in 1981. Astro static site,
content editable via Decap CMS.

## Stack

- [Astro 7](https://docs.astro.build), static output, sitemap + MDX integrations
- Tailwind v4 (`@tailwindcss/vite`) + [DaisyUI v5](https://daisyui.com), theme `bluebird` — all
  config lives in `src/styles/app.css`, there's no `tailwind.config.js`
- TypeScript, with path aliases in `tsconfig.json`: `@components/*`, `@assets/*`, `@layouts/*`,
  `@data/*`, `@utils/*`
- [Decap CMS](https://decapcms.org) at `/admin` (config: `public/admin/config.yml`), GitHub OAuth
  via Netlify Functions (`netlify/functions/`)
- Deployed on Netlify (`netlify.toml`)

## Getting started

```bash
npm install
npm run dev       # astro dev
npm run build     # astro build -> dist/
npm run preview   # preview the production build
npm run cms:local # decap-server, for local CMS auth
```

Requires Node >= 22.12.0.

## Editing content

All marketing copy lives in Astro content collections under `src/content/*` (schemas defined in
`src/content.config.ts`), never hardcoded in components or pages. Edit by hand (the YAML/MDX files
under `src/content/`) or through the Decap CMS admin UI at `/admin`.

## More

See [CLAUDE.md](CLAUDE.md) for architecture, conventions, and dev-server usage.
