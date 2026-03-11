import { createClient } from '@sanity/client';

const projectId = (import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '').trim();
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET ?? '').trim();
const apiVersion = (import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2025-01-01').trim();
const useCdn = (import.meta.env.PUBLIC_SANITY_USE_CDN ?? 'true').trim().toLowerCase() !== 'false';

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      perspective: 'published',
    })
  : null;
