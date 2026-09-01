// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site-url';

// https://astro.build/config
export default defineConfig({
  // Shared with src/data/venue.ts's SITE_URL (both read src/data/site-url.ts) so the two
  // can't drift apart — see src/data/site-url.ts for the Netlify `URL` env var behavior.
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !pathname.startsWith('/admin') && !pathname.includes('zz-test');
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        // WSL2 can't reliably see inotify events for files on the Windows
        // filesystem (/mnt/d/...), so the dev server never picks up edits
        // without falling back to polling.
        usePolling: true,
        interval: 100,
      },
    },
  },
});
