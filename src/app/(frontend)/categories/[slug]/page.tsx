import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { DefaultCta } from '@/components/CtaBand'
import { Faqs } from '@/components/Faqs'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { PageHead } from '@/components/PageHead'
import { ProductCard } from '@/components/ProductCard'
import { RichText } from '@/components/RichText'
import { getCategories, getCategory, getIndustries, getProducts } from '@/lib/payload'
import { followRedirect } from '@/lib/redirects'
import { buildMetadata } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'
import type { Category } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug! }))
}

const headingFor = (c: Category) => c.heading || `Wholesale ${c.name}`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory((await params).slug)
  if (!category || category.hidden) return {}
  return buildMetadata({ meta: category.meta, title: headingFor(category), description: category.intro, path: `/categories/${category.slug}`, image: category.image })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category || category.hidden) {
    await followRedirect(`/categories/${slug}`)
    if (category?.hidden) permanentRedirect('/products')
    notFound()
  }
  const [all, industries] = await Promise.all([getProducts(), getIndustries()])
  const products = all.filter((p) => (p.category as Category | null)?.id === category.id)
  const servedIndustries = industries.filter((i) => i.categories?.some((c) => (typeof c === 'object' ? c.id : c) === category.id))

  return (
    <>
      <PageHead crumbs={[{ label: 'Products', href: '/products' }, { label: category.name }]} eyebrow="Product category" title={headingFor(category)} intro={category.intro}>
        {servedIndustries.length > 0 && (
          <div className="chips">
            {servedIndustries.map((i) => (
              <Link key={i.id} href={`/industries/${i.slug}`}>
                {i.name}
              </Link>
            ))}
          </div>
        )}
      </PageHead>
      <section className="section">
        <div className="container">
          <div className="sect-head">
            <div>
              <span className="eyebrow">Product range</span>
              <h2>
                {products.length} core {products.length === 1 ? 'product' : 'products'}
              </h2>
            </div>
            <p>
              Specifications, MOQ and lead times are confirmed with each quotation. Need something not listed?{' '}
              <Link href="/custom-textile-sourcing">Submit a custom sourcing inquiry</Link>.
            </p>
          </div>
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      {(category.body || category.buyerChecklist) && (
        <section className="section alt">
          <div className="container grid-2">
            <div>
              <RichText data={category.body} />
              {category.buyerChecklist && (
                <div className="notice">
                  <strong>For an accurate quote, tell us:</strong> {category.buyerChecklist}
                </div>
              )}
            </div>
            <Img media={category.image} className="feature-img" variant="large" sizes="(max-width: 780px) 100vw, 45vw" />
          </div>
        </section>
      )}
      <Faqs items={category.faqs} heading={`${category.name} FAQs`} />
      <DefaultCta />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: headingFor(category),
          description: category.intro,
          url: absoluteUrl(`/categories/${category.slug}`),
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/products/${p.slug}`), name: p.name })),
          },
        }}
      />
    </>
  )
}
