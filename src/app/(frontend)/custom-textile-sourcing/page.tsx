import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHead } from '@/components/PageHead'
import { buildMetadata } from '@/lib/seo'
import { SourcingForm } from './SourcingForm'

const title = 'Custom Textile Sourcing'
const intro =
  'Need a commercial textile product outside our core catalog? Share your specifications, expected quantity, and delivery requirements. Kazim Textiles can review potential sourcing options through its manufacturing partners.'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Custom Textile Sourcing for Commercial Buyers',
    description:
      'Submit a sourcing inquiry for commercial textiles outside the core catalog, such as placemats, pool towels, bathrobes, duvet covers, lab coats and underpads.',
    path: '/custom-textile-sourcing',
  })
}

/** Products that are not promoted as core catalog listings but can be reviewed on request. */
const sourcingGroups = [
  {
    title: 'Restaurant & table linens',
    items: ['Polyester table linens', 'Printed cloth napkins', 'Printed table covers', 'Embroidered table runners', 'Embroidered, quilted and round placemats', 'Other customized decorative linens'],
  },
  { title: 'Hotel, bath & spa', items: ['Pool towels', 'Salon towels', 'Spa towels', 'Duvet covers', 'Bathrobes', 'Mattress protectors'] },
  { title: 'Healthcare & institutional', items: ['Hospital blankets', 'Reusable underpads', 'Patient bibs', 'Lab coats', 'Laundry bags'] },
]

export default function CustomSourcingPage() {
  return (
    <>
      <PageHead crumbs={[{ label: title }]} eyebrow="Beyond the core catalog" title={title} intro={intro} />
      <section className="section">
        <div className="container">
          <div className="sect-head">
            <div>
              <span className="eyebrow">Sourcing inquiries</span>
              <h2>Products we can review on request</h2>
            </div>
            <p>These items are not stocked or listed as confirmed offerings. Each request is reviewed with our manufacturing partners.</p>
          </div>
          <div className="sourcing-list">
            {sourcingGroups.map((g) => (
              <article className="info-card" key={g.title}>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="notice">
            <strong>Please note:</strong> sourcing feasibility, material availability, minimum order quantities and lead times all require
            confirmation from the manufacturer before a quotation is issued. Looking for a core product such as bar mops or shop towels?{' '}
            <Link href="/products">Browse the catalog</Link>.
          </p>
        </div>
      </section>
      <section className="section alt" id="inquiry">
        <div className="container quote-wrap">
          <div>
            <span className="eyebrow">Inquiry form</span>
            <h2>Tell us what you need</h2>
            <p className="muted">The more you can share, the faster we can check options. Helpful details include:</p>
            <ul className="list-check">
              <li>Product type and intended use</li>
              <li>Material and dimensions</li>
              <li>Expected quantity</li>
              <li>Target specifications such as weight, color or packaging</li>
              <li>Delivery location</li>
            </ul>
          </div>
          <SourcingForm />
        </div>
      </section>
    </>
  )
}
