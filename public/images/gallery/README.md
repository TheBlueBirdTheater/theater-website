Gallery photos don't go here. `src/pages/gallery.astro` now reads from the
`gallery` content collection (`src/content/gallery/*.yaml`), which uses
Astro's `image()` schema helper for automatic webp optimization — that
requires source files under `src/`, not `public/`. Add photos via the CMS
`/admin` Gallery collection (uploads land in `src/assets/images/gallery/`) or
by hand-adding a yaml entry + file. This directory is unused; safe to remove
once confirmed empty.
