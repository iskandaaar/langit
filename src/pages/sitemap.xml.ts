import type { APIRoute } from 'astro';
import { toAbsoluteSiteUrl } from '../config/site';

export const prerender = true;

const staticPaths = ['/', '/capabilities', '/process', '/compliance', '/contact', '/rfq', '/privacy'];

const getBaseSiteUrl = (site?: URL): string | null => {
  if (site) return site.toString().replace(/\/+$/, '');

  const fallback = toAbsoluteSiteUrl('/');
  return fallback ? fallback.replace(/\/+$/, '') : null;
};

export const GET: APIRoute = ({ site }) => {
  const baseSiteUrl = getBaseSiteUrl(site);
  const urls = baseSiteUrl
    ? staticPaths.map((path) => new URL(path, `${baseSiteUrl}/`).toString())
    : [];

  const urlEntries = urls
    .map(
      (url) => `<url>
  <loc>${url}</loc>
</url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
