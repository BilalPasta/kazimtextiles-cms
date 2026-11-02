/**
 * Applies the November 2026 sourcing update to whatever database `payload` points at:
 * 22-product catalog, retired listings + redirects, category order, and sourcing-accurate copy everywhere.
 *
 * Idempotent: safe to run again. Nothing is deleted; retired products are hidden, the private-label page is unpublished.
 * Used by `pnpm seed` and by src/seed/update-sourcing-catalog.ts (existing databases).
 */
import type { Payload } from 'payload'
import { catalog, categoryOrder, homepageFeatured, retired } from './catalog-22'
import { categories as categoryCopy, guides as guideCopy, homepage, industries as industryCopy, navigation, pages as pageCopy, retiredPages, siteSettings } from './site-content'

/** Better existing images for products whose image belonged to a different product (H12). */
const imageFixes: Record<string, string> = {
  'kitchen-towels': 'towels-31.webp',
  'terry-wiping-towels': 'towels_alt-12.webp',
  'washcloths': 'towels_alt-14.webp',
  'bath-mats': 'bath-mats.webp',
  'bed-sheets': 'bed-sheets.webp',
  'pillowcases': 'pillowcases.webp',
  'hospital-bed-sheets': 'hospital-bed-sheets.webp',
  'medical-scrub-sets': 'medical-scrub-sets.webp',
}

const ctx = () => ({ disableRevalidate: true })

