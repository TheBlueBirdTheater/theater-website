// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Netlify sets `URL` at build time to the site's primary domain (custom domain if one is
  // attached, otherwise the *.netlify.app subdomain) — falls back to the optp.org placeholder
  // (unconfirmed per BRAND/CONTACT spec) when building outside Netlify.
  site: process.env.URL || 'https://optp.org',
  output: 'static',
  integrations: [mdx(), sitemap()],
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
