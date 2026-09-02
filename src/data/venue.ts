import { getEntry } from 'astro:content';
import type { PostalAddressInput } from '@utils/schema';

export { SITE_URL } from './site-url';

// Orangeburg Part-Time Players — the resident volunteer troupe (a 501(c)(3) nonprofit)
// that operates the Blue Bird Theatre and performs most, but not all, shows there.
export const OPTP_NAME = 'Orangeburg Part-Time Players';
// The OPTP's youth program — performs its own summer season under the same theater.
export const JR_OPTP_NAME = 'Junior Orangeburg Part-Time Players';
export const THEATRE_NAME = 'Blue Bird Theatre';
// OPTP's Ludus ticketing account subdomain (https://optp.ludus.com) — used by LudusWidget.astro.
export const LUDUS_SUBDOMAIN = 'optp';

export interface VenueContact {
  phone: string;
  email: string;
  address: PostalAddressInput;
  mailingAddress?: string;
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
    mailingAddress: contact.mailingAddress,
    mapLat: contact.mapLat,
    mapLng: contact.mapLng,
    socials: contact.socials,
  };
}

/**
 * Authoritative ticket link for a show/event: its own Ludus show page when `ludusShowId` is
 * set (get this from the show's Ludus event page -> More -> Share -> Public Share Link),
 * otherwise the site's own /tickets/ page — never a raw third-party fallback, so a show
 * without a specific Ludus ID still sends visitors somewhere useful (the general Ludus
 * portal, box-office contact, and whatever else IS individually linked from that page).
 */
export function getTicketUrl(ludusShowId?: string): string {
  return ludusShowId ? `https://${LUDUS_SUBDOMAIN}.ludus.com/${ludusShowId}` : '/tickets/';
}
