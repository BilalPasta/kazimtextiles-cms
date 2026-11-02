'use client'

import { useEffect } from 'react'

type Gtag = (command: 'event', name: string, params?: Record<string, string | number>) => void

/** Sends a GA4 event when Google Analytics is configured. Never pass form contents or contact details. */
export const track = (name: string, params?: Record<string, string | number>) => {
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] }
  if (typeof w.gtag === 'function') return w.gtag('event', name, params)
  // gtag.js may still be loading: queue the event the same way gtag() does (it expects an `arguments` object).
  if (!w.dataLayer) return
  const queue = function (..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments)
  }
  queue('event', name, params)
}

/**
 * One delegated click listener for the whole site:
 * - phone and email links (or anything with data-track="…")
 * - every link to the quote form, labelled with the page it was clicked on
 */
export function Analytics({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.('a, button')
      if (!el) return
      const explicit = el.getAttribute('data-track')
      const href = el.getAttribute('href') ?? ''
      const page = window.location.pathname
      if (explicit) track(explicit, { page })
      else if (href.startsWith('tel:')) track('phone_click', { page })
      else if (href.startsWith('mailto:')) track('email_click', { page })
      if (href.startsWith('/quote')) {
        const product = new URL(href, window.location.origin).searchParams.get('product') ?? ''
        track('request_quote_click', { page, product })
      }
      if (href.startsWith('/custom-textile-sourcing')) track('custom_sourcing_click', { page })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled])
  return null
}

/** Fires one event when the page mounts, e.g. a product view or a successful submission. */
export function TrackEvent({ name, params }: { name: string; params?: Record<string, string | number> }) {
  useEffect(() => {
    track(name, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  return null
}
