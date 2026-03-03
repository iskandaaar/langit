const configuredTallyFormId = (import.meta.env.PUBLIC_TALLY_FORM_ID ?? '').trim();
const configuredSiteUrl = (import.meta.env.PUBLIC_SITE_URL ?? '').trim();
const configuredOgImage = (import.meta.env.PUBLIC_OG_IMAGE ?? '').trim();

export const siteConfig = {
  name: 'Langit Aero',
  tagline: 'Consumables to engines, sourced right.',
  description:
    'Langit Aero brokers aircraft spare parts across APAC with global supplier reach and a strict traceability-first workflow.',
  cta: {
    primaryLabel: 'Submit RFQ',
    primaryHref: '/rfq',
    secondaryLabel: 'AOG Desk',
    secondaryHref: '/contact#aog-desk',
  },
  contact: {
    email: 'sales@langitaero.com',
    whatsapp: '+60 00-000 0000',
    location: 'Kuala Lumpur, Malaysia',
    legalEntity: 'Neatly Nea Sdn Bhd (202501059817)',
  },
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/process', label: 'Process' },
    { href: '/compliance', label: 'Compliance' },
    { href: '/contact', label: 'Contact' },
  ],
  tally: {
    // Preferred: set PUBLIC_TALLY_FORM_ID in environment variables.
    // Fallback: paste the Form ID here if you need a quick local test.
    formId: configuredTallyFormId || 'REPLACE_WITH_TALLY_FORM_ID',
    embedMode: 'full-page' as const,
  },
  seo: {
    siteUrl: (configuredSiteUrl || 'https://langitaero.com').replace(/\/+$/, ''),
    defaultOgImage: configuredOgImage || '/og-default.svg',
    twitterHandle: '',
  },
};

export const hasConfiguredTallyForm =
  siteConfig.tally.formId.length > 0 && siteConfig.tally.formId !== 'REPLACE_WITH_TALLY_FORM_ID';

export const tallyEmbedUrl = hasConfiguredTallyForm
  ? `https://tally.so/r/${siteConfig.tally.formId}?hideTitle=1&transparentBackground=1&dynamicHeight=1`
  : '';

export const toAbsoluteSiteUrl = (path: string): string | null => {
  if (!siteConfig.seo.siteUrl) return null;

  try {
    return new URL(path, siteConfig.seo.siteUrl).toString();
  } catch {
    return null;
  }
};
