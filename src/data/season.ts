export interface ShowRunDate {
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:MM' 24-hour
  label?: string; // e.g. 'Opening Night', 'Matinee'
}

export interface Show {
  slug: string;
  title: string;
  subtitle?: string;
  synopsis: string;
  posterImage: string;
  posterAlt: string;
  runDates: ShowRunDate[];
  venue: string;
  ticketUrl: string;
  cast?: string[];
  crew?: string[];
  status: 'upcoming' | 'current' | 'past';
}

// TODO: replace with real season data — never invent real show titles, dates, or copy.
export const shows: Show[] = [
  {
    slug: 'show-one',
    title: '[SHOW TITLE]',
    subtitle: '[SHOW SUBTITLE/TAGLINE]',
    synopsis: '[SHOW SYNOPSIS — one to two sentences describing the production.]',
    posterImage: '/images/shows/placeholder-poster.jpg',
    posterAlt: '[SHOW TITLE] poster',
    runDates: [
      { date: '2026-09-11', time: '19:30', label: 'Opening Night' },
      { date: '2026-09-12', time: '19:30' },
      { date: '2026-09-13', time: '14:00', label: 'Matinee' },
    ],
    venue: 'Blue Bird Theatre',
    ticketUrl: '#',
    cast: ['[Actor Name] as [Character]', '[Actor Name] as [Character]'],
    crew: ['Director: [Name]', 'Stage Manager: [Name]'],
    status: 'current',
  },
  {
    slug: 'show-two',
    title: '[SHOW TITLE]',
    subtitle: '[SHOW SUBTITLE/TAGLINE]',
    synopsis: '[SHOW SYNOPSIS — one to two sentences describing the production.]',
    posterImage: '/images/shows/placeholder-poster.jpg',
    posterAlt: '[SHOW TITLE] poster',
    runDates: [
      { date: '2026-11-06', time: '19:30', label: 'Opening Night' },
      { date: '2026-11-07', time: '19:30' },
    ],
    venue: 'Blue Bird Theatre',
    ticketUrl: '#',
    status: 'upcoming',
  },
];

export function getCurrentShow(): Show | undefined {
  return shows.find((show) => show.status === 'current') ?? shows[0];
}
