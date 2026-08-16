// @ts-check
import { defineConfig } from 'astro/config';

// Production target is the custom domain (public/CNAME -> apsedec.com).
//
// To preview at https://oxxyl.github.io/apsedec-website/ BEFORE the DNS
// cutover, temporarily set:
//   site: 'https://oxxyl.github.io', base: '/apsedec-website'
// and delete public/CNAME. See README "Deployment & DNS".
export default defineConfig({
  site: 'https://apsedec.com',
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
