# Editing content

All the copy on this site — show info, FAQs, team bios, donation tiers, the homepage hero text,
all of it — lives in **content collections**: structured YAML (and MDX for longer prose) files
under `src/content/*`, validated against schemas in `src/content.config.ts`. Nothing that counts
as marketing copy is ever typed directly into a page or component file, so there are exactly two
ways to change what visitors see, and they edit the same files.

## Option 1: the Decap CMS admin

Go to `/admin` on the site (or `/admin` on your local dev server) and log in. This is
[Decap CMS](https://decapcms.org) — a form-based editor generated from the same schemas in
`src/content.config.ts`, so the fields you see there match what's actually allowed. Changes go
through Decap's *editorial workflow*: a draft moves through Draft → Review → Ready before it's
published, so nothing goes live without a review step.

This is the friendlier option if you're not comfortable editing YAML by hand, or if you want that
review step.

## Option 2: hand-editing the files

Every collection's files live under `src/content/<collection-name>/`. Open the relevant YAML (or
MDX) file in any text editor, change the field, save, commit. `npm run dev` will pick up the
change immediately if you're running it locally. This is faster for small tweaks once you're
comfortable with the file structure, and it's what an AI coding agent will typically do directly.

Whichever path you use, `src/content.config.ts` is the source of truth for what fields exist and
what they're allowed to contain — check it if you're unsure whether a field is required, or what
shape it expects.

## Placeholder content — and why some of it will reject your build

This project follows a strict rule: **never invent real show titles, dates, addresses, or contact
details.** If the real value isn't known yet, a placeholder token is used instead (things like
`[SHOW TITLE]` or `555-000-0000`) so it's obvious at a glance that the value isn't final.

This isn't just a convention here — it's enforced automatically. `src/content.config.ts` rejects
any content field containing an unresolved bracketed placeholder (like `[SHOW TITLE]`) at build
time, so the dev server or a production build will fail loudly rather than let placeholder text
ship by accident. If you hit a build error mentioning a placeholder pattern, that's this check
doing its job — replace the bracketed token with the real value (or leave it as-is if you don't
have the real value yet and aren't trying to publish this content).

For what's currently real versus still placeholder in this project specifically (the production
domain, the donation platform link, the legal pages, photography, and so on), see
[.claude/skills/branding](../.claude/skills/branding/SKILL.md)'s "What's real vs. still
placeholder" section — that's the one place this list is kept up to date, rather than repeated
(and inevitably going stale) in multiple docs.

## Ticket links (Ludus)

Show and event ticket links point to [Ludus](https://www.ludus.com), a third-party ticketing/
box-office platform. A show or event can carry its own `ludusShowId` field for a direct link to
its Ludus page; without one, visitors land on the site's own `/tickets/` page instead, which in
turn reads a general Ludus link from the `siteSettings` collection — so a show never ends up with
a dead ticket link just because it doesn't have its own Ludus ID yet. For how Ludus itself works
(not this project's specific integration, but the platform's own features and workflows), see
[.claude/skills/ludus-docs](../.claude/skills/ludus-docs/SKILL.md).

## Theming and branding

Colors, fonts, and DaisyUI component conventions are documented separately rather than repeated
here:

- [.claude/skills/branding](../.claude/skills/branding/SKILL.md) — organization names (use these
  exactly, don't paraphrase), voice & tone for new copy, and the placeholder list above.
- [.claude/skills/daisyui](../.claude/skills/daisyui/SKILL.md) — the `bluebird` DaisyUI theme's
  color/type/shadow tokens and which component classes are already in use.
