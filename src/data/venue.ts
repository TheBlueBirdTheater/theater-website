import { getEntry } from 'astro:content';
import type { PostalAddressInput } from '@utils/schema';

// TODO: optp.org is unconfirmed per BRAND/CONTACT spec — mirrors `site` in astro.config.mjs
export const SITE_URL = 'https://optp.org';

// Orangeburg Part-Time Players — the resident volunteer troupe (a 501(c)(3) nonprofit)
// that operates the Blue Bird Theatre and performs most, but not all, shows there.
export const OPTP_NAME = 'Orangeburg Part-Time Players';
export const THEATRE_NAME = 'Blue Bird Theatre';

export interface VenueContact {
  phone: string;
  email: string;
  address: PostalAddressInput;
  socials: { platform: string; url: string }[];
}

/** Single source for venue phone/email/address — wraps the CMS-editable `contact` collection. */
export async function getVenueContact(): Promise<VenueContact> {
  const { data: contact } = (await getEntry('contact', 'contact'))!;

  return {
    phone: contact.phone,
    email: contact.email,
    address: {
      streetAddress: contact.address.line1,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
    },
    socials: contact.socials,
  };
}
