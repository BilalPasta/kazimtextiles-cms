'use client'

import type { ReactNode } from 'react'
import { quantityUnits, type QuoteState } from './options'

/** Label + control + hint + inline error, wired together for screen readers. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  full,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  full?: boolean
  children: (aria: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string; required?: boolean }) => ReactNode
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field${full ? ' full' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span className="req" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="muted"> (optional)</span>
        )}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy, required })}
      {hint && (
        <span className="hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  )
}

/** Contact fields shared by the quote form and the custom sourcing form. */
export function ContactFields({ prefix, state }: { prefix: string; state: QuoteState }) {
  const v = state.values ?? {}
  const e = state.fieldErrors ?? {}
  return (
    <>
      <Field id={`${prefix}-name`} label="Full name" required error={e.name}>
        {(a) => <input {...a} name="name" autoComplete="name" defaultValue={v.name} />}
      </Field>
      <Field id={`${prefix}-company`} label="Company name" required error={e.company}>
        {(a) => <input {...a} name="company" autoComplete="organization" defaultValue={v.company} />}
      </Field>
      <Field id={`${prefix}-email`} label="Business email" required error={e.email}>
        {(a) => <input {...a} type="email" name="email" autoComplete="email" defaultValue={v.email} />}
      </Field>
      <Field id={`${prefix}-phone`} label="Phone number" error={e.phone}>
        {(a) => <input {...a} type="tel" name="phone" autoComplete="tel" defaultValue={v.phone} />}
      </Field>
    </>
  )
}

export function QuantityField({ prefix, state, hint }: { prefix: string; state: QuoteState; hint?: string }) {
  const v = state.values ?? {}
  return (
    <div className="field">
      <label htmlFor={`${prefix}-quantity`}>
        Estimated quantity <span className="muted">(optional)</span>
      </label>
      <div className="qty-row">
        <input id={`${prefix}-quantity`} name="quantity" inputMode="numeric" placeholder="e.g. 500" defaultValue={v.quantity} aria-describedby={hint ? `${prefix}-quantity-hint` : undefined} />
        <select name="quantityUnit" aria-label="Quantity unit" defaultValue={v.quantityUnit || 'pieces'}>
          {quantityUnits.map((u) => (
            <option key={u} value={u}>
              {u[0].toUpperCase() + u.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {hint && (
        <span className="hint" id={`${prefix}-quantity-hint`}>
          {hint}
        </span>
      )}
    </div>
  )
}

export function FormStatus({ state, pending, label }: { state: QuoteState; pending: boolean; label: string }) {
  return (
    <div className="field full">
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="btn" type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? 'Sending…' : label}
      </button>
    </div>
  )
}

export function Honeypot() {
  return (
    <div className="honeypot" aria-hidden="true">
      <label>
        Leave this blank
        <input name="hp_check" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
