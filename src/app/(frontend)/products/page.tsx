import type { Metadata } from 'next'
import { CatalogBrowser } from '@/components/CatalogBrowser'
import { DefaultCta } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { PageHead } from '@/components/PageHead'
import { ProductCard } from '@/components/ProductCard'
import { getCategories, getProducts } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'
import type { Category } from '@/payload-types'

const metadata_title = 'Wholesale Textile Products Catalog'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: metadata_title,
    description:
      'Browse wholesale kitchen towels, shop towels, restaurant linens, hotel towels, hospital textiles, uniforms and custom textiles — all made to order for business buyers.',
    path: '/products',
  })
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])
  const items = products.map((p) => {
    const cat = typeof p.category === 'object' ? (p.category as Category) : null
    return {
      id: p.id,
      category: cat?.slug ?? '',
      search: [p.name, p.shortDescription, p.application, cat?.name].join(' ').toLowerCase(),
      card: <ProductCard product={p} />,
    }
  })
  return (
    <>
      <PageHead
        crumbs={[{ label: 'Products' }]}
        eyebrow="Wholesale catalog"
        title={metadata_title}
        intro="Every product is produced to your order: size, fabric, weight, color, branding and packing. Use the catalog as a starting point and send us your specification."
      />
      <section className="section">
        <div className="container">
          <CatalogBrowser items={items} categories={categories.map((c) => ({ slug: c.slug!, name: c.name }))} />
        </div>
      </section>
      <DefaultCta />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: metadata_title,
          url: absoluteUrl('/products'),
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: products.length,
            itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/products/${p.slug}`), name: p.name })),
          },
        }}
      />
    </>
  )
}
