Show posters no longer live here. `posterImage` in the `shows` content collection
uses Astro's `image()` schema helper for automatic webp optimization, which
requires source files under `src/`, not `public/`. Real posters (and CMS
uploads) now go in `src/assets/images/shows/` — see `public/admin/config.yml`'s
`shows` collection `media_folder`. This directory is unused; safe to remove
once confirmed empty.
