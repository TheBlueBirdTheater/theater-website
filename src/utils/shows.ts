import { getCollection, type CollectionEntry } from 'astro:content';
import { getCurrentSeason } from '@utils/seasons';

const MS_PER_DAY = 86400000;
const CURRENT_WINDOW_DAYS = 14;

function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00`);
}

/**
 * Derives a display status from today's date and a sorted list of date strings, rather
 * than trusting a hand-maintained field — an entry shouldn't read as "Now Playing" until
 * it's within CURRENT_WINDOW_DAYS of opening. Shared by shows (runDates) and events (showDates).
 */
export function getStatusFromDates(dates: string[], today: Date = new Date()): 'upcoming' | 'current' | 'past' {
  if (dates.length === 0) return 'upcoming';

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const firstDate = parseDate(dates[0]);
  const lastDate = parseDate(dates[dates.length - 1]);
  const currentWindowStart = new Date(firstDate.getTime() - CURRENT_WINDOW_DAYS * MS_PER_DAY);

  if (todayMidnight > lastDate) return 'past';
  if (todayMidnight >= currentWindowStart) return 'current';
  return 'upcoming';
}

export function getShowStatus(
  show: CollectionEntry<'shows'>,
  today: Date = new Date()
): 'upcoming' | 'current' | 'past' {
  return getStatusFromDates(
    show.data.runDates.map((rd) => rd.date),
    today
  );
}

export function getEventStatus(
  event: CollectionEntry<'events'>,
  today: Date = new Date()
): 'upcoming' | 'current' | 'past' {
  return getStatusFromDates(
    event.data.showDates.map((sd) => sd.date),
    today
  );
}

export async function getCurrentShow() {
  const currentSeason = getCurrentSeason();
  const shows = (await getCollection('shows')).filter((show) => show.data.season === currentSeason);
  const withStatus = shows.map((show) => ({ show, status: getShowStatus(show) }));

  const current = withStatus.find((s) => s.status === 'current');
  if (current) return current.show;

  const nextUpcoming = withStatus
    .filter((s) => s.status === 'upcoming' && s.show.data.runDates.length > 0)
    .sort((a, b) => a.show.data.runDates[0].date.localeCompare(b.show.data.runDates[0].date));

  return nextUpcoming[0]?.show ?? shows[0];
}
