import { getCollection, type CollectionEntry } from 'astro:content';
import { getCurrentSeason } from '@utils/seasons';
import { getNextShowing, toUtcInstant, type Showing } from '@utils/showings';
import { getTicketUrl } from '@data/venue';

export type WhatsOnItem =
  | { kind: 'show'; entry: CollectionEntry<'shows'> }
  | { kind: 'event'; entry: CollectionEntry<'events'> };

function firstDate(item: WhatsOnItem): string | undefined {
  return item.kind === 'show' ? item.entry.data.runDates[0]?.date : item.entry.data.showDates[0]?.date;
}

function lastDate(item: WhatsOnItem): string | undefined {
  return item.kind === 'show' ? item.entry.data.runDates.at(-1)?.date : item.entry.data.showDates.at(-1)?.date;
}

function isPast(item: WhatsOnItem, todayStr: string): boolean {
  const last = lastDate(item);
  return last !== undefined && last < todayStr;
}

async function getSeasonItems(season: string): Promise<WhatsOnItem[]> {
  const [shows, events] = await Promise.all([
    getCollection('shows', ({ data }) => !data.draft && data.season === season),
    getCollection('events', ({ data }) => !data.draft && data.season === season),
  ]);

  return [
    ...shows.map((entry): WhatsOnItem => ({ kind: 'show', entry })),
    ...events.map((entry): WhatsOnItem => ({ kind: 'event', entry })),
  ];
}

export interface WhatsOnGroups {
  /** Upcoming/current shows and events (including TBA), soonest first, TBA last. */
  upcoming: WhatsOnItem[];
  /** Shows and events from this season that have already closed, most recently past first. */
  past: WhatsOnItem[];
}

/**
 * Merges the `shows` and `events` collections for a given season (default:
 * current) into upcoming and past groups, each date-sorted.
 */
export async function getWhatsOnGroups(season: string = getCurrentSeason()): Promise<WhatsOnGroups> {
  const items = await getSeasonItems(season);
  const todayStr = new Date().toISOString().slice(0, 10);

  const upcoming = items
    .filter((item) => !isPast(item, todayStr))
    .sort((a, b) => (firstDate(a) ?? '9999-12-31').localeCompare(firstDate(b) ?? '9999-12-31'));

  const past = items
    .filter((item) => isPast(item, todayStr))
    .sort((a, b) => (lastDate(b) ?? '').localeCompare(lastDate(a) ?? ''));

  return { upcoming, past };
}

/** The next N upcoming (non-past, dated) shows/events, soonest first — for homepage teasers. */
export async function getUpcomingWhatsOn(count: number, season: string = getCurrentSeason()): Promise<WhatsOnItem[]> {
  const items = await getSeasonItems(season);
  const todayStr = new Date().toISOString().slice(0, 10);

  return items
    .filter((item) => !isPast(item, todayStr) && firstDate(item) !== undefined)
    .sort((a, b) => firstDate(a)!.localeCompare(firstDate(b)!))
    .slice(0, count);
}

export interface SiteWideNextShowing {
  next: Showing;
  showTitle: string;
  showHref: string;
  kind: 'show' | 'event';
  ticketUrl?: string;
  ticketPrice?: string;
}

/**
 * Finds the single soonest upcoming showing across every show and event in a
 * season — for the countdown banner on the shows listing page, which isn't
 * tied to one show's or event's own page.
 */
export async function getNextShowingSiteWide(season: string = getCurrentSeason()): Promise<SiteWideNextShowing | null> {
  const [shows, events] = await Promise.all([
    getCollection('shows', ({ data }) => !data.draft && data.season === season),
    getCollection('events', ({ data }) => !data.draft && data.season === season),
  ]);

  let best: SiteWideNextShowing | null = null;
  let bestAt = Infinity;

  for (const show of shows) {
    const showings: Showing[] = show.data.runDates.map((rd) => ({
      date: rd.date,
      time: rd.time,
      label: rd.label,
      accessibilityTag: rd.accessibilityTag,
    }));
    const { next } = getNextShowing(showings);
    if (!next) continue;

    const at = toUtcInstant(next)?.getTime();
    if (at === undefined || at >= bestAt) continue;

    bestAt = at;
    best = {
      next,
      showTitle: show.data.title,
      showHref: `/shows/${show.id}/`,
      kind: 'show',
      ticketUrl: getTicketUrl(show.data.ludusShowId),
      ticketPrice: show.data.ticketPrice,
    };
  }

  for (const event of events) {
    const showings: Showing[] = event.data.showDates.flatMap((sd) =>
      sd.times && sd.times.length > 0
        ? sd.times.map((t) => ({ date: sd.date, time: t.time, label: t.label, accessibilityTag: t.accessibilityTag }))
        : [{ date: sd.date }]
    );
    const { next } = getNextShowing(showings);
    if (!next) continue;

    const at = toUtcInstant(next)?.getTime();
    if (at === undefined || at >= bestAt) continue;

    bestAt = at;
    best = {
      next,
      showTitle: event.data.title,
      showHref: `/events/${event.id}/`,
      kind: 'event',
      ticketUrl: getTicketUrl(event.data.ludusShowId),
      ticketPrice: event.data.ticketPrice,
    };
  }

  return best;
}
