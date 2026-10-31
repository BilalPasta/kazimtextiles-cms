import { JsonLd } from './JsonLd'

type Faq = { question: string; answer: string; id?: string | null }

export function Faqs({ items, heading = 'Frequently asked questions', eyebrow = 'FAQ', intro }: { items?: Faq[] | null; heading?: string | null; eyebrow?: string | null; intro?: string | null }) {
  if (!items?.length) return null
  return (
    <section className="section faq-section">
      <div className="container">
        <div className="sect-head">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {heading && <h2>{heading}</h2>}
          </div>
          {intro && <p>{intro}</p>}
        </div>
        <div className="faq">
          {items.map((f, i) => (
            <details key={f.id ?? i}>
              <summary>{f.question}</summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
    </section>
  )
}
