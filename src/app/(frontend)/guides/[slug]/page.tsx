import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DefaultCta } from '@/components/CtaBand'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { PageHead } from '@/components/PageHead'
import { ProductCard } from '@/components/ProductCard'
import { RichText } from '@/components/RichText'
import { getGuide, getGuides, getSiteSettings, populatedList } from '@/lib/payload'
import { buildMetadata, mediaUrl } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'
import type { Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getGuides()).map((g) => ({ slug: g.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuide((await params).slug)
  if (!guide) return {}
  return buildMetadata({ meta: guide.meta, title: guide.title, description: guide.excerpt, path: `/guides/${guide.slug}`, image: guide.image, type: 'article' })
}

export default async function GuidePage({ params }: Props) {
  const guide = await getGuide((await params).slug)
  if (!guide) notFound()
  const settings = await getSiteSettings()
  const related = populatedList<Product>(guide.relatedProducts)
  const date = guide.publishedAt ? new Date(guide.publishedAt) : null
  return (
    <>
      <PageHead crumbs={[{ label: 'Guides', href: '/guides' }, { label: guide.title }]} title={guide.title} intro={guide.excerpt}>
        {date && (
          <p className="article-meta">
            {guide.author} · <time dateTime={date.toISOString()}>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </p>
        )}
      </PageHead>
      <article className="section">
        <div className="container narrow">
          {guide.image && (
            <div className="article-hero">
              <Img media={guide.image} variant="large" sizes="(max-width: 1000px) 100vw, 1000px" priority />
            </div>
          )}
          <RichText data={guide.content} />
        </div>
      </article>
      {related.length > 0 && (
        <section className="section alt">
          <div className="container">
            <div className="sect-head">
              <div>
                <span className="eyebrow">Products in this guide</span>
                <h2>Related products</h2>
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
          '@type': 'Article',
          headline: guide.title,
          description: guide.excerpt,
          image: mediaUrl(guide.image, 'og') ? absoluteUrl(mediaUrl(guide.image, 'og')!) : undefined,
          datePublished: guide.publishedAt || guide.createdAt,
          dateModified: guide.updatedAt,
          author: { '@type': 'Organization', name: guide.author || settings.companyName },
          publisher: { '@id': absoluteUrl('/#organization') },
          mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
        }}
      />
    </>
  )
}
