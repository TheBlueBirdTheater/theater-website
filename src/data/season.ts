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

const TICKETS_URL = 'https://www.ticketleap.events/events/bluebirdorangeburg';

// 2026 Season, Orangeburg Part-Time Players at the Blue Bird Theatre.
// Ordered with upcoming productions first. Statuses reflect a mid-2026 timeframe.
export const shows: Show[] = [
  {
    slug: 'steel-magnolias',
    title: 'Steel Magnolias',
    subtitle: 'Written by Robert Harling',
    synopsis:
      "A close-knit group of women gathers at Truvy's beauty salon in Chinquapin, Louisiana, sharing sharp wit, heartfelt advice, and unbreakable bonds. Amid weddings, laughter, and lively banter, joy gives way to heartbreak, revealing the resilience, love, and strength that carry these women through life's toughest moments.",
    posterImage: '/images/shows/steel-magnolias.jpg',
    posterAlt: 'Steel Magnolias poster',
    runDates: [
      { date: '2026-10-08', time: '19:30', label: 'Opening Night' },
      { date: '2026-10-09', time: '19:30' },
      { date: '2026-10-10', time: '19:30' },
      { date: '2026-10-11', time: '15:00', label: 'Matinee' },
    ],
    venue: 'Blue Bird Theatre',
    ticketUrl: TICKETS_URL,
    crew: ['Director: Coe Dantzler'],
    status: 'upcoming',
  },
  {
    slug: 'a-christmas-carol',
    title: 'A Christmas Carol',
    subtitle: 'Written by Charles Dickens',
    synopsis:
      'A timeless holiday classic, A Christmas Carol follows the transformation of Ebenezer Scrooge, a bitter man who is visited by spirits on Christmas Eve and given one last chance to embrace compassion, generosity, and the true meaning of the season.',
    posterImage: '/images/shows/a-christmas-carol.jpg',
    posterAlt: 'A Christmas Carol poster',
    runDates: [
      { date: '2026-12-10', time: '19:30', label: 'Opening Night' },
      { date: '2026-12-11', time: '19:30' },
      { date: '2026-12-12', time: '19:30' },
      { date: '2026-12-13', time: '15:00', label: 'Matinee' },
    ],
    venue: 'Blue Bird Theatre',
    ticketUrl: TICKETS_URL,
    crew: ['Director: Anthony DeAloia'],
    status: 'upcoming',
  },
  {
    slug: 'let-it-be-art',
    title: 'LET IT BE ART! Harold Clurman\'s Life of Passion',
    subtitle: 'Written and directed by U.S. Cultural Ambassador Ronald Rand',
    synopsis:
      'An unforgettable evening of humor and storytelling as Ronald Rand takes the stage as theater legend Harold Clurman, the "Elder Statesman of the American Theatre." Audiences are transported to New York City, Paris, and Hollywood to meet luminaries including Stella Adler, Lee Strasberg, Constantin Stanislavsky, Marlon Brando, Clifford Odets, Katharine Hepburn, and more. Date to be announced.',
    posterImage: '/images/shows/let-it-be-art.jpg',
    posterAlt: 'LET IT BE ART! poster',
    runDates: [],
    venue: 'Blue Bird Theatre',
    ticketUrl: TICKETS_URL,
    crew: ['Written and Directed by Ronald Rand'],
    status: 'upcoming',
  },
  {
    slug: 'limelight',
    title: 'BlueBird Spotlight Series: Limelight',
    subtitle: 'Written and directed by Beth Watkins-Brown',
    synopsis:
      'An original musical by Beth Watkins-Brown, with music by Donald Lee, Jr., presented as part of the Blue Bird Theatre\'s spotlight on local playwrights. Set in a late-night jazz club, club owner Alice Jackson fights to keep her business and her marriage intact as ambition, jealousy, and betrayal surface among performers and staff.',
    posterImage: '/images/shows/limelight.jpg',
    posterAlt: 'BlueBird Spotlight Series: Limelight poster',
    runDates: [
      { date: '2026-06-18', time: '19:30', label: 'Opening Night' },
      { date: '2026-06-19', time: '19:30' },
      { date: '2026-06-20', time: '19:30' },
      { date: '2026-06-21', time: '15:00', label: 'Matinee' },
    ],
    venue: 'Blue Bird Theatre',
    ticketUrl: TICKETS_URL,
    crew: ['Written and Directed by Beth Watkins-Brown', 'Music by Donald Lee, Jr.'],
    status: 'past',
  },
  {
    slug: 'frozen',
    title: "Disney's Frozen The Broadway Musical",
    subtitle: 'Music and Lyrics by Kristen Anderson-Lopez & Robert Lopez, Book by Jennifer Lee',
    synopsis:
      "Frozen is the timeless tale of two sisters, Elsa and Anna, torn apart by a mysterious secret. As Elsa's powers grow beyond her control, Anna embarks on an epic journey to save her sister and their kingdom. With all the beloved songs from the film plus new music written for Broadway, Frozen is a thrilling adventure filled with heart, humor, and theatrical magic.",
    posterImage: '/images/shows/frozen.jpg',
    posterAlt: "Disney's Frozen The Broadway Musical poster",
    runDates: [
      { date: '2026-03-19', time: '19:30', label: 'Opening Night' },
      { date: '2026-03-20', time: '19:30' },
      { date: '2026-03-21', time: '19:30' },
      { date: '2026-03-22', time: '15:00', label: 'Matinee' },
    ],
    venue: 'Blue Bird Theatre',
    ticketUrl: TICKETS_URL,
    crew: ['Director: Mitzie DeAloia', 'Music by Debbie Lingle'],
    status: 'past',
  },
];

export function getCurrentShow(): Show | undefined {
  return shows.find((show) => show.status === 'current') ?? shows[0];
}
