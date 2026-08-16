import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

/**
 * sitemap.xml, hand-rolled rather than pulling in @astrojs/sitemap — the brief
 * caps dependencies (§14) and this is a dozen lines.
 *
 * /donate/thank-you/ is deliberately excluded: it is noindex.
 */
export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');
  const news = await getCollection('news');

  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'monthly' },
    { path: '/about/', priority: '0.8', changefreq: 'yearly' },
    { path: '/what-we-do/', priority: '0.8', changefreq: 'yearly' },
    { path: '/projects/', priority: '0.9', changefreq: 'monthly' },
    { path: '/where-we-work/', priority: '0.8', changefreq: 'monthly' },
    { path: '/partners/', priority: '0.6', changefreq: 'yearly' },
    { path: '/resources/', priority: '0.6', changefreq: 'monthly' },
    { path: '/news/', priority: '0.7', changefreq: 'weekly' },
    { path: '/donate/', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact/', priority: '0.7', changefreq: 'yearly' },
  ];

  const urls = [
    ...staticPages,
    ...projects.map((p) => ({
      path: `/projects/${p.id}/`,
      priority: '0.6',
      changefreq: 'yearly',
    })),
    ...news.map((n) => ({
      path: `/news/${n.id}/`,
      priority: '0.5',
      changefreq: 'yearly',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE.url}${url.path}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
