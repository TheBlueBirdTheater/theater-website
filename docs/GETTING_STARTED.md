# Getting started

This guide is for someone new to this project *and* new to its stack (Astro, Tailwind + DaisyUI,
Decap CMS, Netlify) — no prior familiarity with any of them is assumed.

## Running the site locally

You'll need [Node.js](https://nodejs.org) 22.12.0 or newer. Then, from the repo root:

```bash
npm install
npm run dev
```

This starts a local dev server (Astro prints the URL, normally `http://localhost:4321`) and
rebuilds the page you're viewing whenever you save a file. Stop it the normal way — `Ctrl+C` in
the terminal it's running in.

**This is different from the `astro dev --background` convention you may see mentioned in
[AGENTS.md](../AGENTS.md).** That's a separate convention for AI coding agents working in this
repo — it runs the dev server detached, so an agent can keep working in the same terminal, and is
managed with `astro dev stop` / `astro dev status` / `astro dev logs`. As a human contributor, you
don't need any of that — just `npm run dev` in a terminal you leave open.

Other useful commands:

```bash
npm run build     # production build, output to dist/
npm run preview   # serve that production build locally, to sanity-check it before deploying
npm run cms:local # run Decap CMS's local auth proxy (see docs/CONTENT_EDITING.md)
```

## How the site is put together

Four kinds of files make up almost everything here, and it helps to know which is which before
you go looking for something:

- **Pages** (`src/pages/*`) are the actual routes people visit. Most map one file to one URL
  (`src/pages/donate.astro` → `/donate/`). A few are *dynamic routes* that generate many URLs from
  one file — `src/pages/shows/[slug].astro` generates a page for every entry in the `shows`
  content collection (e.g. `/shows/steel-magnolias/`), rather than one file per show.
- **Layouts** (`src/layouts/*`) wrap a page's content with the chrome every page shares. There are
  three: `BaseLayout.astro` is the outermost shell — it sets up the `<html>` document, page
  `<title>`/meta tags via `SEO.astro`, and the DaisyUI `bluebird` theme. Every page goes through
  it, but almost always indirectly, via one of:
  - `DefaultLayout.astro` — nav bar + main content area + footer. What most pages use.
  - `LegalLayout.astro` — the same nav/footer, plus a table-of-contents sidebar and "back to top"
    button, built for long single-topic pages like the privacy policy or terms of service.
- **Content collections** (`src/content/*`) hold the actual copy — show titles and dates, FAQ
  answers, team bios, and so on — as structured YAML (or MDX for longer prose), validated against
  a schema in `src/content.config.ts`. Pages read from these instead of having text typed directly
  into the page file. See [docs/CONTENT_EDITING.md](CONTENT_EDITING.md) for how to actually edit
  this content.
- **Components** (`src/components/*`) are the reusable pieces — buttons, cards, badges, the nav
  bar itself — that pages and layouts assemble to build a page.

### A worked example: a show's detail page

Tracing one request end to end: visiting `/shows/steel-magnolias/` loads
`src/pages/shows/[slug].astro`. That page:

1. Is wrapped in `DefaultLayout` (nav + main + footer).
2. Looks up the matching entry (`steel-magnolias`) in the `shows` content collection — its title,
   dates, cast list, synopsis, and so on all come from
   `src/content/shows/steel-magnolias.yaml`, not from anything typed into the page file.
3. Renders that data using components like `Badge`, `Button`, `InfoRow`, and `CountdownBanner` —
   each one focused on a single small piece of UI, composed together by the page.

Any other page (or a brand new page you add) follows the same three-layer pattern: pick a layout,
pull data from a content collection, render it with components.

## Path aliases

TypeScript path aliases (defined in `tsconfig.json`) let imports skip relative `../../..` chains:

| Alias | Points to |
|---|---|
| `@components/*` | `src/components/*` |
| `@assets/*` | `src/assets/*` |
| `@layouts/*` | `src/layouts/*` |
| `@data/*` | `src/data/*` |
| `@utils/*` | `src/utils/*` |

## Handing off work to an AI coding agent

The [prompts/](../prompts/) directory holds self-contained task briefs, written to be pasted
as-is into a fresh AI coding agent session (Claude Code or similar) — each one front-loads the
repo conventions relevant to that task so the agent doesn't need this document read to it first.
Look there for examples of how larger multi-step changes have been scoped and handed off in this
project.
