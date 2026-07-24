/** Season rolls over on the calendar year — Jan 1 the current season becomes N+1. */
export function getCurrentSeason(today: Date = new Date()): string {
  return String(today.getFullYear());
}

export function getNextSeason(today: Date = new Date()): string {
  return String(today.getFullYear() + 1);
}

/** Current season and next season (if announced) both get real pages; anything older archives. */
export function isBuildableSeason(season: string, today: Date = new Date()): boolean {
  return season === getCurrentSeason(today) || season === getNextSeason(today);
}
