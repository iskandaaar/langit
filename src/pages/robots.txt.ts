import type { APIRoute } from 'astro';
import { toAbsoluteSiteUrl } from '../config/site';

export const prerender = true;

const getSitemapUrl = (site?: URL): string | null => {
  if (site) return new URL('/sitemap.xml', site).toString();
  return toAbsoluteSiteUrl('/sitemap.xml');
};

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = getSitemapUrl(site);

  const lines = ['User-agent: *', 'Allow: /'];
  if (sitemapUrl) lines.push(`Sitemap: ${sitemapUrl}`);

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
