## What changed

<!-- One or two sentences. -->

## Type of change

- [ ] Content-only change (Decap CMS or hand-edited `src/content/*`)
- [ ] Code change (components, pages, layouts, config, etc.)

### If content-only

- [ ] Went through Decap's editorial workflow (Draft → Review → Ready) before this PR, or was
      reviewed here directly if hand-edited

### If code change

- [ ] Copy added or changed lives in a content collection, not hardcoded in a page/component
      (see [AGENTS.md](../AGENTS.md) § Architecture)
- [ ] No real show/event/contact details invented — placeholder tokens used where the real value
      isn't confirmed yet (see [AGENTS.md](../AGENTS.md) § Architecture, and
      [.claude/skills/branding](../.claude/skills/branding/SKILL.md) for what's currently
      real vs. placeholder)
- [ ] `public/admin/config.yml` updated if a content collection schema changed
- [ ] `npx astro check` and `npm run build` run locally with no new errors
