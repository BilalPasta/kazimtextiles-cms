'use client'

import { useActionState } from 'react'
import { submitQuote, type QuoteState } from './actions'

export type ProductGroup = { label: string; products: string[] }

export function QuoteForm({ productGroups, defaultProduct }: { productGroups: ProductGroup[]; defaultProduct?: string }) {
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
        <label htmlFor="q-product">Product</label>
        <select id="q-product" name="product" defaultValue={defaultProduct ?? ''}>
          <option value="">Choose a product</option>
          {productGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.products.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Other / custom textile">Other / custom textile</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="q-quantity">Quantity</label>
        <input id="q-quantity" name="quantity" placeholder="e.g. 5,000 pcs or 200 dozen" />
      </div>
      <div className="field full">
        <label htmlFor="q-details">Message (optional)</label>
        <textarea id="q-details" name="details" placeholder="Anything else we should know?" />
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
