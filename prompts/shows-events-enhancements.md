# Prompt: Shows & Events page enhancements

Copy everything below the line into Claude Code.

---

Enhance the show and event detail pages (`src/pages/shows/[slug].astro`, `src/pages/events/[slug].astro`) with five features. Read CLAUDE.md first and follow all repo conventions: all editable copy lives in content collections under `src/content/*` (schemas in `src/content.config.ts`), never hardcode marketing copy in components; keep the Decap CMS config (`public/admin/config.yml`) in sync with every schema change; use path aliases (`@components/*`, `@utils/*`, `@data/*`); FontAwesome free-solid icons via `Icon.astro` only; DaisyUI v5 components with the `bluebird` theme; never invent real addresses, dates, or contact details — use the placeholder tokens established in `src/data/*.ts`. Hand npm/npx commands to me to run in WSL — do not run them yourself. Start the dev server with `astro dev --background` if needed.

## 1. Venue map (OpenStreetMap)

- New component `src/components/VenueMap.astro`: an OpenStreetMap iframe embed (`https://www.openstreetmap.org/export/embed.html?bbox=...&marker=lat,lng`) — no API key, no JS library. Props: lat/lng (or address fallback), height. Lazy-load the iframe (`loading="lazy"`), add an accessible `title`.
- Below the map, a "Get directions" button linking to `https://www.google.com/maps/dir/?api=1&destination=<encoded address>`.
- Venue address comes from the existing `contact` collection via `src/data/venue.ts#getVenueContact`. Add optional `mapLat`/`mapLng` fields to the `contact` schema (+ Decap config); since the real address may be placeholder data, use placeholder coordinates with a `TODO` comment if real ones are unknown — do not invent a real-looking address.
- Render in the venue/location section of both show and event detail pages.

## 2. Add to Calendar (shows + events)

- New component `src/components/AddToCalendar.astro`: given the show/event title, venue name + address, and the list of showings (`runDates` for shows: date/time/label; `showDates` for events), render a DaisyUI dropdown or modal where the user first picks a specific showing (e.g. "Sat Mar 21 · 7:30 PM · Opening Night"), then chooses "Google Calendar" or "Download .ics (Apple/Outlook)".
- Site is static output: generate everything client-side in a small inline `<script>` — build the Google Calendar template URL (`https://calendar.google.com/calendar/render?action=TEMPLATE&...`) and generate the `.ics` as a Blob download (VEVENT with UID, DTSTART/DTEND with timezone `America/New_York`, SUMMARY, LOCATION, DESCRIPTION with ticket URL). Assume 2.5h duration for shows; for events without a time, create an all-day event.
- Handle showings that lack a `time` (e.g. the event's "Showtime TBA") gracefully — all-day event and a "time TBA" note.
- Place it near the ticket CTA on both detail pages. One showing only → skip the picker step.

## 3. Dress code / attire

- Optional `dressCode` string field on both `shows` and `events` schemas (+ Decap config).
- Render via the existing `InfoRow` pattern with an appropriate FontAwesome icon when present; omit entirely when absent.
- Seed the "A Dream Is a Wish Your Heart Makes" event with placeholder text like `[DRESS CODE]` — do not invent copy.

## 4. Know Before You Go

- New component `src/components/KnowBeforeYouGo.astro`: DaisyUI collapse/accordion section on show/event detail pages covering: doors-open time, run time, parking, accessibility, concessions, dress code (feature 3 folds in here if present).
- Sources: parking/location text comes from the existing `faqs` entries (`venue-parking.yaml`, `venue-location.yaml`) — reuse, don't duplicate; add optional per-show/event fields `doorsOpenMinutesBefore` (number), `runTime` (string), `concessionsNote` (string) to both schemas (+ Decap config). Only render rows that have data.

## 5. Countdown banner

- New component `src/components/CountdownBanner.astro`: shown on detail pages when the first showing is in the future — counts down days/hours/minutes to the next upcoming showing (not the first if it already passed). Small inline script, no framework; render a static "Opening night: <date>" fallback for no-JS. Hide entirely once the final showing has passed. Use DaisyUI `countdown` classes.

## General

- Keep everything CMS-editable per repo rules; update `public/admin/config.yml` for every new field/collection.
- After implementing, hand me the commands to run: `npx astro check` and `npm run build`, and wait for my output before considering it done.
- Verify both detail pages render via `astro dev --background` + logs.
