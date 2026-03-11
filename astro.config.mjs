// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL?.trim() || 'https://angkasasupply.com';

// https://astro.build/config
export default defineConfig({
  site,
  redirects: {
    '/capabilities': '/engine-sourcing',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
