---
description: DaisyUI + Tailwind conventions for this project — the "bluebird" theme, its color/type/shadow tokens, and which DaisyUI component classes are already in use. Use when writing or reviewing markup that touches styling, buttons, badges, cards, navs, accordions, dropdowns, or any other DaisyUI component class in this Astro codebase.
---

# DaisyUI in this codebase

Tailwind v4 (`@tailwindcss/vite`) + DaisyUI v5, configured entirely in
[src/styles/app.css](../../../src/styles/app.css) — there is no `tailwind.config.js`. Every theme
token lives in that one file. Never introduce a second source of truth (no inline `<style>` hex
colors, no arbitrary `text-[#...]` values for anything the theme already names).

## The `bluebird` theme

Defined via `@plugin "daisyui/theme"` in app.css. Semantic DaisyUI color roles — always reach for
these classes (`bg-primary`, `text-base-content`, etc.) instead of a raw hex:

| Role | Hex | Notes |
|---|---|---|
| `primary` / `accent-content` etc. base | `#1F4E79` | Deep navy — the core brand color |
| `accent` | `#284A6C` | Slightly darker navy variant |
| `secondary` | `#6E9BC2` | Light blue — buttons/borders/backgrounds only |
| `base-100` | `#FAF7F2` | Cream page background |
| `base-200` | `#F1EBE0` | Slightly darker cream (section backgrounds) |
| `base-300` | `#E7DFCF` | Darkest cream tier (borders, dividers) |
| `neutral` | `#26221F` | Near-black text/ink |

**Important:** `secondary` (`#6E9BC2`) fails WCAG AA (~2.9:1) as *text* on a `primary` navy
background. For that one case use the `--color-secondary-accessible` token
(`text-secondary-accessible`, `#A3C8E3`) — see the comment in app.css. Never use raw `secondary` for
text-on-navy.

## Custom tokens layered on top (still in `@theme`, not DaisyUI-native)

- `--color-navy-hover` / `--color-navy-press` — hover/active states for the primary button (see
  `Button.astro`'s `primary` variant).
- `--color-navy-tint`, `--color-light-blue-tint` — soft background tints (e.g. the `upcoming` status
  badge).
- `--color-line` / `--color-line-strong` — the two border colors used everywhere (`border-line`).
- `--radius-md` (8px) / `--radius-lg` (14px) — override Tailwind's defaults; use `rounded-md`/
  `rounded-lg` rather than an arbitrary radius.
- `--shadow-card` / `--shadow-raised` — use `shadow-card` / `shadow-raised` utility classes instead
  of DaisyUI's default `shadow`/`shadow-lg` for any card, panel, or raised element.
- Named type scale — `text-eyebrow`, `text-lead`, `text-caption`, `text-callout`, `text-feature`,
  `text-card-title`, `text-stat`, `text-display-sm`, `text-display`, `text-display-lg`, `text-tag`,
  `text-fineprint`. These replaced one-off arbitrary `text-[...]` values; use the named token that
  matches the role instead of inventing a new arbitrary size.
- `font-heading` (Fraunces, serif) / `font-body` (Inter, sans) — every heading uses `font-heading`,
  every paragraph/UI text uses `font-body`. Don't fall back to Tailwind's default font stack.

## DaisyUI component classes actually in use

Stick to this existing vocabulary rather than reaching for a DaisyUI component the site doesn't use
yet (e.g. there's no `modal`, `alert`, `stat`, `steps`, `carousel`, `rating`, or `toast` anywhere —
don't introduce one without checking whether an existing pattern already solves the problem):

- **`btn`** — always via [Button.astro](../../../src/components/Button.astro), which maps a
  `variant` (`primary` / `secondary` / `ghost` / `inverse`) + `size` (`sm` / `md` / `lg`) prop to the
  right `btn-*` combo (`btn-primary`, `btn-outline btn-primary`, `btn-ghost`, `btn-circle`,
  `btn-square`). Don't hand-write raw `btn` class strings in a new component — extend `Button.astro`
  instead so the hover/press states stay centralized.
- **`collapse` / `collapse-arrow` / `collapse-title` / `collapse-content`** — the FAQ-accordion
  pattern (`auditions.astro`, `contact.astro`, `KnowBeforeYouGo.astro`). Always paired with
  `border-line bg-base-100 rounded-lg border` on the collapse wrapper.
- **`dropdown` / `dropdown-content` / `dropdown-end`** — used for the nav's mobile menu and
  `AddToCalendar.astro`. Built with a native `<details>`/`<summary>` element (see the
  `[&::-webkit-details-marker]:hidden` class), not JS state.
- **`menu` / `menu-title` / `menu-sm`** — nav link lists (`NavBar.astro`, `TocSidebar.astro`).
- **`navbar` / `navbar-start` / `navbar-end`** — the one nav layout, in `NavBar.astro` only.
- **`link` / `link-hover` / `link-primary`** — inline text links; plain `link` for muted,
  `link-primary` when it should read as a call-to-action.
- **`countdown`** — `CountdownBanner.astro` only, paired with `font-mono`.
- No DaisyUI `badge` component — `Badge.astro` builds status pills (current/upcoming/past show
  state) from scratch with `bg-*`/`text-*` tokens instead, since DaisyUI's default badge didn't match
  the pill shape needed. Follow that pattern (raw utility classes + a small typed component) for any
  new status-indicator need rather than reaching for `badge`.
- The poster/photo lightbox (`PosterLightbox.astro`, `dialog[data-lightbox]` in app.css) is a native
  `<dialog>` element with hand-rolled styling, not DaisyUI's `modal`. Keep it that way — don't
  refactor it to `modal` classes.

## Motion & accessibility rules baked into app.css

- All hover/reveal animation touches only `opacity`/`transform` (never layout properties) and is
  neutralized wholesale by the single `prefers-reduced-motion: reduce` block at the bottom of
  app.css. Any new animation must follow the same pattern — don't add a one-off transition that
  ignores reduced-motion.
- `a:focus-visible, button:focus-visible, summary:focus-visible` get a global 2px `outline` in
  `primary`. Don't override focus styling per-component unless there's a real reason to.
- `.hover-lift` is the shared card/poster/gallery hover treatment (`translateY(-4px)` +
  `shadow-raised`) — reuse it instead of writing a new hover transform.

## When adding a new UI element

1. Check the table/list above first — there is very likely an existing component (`Button`, `Badge`,
   `Divider`, `SectionHeading`, `InfoRow`, `PersonCard`, `EventCard`, `ShowCard`) or utility class
   that already does this.
2. Reach for DaisyUI semantic color classes and the named type-scale/radius/shadow tokens before any
   arbitrary Tailwind value.
3. If a genuinely new DaisyUI component class is needed (e.g. `stat`, `alert`), confirm it renders
   correctly against the `bluebird` theme (light color-scheme, cream base) before committing — some
   DaisyUI components assume a `dark` scheme's contrast defaults.
