---
description: Brand identity reference for the Blue Bird Theatre / Orangeburg Part-Time Players site — org names, history, color/type system, logo assets, voice & tone, and which brand details are still placeholders. Use when writing marketing copy, designing new pages/components, building SEO metadata, or anywhere brand accuracy or consistency matters.
---

# Brand identity: Blue Bird Theatre / Orangeburg Part-Time Players

## Who's who (use the exact names — don't paraphrase)

Three distinct entities, all real, all in `src/data/venue.ts` as constants
(`THEATRE_NAME`, `OPTP_NAME`, `JR_OPTP_NAME`) — import those constants rather than retyping the
strings, so a future rename only has to happen in one place:

- **Blue Bird Theatre** (`THEATRE_NAME`) — the physical venue, downtown Orangeburg, SC. Two words,
  "Blue Bird" (not "Bluebird") — this is the modern org's spelling.
- **Orangeburg Part-Time Players / OPTP** (`OPTP_NAME`) — the resident all-volunteer community
  theater troupe, a 501(c)(3) nonprofit, founded 1981. They operate the theater and perform most
  (not all) shows there.
- **Junior Orangeburg Part-Time Players / Jr. OPTP** (`JR_OPTP_NAME`) — OPTP's youth program, stages
  its own summer season in the same building.

Note the deliberate historical distinction: the **original 1916 building** was spelled "**Bluebird**"
(one word) — see `history.yaml`. That spelling is correct *only* in historical/milestone copy about
the 1916 building. Everything referring to the current org/venue uses "**Blue Bird**" (two words).
Don't "fix" one to match the other.

## History (for About/milestone copy — `src/content/history/history.yaml`)

1916 original Bluebird Theatre opens → 1941 Edisto Theatre built on the same street → 1981 OPTP
founded (from a production of *God's Favorite*) → 1996 the Edisto building donated to OPTP, renamed
Blue Bird in honor of James Izlar Sims, Sr. → 1998 renovated Blue Bird reopens → 2019 lobby/auditorium
remodeled. 150+ OPTP productions since founding, ~50 more from Jr. OPTP.

## Visual identity

**Logo assets** — reuse these, don't regenerate: `src/assets/logo.png` (full lockup) and
`src/assets/logo-mark.svg` (icon-only mark, two navy `#1F4E79` curved paths forming a stylized bird).
Import via the `@assets/*` alias.

**Color system** — fully defined in [src/styles/app.css](../../../src/styles/app.css); see the
[[daisyui]] skill for the complete token table and usage rules. Core brand color is the deep navy
`#1F4E79` (`primary`). Base/background is a warm cream `#FAF7F2`, not white — this is a deliberate
warm, traditional-theater palette, not a stark modern one.

**Typography** — `Fraunces` (serif, `font-heading`) for headings/display type, `Inter` (sans,
`font-body`) for body/UI text. Both self-hosted as woff2 (`public/fonts/`). Fraunces gives the brand
its slightly classic, theatrical character — don't swap headings to a sans font.

## Voice & tone

Warm, community-rooted, volunteer/nonprofit register — not corporate. The org talks about itself as
neighbors serving neighbors, and leans on local pride. Representative lines already in the CMS
content (`src/content/valueProps/`, `history.yaml`):

- "Your support brings quality, live, family-friendly theater to Orangeburg, so neighbors do not
  have to travel to Columbia or Charleston to enjoy the performing arts."
- "...the all-volunteer community theater company that calls it home."

When writing new copy: family-friendly, volunteer-driven, small-city pride, emphasis on "local"
and "community" over polish or prestige. Avoid corporate-nonprofit boilerplate ("leveraging",
"stakeholders", "impact metrics") — this is a community theater run by neighbors, not an institution.

## What's real vs. still placeholder

Real, already confirmed (safe to use as-is, from `src/content/contact/contact.yaml`):
phone `803-536-5454`, email `optp1981@gmail.com`, address `1141 Russell Street, Orangeburg, SC 29115`,
mailing address `P.O. Box 1291, Orangeburg, SC 29116`, Facebook
`facebook.com/BluebirdtheatreOrangeburgSC`.

Still unconfirmed/placeholder — flagged with `TODO` or inline comments in the code, don't treat as
final and don't invent a replacement value yourself:

- **Production domain** `optp.org` — used as the `site` fallback in `astro.config.mjs` and
  `SITE_URL` in `venue.ts`, marked "unconfirmed per BRAND/CONTACT spec."
- **Donation platform URL** (`donate.astro`) — no third-party giving platform chosen yet.
- Privacy policy and terms pages are boilerplate pending legal review.
- Real photography — most images are stock/placeholder; `src/assets/README.md` notes the
  build-optimized asset pipeline is still effectively unused.

If a task involves any of the above, preserve the existing placeholder/TODO rather than inventing a
final value — this mirrors the root `CLAUDE.md` instruction to never invent real dates, addresses, or
contact details that haven't been established in `src/data/*` or `src/content/*`.

## Where brand copy actually lives

All editable marketing copy is in `src/content/*` collections (schemas in `src/content.config.ts`),
editable by hand or via the Decap CMS admin at `/admin`. Never hardcode brand copy directly in a
`.astro`/`.mdx` page or component — add or edit a content collection entry instead.
