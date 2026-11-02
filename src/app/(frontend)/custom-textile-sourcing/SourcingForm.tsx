'use client'

import { useActionState } from 'react'
import { submitSourcing } from '../quote/actions'
import { ContactFields, Field, FormStatus, Honeypot, QuantityField } from '../quote/FormFields'
import type { QuoteState } from '../quote/options'

export function SourcingForm() {
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitSourcing, {})
  const v = state.values ?? {}
  const e = state.fieldErrors ?? {}
  return (
    <form className="quote-form" action={action} key={state.attempt ?? 0} noValidate aria-describedby="s-required-note">
      <p className="field full muted small" id="s-required-note">
        Fields marked <span className="req">*</span> are required. Leave anything you don&apos;t know blank.
      </p>
      <Honeypot />
      <ContactFields prefix="s" state={state} />
      <Field id="s-product" label="Product type" required error={e.productType} full>
        {(a) => <input {...a} name="productType" placeholder="e.g. pool towels, lab coats, quilted placemats" defaultValue={v.productType} />}
      </Field>
      <Field id="s-material" label="Material">
        {(a) => <input {...a} name="material" placeholder="e.g. 100% cotton, poly-cotton" defaultValue={v.material} />}
      </Field>
      <Field id="s-dimensions" label="Dimensions">
        {(a) => <input {...a} name="dimensions" placeholder='e.g. 30" x 60"' defaultValue={v.dimensions} />}
      </Field>
      <QuantityField prefix="s" state={state} />
      <Field id="s-zip" label="Delivery ZIP code" error={e.zip}>
        {(a) => <input {...a} name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} placeholder="e.g. 15222" defaultValue={v.zip} />}
      </Field>
      <Field id="s-destination" label="Delivery location" hint="City and state, or multiple locations." full>
        {(a) => <input {...a} name="destination" defaultValue={v.destination} />}
      </Field>
      <Field id="s-details" label="Target specifications" full hint="Weight or GSM, construction, color, packaging, branding, target price or delivery timing.">
        {(a) => <textarea {...a} name="details" defaultValue={v.details} />}
      </Field>
      <FormStatus state={state} pending={pending} label="Send sourcing inquiry →" />
      <p className="field full formnote">Sourcing feasibility, MOQ and lead time are confirmed with our manufacturing partners before any quotation.</p>
    </form>
  )
}
