// @ts-check
import { defineConfig } from 'astro/config';

/**
 * The deploy target comes from the environment, so one commit builds correctly
 * for both the GitHub Pages project URL and the eventual custom domain.
 *
 *   SITE_URL   absolute origin the site is served from
 *   BASE_PATH  sub-path it is mounted at ('/' when it sits at a domain root)
 *
 * .github/workflows/deploy.yml feeds these from actions/configure-pages, which
 * reports whatever the repository's Pages settings actually say. Pointing
 * Settings → Pages at apsedec.com is therefore the whole cutover — the next
 * build picks up the new origin and drops the sub-path on its own, with no
 * edit to this file.
 *
 * The defaults describe production, so a bare `npm run build` is the
 * apsedec.com build.
 */
const SITE_URL = process.env.SITE_URL || 'https://apsedec.com';
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  build: {
    // Emit /about/index.html so URLs stay trailing-slash consistent on Pages.
    format: 'directory',
  },
  vite: {
    build: {
      // The brief's performance budget: keep an eye on what ships.
      assetsInlineLimit: 0,
    },
  },
});
