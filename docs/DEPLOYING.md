# Deploying

This site is a static Astro build, deployed on [Netlify](https://netlify.com), configured entirely
by `netlify.toml` at the repo root. There's no separate deploy script to run by hand — Netlify
builds and deploys automatically.

## How a deploy happens

Netlify watches the repo. On a push, it runs the build defined in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

`npm run build` runs `astro build`, which generates the whole site as static files into `dist/`;
Netlify publishes that folder. The Node version is pinned in `netlify.toml`
(`NODE_VERSION = "22.12.0"`) so the build environment matches what's expected locally.

Netlify's normal preview-deploy behavior applies here too: pushes to branches other than the
production branch get their own preview URL, separate from the live site, so a change can be
reviewed before it reaches visitors.

## Decap CMS's login (Netlify Functions)

Editing content through `/admin` (see [docs/CONTENT_EDITING.md](CONTENT_EDITING.md)) needs to
authenticate against GitHub. That auth flow runs through small serverless functions in
`netlify/functions/`, pointed at by two redirects in `netlify.toml`:

```toml
[[redirects]]
  from = "/auth"
  to = "/.netlify/functions/auth"
  status = 200

[[redirects]]
  from = "/callback"
  to = "/.netlify/functions/callback"
  status = 200
```

These give Decap's OAuth flow short, stable URLs instead of the raw `/.netlify/functions/*` paths.
You don't need to touch these to edit content — they're just plumbing that makes `/admin` work.

## Redirects, generally

`netlify.toml` can also hold ordinary redirects, unrelated to Decap. For example:

```toml
[[redirects]]
  from = "/faq"
  to = "/contact/"
  status = 301
```

This one exists because the FAQ page was merged into `/contact/` — anyone with the old `/faq/`
link (or a search-engine result pointing at it) still lands somewhere real. If you rename or merge
a page, add a redirect like this rather than letting the old URL 404.

## Where the placeholder production domain comes from

You may notice `optp.org` referenced as this site's domain in a few places, even though that's not
a confirmed final domain yet (see the branding skill's placeholder list). That value comes from
`src/data/site-url.ts` — a single `SITE_URL` constant, shared by `astro.config.mjs` (Astro's
`site` config, used for things like the sitemap and canonical URLs) and `src/data/venue.ts`. On
Netlify, it's overridden automatically: Netlify sets a `URL` environment variable at build time to
the site's real domain (a custom domain if one is attached, otherwise the `*.netlify.app`
subdomain), and `SITE_URL` prefers that over the placeholder. So the placeholder only ever shows up
in a build that isn't running on Netlify (e.g. building locally) — it's not a sign that anything's
misconfigured on the live site.
