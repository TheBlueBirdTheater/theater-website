import { getCollection, type CollectionEntry } from 'astro:content';
import { getCurrentSeason } from '@utils/seasons';

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

/**
 * Merges the `shows` and `events` collections for a given season (default:
 * current) into one date-sorted list — upcoming/TBA first (soonest first,
 * TBA entries last), then past entries (most recently past first).
 */
export async function getWhatsOn(season: string = getCurrentSeason()): Promise<WhatsOnItem[]> {
  const items = await getSeasonItems(season);
  const todayStr = new Date().toISOString().slice(0, 10);

  const upcoming = items
    .filter((item) => !isPast(item, todayStr))
    .sort((a, b) => (firstDate(a) ?? '9999-12-31').localeCompare(firstDate(b) ?? '9999-12-31'));

  const past = items
    .filter((item) => isPast(item, todayStr))
    .sort((a, b) => (lastDate(b) ?? '').localeCompare(lastDate(a) ?? ''));

  return [...upcoming, ...past];
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
