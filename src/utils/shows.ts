import { getCollection, type CollectionEntry } from 'astro:content';

const MS_PER_DAY = 86400000;
const CURRENT_WINDOW_DAYS = 14;

function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00`);
}

/**
 * Derives a show's display status from today's date and its run dates, rather than
 * trusting a hand-maintained field — a show shouldn't read as "Now Playing" until it's
 * within CURRENT_WINDOW_DAYS of opening.
 */
export function getShowStatus(
  show: CollectionEntry<'shows'>,
  today: Date = new Date()
): 'upcoming' | 'current' | 'past' {
  const { runDates } = show.data;
  if (runDates.length === 0) return 'upcoming';

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const firstDate = parseDate(runDates[0].date);
  const lastDate = parseDate(runDates[runDates.length - 1].date);
  const currentWindowStart = new Date(firstDate.getTime() - CURRENT_WINDOW_DAYS * MS_PER_DAY);

  if (todayMidnight > lastDate) return 'past';
  if (todayMidnight >= currentWindowStart) return 'current';
  return 'upcoming';
}

export async function getCurrentShow() {
  const shows = await getCollection('shows');
  const withStatus = shows.map((show) => ({ show, status: getShowStatus(show) }));

  const current = withStatus.find((s) => s.status === 'current');
  if (current) return current.show;

  const nextUpcoming = withStatus
    .filter((s) => s.status === 'upcoming' && s.show.data.runDates.length > 0)
    .sort((a, b) => a.show.data.runDates[0].date.localeCompare(b.show.data.runDates[0].date));

  return nextUpcoming[0]?.show ?? shows[0];
}
