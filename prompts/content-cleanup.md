# Prompt: Website content cleanup

Copy everything below the line into Claude Code.

---

Plan a cleanup pass over the site's marketing copy — everything under `src/content/*` (schemas in
`src/content.config.ts`), plus any copy that slipped into components/pages despite the
"copy lives in content collections" rule. Read CLAUDE.md first and follow its conventions: don't
invent real show titles, dates, addresses, or contact details — use the placeholder tokens already
established in `src/data/*.ts` (`[SHOW TITLE]`, `555-000-0000`, etc.); keep the Decap CMS config
(`public/admin/config.yml`) in sync with any schema change; use path aliases; never hardcode copy
in components.

Load the `branding` skill first for voice/tone and the real-vs-placeholder distinction (Blue Bird
Theatre vs. OPTP vs. Jr. OPTP naming, the 1916 "Bluebird" vs. modern "Blue Bird" spelling rule, the
history timeline) — don't "fix" a spelling or fact without checking it against that skill first.

Go collection by collection (`shows`, `events`, `history`, `team`, `testimonials`, `faqs`,
`valueProps`, `getInvolved`, `donate`, `rentals`, `extras`, `stats`, `contact`, `gallery`,
`auditions`) and flag, per entry:

- Generic AI-sounding filler — throat-clearing openers, empty adjectives, restating the obvious
- Redundant copy — the same claim made in two collections/entries with no reason to duplicate it
- Inconsistent voice/tone against the branding skill's guidance
- Placeholder copy that reads like it's real (it should stay obviously a placeholder, e.g.
  `[SHOW TITLE]`) or real copy that's stale or contradicts the history timeline
- Inconsistent structure between entries in the same collection (YAML shape, markdown usage
  inside fields)

Don't edit anything yet. Produce a plan: for each collection, what needs to change and why, which
entries are affected, and flag anything that needs a real answer from a human (an actual address,
a real quote, a confirmed date) before it can be filled in.
