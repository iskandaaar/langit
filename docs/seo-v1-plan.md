# SEO-First Astro + Sanity V1 Restructure

## Summary
- Rebuild the public IA around SEO and RFQ capture while keeping the current Astro + Tailwind + Cloudflare Pages foundation and the existing Tally webhook flow.
- Replace the brochure-first main navigation with service pages, category hubs, and listing pages that can rank and convert.
- Use Sanity as the source of truth for launch content: `servicePage`, `article`, `inventoryItem`, and `siteSettings`.
- Launch with 5 service pages, 1 inventory hub, 3 inventory category pages, 10-20 curated indexable listings, and 3 articles. Defer engine-family, platform, and region landing pages to phase 2.

## Public Routes And Behavior
- Keep these routes live in v1: `/`, `/about`, `/contact`, `/rfq`, `/process`, `/compliance`, `/privacy`, `/inventory`, `/inventory/engines`, `/inventory/rotables`, `/inventory/consumables`, `/inventory/[slug]`, `/engine-sourcing`, `/aog-support`, `/rotable-parts`, `/aviation-consumables`, `/surplus-inventory`, `/blog/[slug]`.
- Remove `/capabilities` from the main nav and redirect it to `/engine-sourcing`.
- Main nav becomes: `Home`, `Inventory`, `Engine Sourcing`, `AOG Support`, `Rotable Parts`, `Consumables`, `About`, `Contact`, `RFQ`.
- Keep `Process`, `Compliance`, and `Privacy` accessible from the footer only.
- All RFQ CTAs continue to route to `/rfq` and the Tally form remains the submission mechanism.
- Configure Tally hidden fields for `source_page`, `source_type`, `inventory_slug`, `inventory_title`, `part_number`, and `engine_model` so listing/category/service CTAs carry context into the existing webhook flow.

## Implementation Changes
- Add Sanity client integration to the Astro site and fetch content at build time with GROQ. Use static generation for `/inventory/[slug]` and `/blog/[slug]`; category and service pages are also statically built from Sanity content.
- Use a single `inventoryItem` document type for v1, not separate engine and part document types. Include shared fields plus conditional engine fields so editorial workflow stays simple.
- `inventoryItem` fields: `title`, `slug`, `itemType`, `partNumber`, `engineModel`, `description`, `shortDescription`, `body`, `condition`, `quantity`, `locationRegion`, `certification`, `traceStatus`, `platform`, `manufacturer`, `availabilityStatus`, `supplierVisibility`, `documentationSummary`, `esnPolicy`, `tsn`, `csn`, `tso`, `cso`, `llpSummary`, `seoTitle`, `seoDescription`, `mainImage`, `indexable`, `featured`, `publishedAt`, `updatedAt`.
- `servicePage` fields: `title`, `slug`, `heroTitle`, `heroIntro`, `body`, `faq`, `seoTitle`, `seoDescription`, `featuredImage`, `publishedAt`, `updatedAt`.
- `article` fields: `title`, `slug`, `excerpt`, `body`, `seoTitle`, `seoDescription`, `featuredImage`, `publishedAt`, `updatedAt`, `author`.
- `siteSettings` fields: brand name, contact details, default SEO values, social/OG fields, main nav labels, footer links.
- Inventory categories in v1 are fixed enums: `engines`, `rotables`, `consumables`. Do not model engine families or platforms as first-class public taxonomies yet.
- Listing page slug rule is fixed: descriptive, exact-match where natural, no stuffing. Examples: `tpe331-10-engine-usv`, `465020-3-hydraulic-pump-sv`.
- A listing is indexable only when it has unique title, meta description, intro copy, specs, commercial body copy, and RFQ CTA. Thin or duplicate inventory remains in Sanity with `indexable=false` and is excluded from route generation and sitemap output.
- Expired or sold listings stay live only if they already have enough unique value. Those pages show unavailable status, alternate-stock messaging, related inventory links, and RFQ CTA. Weak expired listings are marked `indexable=false`.
- Reuse the existing `BaseLayout` SEO plumbing, but extend page-level JSON-LD by template: `Service` for service pages, `CollectionPage` plus `BreadcrumbList` for category pages, `Product` plus `BreadcrumbList` for listing pages, `Article` for blog pages. Do not publish fake pricing.
- Replace current homepage emphasis from generic brokerage messaging to a service-plus-inventory entry point: hero, trust strip, service links, featured listings, inventory categories, and RFQ CTA.
- Keep the current design language and components where workable, but rewrite page copy and information hierarchy to support the new SEO structure rather than the current brochure flow.
- Deploy Sanity Studio separately from the public site. The Astro repo only consumes Sanity content and does not host the editor UI.

## Launch Content Set
- Service pages: `/engine-sourcing`, `/aog-support`, `/rotable-parts`, `/aviation-consumables`, `/surplus-inventory`.
- Inventory pages: `/inventory`, `/inventory/engines`, `/inventory/rotables`, `/inventory/consumables`, plus 10-20 curated `/inventory/[slug]` pages.
- Articles: `/blog/what-does-usv-mean-in-aviation`, `/blog/used-serviceable-engine-buying-checklist`, `/blog/rotables-vs-consumables-in-aviation-procurement`.
- Keep `/about`, `/contact`, `/process`, and `/compliance` as supporting trust pages rather than primary SEO landing pages.

## Test Plan
- Build passes with Sanity content wired into Astro static generation.
- Main nav, footer nav, and `/capabilities` redirect match the new IA.
- Sitemap includes only canonical indexable routes and excludes `indexable=false` listings.
- Each page type emits the correct canonical, meta description, robots directive, and matching JSON-LD.
- Listing generation excludes thin inventory and includes only curated slugs.
- Expired listing pages render unavailable messaging, related inventory, and working RFQ CTA without being removed.
- `/rfq` still renders the Tally embed and webhook notifications continue working after hidden-source fields are added.
- Homepage, category pages, and listing pages maintain internal links in both directions so service, inventory, and article clusters are crawlable.

## Assumptions And Defaults
- Cloudflare Pages remains the public host.
- Tally remains the RFQ system in v1; no native form rebuild is included.
- Sanity is introduced now and is the sole editorial source for launch SEO content.
- V1 excludes public engine-family, platform, and region landing pages even if supporting fields are added later.
- V1 uses 10-20 enriched listings, not bulk-imported thin inventory.
