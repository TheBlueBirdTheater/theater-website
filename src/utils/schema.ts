// TODO: optp.org is unconfirmed per BRAND/CONTACT spec — mirrors `site` in astro.config.mjs
export const SITE_URL = 'https://optp.org';

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
  venueAddress?: string;
  offerUrl?: string;
  offerPrice?: string;
  offerAvailability?: 'InStock' | 'SoldOut' | 'PreOrder';
}

export function buildEventSchema(input: EventSchemaInput): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TheaterEvent',
    name: input.name,
    startDate: input.startDate,
    url: new URL(input.url, SITE_URL).toString(),
    location: {
      '@type': 'PerformingArtsTheater',
      name: input.venueName,
      // TODO: real street address pending — see src/data/contact.ts
      address: input.venueAddress ?? '[TODO: venue address]',
    },
  };

  if (input.endDate) schema.endDate = input.endDate;
  if (input.imageUrl) schema.image = new URL(input.imageUrl, SITE_URL).toString();
  if (input.description) schema.description = input.description;

  if (input.offerUrl) {
    schema.offers = {
      '@type': 'Offer',
      url: input.offerUrl,
      price: input.offerPrice ?? '0',
      priceCurrency: 'USD',
      availability: `https://schema.org/${input.offerAvailability ?? 'InStock'}`,
    };
  }

  return schema;
}

export interface PerformingGroupSchemaInput {
  name: string;
  url?: string;
  logoUrl?: string;
  /** Social profile URLs */
  sameAs?: string[];
}

export function buildPerformingGroupSchema(input: PerformingGroupSchemaInput): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    name: input.name,
    url: input.url ?? SITE_URL,
  };

  if (input.logoUrl) schema.logo = new URL(input.logoUrl, SITE_URL).toString();
  if (input.sameAs?.length) schema.sameAs = input.sameAs;

  return schema;
}
