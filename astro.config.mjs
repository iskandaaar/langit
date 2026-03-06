// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

const site = process.env.PUBLIC_SITE_URL?.trim() || 'https://langitaero.com';

// https://astro.build/config
export default defineConfig({
  site,

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});