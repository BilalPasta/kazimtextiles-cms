'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

export type QuoteState = { error?: string }

const str = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? '').trim().slice(0, max)

export async function submitQuote(_prev: QuoteState, fd: FormData): Promise<QuoteState> {
  // Honeypot: bots fill every field; humans never see this one.
  if (str(fd, 'company_website')) redirect('/thank-you')

  const data = {
    name: str(fd, 'name', 120),
    company: str(fd, 'company', 160),
    email: str(fd, 'email', 200),
    phone: str(fd, 'phone', 60),
    industry: str(fd, 'industry', 120),
    product: str(fd, 'product', 200),
    quantity: str(fd, 'quantity', 120),
    destination: str(fd, 'destination', 200),
    size: str(fd, 'size', 200),
    weight: str(fd, 'weight', 120),
    packing: str(fd, 'packing', 200),
    targetDate: str(fd, 'targetDate', 120),
    details: str(fd, 'details', 5000),
    sourcePage: (await headers()).get('referer')?.slice(0, 300) ?? '',
  }

  if (!data.name || !data.company || !data.email || !data.details) {
    return { error: 'Please fill in your name, company, email and requirements.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: 'Please enter a valid email address.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({ collection: 'inquiries', data })
  } catch (err) {
    console.error('Quote submission failed', err)
    return { error: 'Sorry, we could not send your request. Please try again or email us directly.' }
  }
  redirect('/thank-you')
}

export type FinderState = { error?: string }

/** Quote Finder (homepage): industry + selected products with quantities + short contact form. */
export async function submitFinderQuote(_prev: FinderState, fd: FormData): Promise<FinderState> {
  if (str(fd, 'company_website')) redirect('/thank-you')

  let items: { product: string; quantity: string }[] = []
  try {
    const parsed = JSON.parse(str(fd, 'items', 20000) || '[]') as { product?: unknown; quantity?: unknown }[]
    items = parsed
      .filter((i) => typeof i.product === 'string' && i.product)
      .slice(0, 50)
      .map((i) => ({ product: String(i.product).slice(0, 200), quantity: String(i.quantity ?? '').slice(0, 120) }))
  } catch {
    items = []
  }

  const contact = str(fd, 'contact', 200)
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
  const data = {
    name: str(fd, 'name', 120),
    company: str(fd, 'company', 160) || '—',
    email: isEmail ? contact : '',
    phone: isEmail ? str(fd, 'phone', 60) : contact,
    industry: str(fd, 'industry', 120),
    destination: str(fd, 'destination', 200),
    product: items.map((i) => i.product).join(', ').slice(0, 500),
    quantity: items.map((i) => `${i.product}: ${i.quantity || '—'}`).join('; ').slice(0, 1000),
    items,
    details: str(fd, 'details', 5000),
    source: 'finder' as const,
    sourcePage: (await headers()).get('referer')?.slice(0, 300) ?? '',
  }

  if (!data.name || !contact) return { error: 'Please add your name and an email or phone number.' }
  if (!isEmail && contact.replace(/\D/g, '').length < 7) return { error: 'Please enter a valid email or phone / WhatsApp number.' }
  if (!items.length && !data.details) return { error: 'Please choose at least one product or describe what you need.' }

  try {
    const payload = await getPayloadClient()
    await payload.create({ collection: 'inquiries', data: { ...data, email: data.email || undefined } })
  } catch (err) {
    console.error('Finder quote submission failed', err)
    return { error: 'Sorry, something went wrong. Please try again or contact us directly.' }
  }
  redirect('/thank-you')
}
