import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { Category, Guide, Industry, Page, Product } from '@/payload-types'

export const getPayloadClient = cache(() => getPayload({ config }))

const published = { _status: { equals: 'published' } } as const

export const getSiteSettings = cache(async () => (await getPayloadClient()).findGlobal({ slug: 'site-settings', depth: 1 }))
export const getNavigation = cache(async () => (await getPayloadClient()).findGlobal({ slug: 'navigation', depth: 0 }))
export const getHomepage = cache(async () => (await getPayloadClient()).findGlobal({ slug: 'homepage', depth: 2 }))

export const getCategories = cache(async (): Promise<Category[]> => {
  const res = await (await getPayloadClient()).find({ collection: 'categories', limit: 100, depth: 1, sort: 'sortOrder' })
  return res.docs
})

export const getIndustries = cache(async (): Promise<Industry[]> => {
  const res = await (await getPayloadClient()).find({ collection: 'industries', limit: 100, depth: 1, sort: 'sortOrder' })
  return res.docs
})

export const getProducts = cache(async (): Promise<Product[]> => {
  const res = await (await getPayloadClient()).find({
    collection: 'products',
    limit: 1000,
    depth: 1,
    sort: ['sortOrder', 'name'],
  })
  return res.docs
})

const findBySlug = async <T,>(collection: 'products' | 'categories' | 'industries', slug: string, depth = 2) => {
  const res = await (await getPayloadClient()).find({ collection, where: { slug: { equals: slug } }, limit: 1, depth })
  return (res.docs[0] as T) ?? null
}

export const getProduct = cache((slug: string) => findBySlug<Product>('products', slug))
export const getCategory = cache((slug: string) => findBySlug<Category>('categories', slug))
export const getIndustry = cache((slug: string) => findBySlug<Industry>('industries', slug))

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  const res = await (await getPayloadClient()).find({
    collection: 'pages',
    where: { and: [{ slug: { equals: slug } }, published] },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
})

export const getPages = cache(async (): Promise<Page[]> => {
  const res = await (await getPayloadClient()).find({ collection: 'pages', where: published, limit: 200, depth: 0 })
  return res.docs
})

export const getGuides = cache(async (): Promise<Guide[]> => {
  const res = await (await getPayloadClient()).find({
    collection: 'guides',
    where: published,
    limit: 200,
    depth: 1,
    sort: '-publishedAt',
  })
  return res.docs
})

export const getGuide = cache(async (slug: string): Promise<Guide | null> => {
  const res = await (await getPayloadClient()).find({
    collection: 'guides',
    where: { and: [{ slug: { equals: slug } }, published] },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
})

/** Narrow a Payload relationship value (id or populated doc) to the populated doc. */
export const populated = <T extends { id: number | string }>(value: number | string | T | null | undefined): T | null =>
  value && typeof value === 'object' ? value : null

export const populatedList = <T extends { id: number | string }>(values: (number | string | T)[] | null | undefined): T[] =>
  (values ?? []).map((v) => populated<T>(v)).filter((v): v is T => v !== null)
