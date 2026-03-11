import type { Article, InventoryCategoryPage, InventoryItem, PortableTextBlock, ServicePage } from './types';

const block = (text: string, style = 'normal'): PortableTextBlock => ({
  _type: 'block',
  style,
  children: [
    {
      _type: 'span',
      text,
      marks: [],
    },
  ],
});

const bulletItems = (items: string[]): PortableTextBlock[] =>
  items.map((item) => ({
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [
      {
        _type: 'span',
        text: item,
        marks: [],
      },
    ],
  }));

const portableBody = (paragraphs: string[], bullets: string[] = []): PortableTextBlock[] => [
  ...paragraphs.map((paragraph, index) => block(paragraph, index === 0 ? 'normal' : 'normal')),
  ...bulletItems(bullets),
];

export const inventoryCategoryPages: InventoryCategoryPage[] = [
  {
    slug: 'engines',
    title: 'Aircraft Engines',
    seoTitle: 'Aircraft Engines Inventory | Langit Aero',
    seoDescription:
      'Curated aircraft engine availability for APAC buyers, with RFQ-led sourcing support, documentation review, and alternate-condition handling.',
    intro:
      'Engine inquiries are handled through disciplined RFQ intake, documentation review, and commercial coordination across a global supplier network.',
    body: portableBody(
      [
        'Our engine inventory pages are designed for operators, MROs, and brokers who need a credible starting point rather than speculative stock language.',
        'Each published engine listing includes condition, region, certification context, and enough commercial copy to support both search visibility and RFQ conversion.',
      ],
      [
        'Used serviceable, overhauled, and RFQ-based engine availability',
        'Regional support for APAC and Middle East buyers',
        'Alternate-condition sourcing when exact stock is not released',
      ],
    ),
    faq: [
      {
        question: 'Do you publish full engine identity details?',
        answer:
          'Only where commercially appropriate. We keep sensitive identity data controlled and disclose additional documentation during the inquiry process.',
      },
      {
        question: 'Can you support alternate condition requests?',
        answer:
          'Yes. If the listed condition does not fit the requirement, the RFQ flow is used to surface alternate options from the supplier network.',
      },
    ],
  },
  {
    slug: 'rotables',
    title: 'Rotable Parts',
    seoTitle: 'Rotable Parts Inventory | Langit Aero',
    seoDescription:
      'Rotable inventory pages for aircraft operators and MROs, with traceability-first RFQ support and condition-aware sourcing.',
    intro:
      'Rotable pages focus on parts where condition, trace, and cert status materially affect buying decisions and response time.',
    body: portableBody(
      [
        'The rotable section prioritizes listings with enough detail to be useful commercially: part number identity, condition, region, certification, and practical RFQ messaging.',
        'Listings are grouped to support internal linking from service pages and long-tail searches for exact part numbers or condition codes.',
      ],
      [
        'Condition-aware rotable sourcing',
        'Traceability and certification context on-page',
        'RFQ escalation for alternate stock and exchange scenarios',
      ],
    ),
    faq: [
      {
        question: 'Are all rotables indexable?',
        answer:
          'No. Only listings with enough unique commercial value are published for search indexing. Thin or duplicate entries stay out of the index.',
      },
      {
        question: 'Do you support exchange requests?',
        answer:
          'Yes. Rotable RFQs can include exchange, outright, or alternate-condition requirements depending on the buyer mandate.',
      },
    ],
  },
  {
    slug: 'consumables',
    title: 'Consumables And Expendables',
    seoTitle: 'Aviation Consumables Inventory | Langit Aero',
    seoDescription:
      'Aviation consumables and expendables sourcing support for APAC operators, with RFQ-led response and certification-aware brokerage.',
    intro:
      'The consumables section targets repeat-demand parts and shortage recovery use cases, with listing pages designed for exact part-number discovery.',
    body: portableBody(
      [
        'Consumable and expendable demand is often routine until it suddenly becomes urgent. The category structure supports both planned procurement and disruption response.',
        'Published listings are curated to avoid the thin spreadsheet problem that weakens crawl value and conversion quality.',
      ],
      [
        'Repeat-demand consumables and shortage recovery',
        'Part-number led listing structure',
        'RFQ routing for volume, certification, and timing requirements',
      ],
    ),
    faq: [
      {
        question: 'Can consumables still support AOG workflows?',
        answer:
          'Yes. If timing is critical, the RFQ path carries urgency context into the same commercial workflow used for higher-value sourcing.',
      },
      {
        question: 'Do you show pricing publicly?',
        answer:
          'No. Consumable listings remain RFQ-first unless approved pricing can be shown accurately and consistently.',
      },
    ],
  },
];

