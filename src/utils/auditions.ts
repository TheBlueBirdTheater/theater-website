import { getCollection, type CollectionEntry } from 'astro:content';
import { getNextShowing, type Showing } from '@utils/showings';

/** Internal page linked to when a show/event hasn't set up its real sign-up process yet. */
export const SIGN_UP_PLACEHOLDER_URL = '/auditions/sign-up-soon';

export type AuditionData = NonNullable<CollectionEntry<'shows'>['data']['auditions']>;

export interface AuditionListing {
  title: string;
  /** Dedicated /auditions/[slug] page for this listing. */
  href: string;
  /** The show's or event's own detail page. */
  entryHref: string;
  auditionDates: { date: string; time: string; location?: string }[];
  callbackDate?: string;
  requirements?: string[];
  signUpUrl?: string;
  contactEmail?: string;
  notes?: string;
  /** True when audition dates haven't been announced yet. */
  tba: boolean;
}

function toShowings(auditions: AuditionData): Showing[] {
  return [
    ...(auditions.auditionDates ?? []).map((d) => ({ date: d.date, time: d.time })),
    ...(auditions.callbackDate ? [{ date: auditions.callbackDate }] : []),
  ];
}

/** True while a show/event's audition process (dates plus any callback) hasn't fully passed yet. TBA entries are always active. */
export function isAuditionActive(auditions: AuditionData, now: Date = new Date()): boolean {
  return !getNextShowing(toShowings(auditions), now).isPast;
}

/** Instant of the soonest upcoming audition date, or Infinity for TBA entries (so they sort last). */
function nextAuditionInstant(auditions: AuditionData, now: Date): number {
  const dated = (auditions.auditionDates ?? []).map((d) => ({ date: d.date, time: d.time }));
  const { next } = getNextShowing(dated, now);
  return next ? new Date(`${next.date}T${next.time}:00`).getTime() : Infinity;
}

function toListing(
  entry: CollectionEntry<'shows'> | CollectionEntry<'events'>,
  kind: 'shows' | 'events',
  now: Date
): { listing: AuditionListing; sortKey: number; active: boolean } | null {
  const auditions = entry.data.auditions;
  if (!auditions) return null;
  const { auditionDates, ...rest } = auditions;
  return {
    listing: {
      ...rest,
      title: entry.data.title,
      href: `/auditions/${entry.id}`,
      entryHref: `/${kind}/${entry.id}`,
      auditionDates: auditionDates ?? [],
      tba: !auditionDates || auditionDates.length === 0,
    },
    sortKey: nextAuditionInstant(auditions, now),
    active: isAuditionActive(auditions, now),
  };
}

/** Every show/event currently auditioning (dates not yet passed), soonest audition date first, TBA entries last. */
export async function getAuditioningNow(now: Date = new Date()): Promise<AuditionListing[]> {
  const [shows, events] = await Promise.all([getCollection('shows'), getCollection('events')]);
  return [...shows.map((s) => toListing(s, 'shows', now)), ...events.map((e) => toListing(e, 'events', now))]
    .filter((x): x is { listing: AuditionListing; sortKey: number; active: boolean } => x !== null && x.active)
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((x) => x.listing);
}
