'use client'

import { useActionState } from 'react'
import { submitQuote } from './actions'
import { ContactFields, Field, FormStatus, Honeypot, QuantityField } from './FormFields'
import { inquiryTypes, type QuoteState } from './options'

export type ProductGroup = { label: string; products: string[] }

export function QuoteForm({ productGroups, defaultProduct }: { productGroups: ProductGroup[]; defaultProduct?: string }) {
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, {})
  const v = state.values ?? {}
  const e = state.fieldErrors ?? {}
  const type = v.inquiryType || 'pricing'
  return (
    // React resets a form after its action runs; the key remounts it with the submitted values after an error.
    <form className="quote-form" action={action} key={state.attempt ?? 0} noValidate aria-describedby="q-required-note">
      <p className="field full muted small" id="q-required-note">
        Fields marked <span className="req">*</span> are required. Only share the details you know.
      </p>
      <Honeypot />
      <ContactFields prefix="q" state={state} />
      <Field id="q-product" label="Product of interest" error={e.product} full>
        {(a) => (
          <select {...a} required={false} name="product" defaultValue={v.product ?? defaultProduct ?? ''}>
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
        )}
      </Field>
      <QuantityField prefix="q" state={state} hint="An estimate is fine." />
      <Field id="q-zip" label="Delivery ZIP code" error={e.zip}>
        {(a) => <input {...a} name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} placeholder="e.g. 15222" defaultValue={v.zip} />}
      </Field>
      <fieldset className="field full radio-row">
        <legend>Inquiry type</legend>
        {inquiryTypes.map((t) => (
          <label key={t.value}>
            <input type="radio" name="inquiryType" value={t.value} defaultChecked={type === t.value} /> {t.label}
          </label>
        ))}
      </fieldset>
      <Field id="q-details" label="Additional details or specifications" full hint="Size, material, weight, color, packing or delivery timing, if known.">
        {(a) => <textarea {...a} name="details" defaultValue={v.details} />}
      </Field>
      <FormStatus state={state} pending={pending} label="Send quote request →" />
      <p className="field full formnote">We reply with next steps and, once specifications are confirmed, a written quotation. No obligation.</p>
    </form>
  )
}