export const servicePages: ServicePage[] = [
  {
    title: 'Aircraft Engine Sourcing',
    slug: 'engine-sourcing',
    heroTitle: 'Aircraft engine sourcing with commercial discipline and documentation awareness.',
    heroIntro:
      'Langit Aero supports operators, MROs, asset managers, and brokers with engine RFQs that need clear condition language, region visibility, and controlled supplier handling.',
    seoTitle: 'Aircraft Engine Sourcing | Langit Aero',
    seoDescription:
      'Aircraft engine sourcing and broker support for APAC buyers. RFQ-led handling for used serviceable, overhauled, and alternate-condition engine demand.',
    featuredCategory: 'engines',
    highlights: [
      'Used serviceable, overhauled, and alternate-condition support',
      'Documentation review coordination before commercial commitment',
      'Structured handling of mission profile, budget, and timing constraints',
    ],
    body: portableBody(
      [
        'Engine sourcing carries more technical and commercial sensitivity than routine parts demand, so the process needs tighter control from the first RFQ.',
        'We use structured intake to confirm model, variant, condition expectation, region, documentation posture, and commercial path before representing availability.',
        'That keeps the site credible for search while making it clear that final release of details follows an inquiry and review process.',
      ],
      [
        'RFQ handling for TPE331, CFM56, PT6A, and comparable engine families',
        'Support across outright, alternate condition, and replacement sourcing scenarios',
        'Commercial copy written to rank without exposing confidential supplier details',
      ],
    ),
    faq: [
      {
        question: 'Do you publish engine serial numbers on listing pages?',
        answer:
          'No by default. ESN visibility is controlled and handled according to the commercial posture of each opportunity.',
      },
      {
        question: 'What information should a buyer include?',
        answer:
          'Model or variant, condition preference, timing, region, documentation expectations, and whether alternate-condition offers are acceptable.',
      },
    ],
  },
  {
    title: 'AOG Parts Support',
    slug: 'aog-support',
    heroTitle: 'AOG support built around fast intake, alternate lanes, and clear status handling.',
    heroIntro:
      'Urgent grounded-aircraft demand needs one accountable workflow, not fragmented updates. The AOG path keeps intake, sourcing, and communication in a single response loop.',
    seoTitle: 'AOG Parts Support APAC | Langit Aero',
    seoDescription:
      'AOG parts support for APAC operators and MROs. Submit urgent RFQs with destination, needed-by time, and certification requirement for faster handling.',
    featuredCategory: 'rotables',
    highlights: [
      'Priority handling for grounded-aircraft requests',
      'Destination, needed-by time, and cert expectation captured in one pass',
      'Alternate sourcing lanes activated when primary supply slips',
    ],
    body: portableBody(
      [
        'AOG sourcing is a communication problem as much as a parts problem. The public page needs to reassure buyers that urgency, destination, and certification are captured properly from the start.',
        'That is why the page and RFQ flow emphasize complete intake data rather than broad promises. Speed comes from disciplined routing, not vague claims.',
      ],
      [
        'AOG-tagged RFQ path with timing and destination context',
        'Clock-driven communication expectations',
        'Fallback sourcing strategy when first options collapse',
      ],
    ),
    faq: [
      {
        question: 'How should urgent requests be submitted?',
        answer:
          'Use the RFQ path, include the needed-by time and destination, and mark the request as AOG so it is routed correctly.',
      },
      {
        question: 'Can you support both consumables and rotables under AOG?',
        answer:
          'Yes. The escalation path applies across parts classes, with stricter review as value and documentation complexity increase.',
      },
    ],
  },
  {
    title: 'Aircraft Rotable Parts',
    slug: 'rotable-parts',
    heroTitle: 'Rotable parts sourcing for buyers who need cert visibility and clear condition language.',
    heroIntro:
      'Rotable demand often sits between routine procurement and time-critical recovery. The site and RFQ flow are structured around traceability-first quoting and controlled stock representation.',
    seoTitle: 'Aircraft Rotable Parts Supplier | Langit Aero',
    seoDescription:
      'Aircraft rotable parts sourcing with RFQ-led handling, traceability checks, and condition-aware listings for APAC buyers.',
    featuredCategory: 'rotables',
    highlights: [
      'Traceability-first rotable handling',
      'Condition-aware page structure for exact-match searches',
      'RFQ support for outright, exchange, and alternate stock',
    ],
    body: portableBody(
      [
        'Rotable pages should help the buyer verify that the listing is commercially real without publishing more than the sourcing model supports.',
        'We keep the public layer useful with part number identity, condition, certification context, and region, then move into deeper document review after inquiry.',
      ],
      [
        'Structured listing pages for exact part-number demand',
        'Support for cert-sensitive quoting',
        'Related inventory and article links to improve crawl depth',
      ],
    ),
    faq: [
      {
        question: 'What makes a rotable page indexable?',
        answer:
          'A listing must include unique page identity, useful commercial copy, clear specs, and an RFQ path. Thin entries stay out of the index.',
      },
      {
        question: 'Do you disclose supplier identity publicly?',
        answer:
          'No. Supplier identity is controlled and only disclosed where the transaction requires it.',
      },
    ],
  },
  {
    title: 'Aviation Consumables',
    slug: 'aviation-consumables',
    heroTitle: 'Aviation consumables sourcing for repeat demand, shortage recovery, and RFQ-based urgency.',
    heroIntro:
      'Consumables and expendables move faster than high-value assets, but they still need disciplined handling when availability, certification, and timing affect the job.',
    seoTitle: 'Aviation Consumables Supplier | Langit Aero',
    seoDescription:
      'Aviation consumables supplier support for APAC operators and MROs, with part-number led listings and RFQ workflows for urgent or repeat demand.',
    featuredCategory: 'consumables',
    highlights: [
      'Part-number led discovery for repeat-demand items',
      'Support for both routine replenishment and urgent recovery',
      'Listing pages designed to rank without becoming thin inventory clutter',
    ],
    body: portableBody(
      [
        'The consumables service page anchors broader commercial intent while category and listing pages capture more exact demand.',
        'That combination makes the site useful for both SEO and commercial workflows: stable pages build authority, while curated listings capture long-tail searches.',
      ],
      [
        'Consumables and expendables sourcing support',
        'Certification-aware RFQ handling',
        'Internal linking into curated listing pages',
      ],
    ),
    faq: [
      {
        question: 'Are consumables handled differently from rotables?',
        answer:
          'Yes. The volume and urgency profile differs, but the RFQ flow still captures condition, certification, and timing requirements where they matter.',
      },
      {
        question: 'Can repeat-demand items stay visible even when stock changes?',
        answer:
          'Yes. Strong listing pages can stay live with RFQ-based availability even as exact supply changes behind the scenes.',
      },
    ],
  },
  {
    title: 'Surplus Inventory Sales',
    slug: 'surplus-inventory',
    heroTitle: 'Surplus inventory support that preserves confidentiality while surfacing real buyer intent.',
    heroIntro:
      'Surplus and excess inventory pages need enough public value to rank and convert, without turning sensitive supplier or owner positions into public disclosures.',
    seoTitle: 'Surplus Aircraft Inventory Sales | Langit Aero',
    seoDescription:
      'Surplus aircraft inventory sales support for engines, rotables, and consumables with controlled public listing strategy and RFQ-led conversion.',
    featuredCategory: 'engines',
    highlights: [
      'Public listing strategy for controlled inventory release',
      'RFQ-first handling for price and supplier confidentiality',
      'Long-tail page structure for exact model and part-number demand',
    ],
    body: portableBody(
      [
        'Surplus inventory needs a different content approach from simple brokerage pages. The objective is to attract qualified demand without exposing too much operational detail.',
        'That is why listings are written as machine-readable commercial pages with clear identity, status, and RFQ calls to action rather than raw stock dumps.',
      ],
      [
        'Confidentiality-conscious public listing strategy',
        'Long-tail capture through curated item pages',
        'Related inventory linking for alternate-stock conversion',
      ],
    ),
    faq: [
      {
        question: 'Can expired surplus listings remain live?',
        answer:
          'Yes, if the page has enough unique value to keep attracting qualified demand and can point buyers to alternate stock or fresh RFQs.',
      },
      {
        question: 'Do you show warehouse or supplier names?',
        answer:
          'No. Public pages stay commercially useful without exposing sensitive source details.',
      },
    ],
  },
];

