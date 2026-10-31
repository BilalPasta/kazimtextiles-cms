# Kazim Textiles — Website + Payload CMS

Next.js 16 + Payload CMS 3 (Postgres). One app serves the public site and the admin at `/admin`.

## Run locally

```bash
pnpm install
pnpm db:up            # starts Postgres in Docker on port 5440
cp .env.example .env  # then set PAYLOAD_SECRET to a long random string
pnpm seed             # loads catalog, industries, pages, guides, images (wipes those collections first)
pnpm dev              # http://localhost:3000  —  admin: http://localhost:3000/admin
```

The first visit to `/admin` asks you to create the first admin user.

## What you can edit in the admin

| Admin section | Controls |
|---|---|
| **Content → Homepage** | Hero, trust strip, section headings, featured products, “why us”, process steps, FAQs, bottom CTA |
| **Catalog → Products** | Name, category, industries, images, specs table, customization options, MOQ, lead time, FAQs, featured flag |
| **Catalog → Product Categories** | Heading (H1), intro, image, buyer checklist, page content, FAQs, menu order |
| **Catalog → Industries** | Heading, summary, “who buys”, needs cards, linked categories/products, FAQs |
| **Content → Pages** | About, Contact, Private Label, How We Work, Quality, Shipping, Privacy, Terms — or new pages at `/your-slug` built from sections (text, cards, checklist, steps, product grid, FAQ, CTA) |
| **Content → Guides & Articles** | Blog/buying guides at `/guides/...` |
| **Leads → Quote Requests** | Every quote form submission, with status (New → Contacted → Quoted → Won/Lost) and notes |
| **Settings → Site Settings** | Company name, logo, email, phone, WhatsApp (shows floating button), address, social links, announcement bar, default SEO, Google Search Console + GA4 IDs |
| **Settings → Header & Footer** | Menu links, header button, footer columns |
| **Settings → Redirects** | 301 redirects when you change a URL |

Every product/category/industry/page/guide has an **SEO tab** (meta title, description, share image with live Google preview). Pages and Guides support **drafts** and **Live Preview**.

Saving anything in the admin refreshes the live site automatically.

## SEO built in

- Static pre-rendered pages, `next/image` (AVIF/WebP, responsive sizes), self-hosted fonts
- Per-page title, description, canonical URL, Open Graph/Twitter tags
- Structured data: Organization, BreadcrumbList, Product, CollectionPage/ItemList, FAQPage, Article
- `/sitemap.xml` (auto-updates) and `/robots.txt`
- Keyword-led H1s per category/industry (e.g. “Wholesale Kitchen Towels, Bar Mops & Flour Sack Towels”)

**Indexing is OFF until you set `NEXT_PUBLIC_ALLOW_INDEXING=true`** on the production domain. Until then every page is `noindex` and robots.txt blocks crawlers — so staging never gets indexed.

## Deploy (Vercel + Neon/Supabase Postgres)

1. Create a Postgres database (Neon, Supabase, Vercel Postgres…) and copy its connection string.
2. Import the repo in Vercel, set env vars: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL=https://kazimtextiles.com`, `NEXT_PUBLIC_ALLOW_INDEXING=true` (production only).
3. **Media storage:** Vercel’s filesystem is read-only, so add `@payloadcms/storage-s3` (or `@payloadcms/storage-vercel-blob`) to `payload.config.ts` before uploading images in production. Locally, uploads go to `/media`.
4. Run `pnpm seed` once against the production database (or create content manually).
5. For quote-request email alerts, set `RESEND_API_KEY` and `RESEND_FROM_ADDRESS` (an address on a domain verified in Resend), then set **Site Settings → Contact → Send quote requests to**. Without them, requests are still saved under **Quote Requests**.
6. Production DB schema: for a live site, switch from dev auto-push to migrations — `pnpm payload migrate:create` then `pnpm payload migrate` in the build step.

## Before launch checklist

- [ ] Replace AI concept images with real product photos (Media → upload, write alt text)
- [ ] Add verified email / phone / WhatsApp / address in Site Settings
- [ ] Review product specs, MOQ and lead times — only list what you can actually supply
- [ ] Have Privacy Policy and Terms reviewed (seeded as drafts)
- [ ] Set Google Search Console verification + GA4 ID, submit `/sitemap.xml`
- [ ] Write unique descriptions for top products (Products → Full description) — biggest SEO win after launch
