import type { Metadata } from 'next'
import Link from 'next/link'
import { CatalogBrowser } from '@/components/CatalogBrowser'
import { DefaultCta } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { PageHead } from '@/components/PageHead'
import { ProductCard } from '@/components/ProductCard'
import { getCategories, getProducts } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'
import type { Category } from '@/payload-types'

const title = 'Wholesale Commercial Textiles Catalog'
const description =
  'Shop towels, bar mops, flour sack towels, kitchen towels, napkins, hotel towels, sheets and healthcare textiles, sourced for U.S. wholesale buyers and quoted to specification.'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title, description, path: '/products' })
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])
  const order = new Map(categories.map((c, i) => [c.id, i]))
  const sorted = [...products].sort(
    (a, b) => (order.get((a.category as Category | null)?.id ?? 0) ?? 99) - (order.get((b.category as Category | null)?.id ?? 0) ?? 99),
  )
  const items = sorted.map((p) => {
    const cat = typeof p.category === 'object' ? (p.category as Category) : null
    return {
      id: p.id,
      category: cat?.slug ?? '',
      search: [p.name, p.shortDescription, p.application, p.searchTerms, p.customization?.map((c) => c.option).join(' ')].join(' '),
      card: <ProductCard product={p} headingLevel={2} />,
    }
  })
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Products' }]}
        eyebrow={`${categories.length} product categories`}
        title={title}
        intro="Core wholesale products for foodservice, cleaning, hospitality and healthcare buyers. Specifications, MOQ and lead times are confirmed with each supplier quotation."
      />
      <section className="section">
        <div className="container">
          <CatalogBrowser items={items} categories={categories.map((c) => ({ slug: c.slug!, name: c.name }))} />
          <p className="notice">
            Looking for something outside the core catalog, such as placemats, pool towels, bathrobes or lab coats?{' '}
            <Link href="/custom-textile-sourcing">Submit a custom sourcing inquiry →</Link>
          </p>
        </div>
      </section>
      <DefaultCta />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          url: absoluteUrl('/products'),
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: sorted.length,
            itemListElement: sorted.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/products/${p.slug}`), name: p.name })),
          },
        }}
      />
    </>
  )
}
