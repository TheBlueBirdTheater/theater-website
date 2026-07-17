import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const shows = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/shows' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    synopsis: z.string(),
    posterImage: z.string(),
    posterAlt: z.string(),
    runDates: z.array(
      z.object({
        date: z.string(),
        time: z.string(),
        label: z.string().optional(),
      })
    ),
    venue: z.string(),
    ticketUrl: z.string(),
    ticketPrice: z.string().optional(),
    /** Group performing this show — defaults to Orangeburg Part-Time Players when omitted. */
    performingGroup: z.string().optional(),
    cast: z.array(z.string()).optional(),
    crew: z.array(z.string()).optional(),
    status: z.enum(['upcoming', 'current', 'past']),
  }),
});

const auditions = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/auditions' }),
  schema: z.object({
    showTitle: z.string(),
    auditionDates: z.array(
      z.object({
        date: z.string(),
        time: z.string(),
        location: z.string(),
      })
    ),
    callbackDate: z.string().optional(),
    requirements: z.array(z.string()),
    signUpUrl: z.string(),
    contactEmail: z.string(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(['board', 'staff']),
    bio: z.string().optional(),
    photoUrl: z.string().optional(),
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
  loader: glob({ pattern: '*.yaml', base: './src/content/testimonials' }),
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
  schema: z.object({
    intro: z.string(),
    milestones: z.array(
      z.object({
        year: z.string(),
        heading: z.string(),
        body: z.string(),
        imageUrl: z.string().optional(),
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
};
