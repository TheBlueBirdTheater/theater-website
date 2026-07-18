import { defineCollection } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';

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
  accessibilityNote: z.string().optional(),
};

const shows = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/shows' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      synopsis: z.string(),
      posterImage: image().optional(),
      posterAlt: z.string(),
      runDates: z.array(
        z.object({
          date: dateString,
          time: timeString,
          label: z.string().optional(),
        })
      ),
      venue: z.string(),
      ticketUrl: z.string(),
      ticketPrice: z.string().optional(),
      ...visitInfoFields,
      /** Group performing this show — defaults to Orangeburg Part-Time Players when omitted. */
      performingGroup: z.string().optional(),
      cast: z.array(z.string()).optional(),
      crew: z.array(z.string()).optional(),
    }),
});

const auditions = defineCollection({
  loader: optionalGlob({ pattern: '*.yaml', base: './src/content/auditions' }),
  schema: z.object({
    showTitle: z.string(),
    auditionDates: z.array(
      z.object({
        date: dateString,
        time: z.string(),
        location: z.string(),
      })
    ),
    callbackDate: dateString.optional(),
    requirements: z.array(z.string()),
    signUpUrl: z.string(),
    contactEmail: z.string(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      group: z.enum(['board', 'staff']),
      bio: z.string().optional(),
      photoUrl: image().optional(),
    }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
  }),
});

const valueProps = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/valueProps' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: optionalGlob({ pattern: '*.yaml', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/contact' }),
  schema: z.object({
    phone: z.string(),
    email: z.string(),
    address: z.object({
      line1: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    }),
    mapLat: z.number().optional(),
    mapLng: z.number().optional(),
    socials: z.array(
      z.object({
        platform: z.string(),
        url: z.string(),
      })
    ),
  }),
});

const history = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/history' }),
  schema: ({ image }) =>
    z.object({
      intro: z.string(),
      milestones: z.array(
        z.object({
          year: z.string(),
          heading: z.string(),
          body: z.string(),
          imageUrl: image().optional(),
        })
      ),
    }),
});

const donate = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/donate' }),
  schema: z.object({
    donationPlatformUrl: z.string(),
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
  }),
});

const getInvolved = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/getInvolved' }),
  schema: z.object({
    signUpUrl: z.string(),
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
  }),
});

const events = defineCollection({
  loader: optionalGlob({ pattern: '*.yaml', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
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
                })
              )
              .optional(),
          })
        )
        .min(1),
      /** Who's presenting this event — e.g. a guest choir or a private rental. Not an OPTP production. */
      host: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      ticketUrl: z.string().optional(),
      ticketPrice: z.string().optional(),
      ...visitInfoFields,
    }),
});

const gallery = defineCollection({
  loader: optionalGlob({ pattern: '*.yaml', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      photo: image(),
      alt: z.string(),
      caption: z.string().optional(),
    }),
});

const extras = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/extras' }),
  schema: z.object({
    alsoAtTheBlueBird: z.string(),
    juniorOptp: z.object({
      ageRange: z.string(),
      description: z.string(),
      auditionWindow: z.string(),
      performanceWindow: z.string(),
      contactEmail: z.string(),
    }),
  }),
});

export const collections = {
  shows,
  auditions,
  team,
  faqs,
  valueProps,
  testimonials,
  contact,
  history,
  donate,
  getInvolved,
  extras,
  gallery,
  events,
};
