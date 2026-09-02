import { defineCollection, type SchemaContext } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * glob()'s default id generation runs filenames through github-slugger, which
 * lowercases them (`siteCopy.yaml` -> id `sitecopy`). For singleton
 * collections addressed by a hardcoded getEntry(collection, id) call
 * elsewhere, that silently breaks the lookup unless the filename is already
 * all-lowercase. This keeps the id as the literal filename instead.
 */
function literalFilenameId({ entry }: { entry: string }): string {
  return entry.replace(/\.[^/.]+$/, '');
}

/**
 * Same as `glob()`, but for collections that are legitimately empty at times
 * (e.g. no auditions posted, no testimonials collected yet). Suppresses the
 * loader's "No files found matching ..." warning; all other logging passes through.
 */
function optionalGlob(options: Parameters<typeof glob>[0]): Loader {
  const loader = glob(options);
  return {
    ...loader,
    load: (context) =>
      loader.load({
        ...context,
        logger: new Proxy(context.logger, {
          get(target, prop, receiver) {
            if (prop === 'warn') {
              return (message: string) => {
                if (!message.includes('No files found matching')) target.warn(message);
              };
            }
            const value = Reflect.get(target, prop, receiver);
            return typeof value === 'function' ? value.bind(target) : value;
          },
        }),
      }),
  };
}

/**
 * Matches the bracketed placeholder convention used throughout this repo while content is
 * pending (e.g. `[CAPACITY, e.g. 300 seats]`, `[ADULT OPTP AUDITION DESCRIPTION]`) — a run of
 * text starting with an uppercase letter, wrapped in square brackets. Real prose essentially
 * never matches this shape, so false positives are effectively a non-issue.
 */
const PLACEHOLDER_PATTERN = /\[[A-Z][^[\]]{2,}\]/;

/**
 * Wraps any object schema so every string field is recursively checked for unresolved
 * [PLACEHOLDER] text at build/dev-server time — this is what actually shipped to production
 * this sprint (Rentals, Auditions), so it's enforced here rather than left to review. Astro
 * already runs Zod validation on every `astro dev`/`astro build`, so this needs no separate
 * script or npm-script wiring; a violation fails the build with the offending file and field path.
 */
