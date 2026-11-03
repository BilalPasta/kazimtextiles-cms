import type { MetadataRoute } from 'next'
import type { Media } from '@/payload-types'
import { getCategories, getGuides, getHomepage, getIndustries, getPages, getPosts, getProducts } from '@/lib/payload'
import { mediaUrl } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'

export const revalidate = 3600

type Dated = { updatedAt?: string | null }
type Entry = MetadataRoute.Sitemap[number]

/** Most recent edit across a set of documents, so listing pages report when their content really changed. */
const latest = (...groups: Dated[][]) =>
  groups
    .flat()
    .map((d) => d.updatedAt)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1)

/** Absolute URL of an uploaded image (Blob URLs already are; local uploads are site-relative). */
const imageUrl = (media: number | Media | null | undefined) => {
  const url = mediaUrl(media)
  if (!url) return []
  return [url.startsWith('http') ? url : absoluteUrl(url)]
}

/**
 * XML sitemap for search engines: every public, indexable page with the date its content last changed
 * and its main image (image sitemap). Hidden products, drafts, the admin, API and thank-you page are excluded.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [home, products, categories, industries, pages, guides, posts] = await Promise.all([
    getHomepage(),
    getProducts(),
    getCategories(),
    getIndustries(),
    getPages(),
    getGuides(),
    getPosts(),
  ])

  const entry = (path: string, updated: string | null | undefined, priority: number, images: string[] = []): Entry => ({
    url: absoluteUrl(path),
    ...(updated ? { lastModified: new Date(updated) } : {}),
    changeFrequency: 'monthly',
    priority,
    ...(images.length ? { images } : {}),
  })

  return [
    // Core pages
    entry('/', latest([home], products, categories), 1),
    entry('/products', latest(products, categories), 0.9),
    entry('/quote', latest(products), 0.8),
    entry('/custom-textile-sourcing', latest(categories), 0.7),
    entry('/industries', latest(industries), 0.7),
    entry('/guides', latest(guides), 0.6),
    // The blog index is listed only once it has articles.
    ...(posts.length ? [entry('/blog', latest(posts), 0.5)] : []),

    // Catalog
    ...categories.map((c) => entry(`/categories/${c.slug}`, latest([c], products.filter((p) => (typeof p.category === 'object' ? p.category?.id : p.category) === c.id)), 0.9, imageUrl(c.image))),
    ...products.map((p) => entry(`/products/${p.slug}`, p.updatedAt, 0.8, imageUrl(p.image))),

    // Industries, guides, articles
    ...industries.map((i) => entry(`/industries/${i.slug}`, i.updatedAt, 0.7, imageUrl(i.image))),
    ...guides.map((g) => entry(`/guides/${g.slug}`, g.updatedAt, 0.6, imageUrl(g.image))),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.updatedAt, 0.5)),

    // Company and policy pages
    ...pages.map((p) => entry(`/${p.slug}`, p.updatedAt, ['about', 'contact', 'how-we-work'].includes(p.slug ?? '') ? 0.6 : 0.3)),
  ]
}
