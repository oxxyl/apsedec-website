import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * The Quick answers bank, served as a static JSON file.
 *
 * The widget fetches this the first time it is opened, so the FAQ content
 * contributes 0KB to initial page load (BRIEF.md §9). Keeping it out of the
 * page HTML also means one cached copy serves every page.
 */
export const GET: APIRoute = async () => {
  const entries = await getCollection('faq');

  const bank = entries.map((entry) => ({
    id: entry.id,
    question: entry.data.question,
    answer: entry.data.answer,
    keywords: entry.data.keywords,
    page: entry.data.page ?? null,
  }));

  return new Response(JSON.stringify(bank), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
