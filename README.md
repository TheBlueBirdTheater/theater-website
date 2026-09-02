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

Requires Node >= 22.12.0. New to this project or this stack? See
[docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) for a plain-language walkthrough.

## Project shape

- **Pages** (`src/pages/*`) are the actual routes — one file per URL (or, for dynamic routes like
  a show's detail page, one file that generates many URLs from a content collection).
- **Layouts** (`src/layouts/*`) wrap pages with shared chrome: `BaseLayout` (the HTML shell + SEO)
  underlies both `DefaultLayout` (nav/main/footer, most pages) and `LegalLayout` (adds a
  table-of-contents sidebar, for long policy pages).
- **Content collections** (`src/content/*`) hold every piece of editable copy — show info, FAQs,
  team bios, and so on — as schema-validated YAML/MDX, never hardcoded in a page or component.
- **Components** (`src/components/*`) are the reusable building blocks (cards, buttons, badges)
  that pages and layouts assemble into a page.

## Editing content

All marketing copy lives in Astro content collections under `src/content/*` (schemas defined in
`src/content.config.ts`), never hardcoded in components or pages. Edit by hand (the YAML/MDX files
under `src/content/`) or through the Decap CMS admin UI at `/admin` — see
[docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md) for the full guide.

## Documentation

- [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) — running the site locally, the pages/
  layouts/collections/components mental model, path aliases
- [docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md) — editing copy by hand or via Decap CMS,
  placeholder content, theming pointers
- [docs/DEPLOYING.md](docs/DEPLOYING.md) — how Netlify builds and deploys this site
- [CLAUDE.md](CLAUDE.md) / [AGENTS.md](AGENTS.md) — architecture and conventions for AI coding
  agents working in this repo (AGENTS.md is canonical)
- [.claude/skills/branding](.claude/skills/branding/SKILL.md) — brand names, voice & tone, and
  what's still placeholder
- [.claude/skills/daisyui](.claude/skills/daisyui/SKILL.md) — the `bluebird` theme's tokens and
  DaisyUI component conventions
- [.claude/skills/ludus-docs](.claude/skills/ludus-docs/SKILL.md) — reference docs for Ludus, the
  ticketing/box-office platform show and event ticket links point to
- [prompts/](prompts/) — self-contained task briefs meant to be handed to an AI coding agent
