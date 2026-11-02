/**
 * Seeds the CMS with the Kazim Textiles catalog and site content.
 *   pnpm seed
 * The base catalog below is then narrowed to the current 22-product catalog by applySourcingUpdate().
 * WARNING: deletes existing products, categories, industries, pages, guides and media first.
 * Quote requests and users are never touched.
 */
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import { categoryContent, descriptionOverrides, featuredProducts, guides, homepage, imageAlt, imageOverrides, industries, pages, productIndustryExtras } from './content'
import { applySourcingUpdate } from './apply-sourcing-update'
import { p, rt } from './richtext'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const catalog = JSON.parse(fs.readFileSync(path.join(dirname, 'catalog.json'), 'utf8')) as {
  categories: { slug: string; name: string; intro: string; image: string; rfq: string }[]
  products: { slug: string; name: string; category: string; image: string; description: string; status: string; application: string }[]
}

/** Which product categories automatically tag a product with an industry (beyond explicit extras). */
const industryTagCategories: Record<string, string[]> = {
  'hotels-hospitality': ['hotel-bath-spa', 'restaurant-table-linens'],
  'restaurants-foodservice': ['kitchen-foodservice-towels', 'restaurant-table-linens'],
  'healthcare-medical': ['healthcare-institutional'],
  'senior-living-care-homes': ['healthcare-institutional'],
  'janitorial-cleaning': ['industrial-wiping-cleaning'],
  'commercial-laundries': ['kitchen-foodservice-towels'],
  'automotive-industrial': ['industrial-wiping-cleaning', 'technical-industrial-fabrics'],
  'catering-events': ['restaurant-table-linens'],
  'vacation-rentals-property-managers': ['hotel-bath-spa'],
}
const restaurantApparel = ['chef-coats', 'chef-shirts', 'chef-pants', 'chef-hats', 'bib-aprons', 'waist-aprons']
const extraTags: Record<string, string[]> = {
  ...productIndustryExtras,
  ...Object.fromEntries(restaurantApparel.map((s) => [s, ['restaurants-foodservice', 'catering-events', 'hotels-hospitality']])),
  'shop-towels': ['commercial-laundries'],
  'huck-towels': ['commercial-laundries', 'healthcare-medical'],
  'microfiber-cleaning-cloths': ['hotels-hospitality', 'healthcare-medical'],
  'bath-towels': [...(productIndustryExtras['bath-towels'] ?? []), 'commercial-laundries'],
  'hospital-bed-sheets': ['commercial-laundries'],
  'medical-scrub-sets': ['commercial-laundries', 'spas-salons-fitness'],
}

const industryIcons: Record<string, string> = {
  'hotels-hospitality': 'bed',
  'restaurants-foodservice': 'utensils',
  'healthcare-medical': 'cross',
  'senior-living-care-homes': 'heart',
  'janitorial-cleaning': 'spray',
  'commercial-laundries': 'washer',
  'automotive-industrial': 'wrench',
  'spas-salons-fitness': 'sparkle',
  'catering-events': 'glass',
  'vacation-rentals-property-managers': 'home',
  'schools-camps-dormitories': 'cap',
  'wholesale-distributors': 'box',
}

// A fresh object per call: Payload's cloud-storage plugin stashes the uploaded file on the request
// context, so sharing one object across creates leaks files between uploads.
const ctx = () => ({ disableRevalidate: true })

