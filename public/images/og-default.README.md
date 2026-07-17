TODO: no real default OG/social share image has been supplied yet.
`src/components/SEO.astro` currently defaults `image` to `/images/og-default.jpg`,
which does not exist — add a 1200x630 JPG here once available. This is the fallback
image used on every page that doesn't set its own `image` prop (show detail pages
already override it with the show's poster).
