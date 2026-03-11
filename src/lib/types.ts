export type PortableTextBlock = Record<string, unknown>;

export type InventoryCategory = 'engines' | 'rotables' | 'consumables';
export type InventoryItemType = 'engine' | 'rotable' | 'consumable';
export type InventoryStatus = 'available' | 'rfq' | 'on_hold' | 'sold' | 'expired';
export type SupplierVisibility = 'hidden' | 'limited' | 'disclosed_on_request';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePage {
  title: string;
  slug: string;
  heroTitle: string;
  heroIntro: string;
  seoTitle: string;
  seoDescription: string;
  featuredCategory: InventoryCategory;
  highlights: string[];
  body: PortableTextBlock[];
  faq: FAQItem[];
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  body: PortableTextBlock[];
}

export interface InventoryItem {
  title: string;
  slug: string;
  category: InventoryCategory;
  itemType: InventoryItemType;
  partNumber?: string;
  engineModel?: string;
  description: string;
  shortDescription: string;
  body: PortableTextBlock[];
  condition: string;
  quantity: number;
  locationRegion: string;
  certification: string;
  traceStatus: string;
  platform?: string;
  manufacturer?: string;
  availabilityStatus: InventoryStatus;
  supplierVisibility: SupplierVisibility;
  documentationSummary?: string;
  esnPolicy?: string;
  tsn?: number;
  csn?: number;
  tso?: number;
  cso?: number;
  llpSummary?: string;
  seoTitle: string;
  seoDescription: string;
  mainImage?: string;
  indexable: boolean;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
}

export interface InventoryCategoryPage {
  slug: InventoryCategory;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  body: PortableTextBlock[];
  faq: FAQItem[];
}
