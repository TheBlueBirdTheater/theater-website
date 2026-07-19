import { getEntry } from 'astro:content';
import type { PostalAddressInput } from '@utils/schema';

// Mirrors `site` in astro.config.mjs — Netlify's `URL` build env var when available,
// otherwise the optp.org placeholder (unconfirmed per BRAND/CONTACT spec).
export const SITE_URL = process.env.URL || 'https://optp.org';

// Orangeburg Part-Time Players — the resident volunteer troupe (a 501(c)(3) nonprofit)
// that operates the Blue Bird Theatre and performs most, but not all, shows there.
export const OPTP_NAME = 'Orangeburg Part-Time Players';
export const THEATRE_NAME = 'Blue Bird Theatre';

export interface VenueContact {
  phone: string;
  email: string;
  address: PostalAddressInput;
  mapLat?: number;
  mapLng?: number;
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
    mapLat: contact.mapLat,
    mapLng: contact.mapLng,
    socials: contact.socials,
  };
}
