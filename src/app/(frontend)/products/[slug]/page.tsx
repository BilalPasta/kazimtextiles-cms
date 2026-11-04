import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { TrackEvent } from '@/components/Analytics'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { DefaultCta } from '@/components/CtaBand'
import { Faqs } from '@/components/Faqs'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { availabilityLabel, ProductCard } from '@/components/ProductCard'
import { RichText } from '@/components/RichText'
import { telHref } from '@/lib/contact'
import { getProduct, getProducts, getSiteSettings, populated, populatedList } from '@/lib/payload'
import { followRedirect } from '@/lib/redirects'
import { buildMetadata, mediaUrl } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'
import type { Category, Media, Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug)
  if (!product || product.hidden) return {}
  return buildMetadata({
    meta: product.meta,
    title: `Wholesale ${product.name}`,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: product.image,
  })
}

/** Standard supply labels until supplier-confirmed values are entered in the CMS. */
const supplyTerms =(product: Product) => [
  { label: 'MOQ', value: product.moq || 'Confirmed with quotation' },
  { label: 'Lead time', value: product.leadTime || 'Confirmed with quotation' },
  { label: 'Packaging', value: product.packaging || 'Based on approved specification' },
  { label: 'Customization', value: product.customizationStatus || 'Subject to supplier availability' },
]

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProduct(slug), getSiteSettings()])
  if (!product || product.hidden) {
    await followRedirect(`/products/${slug}`)
    if (product?.hidden) permanentRedirect('/products')
    notFound()
  }

  const category = populated<Category>(product.category)
  const gallery = populatedList<Media>(product.gallery)
  let related = populatedList<Product>(product.relatedProducts)
  if (!related.length && category) {
    related = (await getProducts())
      .filter((p) => p.id !== product.id && (p.category as Category | null)?.id === category.id)
      .slice(0, 3)
  }
  const applications = (product.application ?? '')
    .split(/[,;]/)
    .map((a) => a.trim())
    .filter(Boolean)
  const quoteHref = `/quote?product=${product.slug}`
  const phone = telHref(settings.phone)

  return (
    <>
      <TrackEvent name="view_item" params={{ item_name: product.name, item_category: category?.name ?? '' }} />
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
              <figure className="product-figure">
                <Img media={product.image} className="feature-img" variant="large" sizes="(max-width: 780px) 100vw, 52vw" priority />
                <figcaption>Representative image. Final product follows the approved specification.</figcaption>
              </figure>
              {gallery.length > 0 && (
                <div className="gallery">
                  {gallery.map((g) => (
                    <Img key={g.id} media={g} variant="thumbnail" sizes="150px" />
                  ))}
                </div>
              )}
            </div>
            <div className="product-info">
              <span className="eyebrow">{category ? `Wholesale · ${category.name}` : 'Wholesale'}</span>
              <h1>{product.name}</h1>
              <p className="lead">{product.shortDescription}</p>
              {product.priceGuide && <p className="price-guide big">{product.priceGuide}</p>}
              <dl className="summary-data">
                <div className="item">
                  <dt>Supply status</dt>
                  <dd>{availabilityLabel(product.availability)}</dd>
                </div>
                {supplyTerms(product)
                  .slice(0, 3)
                  .map((s) => (
                    <div className="item" key={s.label}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
              </dl>
              <div className="cta-row">
                <Link className="btn" href={quoteHref}>
                  Request a quote →
                </Link>
                <Link className="btn ghost" href="/guides/how-to-request-a-textile-quote">
                  What to include
                </Link>
              </div>
            </div>
          </div>

          <div className="spec-grid">
            <section className="panel" aria-labelledby="specs-heading">
              <h2 id="specs-heading">Specifications</h2>
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
                <p className="muted">Specifications are confirmed with the supplier quotation. Share your size, material and quantity requirements.</p>
              )}
              <p className="muted small">Reference values only. Configurations not yet confirmed by the manufacturer are subject to supplier quotation.</p>
            </section>
            <div className="stack">
              {!!product.customization?.length && (
                <section className="panel" aria-labelledby="options-heading">
                  <h2 id="options-heading">Available options</h2>
                  <ul className="custom-list">
                    {product.customization.map((c) => (
                      <li key={c.id}>{c.option}</li>
                    ))}
                  </ul>
                </section>
              )}
              {applications.length > 0 && (
                <section className="panel" aria-labelledby="applications-heading">
                  <h2 id="applications-heading">Typical commercial applications</h2>
                  <ul className="custom-list">
                    {applications.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>

          <section className="panel supply-panel" aria-labelledby="supply-heading">
            <div>
              <h2 id="supply-heading">Supply & ordering</h2>
              <p className="muted">
                Kazim Textiles sources this product through its manufacturing partners. Minimums, lead times and packaging are confirmed in a
                written quotation based on your specification and quantity. See how specifications are checked on our{' '}
                <Link href="/quality-assurance">quality assurance</Link> page.
              </p>
              <dl className="terms-list">
                {supplyTerms(product).map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
              {category?.buyerChecklist && (
                <p className="muted">
                  <strong>For an accurate quote, include:</strong> {category.buyerChecklist}
                </p>
              )}
            </div>
            <div className="supply-actions">
              <Link className="btn" href={quoteHref}>
                Request a quote →
              </Link>
              {phone && (
                <a className="btn ghost" href={phone} data-track="phone_click">
                  Call {settings.phone}
                </a>
              )}
            </div>
          </section>

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
                <span className="eyebrow">Related products</span>
                <h2>Often quoted together</h2>
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
          additionalProperty: product.specs?.map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.value })),
        }}
      />
    </>
  )
}
