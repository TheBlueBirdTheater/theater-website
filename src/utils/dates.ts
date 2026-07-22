const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

/** Formats a single "YYYY-MM-DD" string as e.g. "March 19, 2026". */
export function formatDate(dateStr: string): string {
  return formatter.format(new Date(`${dateStr}T00:00:00`));
}

/** Formats an "HH:MM" 24-hour wall-clock time as e.g. "7:30 PM". */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * Formats a show's run dates as a human-readable range, e.g. "September 11–13, 2026"
 * or, when the run spans months/years, "December 30, 2026 – January 2, 2027".
 */
export function formatDateRange(runDates: { date: string }[]): string {
  if (runDates.length === 0) return 'TBA';

  const start = new Date(`${runDates[0].date}T00:00:00`);
  if (runDates.length === 1) return formatter.format(start);

  const end = new Date(`${runDates[runDates.length - 1].date}T00:00:00`);
  return formatter.formatRange(start, end);
}

/**
 * Formats a list of (possibly non-consecutive) event dates, e.g. "September 5, 2026"
 * or "September 5 & 12, 2026". Unlike `formatDateRange`, this doesn't collapse the
 * list into a single start–end range, since event dates aren't necessarily a
 * contiguous run the way a show's `runDates` are.
 */
export function formatEventDates(dates: { date: string }[]): string {
  if (dates.length === 0) return 'TBA';

  const formatted = dates.map((d) => formatDate(d.date));
  if (formatted.length === 1) return formatted[0];

  return `${formatted.slice(0, -1).join(', ')} & ${formatted.at(-1)}`;
}
