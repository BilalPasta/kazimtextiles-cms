import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DefaultCta } from '@/components/CtaBand'
import { Faqs } from '@/components/Faqs'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import { PageHead } from '@/components/PageHead'
import { ProductCard } from '@/components/ProductCard'
import { RichText } from '@/components/RichText'
import { getPost, getPosts, getSiteSettings, populatedList } from '@/lib/payload'
import { buildMetadata, mediaUrl } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'
import type { Product } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug)
  if (!post) return {}
  return buildMetadata({ meta: post.meta, title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image, type: 'article' })
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost((await params).slug)
  if (!post) notFound()
  const settings = await getSiteSettings()
  const related = populatedList<Product>(post.relatedProducts)
  const date = post.publishedAt ? new Date(post.publishedAt) : null
  return (
    <>
      <PageHead crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} eyebrow={post.tag} title={post.title} intro={post.excerpt}>
        {date && (
          <p className="article-meta">
            {post.author} · <time dateTime={date.toISOString()}>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            {post.readTime && ` · ${post.readTime}`}
          </p>
        )}
      </PageHead>
      <article className="section">
        <div className="container narrow">
          {post.image && (
            <figure className="article-hero">
              <Img media={post.image} variant="large" sizes="(max-width: 1000px) 100vw, 1000px" priority />
              {post.imageCaption && <figcaption>{post.imageCaption}</figcaption>}
            </figure>
          )}
          <RichText data={post.content} />
        </div>
      </article>
      <Faqs items={post.faqs} />
      {related.length > 0 && (
        <section className="section alt">
          <div className="container">
            <div className="sect-head">
              <div>
                <span className="eyebrow">Products in this post</span>
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
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: mediaUrl(post.image, 'og') ? absoluteUrl(mediaUrl(post.image, 'og')!) : undefined,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt,
          author: { '@type': 'Organization', name: post.author || settings.companyName },
          keywords: post.tag || undefined,
          publisher: { '@id': absoluteUrl('/#organization') },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        }}
      />
    </>
  )
}
