export interface AuditionDate {
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:MM' 24-hour
  location: string;
}

export interface AuditionNotice {
  showTitle: string;
  auditionDates: AuditionDate[];
  callbackDate?: string;
  requirements: string[];
  signUpUrl: string;
  contactEmail: string;
}

// General audition information for the Orangeburg Part-Time Players.
// Specific audition dates for each production are announced ahead of the show
// on the OPTP Facebook page. Keep `upcomingAuditions` empty until a real notice
// with confirmed dates is available, then add an entry using the shape below.
// The requirements listed reflect the OPTP's standing, all-are-welcome policy.
export const generalAuditionInfo = {
  intro:
    'Auditions at the Blue Bird Theatre are open to the community, and no prior experience is necessary. There are roles both on stage and behind the scenes, and new faces are always welcome. Audition notices for each production are posted in advance on our Facebook page.',
  standingRequirements: [
    'No advance preparation is required unless noted for a specific show.',
    'Come prepared to read from the script (sides are provided at the audition).',
    'Be ready to share any scheduling conflicts for the rehearsal and performance dates.',
    'All roles are open, and performers of all experience levels are encouraged to attend.',
  ],
  facebookUrl: 'https://www.facebook.com/BluebirdtheatreOrangeburgSC',
  contactEmail: 'optp1981@gmail.com',
};

// No open audition notices with confirmed dates at this time.
export const upcomingAuditions: AuditionNotice[] = [];