export async function applySourcingUpdate(payload: Payload, log: (msg: string) => void = (m) => payload.logger.info(m)) {
  const all = async <T extends 'products' | 'categories' | 'industries' | 'pages' | 'guides' | 'media' | 'redirects'>(collection: T) =>
    (await payload.find({ collection, limit: 1000, depth: 0, pagination: false, draft: false })).docs

  const [products, categories, industries, pages, guides, media] = await Promise.all([
    all('products'),
    all('categories'),
    all('industries'),
    all('pages'),
    all('guides'),
    all('media'),
  ])
  const need = <T,>(value: T | undefined, what: string): T => {
    if (value === undefined) throw new Error(`Not found: ${what}`)
    return value
  }
  const categoryId = (slug: string) => need(categories.find((c) => c.slug === slug), `category ${slug}`).id
  // Uploads can be stored as "name-1.webp" when the name was taken; prefer the exact name, else the newest variant.
  const mediaId = (file: string) => {
    const dot = file.lastIndexOf('.')
    const variant = new RegExp(`^${file.slice(0, dot).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-\\d+\\${file.slice(dot)}$`)
    const exact = media.find((m) => m.filename === file)
    const newest = media.filter((m) => variant.test(m.filename ?? '')).sort((a, b) => b.id - a.id)[0]
    return need(exact ?? newest, `media ${file}`).id
  }

  // ── Categories: order, copy and SEO for the five public categories ─────────
  for (const [i, slug] of categoryOrder.entries()) {
    const copy = categoryCopy[slug]
    await payload.update({
      collection: 'categories',
      id: categoryId(slug),
      data: {
        name: copy.name,
        heading: copy.heading,
        intro: copy.intro,
        buyerChecklist: copy.buyerChecklist,
        body: copy.body as never,
        faqs: copy.faqs,
        sortOrder: (i + 1) * 10,
        hidden: false,
        meta: { title: `${copy.heading} | Kazim Textiles`, description: copy.metaDescription },
      },
      depth: 0,
      context: ctx(),
    })
  }
  log(`updated ${categoryOrder.length} categories`)

  // ── Products: the 22 primary listings ──────────────────────────────────────
  const productIds: Record<string, number> = {}
  for (const [i, item] of catalog.entries()) {
    const existing = products.find((p) => p.slug === item.slug) ?? products.find((p) => item.renamedFrom && p.slug === item.renamedFrom)
    const categoryIndex = categoryOrder.indexOf(item.category)
    const data = {
      name: item.name,
      slug: item.slug,
      category: categoryId(item.category),
      shortDescription: item.shortDescription,
      application: item.application,
      specs: item.specs,
      customization: item.options.map((option) => ({ option })),
      searchTerms: item.searchTerms,
      description: null,
      moq: null,
      leadTime: null,
      packaging: null,
      customizationStatus: null,
      priceGuide: null,
      availability: item.availability ?? 'made-to-order',
      featured: Boolean(item.featured),
      sortOrder: (categoryIndex + 1) * 100 + i,
      hidden: false,
      ...(imageFixes[item.slug] ? { image: mediaId(imageFixes[item.slug]) } : {}),
    }
    const doc = existing
      ? await payload.update({ collection: 'products', id: existing.id, data: data as never, depth: 0, context: ctx() })
      : await payload.create({ collection: 'products', data: { ...data, image: mediaId('hero-textiles.webp') } as never, depth: 0, context: ctx() })
    productIds[item.slug] = doc.id
  }
  for (const item of catalog) {
    await payload.update({
      collection: 'products',
      id: productIds[item.slug],
      data: { relatedProducts: item.related.map((s) => need(productIds[s], `related product ${s}`)) },
      depth: 0,
      context: ctx(),
    })
  }
  log(`updated ${catalog.length} primary products`)

  // ── Retired listings: hide (never delete) ──────────────────────────────────
  let hiddenCount = 0
  for (const slug of Object.keys(retired)) {
    const doc = products.find((p) => p.slug === slug)
    if (!doc || Object.values(productIds).includes(doc.id)) continue // renamed into a primary listing
    await payload.update({ collection: 'products', id: doc.id, data: { hidden: true, featured: false }, depth: 0, context: ctx() })
    hiddenCount++
  }
  // Anything else still visible that is not one of the 22 (e.g. added by hand) is left alone but reported.
  const stray = (await all('products')).filter((p) => !p.hidden && !Object.values(productIds).includes(p.id))
  if (stray.length) log(`note: ${stray.length} other visible products left untouched: ${stray.map((p) => p.slug).join(', ')}`)
  log(`hid ${hiddenCount} retired products`)

  // ── Redirects for retired and renamed URLs (H10) ───────────────────────────
  const redirects = await all('redirects')
  const upsertRedirect = async (from: string, to: { type: 'reference'; reference: { relationTo: 'products'; value: number } } | { type: 'custom'; url: string }) => {
    const existing = redirects.find((r) => r.from === from)
    const data = { from, to } as never
    if (existing) await payload.update({ collection: 'redirects', id: existing.id, data, depth: 0, context: ctx() })
    else await payload.create({ collection: 'redirects', data, depth: 0, context: ctx() })
  }
  for (const [slug, target] of Object.entries(retired)) {
    await upsertRedirect(
      `/products/${slug}`,
      target.startsWith('/')
        ? { type: 'custom', url: target }
        : { type: 'reference', reference: { relationTo: 'products', value: need(productIds[target], `redirect target ${target}`) } },
    )
  }
  for (const [slug, target] of Object.entries(retiredPages)) await upsertRedirect(`/${slug}`, { type: 'custom', url: target })
  log(`upserted ${Object.keys(retired).length + Object.keys(retiredPages).length} redirects`)

  // ── Industries ─────────────────────────────────────────────────────────────
  for (const [slug, copy] of Object.entries(industryCopy)) {
    const doc = industries.find((i) => i.slug === slug)
    if (!doc) continue
    await payload.update({
      collection: 'industries',
      id: doc.id,
      data: {
        ...(copy.name ? { name: copy.name } : {}),
        ...(copy.buyers ? { buyers: copy.buyers } : {}),
        heading: copy.heading,
        summary: copy.summary,
        intro: copy.intro as never,
        needs: copy.needs,
        faqs: copy.faqs,
        categories: copy.categories.map(categoryId),
        featuredProducts: slug === 'wholesale-distributors' ? homepageFeatured.map((s) => productIds[s]) : [],
        meta: { title: copy.metaTitle ?? `${copy.heading} | Kazim Textiles`, description: copy.summary.slice(0, 160) },
      },
      depth: 0,
      context: ctx(),
    })
  }
  log(`updated ${Object.keys(industryCopy).length} industries`)

  // ── Pages ──────────────────────────────────────────────────────────────────
  for (const [slug, copy] of Object.entries(pageCopy)) {
    const doc = pages.find((p) => p.slug === slug)
    const data = { title: copy.title, slug, hero: copy.hero, layout: copy.layout, ...(copy.meta ? { meta: copy.meta } : {}), _status: 'published' } as never
    if (doc) await payload.update({ collection: 'pages', id: doc.id, data, depth: 0, draft: false, context: ctx() })
    else await payload.create({ collection: 'pages', data, depth: 0, draft: false, context: ctx() })
  }
  for (const slug of Object.keys(retiredPages)) {
    const doc = pages.find((p) => p.slug === slug)
    if (doc) await payload.update({ collection: 'pages', id: doc.id, data: { _status: 'draft' } as never, depth: 0, draft: false, context: ctx() })
  }
  log(`updated ${Object.keys(pageCopy).length} pages, unpublished ${Object.keys(retiredPages).length}`)

  // ── Guides ─────────────────────────────────────────────────────────────────
  for (const [slug, copy] of Object.entries(guideCopy)) {
    const doc = guides.find((g) => g.slug === slug)
    if (!doc) continue
    await payload.update({
      collection: 'guides',
      id: doc.id,
      data: {
        ...(copy.excerpt ? { excerpt: copy.excerpt } : {}),
        ...(copy.metaTitle ? { meta: { ...(doc as { meta?: object }).meta, title: copy.metaTitle } } : {}),
        content: copy.content as never,
        relatedProducts: copy.relatedProducts.map((s) => productIds[s]).filter(Boolean),
        _status: 'published',
      } as never,
      depth: 0,
      draft: false,
      context: ctx(),
    })
  }
  log(`updated ${Object.keys(guideCopy).length} guides`)

  // ── Globals ────────────────────────────────────────────────────────────────
  const home = await payload.findGlobal({ slug: 'homepage', depth: 0 })
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      ...homepage,
      hero: { ...home.hero, ...homepage.hero },
      featuredProducts: homepageFeatured.map((s) => productIds[s]),
      meta: { ...home.meta, ...homepage.meta },
    } as never,
    depth: 0,
    context: ctx(),
  })

  await payload.updateGlobal({ slug: 'site-settings', data: siteSettings, depth: 0, context: ctx() })

  const visibleIndustries = (await payload.find({ collection: 'industries', limit: 6, depth: 0, sort: 'sortOrder' })).docs
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      headerLinks: navigation.headerLinks,
      headerCta: navigation.headerCta,
      showCategoryBar: true,
      footerColumns: [
        {
          title: 'Products',
          links: [
            ...categoryOrder.map((slug) => ({ label: categoryCopy[slug].name, url: `/categories/${slug}` })),
            { label: 'Custom textile sourcing', url: '/custom-textile-sourcing' },
          ],
        },
        { title: 'Industries', links: visibleIndustries.map((i) => ({ label: i.name, url: `/industries/${i.slug}` })) },
        { title: 'Company', links: navigation.companyLinks },
      ],
      copyright: navigation.copyright,
    },
    depth: 0,
    context: ctx(),
  })
  log('updated homepage, site settings and navigation')
}
