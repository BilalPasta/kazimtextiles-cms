import type { Metadata } from 'next'
import Link from 'next/link'
import { DefaultCta } from '@/components/CtaBand'
import { Img } from '@/components/Img'
import { PageHead } from '@/components/PageHead'
import { getGuides } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

const title = 'Wholesale Textile Buying Guides'
const intro = 'Practical guides on towel weights, fabric choices, quote requests and running textile programs for hospitality, healthcare and cleaning businesses.'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title, description: intro, path: '/guides' })
}

export default async function GuidesPage() {
  const guides = await getGuides()
  return (
    <>
      <PageHead crumbs={[{ label: 'Guides' }]} eyebrow="Resources" title={title} intro={intro} />
      <section className="section">
        <div className="container guide-grid">
          {guides.map((g) => (
            <article className="guide-card" key={g.id}>
              {g.image && <Img media={g.image} className="photo" sizes="(max-width: 780px) 100vw, 33vw" />}
              <div className="copy">
                <h2>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </h2>
                <p>{g.excerpt}</p>
                <Link className="textlink" href={`/guides/${g.slug}`}>
                  Read guide →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <DefaultCta />
    </>
  )
}
