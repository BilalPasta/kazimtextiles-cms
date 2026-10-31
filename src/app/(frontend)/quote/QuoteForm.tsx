'use client'

import { useActionState } from 'react'
import { submitQuote, type QuoteState } from './actions'

type Option = { value: string; label: string }

export function QuoteForm({ products, industries, defaultProduct, defaultIndustry }: { products: Option[]; industries: Option[]; defaultProduct?: string; defaultIndustry?: string }) {
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, {})
  return (
    <form className="quote-form" action={action}>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this blank
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field">
        <label htmlFor="q-product">Product</label>
        <select id="q-product" name="product" defaultValue={defaultProduct ?? ''}>
          <option value="">Choose a product (optional)</option>
          {products.map((p) => (
            <option key={p.value} value={p.label}>
              {p.label}
            </option>
          ))}
          <option value="Other / custom textile">Other / custom textile</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-industry">Your industry</label>
        <select id="q-industry" name="industry" defaultValue={defaultIndustry ?? ''}>
          <option value="">Choose (optional)</option>
          {industries.map((i) => (
            <option key={i.value} value={i.label}>
              {i.label}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-name">Your name *</label>
        <input id="q-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="q-company">Company *</label>
        <input id="q-company" name="company" required autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="q-email">Business email *</label>
        <input id="q-email" type="email" name="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="q-phone">Phone / WhatsApp</label>
        <input id="q-phone" type="tel" name="phone" autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="q-quantity">Quantity</label>
        <input id="q-quantity" name="quantity" placeholder="e.g. 5,000 pcs or 200 dozen" />
      </div>
      <div className="field">
        <label htmlFor="q-destination">Delivery city / ZIP / country</label>
        <input id="q-destination" name="destination" />
      </div>
      <div className="field">
        <label htmlFor="q-size">Size / dimensions</label>
        <input id="q-size" name="size" placeholder='e.g. 16" x 19"' />
      </div>
      <div className="field">
        <label htmlFor="q-weight">GSM / weight</label>
        <input id="q-weight" name="weight" placeholder="e.g. 450 GSM or 2 lb/dz" />
      </div>
      <div className="field">
        <label htmlFor="q-packing">Packing</label>
        <input id="q-packing" name="packing" placeholder="e.g. 12 per bundle, 300 per carton" />
      </div>
      <div className="field">
        <label htmlFor="q-date">Needed by</label>
        <input id="q-date" name="targetDate" placeholder="e.g. March 2027" />
      </div>
      <div className="field full">
        <label htmlFor="q-details">Requirements *</label>
        <textarea id="q-details" name="details" required placeholder="Fabric, color, logo / branding, use case, sample needs, anything else…" />
      </div>
      <div className="field full">
        <label className="consent">
          <input type="checkbox" name="consent" required /> I agree to be contacted about this inquiry.
        </label>
      </div>
      <div className="field full">
        {state.error && (
          <p className="form-error" role="alert">
            {state.error}
          </p>
        )}
        <button className="btn" type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Send quote request →'}
        </button>
        <p className="formnote">We reply with options, a sample plan and a written quotation. No obligation.</p>
      </div>
    </form>
  )
}
