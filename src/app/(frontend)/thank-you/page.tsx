import type { Metadata } from 'next'
import Link from 'next/link'
import { TrackEvent } from '@/components/Analytics'
import { PageHead } from '@/components/PageHead'

export const metadata: Metadata = { title: 'Thank you | Kazim Textiles', robots: { index: false, follow: false } }

const forms = ['quote', 'finder', 'sourcing'] as const

type Props = { searchParams: Promise<{ form?: string }> }

export default async function ThankYouPage({ searchParams }: Props) {
  const requested = (await searchParams).form
  const form = forms.find((f) => f === requested) ?? 'quote'
  const sourcing = form === 'sourcing'
  return (
    <>
      <TrackEvent name={sourcing ? 'custom_sourcing_submit' : 'generate_lead'} params={{ form }} />
      <PageHead
        crumbs={[{ label: 'Thank you' }]}
        title="Thank you — we've received your request."
        intro={
          sourcing
            ? 'We will review your specifications with our manufacturing partners and reply by email. Sourcing feasibility, MOQ and lead time are confirmed before any quotation.'
            : 'Your request has been sent to our sales team. We will review your requirements and reply with next steps.'
        }
      />
      <section className="section">
        <div className="container narrow">
          <p className="form-success" role="status">
            Request received. If you gave us an email address, a confirmation is on its way to your inbox.
          </p>
          <div className="horizontal-links">
            <Link href="/products">Keep browsing products →</Link>
            <Link href="/guides">Read our buying guides →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
