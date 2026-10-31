'use client'

import Image from 'next/image'
import { useActionState, useMemo, useState } from 'react'
import { submitFinderQuote, type FinderState } from '@/app/(frontend)/quote/actions'
import { IndustryIcon } from './IndustryIcon'

export type FinderIndustry = { slug: string; name: string; icon?: string | null; categories: string[] }
export type FinderProduct = { slug: string; name: string; thumb?: string | null; category: string; categorySlug: string; industries: string[]; priceGuide?: string | null; featured?: boolean | null }

const UNITS = ['pieces', 'dozen', 'lbs', 'cartons']
const STEPS = ['Business', 'Products', 'Quantity', 'Contact']

/**
 * Homepage quote wizard: business type → products → quantities → contact.
 * Works like a "find your part" picker so buyers reach a quote request in a few taps.
 */
export function QuoteFinder({
  industries,
  products,
  title,
  subtitle,
}: {
  industries: FinderIndustry[]
  products: FinderProduct[]
  title?: string | null
  subtitle?: string | null
}) {
  const [step, setStep] = useState(0)
  const [industry, setIndustry] = useState<FinderIndustry | null>(null)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [qty, setQty] = useState<Record<string, { amount: string; unit: string }>>({})
  const [details, setDetails] = useState('')
  const [state, action, pending] = useActionState<FinderState, FormData>(submitFinderQuote, {})

  const bySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [products])

  const visible = useMemo(() => {
    const forIndustry = industry ? products.filter((p) => p.industries.includes(industry.slug)) : products
    const base = forIndustry.length ? forIndustry : products
    const q = query.toLowerCase().trim()
    const filtered = q ? products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q)) : base
    // The industry's main categories first (e.g. towels before napkins for hotels), featured items first within each.
    const rank = (p: FinderProduct) => {
      const i = industry?.categories.indexOf(p.categorySlug) ?? -1
      return (i === -1 ? 99 : i) * 2 + (p.featured ? 0 : 1)
    }
    return filtered.map((p, i) => ({ p, i })).sort((a, b) => rank(a.p) - rank(b.p) || a.i - b.i).map(({ p }) => p)
  }, [products, industry, query])

  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]))

  const items = selected.map((slug) => {
    const q = qty[slug]
    return { product: bySlug.get(slug)?.name ?? slug, quantity: q?.amount ? `${q.amount} ${q.unit}` : '' }
  })

  const pick = (ind: FinderIndustry | null) => {
    setIndustry(ind)
    setQuery('')
    setStep(1)
  }

  return (
    <div className="finder" id="quote-finder">
      <div className="finder-head">
        <div>
          <p className="finder-title">{title || 'Get a quote in 60 seconds'}</p>
          {subtitle && <p className="finder-sub">{subtitle}</p>}
        </div>
        <ol className="finder-steps" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s} className={i < step ? 'done' : i === step ? 'current' : ''} aria-current={i === step ? 'step' : undefined}>
              <span className="sr-only">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      {step === 0 && (
        <div className="finder-body">
          <p className="finder-q">What type of business are you?</p>
          <div className="finder-industries">
            {industries.map((ind) => (
              <button type="button" key={ind.slug} className="finder-ind" onClick={() => pick(ind)}>
                <IndustryIcon name={ind.icon} />
                <span>{ind.name}</span>
              </button>
            ))}
          </div>
          <button type="button" className="finder-link" onClick={() => pick(null)}>
            Something else? Browse all products →
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="finder-body">
          <button type="button" className="finder-back" onClick={() => setStep(0)}>
            ← {industry ? industry.name : 'All businesses'}
          </button>
          <p className="finder-q">What do you need?</p>
          <input
            className="input finder-search"
            type="search"
            placeholder="Search all products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
          <div className="finder-products" role="group" aria-label="Products">
            {visible.map((p) => {
              const on = selected.includes(p.slug)
              return (
                <button type="button" key={p.slug} className={`finder-prod${on ? ' on' : ''}`} aria-pressed={on} onClick={() => toggle(p.slug)}>
                  {p.thumb ? <Image src={p.thumb} alt="" width={52} height={52} /> : <span className="finder-noimg" />}
                  <span className="finder-prod-text">
                    <strong>{p.name}</strong>
                    <small>{p.priceGuide || p.category}</small>
                  </span>
                  <span className="finder-check" aria-hidden="true" />
                </button>
              )
            })}
          </div>
          <div className="finder-foot">
            <span>{selected.length ? `${selected.length} selected` : 'Tap to select one or more'}</span>
            <button type="button" className="btn gold" disabled={!selected.length} onClick={() => setStep(2)}>
              Continue →
            </button>
          </div>
          <button type="button" className="finder-link" onClick={() => setStep(3)}>
            Can’t find it? Describe what you need →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="finder-body">
          <button type="button" className="finder-back" onClick={() => setStep(1)}>
            ← Products
          </button>
          <p className="finder-q">Roughly how many?</p>
          <div className="finder-qty">
            {selected.map((slug) => {
              const p = bySlug.get(slug)!
              const q = qty[slug] ?? { amount: '', unit: 'pieces' }
              return (
                <div className="finder-qty-row" key={slug}>
                  <label htmlFor={`qty-${slug}`}>{p.name}</label>
                  <input
                    id={`qty-${slug}`}
                    className="input"
                    inputMode="numeric"
                    placeholder="e.g. 500"
                    value={q.amount}
                    onChange={(e) => setQty({ ...qty, [slug]: { ...q, amount: e.target.value } })}
                  />
                  <select
                    className="input"
                    aria-label={`Unit for ${p.name}`}
                    value={q.unit}
                    onChange={(e) => setQty({ ...qty, [slug]: { ...q, unit: e.target.value } })}
                  >
                    {UNITS.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                  <button type="button" className="finder-remove" aria-label={`Remove ${p.name}`} onClick={() => toggle(slug)}>
                    ×
                  </button>
                </div>
              )
            })}
          </div>
          <p className="finder-hint">Not sure yet? Leave it blank — we’ll help you work it out.</p>
          <div className="finder-foot">
            <span />
            <button type="button" className="btn gold" disabled={!selected.length} onClick={() => setStep(3)}>
              Continue →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form className="finder-body" action={action}>
          <button type="button" className="finder-back" onClick={() => setStep(selected.length ? 2 : 1)}>
            ← Back
          </button>
          <p className="finder-q">Where should we send your quote?</p>
          {selected.length > 0 && (
            <ul className="finder-summary">
              {items.map((i) => (
                <li key={i.product}>
                  {i.product}
                  {i.quantity && <span> · {i.quantity}</span>}
                </li>
              ))}
            </ul>
          )}
          <input type="hidden" name="industry" value={industry?.name ?? ''} />
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <div className="honeypot" aria-hidden="true">
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="finder-fields">
            <input className="input" name="name" placeholder="Your name *" required autoComplete="name" aria-label="Your name" />
            <input className="input" name="company" placeholder="Company" autoComplete="organization" aria-label="Company" />
            <input className="input full" name="contact" placeholder="Email or WhatsApp / phone *" required autoComplete="email" aria-label="Email or phone" />
            <input className="input full" name="destination" placeholder="Delivery city / country" aria-label="Delivery location" />
            <textarea
              className="input full"
              name="details"
              rows={selected.length ? 2 : 4}
              placeholder={selected.length ? 'Anything else? Size, color, logo… (optional)' : 'Describe what you need — product, size, fabric, quantity *'}
              aria-label="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required={!selected.length}
            />
          </div>
          {state.error && (
            <p className="form-error" role="alert">
              {state.error}
            </p>
          )}
          <button className="btn gold finder-submit" type="submit" disabled={pending}>
            {pending ? 'Sending…' : 'Get my quote →'}
          </button>
          <p className="finder-hint">Free, no obligation. We reply with options and pricing.</p>
        </form>
      )}
    </div>
  )
}
