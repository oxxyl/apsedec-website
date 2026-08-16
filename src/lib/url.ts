/**
 * Internal-link helpers for a site that may be mounted under a sub-path.
 *
 * Astro rewrites the assets it emits itself (bundled CSS/JS, `astro:assets`
 * images) for `base`, but hand-written markup is left exactly as authored:
 * an `href="/about/"` or a `fetch('/faq.json')` still points at the domain
 * root and 404s under /apsedec-website/. Every such path goes through `path()`.
 *
 * BASE_URL is '/' at a domain root and '/apsedec-website/' on the Pages
 * project URL. Astro's trailing slash on that value has varied across
 * versions, so these helpers normalise rather than assume.
 */

/** BASE_URL with any trailing slash removed: '' at a root, '/apsedec-website'. */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Prefix a root-relative internal path with the deploy base.
 *
 * Anything not starting with '/' — mailto:, tel:, https:, '#anchor' — is
 * returned untouched, so this is safe to wrap around a mixed link list.
 */
export function path(href: string): string {
  if (!href.startsWith('/')) return href;
  return `${BASE}${href}`;
}

/**
 * Remove the deploy base from a pathname, giving the route as authored.
 *
 * Astro.url.pathname carries the base in some build modes and not others;
 * feeding it through here first makes canonical-URL construction identical
 * either way.
 */
export function routePath(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/';
  return pathname;
}

/**
 * Absolute URL for an internal path — canonicals, og:image, sitemap entries.
 * `site` is Astro.site, which is the origin only; the base lives here.
 */
export function absolute(href: string, site: URL | string): string {
  return new URL(path(href), site).href;
}
