import type { MetadataRoute } from 'next'
import { getCategories, getGuides, getIndustries, getPages, getPosts, getProducts } from '@/lib/payload'
import { absoluteUrl } from '@/lib/urls'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, industries, pages, guides, posts] = await Promise.all([getProducts(), getCategories(), getIndustries(), getPages(), getGuides(), getPosts()])
  const entry = (path: string, updated?: string | null, priority = 0.6) => ({
    url: absoluteUrl(path),
    lastModified: updated ? new Date(updated) : new Date(),
    priority,
  })
  return [
    entry('/', null, 1),
    entry('/products', null, 0.9),
    entry('/industries', null, 0.9),
    entry('/guides', null, 0.6),
    entry('/blog', null, 0.6),
    entry('/quote', null, 0.8),
    ...categories.map((c) => entry(`/categories/${c.slug}`, c.updatedAt, 0.9)),
    ...industries.map((i) => entry(`/industries/${i.slug}`, i.updatedAt, 0.8)),
    ...products.map((p) => entry(`/products/${p.slug}`, p.updatedAt, 0.7)),
    ...pages.map((p) => entry(`/${p.slug}`, p.updatedAt, 0.5)),
    ...guides.map((g) => entry(`/guides/${g.slug}`, g.updatedAt, 0.6)),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.updatedAt, 0.6)),
  ]
}
