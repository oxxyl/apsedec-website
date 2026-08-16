import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections (BRIEF.md §6).
 *
 * NOTE ON FILE LOCATION: the brief specifies `src/content/config.ts`. Astro 7
 * resolves the collection config from `src/content.config.ts` (the Content
 * Layer API); the old path is no longer read. Same schemas, current API.
 */

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      status: z.enum(['active', 'completed']),
      donor: z.array(z.string()),
      partners: z.array(z.string()).optional(),
      /** Must match map district IDs. Empty = districts not yet named by the client. */
      districts: z.array(z.string()).default([]),
      /** Sub-regions, where the profile gives a region but not a district list. */
      regions: z.array(z.string()).optional(),
      period: z.object({ start: z.string(), end: z.string().optional() }),
      refCode: z.string().optional(),
      sector: z.array(z.string()),
      summary: z.string(),
      /** Headline reach figure, shown as the ledger pull-number. */
      reach: z.string().optional(),
      heroImage: image().optional(),
      featured: z.boolean().default(false),
    }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      heroImage: image().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const partners = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/partners' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image().optional(), // optional until the client supplies logo files
      url: z.string().url().optional(),
      /**
       * Every partner sits in one of these three lists; there is no separate
       * founding category. UNDP's founding relationship is a fact about
       * APSEDEC's history, so it is told in the About timeline rather than by
       * setting UNDP apart from the organisations it sits alongside.
       *
       * Keep this enum in step with the groups rendered on partners.astro — a
       * value with no matching group would drop the entry off the page.
       */
      type: z.enum(['donor', 'implementing', 'government']),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      photo: image().optional(),
      board: z.boolean(),
      order: z.number(),
    }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    file: z.string(),
    category: z.enum(['report', 'policy', 'financial']),
  }),
});

/** Bank for the rule-based "Quick answers" assistant (§9). */
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    keywords: z.array(z.string()),
    page: z.array(z.string()).optional(),
  }),
});

/**
 * Open vacancies. Postings are added and removed regularly, so /careers/ is
 * driven entirely by this collection — an empty directory is a valid state and
 * renders the "no open vacancies" message rather than a placeholder page.
 *
 * `closing` is a date so the page can sort by it and mark a posting closed
 * without anyone having to delete the file on the day.
 */
const vacancies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vacancies' }),
  schema: z.object({
    title: z.string(),
    closing: z.coerce.date(),
    location: z.string(),
    /** One-line summary for the listing; the Markdown body carries the detail. */
    description: z.string(),
    howToApply: z.string(),
  }),
});

export const collections = { projects, news, partners, team, resources, faq, vacancies };
