import Link from 'next/link'
import { telHref } from '@/lib/contact'
import { getSiteSettings } from '@/lib/payload'

/** Business contact details from Site Settings, shown on the Contact and About pages. */
export async function ContactDetails({ heading = 'Contact Kazim Textiles' }: { heading?: string }) {
  const settings = await getSiteSettings()
  const phone = telHref(settings.phone)
  if (!phone && !settings.email) return null
  return (
    <section className="section">
      <div className="container grid-2">
        <div>
          <span className="eyebrow">Business contact</span>
          <h2>{heading}</h2>
          <div className="contact-details">
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
            {settings.address && <span>{settings.address}</span>}
            {settings.hours && <span className="muted">{settings.hours}</span>}
          </div>
        </div>
        <div className="panel">
          <h3>Wholesale quote or sourcing inquiry?</h3>
          <p className="muted">The forms send your requirements straight to our sales team, with the product details we need to prepare a quote.</p>
          <div className="cta-row">
            <Link className="btn" href="/quote">
              Request a quote →
            </Link>
            <Link className="btn ghost" href="/custom-textile-sourcing">
              Custom sourcing
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
