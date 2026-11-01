import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DefaultCta } from '@/components/CtaBand'
import { Faqs } from '@/components/Faqs'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { availabilityLabel, ProductCard } from '@/components/ProductCard'
import { RichText } from '@/components/RichText'
import { getProduct, getProducts, populated, populatedList } from '@/lib/payload'
import { buildMetadata, mediaUrl } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'
import type { Category, Industry, Media, Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  if (!product) return {}
  return buildMetadata({
    meta: product.meta,
    title: `Wholesale ${product.name}`,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: product.image,
  })
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug)
  if (!product) notFound()
  if (product.hidden) permanentRedirect('/products')

  const category = populated<Category>(product.category)
  const industries = populatedList<Industry>(product.industries)
  const gallery = populatedList<Media>(product.gallery)
  let related = populatedList<Product>(product.relatedProducts)
  if (!related.length && category) {
    related = (await getProducts())
      .filter((p) => p.id !== product.id && (p.category as Category | null)?.id === category.id)
      .slice(0, 4)
  }

  const summary = [
    { label: 'Category', value: category?.name },
    { label: 'Production', value: availabilityLabel(product.availability) },
    { label: 'Minimum order', value: product.moq || 'Confirmed with quote' },
    { label: 'Lead time', value: product.leadTime || 'Confirmed with quote' },
  ]

  return (
    <>
      <section className="section">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Products', href: '/products' },
              ...(category ? [{ label: category.name, href: `/categories/${category.slug}` }] : []),
              { label: product.name },
            ]}
          />
          <div className="product-hero">
            <div>
              <Img media={product.image} className="feature-img" variant="large" sizes="(max-width: 780px) 100vw, 52vw" priority />
              {gallery.length > 0 && (
                <div className="gallery">
                  {gallery.map((g) => (
                    <Img key={g.id} media={g} variant="thumbnail" sizes="150px" />
                  ))}
                </div>
              )}
            </div>
            <div className="product-info">
              <span className="eyebrow">Wholesale · Made to order</span>
              <h1>{product.name}</h1>
              <p>{product.shortDescription}</p>
              {product.priceGuide && <p className="price-guide big">{product.priceGuide}</p>}
              {product.application && (
                <p>
                  <strong>Typical use:</strong> {product.application}
                </p>
              )}
              <dl className="summary-data">
                {summary.map((s) => (
                  <div className="item" key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="cta-row">
                <Link className="btn" href={`/quote?product=${product.slug}`}>
                  Request a quote →
                </Link>
                <Link className="btn ghost" href="/guides/how-to-request-a-textile-quote">
                  What to include
                </Link>
              </div>
              {industries.length > 0 && (
                <div className="chips" aria-label="Industries">
                  {industries.map((i) => (
                    <Link key={i.id} href={`/industries/${i.slug}`}>
                      {i.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="spec-grid">
            <section className="panel">
              <h2>Specifications</h2>
              {product.specs?.length ? (
                <div className="table-wrap">
                  <table className="spec">
                    <tbody>
                      {product.specs.map((s) => (
                        <tr key={s.id}>
                          <th scope="row">{s.label}</th>
                          <td>{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="muted">Sizes, fabric, weight and packing are produced to your specification. Tell us your requirement and we will confirm.</p>
              )}
            </section>
            <section className="panel">
              <h2>Made to your requirement</h2>
              {product.customization?.length ? (
                <ul className="custom-list">
                  {product.customization.map((c) => (
                    <li key={c.id}>{c.option}</li>
                  ))}
                </ul>
              ) : null}
              {category?.buyerChecklist && (
                <>
                  <h3 className="h4" style={{ marginTop: 22 }}>
                    Include in your quote request
                  </h3>
                  <p className="muted">{category.buyerChecklist}</p>
                </>
              )}
              <Link className="textlink" href={`/quote?product=${product.slug}`}>
                Start your quote →
              </Link>
            </section>
          </div>

          {product.description && (
            <div className="details-copy" style={{ marginTop: 50 }}>
              <RichText data={product.description} />
            </div>
          )}
        </div>
      </section>

      <Faqs items={product.faqs} heading={`${product.name} FAQs`} />

      {related.length > 0 && (
        <section className="section alt">
          <div className="container">
            <div className="sect-head">
              <div>
                <span className="eyebrow">Related</span>
                <h2>Buyers also source</h2>
              </div>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <DefaultCta />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.shortDescription,
          url: absoluteUrl(`/products/${product.slug}`),
          image: [product.image, ...gallery].map((m) => mediaUrl(m as Media, 'large')).filter(Boolean).map((u) => absoluteUrl(u!)),
          category: category?.name,
          brand: { '@type': 'Brand', name: 'Kazim Textiles' },
          manufacturer: { '@id': absoluteUrl('/#organization') },
          additionalProperty: product.specs?.map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.value })),
        }}
      />
    </>
  )
}
