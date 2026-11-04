import type { Metadata } from 'next'
import Link from 'next/link'
import { DefaultCta } from '@/components/CtaBand'
import { Img } from '@/components/Img'
import { PageHead } from '@/components/PageHead'
import { getPosts } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

const title = 'Kazim Textiles Blog'
const intro = 'News, ideas and practical advice for businesses buying wholesale textiles.'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title, description: intro, path: '/blog' })
}

export default async function BlogPage() {
  const posts = await getPosts()
  return (
    <>
      <PageHead crumbs={[{ label: 'Blog' }]} eyebrow="Blog" title={title} intro={intro} />
      <section className="section">
        {posts.length === 0 ? (
          <div className="container narrow">
            <p>
              New articles are coming soon. In the meantime, read our <Link href="/guides">buying guides</Link>.
            </p>
          </div>
        ) : (
          <div className="container guide-grid">
            {posts.map((post) => (
              <article className="guide-card" key={post.id}>
                {post.image && <Img media={post.image} className="photo" sizes="(max-width: 780px) 100vw, 33vw" />}
                <div className="copy">
                  {post.tag && <span className="overline">{post.tag}</span>}
                  <h2>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <Link className="textlink" href={`/blog/${post.slug}`}>
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <DefaultCta />
    </>
  )
}
