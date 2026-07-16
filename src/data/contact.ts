export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  socials: SocialLink[];
}

// TODO: replace every value below with real OPTP / Blue Bird Theatre contact info once confirmed.
export const contact: ContactInfo = {
  phone: '555-000-0000',
  email: 'info@example.com',
  address: {
    line1: '[TODO: street address]',
    city: 'Orangeburg',
    state: 'SC',
    zip: '[TODO: zip]',
  },
  socials: [
    { platform: 'Facebook', url: '#' },
    { platform: 'Instagram', url: '#' },
  ],
};
