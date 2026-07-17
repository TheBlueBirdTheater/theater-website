export interface GivingLevel {
  name: string;
  amount: string;
  perks: string[];
}

export interface SponsorshipTier {
  name: string;
  amount: string;
  benefits: string[];
}

// The Orangeburg Part-Time Players is a self-supporting, all-volunteer nonprofit
// 501(c)(3) organization. All donations are tax-deductible and are applied to the
// operation and upkeep of the theater's home, the Blue Bird.
export const givingLevels: GivingLevel[] = [
  {
    name: 'Friend',
    amount: '$25+',
    perks: ['Our sincere thanks and recognition as a supporter of the Blue Bird Theatre'],
  },
  {
    name: 'Supporter',
    amount: '$100+',
    perks: [
      'Recognition as a supporter of the Blue Bird Theatre',
      'Acknowledgment in our season program',
    ],
  },
  {
    name: 'BlueBird Patron',
    amount: '$250+',
    perks: [
      'Your name, photo, and/or business logo displayed digitally in the auditorium prior to all Blue Bird events',
      'Recognition on the screen in the main lobby',
      'Recognition on our website and social media',
    ],
  },
];

// Business sponsorship helps keep the Blue Bird's doors open. Contact the OPTP to
// discuss show and season sponsorship opportunities and custom recognition packages.
export const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: 'Show Sponsor',
    amount: 'Contact us',
    benefits: [
      'Recognition as a sponsor of a single production',
      'Logo placement in the show program and on Blue Bird screens',
    ],
  },
  {
    name: 'Season Sponsor',
    amount: 'Contact us',
    benefits: [
      'Recognition as a sponsor across the full season',
      'Premium logo placement in all show programs and on Blue Bird screens',
      'Recognition on our website and social media throughout the year',
    ],
  },
];

// Donations may be mailed as a check payable to the OPTP, or sent via Cash App.
export const donationMailingAddress = 'Orangeburg Part-Time Players, P.O. Box 1291, Orangeburg, SC 29116';
export const donationCashApp = '$OPTP1981';

// Memberships and donations can also be made online through TicketLeap.
export const donationPlatformUrl = 'https://www.ticketleap.events/tickets/bluebirdorangeburg/optp-2025-membership';
