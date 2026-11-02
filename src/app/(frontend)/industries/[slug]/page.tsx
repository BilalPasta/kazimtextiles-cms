import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DefaultCta } from '@/components/CtaBand'
import { Faqs } from '@/components/Faqs'
import { PageHead } from '@/components/PageHead'
import { ProductCard } from '@/components/ProductCard'
import { RichText } from '@/components/RichText'
import { getIndustries, getIndustry, getProducts, populatedList } from '@/lib/payload'
import { followRedirect } from '@/lib/redirects'
import { buildMetadata } from '@/lib/seo'
import type { Category, Industry, Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getIndustries()).map((i) => ({ slug: i.slug! }))
}

const headingFor = (i: Industry) => i.heading || i.name

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = await getIndustry((await params).slug)
  if (!industry) return {}
  return buildMetadata({ meta: industry.meta, title: headingFor(industry), description: industry.summary, path: `/industries/${industry.slug}`, image: industry.image })
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const industry = await getIndustry(slug)
  if (!industry) {
    await followRedirect(`/industries/${slug}`)
    notFound()
  }

  const categories = populatedList<Category>(industry.categories)
  let products = populatedList<Product>(industry.featuredProducts)
  if (!products.length) {
    products = (await getProducts()).filter((p) => p.industries?.some((i) => (typeof i === 'object' ? i.id : i) === industry.id))
  }

  return (
    <>
      <PageHead crumbs={[{ label: 'Industries', href: '/industries' }, { label: industry.name }]} eyebrow={industry.buyers} title={headingFor(industry)} intro={industry.summary}>
        <div className="hero-actions">
          <Link className="btn gold" href={`/quote?industry=${industry.slug}`}>
            Request a wholesale quote →
          </Link>
        </div>
      </PageHead>

      {(industry.intro || industry.needs?.length) && (
        <section className="section">
          <div className="container">
            <RichText data={industry.intro} />
            {!!industry.needs?.length && (
              <div className="needs-grid" style={{ marginTop: 30 }}>
                {industry.needs.map((n) => (
                  <article className="info-card" key={n.id}>
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="section alt">
          <div className="container">
            <div className="sect-head">
              <div>
                <span className="eyebrow">Recommended products</span>
                <h2>Textiles for {industry.name.toLowerCase()}</h2>
              </div>
              <p>Quoted to your size, material, quantity and packing requirements through our manufacturing partners.</p>
            </div>
            <div className="product-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {categories.length > 0 && (
              <div className="horizontal-links">
                {categories.map((c) => (
                  <Link key={c.id} href={`/categories/${c.slug}`}>
                    All {c.name} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <Faqs items={industry.faqs} heading={`${industry.name}: buyer FAQs`} />
      <DefaultCta />
    </>
  )
}
