export const servicePagesQuery = `
  *[_type == "servicePage"] | order(title asc) {
    title,
    "slug": slug.current,
    heroTitle,
    heroIntro,
    seoTitle,
    seoDescription,
    featuredCategory,
    highlights,
    body,
    faq
  }
`;

export const servicePageBySlugQuery = `
  *[_type == "servicePage" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    heroTitle,
    heroIntro,
    seoTitle,
    seoDescription,
    featuredCategory,
    highlights,
    body,
    faq
  }
`;

export const articlesQuery = `
  *[_type == "article"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    seoTitle,
    seoDescription,
    featuredImage,
    author,
    publishedAt,
    updatedAt,
    body
  }
`;

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    excerpt,
    seoTitle,
    seoDescription,
    featuredImage,
    author,
    publishedAt,
    updatedAt,
    body
  }
`;

export const inventoryItemsQuery = `
  *[_type == "inventoryItem"] | order(featured desc, updatedAt desc) {
    title,
    "slug": slug.current,
    category,
    itemType,
    partNumber,
    engineModel,
    description,
    shortDescription,
    body,
    condition,
    quantity,
    locationRegion,
    certification,
    traceStatus,
    platform,
    manufacturer,
    availabilityStatus,
    supplierVisibility,
    documentationSummary,
    esnPolicy,
    tsn,
    csn,
    tso,
    cso,
    llpSummary,
    seoTitle,
    seoDescription,
    "mainImage": mainImage.asset->url,
    indexable,
    featured,
    publishedAt,
    updatedAt
  }
`;

export const inventoryItemBySlugQuery = `
  *[_type == "inventoryItem" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    category,
    itemType,
    partNumber,
    engineModel,
    description,
    shortDescription,
    body,
    condition,
    quantity,
    locationRegion,
    certification,
    traceStatus,
    platform,
    manufacturer,
    availabilityStatus,
    supplierVisibility,
    documentationSummary,
    esnPolicy,
    tsn,
    csn,
    tso,
    cso,
    llpSummary,
    seoTitle,
    seoDescription,
    "mainImage": mainImage.asset->url,
    indexable,
    featured,
    publishedAt,
    updatedAt
  }
`;
