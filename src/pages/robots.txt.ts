import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { path, absolute } from '../lib/url';

/**
 * robots.txt, generated rather than static, so the Sitemap line follows the
 * deploy target instead of naming apsedec.com from a Pages preview build.
 *
 * A preview build is also told not to index at all: a second crawlable copy of
 * the whole site on github.io would compete with apsedec.com in search.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.url)).toString();
  const isProduction = new URL(origin).hostname === new URL(SITE.url).hostname;

  const body = isProduction
    ? `User-agent: *
Allow: /

# The donation receipt reflects payment-provider parameters and carries a
# noindex tag; keep crawlers off it entirely.
Disallow: ${path('/donate/thank-you/')}

Sitemap: ${absolute('/sitemap.xml', origin)}
`
    : `# Preview deploy — not the canonical site. See ${SITE.url}
User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
