import { sanityClient, hasSanityConfig } from './sanity';
import {
  articleBySlugQuery,
  articlesQuery,
  inventoryItemBySlugQuery,
  inventoryItemsQuery,
  servicePageBySlugQuery,
  servicePagesQuery,
} from './queries';
import { articles, inventoryCategoryPages, inventoryItems, servicePages } from './seed-content';
import type { Article, InventoryCategory, InventoryCategoryPage, InventoryItem, ServicePage } from './types';

const fetchWithFallback = async <T>(query: string, fallback: T, params?: Record<string, string>) => {
  if (!hasSanityConfig || !sanityClient) return fallback;

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.warn('Sanity fetch failed, using local fallback content.', error);
    return fallback;
  }
};

export const getServicePages = async (): Promise<ServicePage[]> =>
  fetchWithFallback(servicePagesQuery, servicePages);

export const getServicePageBySlug = async (slug: string): Promise<ServicePage | undefined> => {
  const fallback = servicePages.find((page) => page.slug === slug);
  return fetchWithFallback(servicePageBySlugQuery, fallback, { slug });
};

export const getArticles = async (): Promise<Article[]> =>
  fetchWithFallback(articlesQuery, articles);

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  const fallback = articles.find((article) => article.slug === slug);
  return fetchWithFallback(articleBySlugQuery, fallback, { slug });
};

export const getInventoryItems = async (): Promise<InventoryItem[]> =>
  fetchWithFallback(inventoryItemsQuery, inventoryItems);

export const getInventoryItemBySlug = async (slug: string): Promise<InventoryItem | undefined> => {
  const fallback = inventoryItems.find((item) => item.slug === slug);
  return fetchWithFallback(inventoryItemBySlugQuery, fallback, { slug });
};

export const getInventoryItemsByCategory = async (
  category: InventoryCategory,
  options?: { indexableOnly?: boolean },
): Promise<InventoryItem[]> => {
  const allItems = await getInventoryItems();

  return allItems.filter(
    (item) => item.category === category && (options?.indexableOnly === false || item.indexable),
  );
};

export const getFeaturedInventory = async (limit = 6): Promise<InventoryItem[]> => {
  const allItems = await getInventoryItems();
  return allItems.filter((item) => item.indexable && item.featured).slice(0, limit);
};

export const getFeaturedArticles = async (limit = 3): Promise<Article[]> => {
  const allArticles = await getArticles();
  return allArticles.slice(0, limit);
};

export const getRelatedInventory = async (
  currentItem: InventoryItem,
  limit = 3,
): Promise<InventoryItem[]> => {
  const allItems = await getInventoryItems();
  return allItems
    .filter(
      (item) =>
        item.slug !== currentItem.slug &&
        item.indexable &&
        (item.category === currentItem.category || item.manufacturer === currentItem.manufacturer),
    )
    .slice(0, limit);
};

export const getInventoryCategoryPage = (slug: InventoryCategory): InventoryCategoryPage | undefined =>
  inventoryCategoryPages.find((page) => page.slug === slug);

export const getInventoryCategoryPages = (): InventoryCategoryPage[] => inventoryCategoryPages;

export const getIndexableInventoryItems = async (): Promise<InventoryItem[]> => {
  const allItems = await getInventoryItems();
  return allItems.filter((item) => item.indexable);
};

export const getSitemapPaths = async (): Promise<string[]> => {
  const servicePagePaths = (await getServicePages()).map((page) => `/${page.slug}`);
  const articlePaths = (await getArticles()).map((article) => `/blog/${article.slug}`);
  const inventoryPaths = (await getIndexableInventoryItems()).map((item) => `/inventory/${item.slug}`);

  return [
    '/',
    '/about',
    '/contact',
    '/rfq',
    '/process',
    '/compliance',
    '/privacy',
    '/inventory',
    '/inventory/engines',
    '/inventory/rotables',
    '/inventory/consumables',
    ...servicePagePaths,
    ...articlePaths,
    ...inventoryPaths,
  ];
};
