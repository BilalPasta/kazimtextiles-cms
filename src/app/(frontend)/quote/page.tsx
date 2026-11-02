import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHead } from '@/components/PageHead'
import { telHref } from '@/lib/contact'
import { getCategories, getProducts, getSiteSettings, populated } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import type { Category } from '@/payload-types'
import { QuoteForm, type ProductGroup } from './QuoteForm'

const title = 'Request a Wholesale Quote'
const intro =
  'Tell us which products you need, roughly how many, and where they ship. We review supplier options and confirm pricing, MOQ and lead time in a written quotation.'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title, description: intro, path: '/quote' })
}

type Props = { searchParams: Promise<{ product?: string }> }

export default async function QuotePage({ searchParams }: Props) {
  const [{ product }, products, categories, settings] = await Promise.all([searchParams, getProducts(), getCategories(), getSiteSettings()])
  const productLabel = products.find((p) => p.slug === product)?.name
  const productGroups: ProductGroup[] = categories.map((c) => ({ label: c.name, products: [] }))
  for (const p of products) {
    const label = populated<Category>(p.category)?.name ?? 'Other'
    const group = productGroups.find((g) => g.label === label)
    if (group) group.products.push(p.name)
    else productGroups.push({ label, products: [p.name] })
  }
  const phone = telHref(settings.phone)
  return (
    <>
      <PageHead crumbs={[{ label: 'Request a quote' }]} eyebrow="Wholesale inquiry" title={title} intro={intro} />
      <section className="section">
        <div className="container quote-wrap">
          <div>
            <span className="eyebrow">What happens next</span>
            <h2>How quotation works</h2>
            <ol className="list-check">
              <li>We review your requirements and the product specifications you share</li>
              <li>We check options with our textile manufacturing partners</li>
              <li>You receive a written quotation with confirmed specifications, MOQ, lead time and pricing</li>
            </ol>
            <p className="muted">
              Not sure of every specification? Send what you know and we will help identify the details needed. For products outside the core
              catalog, use <Link href="/custom-textile-sourcing">custom textile sourcing</Link>.
            </p>
            {(settings.email || phone) && (
              <div className="contact-card">
                <strong>Prefer to talk?</strong>
                {phone && (
                  <a href={phone} data-track="phone_click">
                    {settings.phone}
                  </a>
                )}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} data-track="email_click">
                    {settings.email}
                  </a>
                )}
              </div>
            )}
          </div>
          <QuoteForm productGroups={productGroups.filter((g) => g.products.length)} defaultProduct={productLabel} />
        </div>
      </section>
    </>
  )
}
