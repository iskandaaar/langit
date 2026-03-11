const configuredTallyFormId = (import.meta.env.PUBLIC_TALLY_FORM_ID ?? '').trim();
const configuredSiteUrl = (import.meta.env.PUBLIC_SITE_URL ?? '').trim();
const configuredOgImage = (import.meta.env.PUBLIC_OG_IMAGE ?? '').trim();

export const siteConfig = {
  name: 'Angkasa Supply',
  tagline: 'Aircraft parts, engines, and AOG sourcing built for commercial clarity.',
  description:
    'Angkasa Supply supports aircraft parts, engine, and AOG sourcing across APAC with a controlled RFQ workflow and a global supplier network.',
  cta: {
    primaryLabel: 'Submit RFQ',
    primaryHref: '/rfq',
    secondaryLabel: 'AOG Desk',
    secondaryHref: '/contact#aog-desk',
  },
  contact: {
    email: 'sales@angkasasupply.com',
    location: 'Kuala Lumpur, Malaysia',
    legalEntity: 'Neatly Nea Sdn Bhd (202501059817)',
  },
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/engine-sourcing', label: 'Engine Sourcing' },
    { href: '/aog-support', label: 'AOG Support' },
    { href: '/rotable-parts', label: 'Rotable Parts' },
    { href: '/aviation-consumables', label: 'Consumables' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  footerNavigation: [
    { href: '/inventory', label: 'Inventory' },
    { href: '/engine-sourcing', label: 'Engine Sourcing' },
    { href: '/aog-support', label: 'AOG Support' },
    { href: '/rotable-parts', label: 'Rotable Parts' },
    { href: '/aviation-consumables', label: 'Consumables' },
    { href: '/surplus-inventory', label: 'Surplus Inventory' },
    { href: '/process', label: 'Process' },
    { href: '/compliance', label: 'Compliance' },
  ],
  footerUtilityLinks: [
    { href: '/privacy', label: 'Privacy Policy' },
  ],
  tally: {
    // Preferred: set PUBLIC_TALLY_FORM_ID in environment variables.
    // Fallback: paste the Form ID here if you need a quick local test.
    formId: configuredTallyFormId || 'REPLACE_WITH_TALLY_FORM_ID',
    embedMode: 'full-page' as const,
  },
  seo: {
    siteUrl: (configuredSiteUrl || 'https://angkasasupply.com').replace(/\/+$/, ''),
    defaultOgImage: configuredOgImage || '/og-image.png',
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
