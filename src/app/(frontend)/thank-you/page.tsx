import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHead } from '@/components/PageHead'

export const metadata: Metadata = { title: 'Thank you | Kazim Textiles', robots: { index: false, follow: false } }

export default function ThankYouPage() {
  return (
    <>
      <PageHead crumbs={[{ label: 'Thank you' }]} title="Thank you — we've received your request." intro="Our team will review your requirements and get back to you, usually within one business day." />
      <section className="section">
        <div className="container horizontal-links">
          <Link href="/products">Keep browsing products →</Link>
          <Link href="/guides">Read our buying guides →</Link>
        </div>
      </section>
    </>
  )
}
