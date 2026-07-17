const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

/** Formats a single "YYYY-MM-DD" string as e.g. "March 19, 2026". */
export function formatDate(dateStr: string): string {
  return formatter.format(new Date(`${dateStr}T00:00:00`));
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
