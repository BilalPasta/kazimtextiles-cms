import Link from 'next/link'
import type { Metadata } from 'next'
import { CtaBand } from '@/components/CtaBand'
import { Faqs } from '@/components/Faqs'
import { Img } from '@/components/Img'
import { ProductCard } from '@/components/ProductCard'
import { QuoteFinder } from '@/components/QuoteFinder'
import { getCategories, getHomepage, getIndustries, getProducts, populatedList } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import type { Category, Industry, Product } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomepage()
  return buildMetadata({ meta: home.meta, title: home.hero.heading, description: home.hero.text, path: '/', image: home.hero.image })
}

export default async function HomePage() {
  const [home, categories, industries, products] = await Promise.all([getHomepage(), getCategories(), getIndustries(), getProducts()])
  const { hero } = home
  const picked = populatedList<Product>(home.featuredProducts)
  const featured = (picked.length ? picked : products.filter((p) => p.featured)).slice(0, 8)
  const homeIndustries = industries.filter((i) => i.showOnHome !== false)
  const finderOn = home.finder?.enabled !== false

  return (
    <>
      <section className={`hero${finderOn ? ' hero--finder' : ''}`}>
        <div className="hero-layout">
          <div className="herocopy">
            {hero.eyebrow && <span className="eyebrow light">{hero.eyebrow}</span>}
            <h1>{hero.heading}</h1>
            {hero.text && <p>{hero.text}</p>}
            <div className="hero-actions">
              {hero.primaryCta?.url && (
                <Link className="btn gold" href={hero.primaryCta.url}>
                  {hero.primaryCta.label} →
                </Link>
              )}
              {hero.secondaryCta?.url && (
                <Link className="btn outline" href={hero.secondaryCta.url}>
                  {hero.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
          {finderOn ? (
            <QuoteFinder
              title={home.finder?.title}
              subtitle={home.finder?.subtitle}
              industries={industries.map((i) => ({ slug: i.slug!, name: i.name, icon: i.icon, categories: populatedList<Category>(i.categories).map((c) => c.slug ?? '') }))}
              products={products.map((p) => ({
                slug: p.slug!,
                name: p.name,
                thumb: typeof p.image === 'object' ? p.image?.sizes?.thumbnail?.url || p.image?.url : null,
                category: (p.category as Category | null)?.name ?? '',
                categorySlug: (p.category as Category | null)?.slug ?? '',
                industries: (p.industries ?? []).map((i) => (i as Industry).slug ?? '').filter(Boolean),
                priceGuide: p.priceGuide,
                featured: p.featured,
              }))}
            />
          ) : (
            <div className="hero-photo">
              <Img media={hero.image} variant="large" sizes="(max-width: 780px) 100vw, 47vw" priority />
            </div>
          )}
        </div>
      </section>

      {!!home.trustItems?.length && (
        <section className="trust" aria-label="Why Kazim Textiles">
          <div className="container trust-grid">
            {home.trustItems.map((t, i) => (
              <div className="trust-item" key={t.id}>
                <span className="trust-icon" aria-hidden="true">
                  {['◈', '◎', '✧', '↗'][i % 4]}
                </span>
                {t.text}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="sect-head">
            <div>
              <span className="eyebrow">{home.categoriesSection?.eyebrow}</span>
              <h2>{home.categoriesSection?.heading}</h2>
            </div>
            <p>{home.categoriesSection?.intro}</p>
          </div>
          <div className="category-grid">
            {categories.map((c) => (
              <article className="category-card" key={c.id}>
                <Link href={`/categories/${c.slug}`} tabIndex={-1} aria-hidden="true">
                  <Img media={c.image} className="photo" sizes="(max-width: 520px) 100vw, 25vw" />
                </Link>
                <div className="category-text">
                  <h3>
                    <Link href={`/categories/${c.slug}`}>{c.name}</Link>
                  </h3>
                  <p>{c.intro}</p>
                  <Link className="textlink" href={`/categories/${c.slug}`}>
                    View products →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section alt">
          <div className="container">
            <div className="sect-head">
              <div>
                <span className="eyebrow">{home.productsSection?.eyebrow}</span>
                <h2>{home.productsSection?.heading}</h2>
              </div>
              <p>{home.productsSection?.intro}</p>
            </div>
            <div className="product-grid">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="horizontal-links">
              <Link href="/products">Browse all {products.length} products →</Link>
              <Link href="/private-label-manufacturing">Custom & private label →</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="sect-head">
            <div>
              <span className="eyebrow">{home.industriesSection?.eyebrow}</span>
              <h2>{home.industriesSection?.heading}</h2>
            </div>
            <p>{home.industriesSection?.intro}</p>
          </div>
          <div className="industry-grid four">
            {homeIndustries.map((ind, i) => (
              <article className="industry-card" key={ind.id}>
                <div className="number">{String(i + 1).padStart(2, '0')}</div>
                <h3>
                  <Link href={`/industries/${ind.slug}`}>{ind.name}</Link>
                </h3>
                <p>{ind.summary}</p>
                <Link className="textlink" href={`/industries/${ind.slug}`}>
                  Explore industry →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {home.whyUs?.heading && (
        <section className="section alt">
          <div className="container">
            <div className="sect-head">
              <div>
                <span className="eyebrow">{home.whyUs.eyebrow}</span>
                <h2>{home.whyUs.heading}</h2>
              </div>
            </div>
            <div className="why-grid">
              {home.whyUs.items?.map((w) => (
                <div className="why-item" key={w.id}>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {home.process?.heading && (
        <section className="section process">
          <div className="container process-grid">
            <div>
              <span className="eyebrow">{home.process.eyebrow}</span>
              <h2>{home.process.heading}</h2>
              {home.process.intro && <p className="sectiontext">{home.process.intro}</p>}
              {home.process.cta?.url && (
                <Link className="btn" href={home.process.cta.url}>
                  {home.process.cta.label} →
                </Link>
              )}
            </div>
            <ol className="steps">
              {home.process.steps?.map((s, i) => (
                <li className="step" key={s.id}>
                  <span className="number">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="h4">{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <Faqs items={home.faqs} heading="Wholesale buying questions" />
      <CtaBand {...home.ctaBand} />
    </>
  )
}
