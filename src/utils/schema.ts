// Canonical site/venue identity constants live in @data/venue — re-exported here since
// most callers already import them alongside the schema builders below.
export { SITE_URL, THEATRE_NAME, OPTP_NAME } from '@data/venue';
import { SITE_URL, THEATRE_NAME } from '@data/venue';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, SITE_URL).toString(),
    })),
  };
}

export interface PostalAddressInput {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
}

export interface EventSchemaInput {
  name: string;
  /** ISO 8601 datetime, e.g. '2026-09-11T19:30:00-04:00' */
  startDate: string;
  endDate?: string;
  /** Relative or absolute path/URL to the show page */
  url: string;
  imageUrl?: string;
  description?: string;
  venueName: string;
  venueAddress?: PostalAddressInput;
  /** Name of the group performing this show — defaults to OPTP if omitted by the caller. */
  performerName?: string;
  offerUrl?: string;
  offerPrice?: string;
  offerAvailability?: 'InStock' | 'SoldOut' | 'PreOrder';
}

export function buildEventSchema(input: EventSchemaInput): Record<string, unknown> {
  const location: Record<string, unknown> = {
    '@type': 'PerformingArtsTheater',
    name: input.venueName,
  };
  if (input.venueAddress) {
    location.address = {
      '@type': 'PostalAddress',
      streetAddress: input.venueAddress.streetAddress,
      addressLocality: input.venueAddress.addressLocality,
      addressRegion: input.venueAddress.addressRegion,
      postalCode: input.venueAddress.postalCode,
    };
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TheaterEvent',
    name: input.name,
    startDate: input.startDate,
    url: new URL(input.url, SITE_URL).toString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location,
    organizer: {
      '@type': 'PerformingArtsTheater',
      name: THEATRE_NAME,
      url: SITE_URL,
    },
  };

  if (input.endDate) schema.endDate = input.endDate;
  if (input.imageUrl) schema.image = new URL(input.imageUrl, SITE_URL).toString();
  if (input.description) schema.description = input.description;
  if (input.performerName) {
    schema.performer = { '@type': 'PerformingGroup', name: input.performerName };
  }

  if (input.offerUrl) {
    const offers: Record<string, unknown> = {
      '@type': 'Offer',
      url: new URL(input.offerUrl, SITE_URL).toString(),
      availability: `https://schema.org/${input.offerAvailability ?? 'InStock'}`,
    };
    if (input.offerPrice) {
      offers.price = input.offerPrice;
      offers.priceCurrency = 'USD';
    }
    schema.offers = offers;
  }

  return schema;
}

export interface TheaterVenueSchemaInput {
  name: string;
  url?: string;
  telephone?: string;
  email?: string;
  address: PostalAddressInput;
}

export function buildTheaterVenueSchema(input: TheaterVenueSchemaInput): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'PerformingArtsTheater',
    '@id': `${SITE_URL}/#theatre`,
    name: input.name,
    url: input.url ?? SITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.address.streetAddress,
      addressLocality: input.address.addressLocality,
      addressRegion: input.address.addressRegion,
      postalCode: input.address.postalCode,
    },
  };

  if (input.telephone) schema.telephone = input.telephone;
  if (input.email) schema.email = input.email;

  return schema;
}

export interface PerformingGroupSchemaInput {
  name: string;
  url?: string;
  logoUrl?: string;
  /** Social profile URLs */
  sameAs?: string[];
  /** Name of the venue this group is resident at, e.g. the Blue Bird Theatre. */
  locationName?: string;
}

export function buildPerformingGroupSchema(input: PerformingGroupSchemaInput): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    '@id': `${SITE_URL}/#optp`,
    name: input.name,
    url: input.url ?? SITE_URL,
  };

  if (input.logoUrl) schema.logo = new URL(input.logoUrl, SITE_URL).toString();
  if (input.sameAs?.length) schema.sameAs = input.sameAs;
  if (input.locationName) {
    schema.location = {
      '@type': 'PerformingArtsTheater',
      name: input.locationName,
      '@id': `${SITE_URL}/#theatre`,
    };
  }

  return schema;
}