export const articles: Article[] = [
  {
    title: 'What Does USV Mean In Aviation?',
    slug: 'what-does-usv-mean-in-aviation',
    excerpt:
      'A short guide to what USV means in aircraft parts and engine trading, why the condition matters, and what buyers should verify before moving forward.',
    seoTitle: 'What Does USV Mean In Aviation? | Langit Aero',
    seoDescription:
      'Understand what USV means in aviation procurement, how it affects RFQs, and what buyers should confirm before purchasing.',
    author: 'Langit Aero',
    publishedAt: '2026-03-11',
    body: portableBody(
      [
        'USV typically refers to used serviceable condition, but that label alone does not answer the commercial questions a buyer actually has.',
        'The buyer still needs to confirm documentation posture, certification expectations, traceability, region, and any operational caveats that affect release or installation.',
        'For SEO, the article also acts as support content for listing and service pages that use condition language in titles and copy.',
      ],
      [
        'Condition terminology matters because it changes buyer expectations',
        'The public page should never imply more than the supporting documents justify',
        'A strong RFQ captures condition, cert requirement, and timing in one pass',
      ],
    ),
  },
  {
    title: 'Used Serviceable Engine Buying Checklist',
    slug: 'used-serviceable-engine-buying-checklist',
    excerpt:
      'Key technical and commercial checks to run before buying a used serviceable engine through a brokered supply channel.',
    seoTitle: 'Used Serviceable Engine Buying Checklist | Langit Aero',
    seoDescription:
      'A practical checklist for buyers evaluating used serviceable engines, including documentation, condition, timing, and commercial handling.',
    author: 'Langit Aero',
    publishedAt: '2026-03-11',
    body: portableBody(
      [
        'Used serviceable engines create risk when buyers move too quickly on incomplete information. A public checklist helps the site earn trust and supports engine-sourcing conversion pages.',
        'The checklist should combine documentation review points with commercial controls so buyers know what to request before they commit attention or budget.',
      ],
      [
        'Confirm model and variant identity',
        'Review documentation summary and condition posture',
        'Check region, timing, and alternate-condition options',
      ],
    ),
  },
  {
    title: 'Rotables Vs Consumables In Aviation Procurement',
    slug: 'rotables-vs-consumables-in-aviation-procurement',
    excerpt:
      'How rotable and consumable procurement differ in urgency, certification context, and RFQ handling for operators and MRO buyers.',
    seoTitle: 'Rotables Vs Consumables In Aviation Procurement | Langit Aero',
    seoDescription:
      'A practical comparison of rotable and consumable procurement workflows in aviation, including urgency, certification, and RFQ differences.',
    author: 'Langit Aero',
    publishedAt: '2026-03-11',
    body: portableBody(
      [
        'Rotables and consumables sit under the same public inventory structure for discoverability, but the buying workflow is not the same.',
        'Explaining those differences helps the site build topical depth and gives commercial visitors a more precise path into the right RFQ context.',
      ],
      [
        'Rotables usually need tighter condition and trace scrutiny',
        'Consumables often run on higher volume and shorter replenishment cycles',
        'The website should route each class into the right service and category pages',
      ],
    ),
  },
];

