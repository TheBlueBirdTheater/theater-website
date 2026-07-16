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

// TODO: replace with real audition info — never invent real dates or requirements.
export const upcomingAuditions: AuditionNotice[] = [
  {
    showTitle: '[SHOW TITLE]',
    auditionDates: [
      { date: '2026-08-03', time: '18:00', location: 'Blue Bird Theatre' },
      { date: '2026-08-04', time: '18:00', location: 'Blue Bird Theatre' },
    ],
    callbackDate: '2026-08-06',
    requirements: [
      '[TODO: e.g. prepare a 1-minute monologue]',
      '[TODO: e.g. bring a headshot and resume]',
    ],
    signUpUrl: '#',
    contactEmail: 'auditions@example.com',
  },
];
