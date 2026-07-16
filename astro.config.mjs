// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: optp.org is unconfirmed per BRAND/CONTACT spec — required for @astrojs/sitemap
  // and for SEO.astro's canonical/OG URLs to resolve. Update once the production domain is locked.
  site: 'https://optp.org',
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
