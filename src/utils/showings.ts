export interface Showing {
  date: string;
  /** HH:MM 24-hour. Undefined means the time for this date is still TBA. */
  time?: string;
  label?: string;
}

export interface NextShowingResult {
  next: Showing | null;
  isPast: boolean;
}

const VENUE_TIME_ZONE = 'America/New_York';

/** Reads the current UTC offset (minutes, e.g. -240 for EDT) for `date` in `VENUE_TIME_ZONE`. */
function venueOffsetMinutes(date: Date): number {
  const offsetName = new Intl.DateTimeFormat('en-US', {
    timeZone: VENUE_TIME_ZONE,
    timeZoneName: 'longOffset',
  })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName')?.value;

  const match = offsetName?.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!match) return -300; // fall back to standard time (EST) if the runtime can't resolve it
  const sign = match[1] === '-' ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3]));
}

/**
 * Resolves a showing's wall-clock date/time (always America/New_York — this is a single
 * South Carolina venue) to the true UTC instant, correcting for DST on that specific date
 * rather than "today." Returns null for TBA showings (no time), which have no fixed instant.
 */
export function toUtcInstant(showing: Showing): Date | null {
  if (!showing.time) return null;
  const [hours, minutes] = showing.time.split(':').map(Number);
  const [year, month, day] = showing.date.split('-').map(Number);

  // Treat the wall-clock numbers as if they were UTC just to ask "what's the venue's
  // offset around this date" — then shift by that offset to get the real UTC instant.
  const approxUtc = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const offsetMinutes = venueOffsetMinutes(approxUtc);
  return new Date(approxUtc.getTime() - offsetMinutes * 60000);
}

function toDateTime(showing: Showing, endOfDay = false): Date {
  if (showing.time) return new Date(`${showing.date}T${showing.time}:00`);
  return new Date(`${showing.date}T${endOfDay ? '23:59:59' : '00:00:00'}`);
}

/**
 * Finds the next upcoming showing to count down to, and whether the whole run has ended.
 * TBA showings (no time) are never a countdown target — there's no specific instant to
 * count down to — but they still count toward `isPast` via that date's end-of-day cutoff.
 */
export function getNextShowing(showings: Showing[], now: Date = new Date()): NextShowingResult {
  if (showings.length === 0) return { next: null, isPast: false };

  const upcomingTimed = showings
    .filter((showing) => showing.time)
    .map((showing) => ({ showing, at: toDateTime(showing) }))
    .sort((a, b) => a.at.getTime() - b.at.getTime())
    .find(({ at }) => at.getTime() >= now.getTime());

  const lastCutoff = Math.max(...showings.map((showing) => toDateTime(showing, true).getTime()));

  return {
    next: upcomingTimed?.showing ?? null,
    isPast: now.getTime() > lastCutoff,
  };
}
