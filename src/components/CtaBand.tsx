import Link from 'next/link'

type Btn = { label: string; url: string; id?: string | null }

export function CtaBand({
  eyebrow,
  heading,
  text,
  buttons,
}: {
  eyebrow?: string | null
  heading?: string | null
  text?: string | null
  buttons?: Btn[] | null
}) {
  if (!heading) return null
  return (
    <section className="band">
      <div className="container band-grid">
        <div>
          {eyebrow && <span className="eyebrow light">{eyebrow}</span>}
          <h2>{heading}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="band-actions">
          {buttons?.map((b, i) => (
            <Link key={b.id ?? i} className={`btn ${i === 0 ? 'gold' : 'outline'}`} href={b.url}>
              {b.label} {i === 0 ? '→' : ''}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DefaultCta() {
  return (
    <CtaBand
      eyebrow="Wholesale inquiries"
      heading="Share your requirements. We'll prepare a quote."
      text="Tell us the product, quantity, specifications and delivery ZIP code. We review supplier options and confirm pricing, MOQ and lead time in a written quotation."
      buttons={[
        { label: 'Request a quote', url: '/quote' },
        { label: 'Custom sourcing', url: '/custom-textile-sourcing' },
      ]}
    />
  )
}
