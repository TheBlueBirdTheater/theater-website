// Netlify sets `URL` at build time to the site's primary domain (custom domain if one is
// attached, otherwise the *.netlify.app subdomain) — falls back to the optp.org placeholder
// (unconfirmed per BRAND/CONTACT spec) when building outside Netlify.
//
// Kept in its own module (no other imports) so both `astro.config.mjs` (evaluated before
// Astro's virtual modules like `astro:content` exist) and `src/data/venue.ts` (which does
// use `astro:content`) can share one definition instead of two independently-written copies.
export const SITE_URL = process.env.URL || 'https://optp.org';
