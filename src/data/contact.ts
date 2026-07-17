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
  mailingAddress: string;
  socials: SocialLink[];
}

// Blue Bird Theatre / Orangeburg Part-Time Players (OPTP) contact information.
export const contact: ContactInfo = {
  phone: '803-536-5454',
  email: 'optp1981@gmail.com',
  address: {
    line1: '1141 Russell Street',
    city: 'Orangeburg',
    state: 'SC',
    zip: '29115',
  },
  mailingAddress: 'P.O. Box 1291, Orangeburg, SC 29116',
  socials: [
    { platform: 'Facebook', url: 'https://www.facebook.com/BluebirdtheatreOrangeburgSC' },
  ],
};
