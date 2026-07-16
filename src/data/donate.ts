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

// TODO: replace with real giving levels and sponsorship tiers.
export const givingLevels: GivingLevel[] = [
  { name: 'Friend', amount: '$25+', perks: ['[TODO: perk]'] },
  { name: 'Supporter', amount: '$100+', perks: ['[TODO: perk]', '[TODO: perk]'] },
  { name: 'Patron', amount: '$250+', perks: ['[TODO: perk]', '[TODO: perk]', '[TODO: perk]'] },
];

export const sponsorshipTiers: SponsorshipTier[] = [
  { name: 'Show Sponsor', amount: '[TODO: amount]', benefits: ['[TODO: benefit]'] },
  { name: 'Season Sponsor', amount: '[TODO: amount]', benefits: ['[TODO: benefit]', '[TODO: benefit]'] },
];

// TODO: third-party donation platform link (e.g. a giving-page URL) not yet supplied.
export const donationPlatformUrl = '#';