export const inventoryItems: InventoryItem[] = [
  {
    title: 'TPE331-10 Engine, Used Serviceable',
    slug: 'tpe331-10-engine-usv',
    category: 'engines',
    itemType: 'engine',
    engineModel: 'TPE331-10',
    description: 'Used serviceable TPE331-10 engine available through our supplier network.',
    shortDescription:
      'TPE331-10 used serviceable engine available for RFQ-led sourcing with documentation review support and controlled commercial release.',
    body: portableBody(
      [
        'This TPE331-10 listing is built for operators, MROs, and brokers who need a credible public page before moving into a controlled inquiry process.',
        'Availability, documentation summary, and commercial terms are handled through RFQ review. Alternate-condition support can also be assessed where the buyer brief allows it.',
      ],
      [
        'Condition: used serviceable',
        'Region: APAC-ready commercial handling',
        'RFQ required for detailed documentation review',
      ],
    ),
    condition: 'USV',
    quantity: 1,
    locationRegion: 'Asia',
    certification: 'Available upon request',
    traceStatus: 'Trace review on inquiry',
    platform: 'Beechcraft King Air / Cessna Caravan',
    manufacturer: 'Honeywell',
    availabilityStatus: 'rfq',
    supplierVisibility: 'hidden',
    documentationSummary: 'Logs, status details, and release posture reviewed during inquiry.',
    esnPolicy: 'disclosed_on_request',
    tsn: 8412,
    csn: 5331,
    tso: 2120,
    cso: 1465,
    llpSummary: 'LLP status available during shortlist review.',
    seoTitle: 'TPE331-10 Engine USV For Sale | Langit Aero',
    seoDescription:
      'TPE331-10 used serviceable engine available for sale through a global supplier network with RFQ support and documentation review.',
    indexable: true,
    featured: true,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: 'CFM56-7B26 Engine, Used Serviceable',
    slug: 'cfm56-7b26-engine-usv',
    category: 'engines',
    itemType: 'engine',
    engineModel: 'CFM56-7B26',
    description: 'Used serviceable CFM56-7B26 engine listed for RFQ-led broker support.',
    shortDescription:
      'CFM56-7B26 used serviceable engine availability for operators and asset buyers needing controlled documentation review.',
    body: portableBody(
      [
        'The public page establishes model identity, condition posture, region, and response path without misrepresenting final availability.',
        'Buyers can use the RFQ path to request alternate-condition support, documentation review, and commercial follow-up.',
      ],
      [
        'Built for exact-model search demand',
        'No speculative pricing published',
        'Commercial handling remains RFQ-first',
      ],
    ),
    condition: 'USV',
    quantity: 1,
    locationRegion: 'Middle East',
    certification: 'Available upon request',
    traceStatus: 'Reviewed at shortlist stage',
    platform: 'Boeing 737NG',
    manufacturer: 'CFM International',
    availabilityStatus: 'rfq',
    supplierVisibility: 'hidden',
    documentationSummary: 'Status details and supporting documentation released subject to inquiry.',
    esnPolicy: 'partial',
    tsn: 17654,
    csn: 8241,
    tso: 2980,
    cso: 1512,
    llpSummary: 'LLP pack reviewed during commercial shortlist.',
    seoTitle: 'CFM56-7B26 Engine USV For Sale | Langit Aero',
    seoDescription:
      'CFM56-7B26 used serviceable engine available for RFQ-led sourcing with documentation review and alternate option support.',
    indexable: true,
    featured: true,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: 'PT6A Engine, Available On RFQ',
    slug: 'pt6a-engine-available',
    category: 'engines',
    itemType: 'engine',
    engineModel: 'PT6A',
    description: 'PT6A engine availability with RFQ-led sourcing support.',
    shortDescription:
      'PT6A engine options available on RFQ for operators and MROs seeking alternate-condition sourcing and documentation review.',
    body: portableBody(
      [
        'This page is designed as a stable engine-intent listing rather than a speculative asset dump.',
        'It supports buyers who search by family first and need a brokered path into model-specific options.',
      ],
      [
        'RFQ-driven family-level engine sourcing',
        'Suitable for alternate-condition requests',
        'Documentation scope released during inquiry',
      ],
    ),
    condition: 'RFQ',
    quantity: 1,
    locationRegion: 'North America',
    certification: 'Available upon request',
    traceStatus: 'To be confirmed against request scope',
    platform: 'King Air / Caravan / Regional turboprop',
    manufacturer: 'Pratt & Whitney Canada',
    availabilityStatus: 'rfq',
    supplierVisibility: 'disclosed_on_request',
    documentationSummary: 'Commercial and documentation posture depends on requested variant.',
    seoTitle: 'PT6A Engine Available On RFQ | Langit Aero',
    seoDescription:
      'PT6A engine sourcing support for RFQ-led buyers seeking current market options with controlled documentation review.',
    indexable: true,
    featured: false,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: '465020-3 Hydraulic Pump, Serviceable',
    slug: '465020-3-hydraulic-pump-sv',
    category: 'rotables',
    itemType: 'rotable',
    partNumber: '465020-3',
    description: 'Serviceable hydraulic pump available for RFQ and alternate stock support.',
    shortDescription:
      'Part number 465020-3 hydraulic pump in serviceable condition, available through our supplier network with RFQ-led handling.',
    body: portableBody(
      [
        'The page gives buyers a direct route from exact part-number search into a controlled RFQ workflow.',
        'Condition, region, and certification posture are visible, while deeper supplier details remain protected until inquiry.',
      ],
      [
        'Exact part-number targeting',
        'Serviceable condition with RFQ-based release',
        'Useful for operators, MROs, and brokers seeking alternates',
      ],
    ),
    condition: 'SV',
    quantity: 2,
    locationRegion: 'Europe',
    certification: '8130-3 / Form 1 subject to release',
    traceStatus: 'Trace available on request',
    platform: 'Regional jet / narrowbody support',
    manufacturer: 'Parker',
    availabilityStatus: 'available',
    supplierVisibility: 'hidden',
    documentationSummary: 'Certification and trace reviewed at quote stage.',
    seoTitle: '465020-3 Hydraulic Pump SV | Langit Aero',
    seoDescription:
      '465020-3 hydraulic pump in serviceable condition available for RFQ-led sourcing with certification review support.',
    indexable: true,
    featured: true,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: '822-1710-001 Avionics Unit, Overhauled',
    slug: '822-1710-001-avionics-unit-oh',
    category: 'rotables',
    itemType: 'rotable',
    partNumber: '822-1710-001',
    description: 'Overhauled avionics unit available for RFQ-led sourcing.',
    shortDescription:
      '822-1710-001 avionics unit in overhauled condition, listed for exact part-number discovery and RFQ conversion.',
    body: portableBody(
      [
        'This listing is aimed at buyers who already know the part number and need a commercially credible landing page with condition and cert context.',
        'The listing stays machine-readable for search while keeping supplier identity and pricing controlled.',
      ],
      [
        'Overhauled rotable listing',
        'Exact-match SEO for part-number demand',
        'RFQ path supports alternate condition requests',
      ],
    ),
    condition: 'OH',
    quantity: 1,
    locationRegion: 'Asia',
    certification: 'Release documentation available on request',
    traceStatus: 'Trace statement reviewed before quote',
    platform: 'Avionics support program',
    manufacturer: 'Collins Aerospace',
    availabilityStatus: 'rfq',
    supplierVisibility: 'hidden',
    documentationSummary: 'Release posture confirmed during inquiry.',
    seoTitle: '822-1710-001 Avionics Unit OH | Langit Aero',
    seoDescription:
      '822-1710-001 avionics unit in overhauled condition available on RFQ with controlled certification review.',
    indexable: true,
    featured: false,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: '3-1709-1 Brake Control Valve, Serviceable',
    slug: '3-1709-1-brake-control-valve-sv',
    category: 'rotables',
    itemType: 'rotable',
    partNumber: '3-1709-1',
    description: 'Brake control valve in serviceable condition, available for RFQ-led sourcing.',
    shortDescription:
      '3-1709-1 brake control valve available in serviceable condition with region, cert, and RFQ support details on-page.',
    body: portableBody(
      [
        'Rotable listings like this are meant to solve exact search demand without creating duplicate, low-value pages.',
        'The page stays live as a credible conversion point even when final commercial review still needs to happen through inquiry.',
      ],
      [
        'Serviceable rotable availability',
        'Certification context visible without over-disclosure',
        'RFQ-first pricing and commercial handling',
      ],
    ),
    condition: 'SV',
    quantity: 3,
    locationRegion: 'North America',
    certification: 'Available upon request',
    traceStatus: 'Trace review during quote process',
    platform: 'Regional aircraft support',
    manufacturer: 'Meggitt',
    availabilityStatus: 'available',
    supplierVisibility: 'limited',
    documentationSummary: 'Trace and cert pack available after buyer qualification.',
    seoTitle: '3-1709-1 Brake Control Valve SV | Langit Aero',
    seoDescription:
      '3-1709-1 brake control valve in serviceable condition available through RFQ-led sourcing support.',
    indexable: true,
    featured: false,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: 'BACB30DX Fastener Kit, New Surplus',
    slug: 'bacb30dx-fastener-kit-ns',
    category: 'consumables',
    itemType: 'consumable',
    partNumber: 'BACB30DX',
    description: 'New surplus fastener kit available for RFQ-led consumable sourcing.',
    shortDescription:
      'BACB30DX fastener kit listed in new surplus condition for exact part-number demand and repeat procurement support.',
    body: portableBody(
      [
        'This listing supports buyers who search by part number and need a legitimate commercial page rather than a thin stock row.',
        'Repeat-demand items still benefit from strong titles, clean specs, and an obvious RFQ route.',
      ],
      [
        'New surplus consumable listing',
        'Useful for repeat-demand and shortage recovery',
        'Commercial terms handled through RFQ rather than public pricing',
      ],
    ),
    condition: 'NS',
    quantity: 50,
    locationRegion: 'Asia',
    certification: 'CoC available',
    traceStatus: 'Batch trace available on request',
    platform: 'General aviation / airframe support',
    manufacturer: 'Boeing Standard Hardware',
    availabilityStatus: 'available',
    supplierVisibility: 'hidden',
    documentationSummary: 'Certification posture depends on final batch release.',
    seoTitle: 'BACB30DX Fastener Kit NS | Langit Aero',
    seoDescription:
      'BACB30DX fastener kit in new surplus condition available for RFQ-led sourcing and repeat procurement support.',
    indexable: true,
    featured: true,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: 'PWC10-Filter Element, New',
    slug: 'pwc10-filter-element-new',
    category: 'consumables',
    itemType: 'consumable',
    partNumber: 'PWC10',
    description: 'New filter element listing for repeat-demand consumable sourcing.',
    shortDescription:
      'PWC10 filter element available in new condition with RFQ-based availability and certification guidance.',
    body: portableBody(
      [
        'Consumable listings need enough context to rank but should stay easy to scan for procurement teams.',
        'This page supports both recurring replenishment and urgent demand without exposing unnecessary commercial detail.',
      ],
      [
        'New consumable stock',
        'Suitable for repeat-demand procurement',
        'RFQ captures certification and volume requirements',
      ],
    ),
    condition: 'NE',
    quantity: 120,
    locationRegion: 'Middle East',
    certification: 'CoC / release information on request',
    traceStatus: 'Batch-level trace available',
    platform: 'Engine consumables support',
    manufacturer: 'Pratt & Whitney Canada',
    availabilityStatus: 'available',
    supplierVisibility: 'hidden',
    documentationSummary: 'Release details confirmed against final batch and destination.',
    seoTitle: 'PWC10 Filter Element New | Langit Aero',
    seoDescription:
      'PWC10 filter element in new condition available for RFQ-led consumable sourcing and repeat procurement support.',
    indexable: true,
    featured: false,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: 'MS29513-010 O-Ring, New',
    slug: 'ms29513-010-o-ring-new',
    category: 'consumables',
    itemType: 'consumable',
    partNumber: 'MS29513-010',
    description: 'New O-ring listing for exact part-number and repeat-demand searches.',
    shortDescription:
      'MS29513-010 O-ring listed in new condition with RFQ support for quantity, region, and certification context.',
    body: portableBody(
      [
        'This page is intentionally concise but still meets the minimum standard for indexable inventory content.',
        'It exists to capture exact part-number intent and move buyers into a structured RFQ without bloating the site with duplicate pages.',
      ],
      [
        'Exact part-number SEO capture',
        'Repeat-demand consumable flow',
        'Commercial context stays RFQ-first',
      ],
    ),
    condition: 'NE',
    quantity: 300,
    locationRegion: 'Europe',
    certification: 'CoC available',
    traceStatus: 'Batch trace upon request',
    platform: 'Airframe and component maintenance',
    manufacturer: 'MS Standard',
    availabilityStatus: 'available',
    supplierVisibility: 'hidden',
    documentationSummary: 'Batch and release info available during RFQ review.',
    seoTitle: 'MS29513-010 O-Ring New | Langit Aero',
    seoDescription:
      'MS29513-010 O-ring in new condition available through RFQ-led consumable sourcing.',
    indexable: true,
    featured: false,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
  {
    title: 'CFM56-5B Engine, Sold But Alternates Available',
    slug: 'cfm56-5b-engine-sold-alternates',
    category: 'engines',
    itemType: 'engine',
    engineModel: 'CFM56-5B',
    description: 'Previously available engine listing retained for alternate-stock RFQ conversion.',
    shortDescription:
      'This CFM56-5B engine listing is no longer available, but the page remains live to support alternate-stock RFQs and similar demand.',
    body: portableBody(
      [
        'The original unit is no longer available. The page stays live because the search intent remains valuable and similar options can still be sourced through the RFQ workflow.',
        'Instead of deleting the page, we use it to direct buyers toward alternate stock, replacement sourcing, and fresh availability checks.',
      ],
      [
        'Status: sold / unavailable',
        'Alternate engine sourcing available on RFQ',
        'Useful long-tail page retained for conversion value',
      ],
    ),
    condition: 'USV',
    quantity: 0,
    locationRegion: 'Global supplier network',
    certification: 'Subject to alternate offer',
    traceStatus: 'Subject to alternate offer',
    platform: 'Airbus A320 family',
    manufacturer: 'CFM International',
    availabilityStatus: 'sold',
    supplierVisibility: 'hidden',
    documentationSummary: 'Original listing retained as an alternate-stock conversion page.',
    esnPolicy: 'withheld',
    seoTitle: 'CFM56-5B Engine Alternatives | Langit Aero',
    seoDescription:
      'This CFM56-5B engine listing is no longer available. Submit an RFQ for alternate stock and comparable engine support.',
    indexable: true,
    featured: false,
    publishedAt: '2026-03-11',
    updatedAt: '2026-03-11',
  },
];