function rejectPlaceholders<T extends z.ZodTypeAny>(schema: T): T {
  return schema.superRefine((value, ctx) => {
    const walk = (node: unknown, path: (string | number)[]) => {
      if (typeof node === 'string') {
        const match = node.match(PLACEHOLDER_PATTERN);
        if (match) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Unresolved placeholder text ${JSON.stringify(match[0])} — replace with real content before this can ship.`,
            path,
          });
        }
      } else if (Array.isArray(node)) {
        node.forEach((item, i) => walk(item, [...path, i]));
      } else if (node && typeof node === 'object') {
        for (const [key, val] of Object.entries(node)) walk(val, [...path, key]);
      }
    };
    walk(value, []);
  }) as unknown as T;
}

/**
 * YAML implicitly types unquoted date-like scalars (e.g. `2026-10-08`) as
 * timestamps, so a CMS re-save of a `string` field can turn it into a JS
 * Date. Accept both and normalize back to the ISO date string.
 */
const dateString = z
  .union([z.string(), z.date()])
  .transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value));

/**
 * YAML 1.1 also parses unquoted `HH:MM`-shaped scalars (e.g. `19:30`) as
 * sexagesimal integers (19*60+30 = 1170), so a CMS re-save of a `string`
 * time field can turn it into a number. Accept both and normalize back.
 */
const timeString = z
  .union([z.string(), z.number()])
  .transform((value) =>
    typeof value === 'number'
      ? `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`
      : value
  );

/** Optional venue-logistics fields shared by shows and events — surfaced via InfoRow/KnowBeforeYouGo. */
const visitInfoFields = {
  dressCode: z.string().optional(),
  doorsOpenMinutesBefore: z.number().optional(),
  runTime: z.string().optional(),
  concessionsNote: z.string().optional(),
  accessibility: z
    .object({
      wheelchairSeating: z.boolean().optional(),
      assistiveListening: z.boolean().optional(),
      aslAvailable: z.boolean().optional(),
      audioDescriptionAvailable: z.boolean().optional(),
      note: z.string().optional(),
    })
    .optional(),
};

/** Optional audition specifics a show or event can add alongside the org-wide Auditions page content. */
const auditionInfoFields = {
  auditions: z
    .object({
      /** Omitted or empty when audition dates haven't been announced yet (TBA). */
      auditionDates: z
        .array(
          z.object({
            date: dateString,
            time: timeString,
            location: z.string().optional(),
          })
        )
        .optional(),
      callbackDate: dateString.optional(),
      requirements: z.array(z.string()).optional(),
      signUpUrl: z.string().optional(),
      contactEmail: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
};

/** Which season's program an entry belongs to — editor-set, not derived from its dates (see hint in config.yml). */
const seasonField = z.string().regex(/^\d{4}$/, 'Format: 4-digit year, e.g. 2026');

/** Shared by the live `shows` collection and the `archivedShows` collection it eventually feeds. */
const showSchema = ({ image }: SchemaContext) =>
  rejectPlaceholders(z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    synopsis: z.string(),
    /** Short (~155-char) search/social description. Falls back to a truncated synopsis when omitted. */
    metaDescription: z.string().max(160).optional(),
    posterImage: image().optional(),
    posterAlt: z.string(),
    /**
     * Stable, unhashed social-share image (e.g. `/images/og/steel-magnolias.jpg`
     * under `public/`, ideally 1200x630) — intentionally NOT the `image()` helper,
     * since that produces a build-hashed path unsuitable for a stable OG URL.
     * When omitted, the page falls back to posterImage (portrait, but still
     * show-specific) and only uses the site default if there's no poster either.
     */
    ogImage: z.string().optional(),
    season: seasonField,
    runDates: z.array(
      z.object({
        date: dateString,
        /** Omitted when the time for this run date isn't set yet (TBA). */
        time: timeString.optional(),
        label: z.string().optional(),
        accessibilityTag: z.string().optional(),
      })
    ),
    venue: z.string(),
    ticketUrl: z.string(),
    ticketPrice: z.string().optional(),
    /** Ludus show/event ID — scopes an inline LudusWidget to just this production instead of the whole account. */
    ludusShowId: z.string().optional(),
    ...visitInfoFields,
    ...auditionInfoFields,
    /**
     * Group performing this show — defaults to Orangeburg Part-Time Players when omitted.
     * Set to `JR_OPTP_NAME` (`src/data/venue.ts`) for a Junior OPTP production, which tags
     * the show "JR Production" instead of "Guest Production" on ShowCard.
     */
    performingGroup: z.string().optional(),
    /** Director credit, surfaced editorially near the title on the show's own page. Not auto-derived from `crew`. */
    director: z.string().optional(),
    cast: z.array(z.string()).optional(),
    crew: z.array(z.string()).optional(),
    /** Hides this entry from the site (sitemap, listings, and its own page) without deleting it. */
    draft: z.boolean().optional(),
  }));

const shows = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/shows' }),
  schema: showSchema,
});

/** Swept here by scripts/archive-seasons.mjs once a season is 2+ years old — not editable via Decap. */
const archivedShows = defineCollection({
  loader: optionalGlob({ pattern: '**/*.yaml', base: './src/archive/shows' }),
  schema: showSchema,
});

const team = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/team' }),
  schema: ({ image }) =>
    rejectPlaceholders(z.object({
      name: z.string(),
      role: z.string(),
      group: z.enum(['board', 'staff']),
      bio: z.string().optional(),
      photoUrl: image().optional(),
    })),
});

const faqs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/faqs' }),
  schema: rejectPlaceholders(z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
  })),
});

const valueProps = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/valueProps' }),
  schema: rejectPlaceholders(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })),
});

const testimonials = defineCollection({
  loader: optionalGlob({ pattern: '*.yaml', base: './src/content/testimonials' }),
  schema: rejectPlaceholders(z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
  })),
});

const contact = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/contact' }),
  schema: rejectPlaceholders(z.object({
    phone: z.string(),
    email: z.string(),
    address: z.object({
      line1: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    }),
    /** Single source of truth for the P.O. box — donate.yaml and any component that needs it reads this instead of redeclaring it. */
    mailingAddress: z.string().optional(),
    mapLat: z.number().optional(),
    mapLng: z.number().optional(),
    socials: z.array(
      z.object({
        platform: z.string(),
        url: z.string(),
      })
    ),
    /** Heading/intro above the Contact page's message form. */
    formHeading: z.string().optional(),
    formIntro: z.string().optional(),
    /** Social-share image for the Contact page. Falls back to the site default when omitted. */
    ogImage: z.string().optional(),
  })),
});

const history = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/history' }),
  schema: ({ image }) =>
    rejectPlaceholders(z.object({
      intro: z.string(),
      /** Formal mission statement, shown as a pull-quote on the About page. */
      mission: z.string().optional(),
      milestones: z.array(
        z.object({
          year: z.string(),
          heading: z.string(),
          body: z.string(),
          imageUrl: image().optional(),
        })
      ),
      /** Social-share image for the About page. Falls back to the site default when omitted. */
      ogImage: z.string().optional(),
    })),
});

const donate = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/donate' }),
  schema: rejectPlaceholders(z.object({
    donationPlatformUrl: z.string(),
    pageTitle: z.string(),
    amountHelperText: z.string().optional(),
    nonprofitNote: z.string().optional(),
    /** Cash App handle (e.g. "$OPTP1981") — rendered on donate.astro as a link to https://cash.app/<handle>. */
    cashApp: z.string().optional(),
    givingLevels: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
        perks: z.array(z.string()),
      })
    ),
    sponsorshipTiers: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
        benefits: z.array(z.string()),
      })
    ),
    /**
     * Additional giving paths beyond the primary levels/sponsorship above. Each entry is
     * optional so an item can simply be omitted from content until it's operationally
     * ready (e.g. no recurring-gift copy until the donation platform actually supports it)
     * rather than shipping with placeholder text.
     */
    otherWaysToGive: z
      .object({
        sponsorProduction: z.object({ heading: z.string(), body: z.string(), ctaHref: z.string().optional() }).optional(),
        /** Confirmed supported natively by Ludus at checkout (monthly/quarterly/annual) — no extra site-side setup needed. */
        monthlyGiving: z.object({ heading: z.string(), body: z.string() }).optional(),
        inKind: z.object({ heading: z.string(), body: z.string() }).optional(),
        employerMatching: z.object({ heading: z.string(), body: z.string() }).optional(),
        legacyGiving: z.object({ heading: z.string(), body: z.string() }).optional(),
        /**
         * Confirmed possible via a Ludus Form attached to the donation flow (Fundraising ->
         * Settings), asking e.g. "In Memory of" / "Family Name for Program" — but that form has
         * to actually be set up in the Ludus admin first. Only populate this once it's live;
         * shipping the copy before the form exists would promise something that doesn't work yet.
         */
        memorialGifts: z.object({ heading: z.string(), body: z.string() }).optional(),
      })
      .optional(),
    /** Social-share image for the Donate page. Falls back to the site default when omitted. */
    ogImage: z.string().optional(),
  })),
});

const stats = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/stats' }),
  schema: rejectPlaceholders(z.object({
    items: z.array(
      z.object({
        value: z.number(),
        /** e.g. "+" or "%", appended after the count-up finishes. */
        suffix: z.string().optional(),
        label: z.string(),
      })
    ),
  })),
});

const getInvolved = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/getInvolved', generateId: literalFilenameId }),
  schema: rejectPlaceholders(z.object({
    signUpUrl: z.string(),
    /** Heading for the standalone Get Involved / Volunteer page. */
    pageTitle: z.string(),
    /** Lead paragraph under `pageTitle` — optional since not every page needs one. */
    intro: z.string().optional(),
    /** Eyebrow/title for the 3-card homepage teaser (GetInvolvedGrid) — a distinct, higher-altitude summary from `roles` below, not a duplicate of it. */
    homeTeaserEyebrow: z.string(),
    homeTeaserTitle: z.string(),
    homeTeaserCards: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          href: z.string(),
          buttonLabel: z.string(),
        })
      )
      .optional(),
    roles: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        commitment: z.string(),
        icon: z.string().optional(),
      })
    ),
    steps: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    /** Social-share image for the Volunteer page. Falls back to the site default when omitted. */
    ogImage: z.string().optional(),
  })),
});

/** Shared by the live `events` collection and the `archivedEvents` collection it eventually feeds. */
const eventSchema = ({ image }: SchemaContext) =>
  rejectPlaceholders(z.object({
    title: z.string(),
    description: z.string(),
    /** Short (~155-char) search/social description. Falls back to a truncated description when omitted. */
    metaDescription: z.string().max(160).optional(),
    season: seasonField,
    showDates: z
      .array(
        z.object({
          date: dateString,
          /** Omitted or empty when the time for this date is still TBA. */
          times: z
            .array(
              z.object({
                time: timeString,
                label: z.string().optional(),
                accessibilityTag: z.string().optional(),
              })
            )
            .optional(),
        })
      ),
    /** Who's presenting this event — e.g. a guest choir or a private rental. Not an OPTP production. */
    host: z.string().optional(),
    performers: z.array(z.string()).optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    /**
     * Stable, unhashed social-share image (e.g. `/images/og/my-event.jpg`
     * under `public/`, ideally 1200x630) — intentionally NOT the `image()` helper,
     * since that produces a build-hashed path unsuitable for a stable OG URL.
     * When omitted, the page falls back to the event's own `image` and only
     * uses the site default if there's no image either.
     */
    ogImage: z.string().optional(),
    ticketUrl: z.string().optional(),
    ticketPrice: z.string().optional(),
    /** Ludus show/event ID — scopes an inline LudusWidget to just this production instead of the whole account. */
    ludusShowId: z.string().optional(),
    ...visitInfoFields,
    ...auditionInfoFields,
    /** Hides this entry from the site (sitemap, listings, and its own page) without deleting it. */
    draft: z.boolean().optional(),
  }));

const events = defineCollection({
  loader: optionalGlob({ pattern: '*.yaml', base: './src/content/events' }),
  schema: eventSchema,
});

/** Swept here by scripts/archive-seasons.mjs once a season is 2+ years old — not editable via Decap. */
const archivedEvents = defineCollection({
  loader: optionalGlob({ pattern: '**/*.yaml', base: './src/archive/events' }),
  schema: eventSchema,
});

const gallery = defineCollection({
  loader: optionalGlob({ pattern: '*.yaml', base: './src/content/gallery' }),
  schema: ({ image }) =>
    rejectPlaceholders(z.object({
      photo: image(),
      alt: z.string(),
      caption: z.string().optional(),
    })),
});

const rentals = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/rentals' }),
  schema: ({ image }) =>
    rejectPlaceholders(z.object({
      intro: z.string(),
      /** Eyebrow/title for the homepage teaser (RentalsTeaser) that links to this page. */
      teaserEyebrow: z.string(),
      teaserTitle: z.string(),
      /** Intro sentence above the rental-inquiry form. */
      formIntro: z.string().optional(),
      capacity: z.string(),
      /** Physical stage dimensions — omit rather than estimate; not every venue fact is verified. */
      stageDimensions: z.string().optional(),
      /** Short verified facts shown at the top of the page (e.g. capacity, building age, location) — replaces a rigid capacity/dimensions/amenities trio. */
      topFacts: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          })
        )
        .optional(),
      amenities: z.array(z.string()).optional(),
      rateTiers: z.array(
        z.object({
          name: z.string(),
          rate: z.string(),
          description: z.string().optional(),
        })
      ),
      /** Note shown below the rate tiers for needs a flat rate doesn't cover — not itself a tier. */
      additionalNeedsNote: z.string().optional(),
      photos: z
        .array(
          z.object({
            photo: image(),
            alt: z.string(),
          })
        )
        .optional(),
      /** Social-share image for the Rentals page. Falls back to the site default when omitted. */
      ogImage: z.string().optional(),
    })),
});

const extras = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/extras' }),
  schema: rejectPlaceholders(z.object({
    alsoAtTheBlueBird: z.string(),
    /** General audition info for the adult company, shown on the Auditions page alongside Junior OPTP. */
    adultOptp: z.object({
      description: z.string(),
      auditionWindow: z.string(),
      contactEmail: z.string(),
    }),
    juniorOptp: z.object({
      ageRange: z.string(),
      description: z.string(),
      auditionWindow: z.string(),
      performanceWindow: z.string(),
      contactEmail: z.string(),
      /** Title for the homepage banner (JuniorOptpBanner) — the rest of that component's copy comes from this same object. */
      bannerTitle: z.string(),
    }),
    /** Copy for /auditions/sign-up-soon, shown when a show/event has no auditions.signUpUrl yet. */
    auditionSignUpSoon: z
      .object({
        title: z.string(),
        description: z.string(),
      })
      .optional(),
    /** Social-share image for the Auditions page. Falls back to the site default when omitted. */
    ogImage: z.string().optional(),
  })),
});

/**
 * Technical fallback/integration values an editor may need to change without touching code —
 * distinct from `siteCopy`, which is marketing copy.
 */
const siteSettings = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/siteSettings', generateId: literalFilenameId }),
  schema: rejectPlaceholders(z.object({
    /** General Ludus ticketing portal (all events/sections) — linked directly from the Tickets page, not used as a per-show fallback (that's the site's own /tickets/ page instead). */
    ludusFallbackUrl: z.string(),
    /**
     * Ludus Direct Form for general audition interest (More -> Forms in the Ludus admin, shared
     * as a Direct Form so it isn't tied to a specific event) — captures sign-ups into the CRM
     * even when no specific show has published its own `auditions.signUpUrl` yet. Used as the
     * fallback on the Auditions page's division panels, the "Auditioning Now" cards, and the
     * /auditions/sign-up-soon/ page. Left unset until that form actually exists in Ludus —
     * everything that reads it degrades to the existing mailto/placeholder behavior until then.
     */
    ludusAuditionInterestFormUrl: z.string().optional(),
  })),
});

const siteCopy = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/siteCopy', generateId: literalFilenameId }),
  schema: rejectPlaceholders(z.object({
    heroEyebrow: z.string(),
    heroTitle: z.string(),
    heroDescription: z.string(),
    footerTagline: z.string(),
    /** Appended after "© 1981–{year} Orangeburg Part-Time Players, " in the footer. */
    footerCopyrightNote: z.string(),
    newsletterEyebrow: z.string(),
    newsletterTitle: z.string(),
    newsletterDescription: z.string(),
    venueInfoStripTitle: z.string(),
    /** Social-share image for the Home page. Falls back to the site default when omitted. */
    ogImage: z.string().optional(),
  })),
});

export const collections = {
  shows,
  archivedShows,
  team,
  faqs,
  valueProps,
  testimonials,
  contact,
  history,
  donate,
  stats,
  getInvolved,
  rentals,
  extras,
  gallery,
  events,
  archivedEvents,
  siteCopy,
  siteSettings,
};