async function run() {
  const payload = await getPayload({ config })
  const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

  for (const collection of ['products', 'industries', 'categories', 'pages', 'guides', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } }, context: ctx(), depth: 0 })
    log(`cleared ${collection}`)
  }

  // Media — one upload per image file
  const media: Record<string, number> = {}
  const imageDir = path.join(dirname, 'images')
  for (const file of fs.readdirSync(imageDir).filter((f) => f.endsWith('.webp'))) {
    const doc = await payload.create({
      collection: 'media',
      data: { alt: imageAlt[file] ?? file.replace(/[-_]/g, ' ').replace('.webp', '') },
      filePath: path.join(imageDir, file),
      context: ctx(),
    })
    media[file] = doc.id
  }
  log(`uploaded ${Object.keys(media).length} images`)
  const img = (ref: string) => media[path.basename(ref)]

  // Categories
  const categoryIds: Record<string, number> = {}
  for (const [i, c] of catalog.categories.entries()) {
    const extra = categoryContent[c.slug]
    const doc = await payload.create({
      collection: 'categories',
      data: {
        name: c.name,
        slug: c.slug,
        heading: extra?.heading,
        intro: extra?.intro ?? c.intro,
        image: img(c.image),
        buyerChecklist: c.rfq,
        body: extra?.body,
        faqs: extra?.faqs,
        sortOrder: (i + 1) * 10,
      },
      context: ctx(),
    })
    categoryIds[c.slug] = doc.id
  }
  log(`created ${catalog.categories.length} categories`)

  // Industries
  const industryIds: Record<string, number> = {}
  for (const [i, ind] of industries.entries()) {
    const doc = await payload.create({
      collection: 'industries',
      data: {
        name: ind.name,
        slug: ind.slug,
        heading: ind.heading,
        summary: ind.summary,
        buyers: ind.buyers,
        icon: industryIcons[ind.slug] as never,
        intro: ind.intro,
        needs: ind.needs,
        categories: ind.categories.map((s) => categoryIds[s]).filter(Boolean),
        faqs: ind.faqs,
        sortOrder: (i + 1) * 10,
        showOnHome: true,
      },
      context: ctx(),
    })
    industryIds[ind.slug] = doc.id
  }
  log(`created ${industries.length} industries`)

  // Products
  const productIds: Record<string, number> = {}
  for (const [i, prod] of catalog.products.entries()) {
    const cat = categoryContent[prod.category]
    const tags = new Set<string>(extraTags[prod.slug] ?? [])
    for (const [ind, cats] of Object.entries(industryTagCategories)) if (cats.includes(prod.category)) tags.add(ind)
    for (const ind of industries) if (ind.extraProducts?.includes(prod.slug)) tags.add(ind.slug)

    const doc = await payload.create({
      collection: 'products',
      data: {
        name: prod.name,
        slug: prod.slug,
        category: categoryIds[prod.category],
        industries: [...tags].map((s) => industryIds[s]).filter(Boolean),
        shortDescription: descriptionOverrides[prod.slug] ?? prod.description,
        application: prod.application,
        image: img(imageOverrides[prod.slug] ?? prod.image),
        description: rt(
          p(`Wholesale ${prod.name.toLowerCase()} for ${prod.application.toLowerCase()}, quoted to your specification.`),
        ),
        specs: cat?.specs,
        customization: cat?.customization.map((option) => ({ option })),
        availability: prod.status === 'proposed' && prod.category === 'technical-industrial-fabrics' ? 'custom' : 'made-to-order',
        featured: featuredProducts.includes(prod.slug),
        sortOrder: (i + 1) * 10,
      },
      context: ctx(),
    })
    productIds[prod.slug] = doc.id
  }
  log(`created ${catalog.products.length} products`)

  await payload.update({
    collection: 'industries',
    id: industryIds['wholesale-distributors'],
    data: { featuredProducts: featuredProducts.map((s) => productIds[s]) },
    context: ctx(),
  })

  // Pages
  for (const page of pages) {
    await payload.create({ collection: 'pages', data: { ...page, _status: 'published' } as never, context: ctx() })
  }
  log(`created ${pages.length} pages`)

  // Guides
  for (const [i, g] of guides.entries()) {
    await payload.create({
      collection: 'guides',
      data: {
        title: g.title,
        slug: g.slug,
        excerpt: g.excerpt,
        image: img(g.image),
        content: g.content,
        relatedProducts: g.relatedProducts.map((s) => productIds[s]).filter(Boolean),
        publishedAt: new Date(Date.now() - i * 86_400_000).toISOString(),
        _status: 'published',
      } as never,
      context: ctx(),
    })
  }
  log(`created ${guides.length} guides`)

  // Globals
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      ...homepage,
      hero: { ...homepage.hero, image: img('hero-textiles.webp') },
      finder: { enabled: true, title: 'Get a wholesale quote', subtitle: "Pick your business, choose products, tell us how many. We'll get back to you as soon as we can." },
      featuredProducts: [],
    } as never,
    context: ctx(),
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'Kazim Textiles',
      tagline: 'Wholesale textiles, made to your order',
      footerAbout:
        'Wholesale towels, linens, uniforms and cleaning textiles made to order for hospitality, foodservice, healthcare, cleaning and industrial businesses.',
      topbarLeft: 'Wholesale textiles made to your specification',
      topbarRight: '',
      titleSuffix: '| Kazim Textiles',
      defaultDescription:
        'Kazim Textiles makes wholesale towels, table linens, hotel linens, hospital textiles, uniforms and cleaning cloths to order for hotels, restaurants, hospitals and cleaning businesses.',
      defaultOgImage: img('hero-textiles.webp'),
    },
    context: ctx(),
  })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      headerLinks: [
        { label: 'Products', url: '/products' },
        { label: 'Industries', url: '/industries' },
        { label: 'Private Label', url: '/private-label-manufacturing' },
        { label: 'Guides', url: '/guides' },
        { label: 'About', url: '/about' },
      ],
      headerCta: { label: 'Get a Quote', url: '/quote' },
      showCategoryBar: true,
      footerColumns: [
        {
          title: 'Products',
          links: catalog.categories.slice(0, 6).map((c) => ({ label: c.name, url: `/categories/${c.slug}` })),
        },
        {
          title: 'Industries',
          links: industries.slice(0, 6).map((i) => ({ label: i.name, url: `/industries/${i.slug}` })),
        },
        {
          title: 'Company',
          links: [
            { label: 'About us', url: '/about' },
            { label: 'How we work', url: '/how-we-work' },
            { label: 'Quality assurance', url: '/quality-assurance' },
            { label: 'Shipping & delivery', url: '/shipping-and-delivery' },
            { label: 'Buying guides', url: '/guides' },
            { label: 'Contact', url: '/contact' },
          ],
        },
      ],
      copyright: 'Kazim Textiles. All rights reserved.',
    },
    context: ctx(),
  })
  log('updated globals')

  // Bring the base catalog in line with the current 22-product sourcing catalog and copy.
  await applySourcingUpdate(payload, log)
  log('done')
  process.exit(0)
}

try {
  await run()
} catch (err) {
  console.error(err)
  process.exit(1)
}
