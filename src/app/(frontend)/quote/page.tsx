import type { Metadata } from 'next'
import { PageHead } from '@/components/PageHead'
import { getIndustries, getProducts, getSiteSettings } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { QuoteForm } from './QuoteForm'

const title = 'Request a Wholesale Quote'
const intro = 'Tell us what you need — product, size, fabric, quantity and delivery location. We produce to your specification and reply with a written quotation.'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ title, description: intro, path: '/quote' })
}

type Props = { searchParams: Promise<{ product?: string; industry?: string }> }

export default async function QuotePage({ searchParams }: Props) {
  const [{ product, industry }, products, industries, settings] = await Promise.all([searchParams, getProducts(), getIndustries(), getSiteSettings()])
  const productLabel = products.find((p) => p.slug === product)?.name
  const industryLabel = industries.find((i) => i.slug === industry)?.name
  return (
    <>
      <PageHead crumbs={[{ label: 'Request a quote' }]} eyebrow="Wholesale inquiry" title={title} intro={intro} />
      <section className="section">
        <div className="container quote-wrap">
          <div>
            <span className="eyebrow">What happens next</span>
            <h2>Your order, built to spec.</h2>
            <ul className="list-check">
              <li>We review your requirement and confirm what&apos;s possible</li>
              <li>We suggest fabric, weight and packing options</li>
              <li>Samples or swatches for approval, where needed</li>
              <li>Written quote with MOQ, price, lead time and shipping terms</li>
            </ul>
            <p className="muted">Don&apos;t know every detail yet? Send what you have. We&apos;ll help you fill the gaps.</p>
            {(settings.email || settings.phone || settings.whatsapp) && (
              <div className="contact-card">
                <strong>Prefer to talk?</strong>
                {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
                {settings.phone && <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}>{settings.phone}</a>}
                {settings.whatsapp && (
                  <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp us
                  </a>
                )}
              </div>
            )}
          </div>
          <QuoteForm
            products={products.map((p) => ({ value: p.slug!, label: p.name }))}
            industries={industries.map((i) => ({ value: i.slug!, label: i.name }))}
            defaultProduct={productLabel}
            defaultIndustry={industryLabel}
          />
        </div>
      </section>
    </>
  )
}
