import type { Metadata } from 'next'
import Link from 'next/link'
import { DefaultCta } from '@/components/CtaBand'
import { Img } from '@/components/Img'
import { PageHead } from '@/components/PageHead'
import { getIndustries } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

const title = 'Wholesale Textiles by Industry'
const intro =
  'Hotels, restaurants, healthcare facilities, cleaning companies, laundries and distributors each buy textiles differently. Find the core products and specifications that fit your business.'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title, description: intro, path: '/industries' })
}

export default async function IndustriesPage() {
  const industries = await getIndustries()
  return (
    <>
      <PageHead crumbs={[{ label: 'Industries' }]} eyebrow="Industries served" title={title} intro={intro} />
      <section className="section">
        <div className="container">
          <div className="industry-grid">
            {industries.map((ind, i) => (
              <article className="industry-card" key={ind.id}>
                {ind.image ? (
                  <Img media={ind.image} className="industry-photo" sizes="(max-width: 780px) 100vw, 33vw" />
                ) : (
                  <div className="number">{String(i + 1).padStart(2, '0')}</div>
                )}
                <h2 className="h3-like">
                  <Link href={`/industries/${ind.slug}`}>{ind.name}</Link>
                </h2>
                {ind.buyers && <p className="who">{ind.buyers}</p>}
                <p>{ind.summary}</p>
                <Link className="textlink" href={`/industries/${ind.slug}`}>
                  View products & requirements →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <DefaultCta />
    </>
  )
}
