'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Where } from 'payload'
import { getPayloadClient } from '@/lib/payload'
import { inquiryTypes, quantityUnits, type FieldErrors, type InquiryType, type QuoteState } from './options'


const str = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? '').trim().slice(0, max)
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP = /^\d{5}(-\d{4})?$/


/**
 * Honeypot: bots fill every field; humans never see this one. Its name and display:none keep browser
 * autofill out of it, because a filled honeypot discards the request while still showing the thank-you page.
 */
const isBot = (fd: FormData, form: string) => {
  if (!str(fd, 'hp_check')) return false
  console.warn(`Quote request discarded by honeypot (${form})`)
  return true
}

const sourcePage = async () => (await headers()).get('referer')?.slice(0, 300) ?? ''

/**
 * Guards against double submissions (double clicks, resubmitting after a slow response, back + resend):
 * an identical request from the same email in the last 10 minutes is treated as already received.
 */
async function isDuplicate(data: { email?: string; phone?: string; product?: string; details?: string }) {
  const contact: Where | null = data.email ? { email: { equals: data.email } } : data.phone ? { phone: { equals: data.phone } } : null
  if (!contact) return false
  const payload = await getPayloadClient()
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const res = await payload.find({
    collection: 'inquiries',
    where: { and: [contact, { createdAt: { greater_than: since } }, { product: { equals: data.product ?? '' } }] },
    limit: 5,
    depth: 0,
  })
  return res.docs.some((d) => (d.details ?? '') === (data.details ?? ''))
}

async function saveInquiry(data: { email?: string; phone?: string; product?: string; details?: string } & Record<string, unknown>) {
  const payload = await getPayloadClient()
  if (await isDuplicate(data)) return
  await payload.create({ collection: 'inquiries', data: data as never })
}

const fail = (fd: FormData, keys: string[], fieldErrors: FieldErrors, attempt: number): QuoteState => ({
  error: 'Please check the highlighted fields.',
  fieldErrors,
  values: Object.fromEntries(keys.map((k) => [k, str(fd, k, 5000)])),
  attempt,
})

const quoteKeys = ['name', 'company', 'email', 'phone', 'product', 'quantity', 'quantityUnit', 'zip', 'inquiryType', 'details']

export async function submitQuote(prev: QuoteState, fd: FormData): Promise<QuoteState> {
  if (isBot(fd, 'quote form')) redirect('/thank-you?form=quote')
  const attempt = (prev.attempt ?? 0) + 1

  const inquiryType = (inquiryTypes.find((t) => t.value === str(fd, 'inquiryType'))?.value ?? 'pricing') as InquiryType
  const unit = str(fd, 'quantityUnit', 20)
  const data = {
    name: str(fd, 'name', 120),
    company: str(fd, 'company', 160),
    email: str(fd, 'email', 200),
    phone: str(fd, 'phone', 60),
    product: str(fd, 'product', 200),
    quantity: str(fd, 'quantity', 120),
    quantityUnit: (quantityUnits as readonly string[]).includes(unit) ? unit : '',
    zip: str(fd, 'zip', 10),
    inquiryType,
    details: str(fd, 'details', 5000),
    source: 'quote-form' as const,
    sourcePage: await sourcePage(),
  }

  const errors: FieldErrors = {}
  if (!data.name) errors.name = 'Enter your full name.'
  if (!data.company) errors.company = 'Enter your company name.'
  if (!data.email) errors.email = 'Enter your business email.'
  else if (!EMAIL.test(data.email)) errors.email = 'Enter a valid email address, e.g. name@company.com.'
  if (data.phone && data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number, or leave it blank.'
  if (data.zip && !ZIP.test(data.zip)) errors.zip = 'Enter a 5-digit U.S. ZIP code, or leave it blank.'
  if (!data.product && !data.details) errors.product = 'Choose a product, or describe what you need under Additional details.'
  if (Object.keys(errors).length) return fail(fd, quoteKeys, errors, attempt)

  try {
    await saveInquiry(data)
  } catch (err) {
    console.error('Quote submission failed', err)
    return {
      error: 'Sorry, we could not send your request. Please try again, or email or call us directly.',
      values: Object.fromEntries(quoteKeys.map((k) => [k, str(fd, k, 5000)])),
      attempt,
    }
  }
  redirect('/thank-you?form=quote')
}

const sourcingKeys = ['name', 'company', 'email', 'phone', 'productType', 'material', 'dimensions', 'quantity', 'quantityUnit', 'zip', 'destination', 'details']

/** Custom Textile Sourcing page: products outside the core catalog. */
export async function submitSourcing(prev: QuoteState, fd: FormData): Promise<QuoteState> {
  if (isBot(fd, 'custom sourcing')) redirect('/thank-you?form=sourcing')
  const attempt = (prev.attempt ?? 0) + 1
  const unit = str(fd, 'quantityUnit', 20)
  const data = {
    name: str(fd, 'name', 120),
    company: str(fd, 'company', 160),
    email: str(fd, 'email', 200),
    phone: str(fd, 'phone', 60),
    product: str(fd, 'productType', 200),
    material: str(fd, 'material', 200),
    size: str(fd, 'dimensions', 200),
    quantity: str(fd, 'quantity', 120),
    quantityUnit: (quantityUnits as readonly string[]).includes(unit) ? unit : '',
    zip: str(fd, 'zip', 10),
    destination: str(fd, 'destination', 200),
    details: str(fd, 'details', 5000),
    inquiryType: 'custom-sourcing' as const,
    source: 'custom-sourcing' as const,
    sourcePage: await sourcePage(),
  }

  const errors: FieldErrors = {}
  if (!data.name) errors.name = 'Enter your full name.'
  if (!data.company) errors.company = 'Enter your company name.'
  if (!data.email) errors.email = 'Enter your business email.'
  else if (!EMAIL.test(data.email)) errors.email = 'Enter a valid email address, e.g. name@company.com.'
  if (data.phone && data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number, or leave it blank.'
  if (data.zip && !ZIP.test(data.zip)) errors.zip = 'Enter a 5-digit U.S. ZIP code, or leave it blank.'
  if (!data.product) errors.productType = 'Tell us what product you need, e.g. "pool towels".'
  if (Object.keys(errors).length) return fail(fd, sourcingKeys, errors, attempt)

  try {
    await saveInquiry(data)
  } catch (err) {
    console.error('Sourcing inquiry failed', err)
    return {
      error: 'Sorry, we could not send your inquiry. Please try again, or email or call us directly.',
      values: Object.fromEntries(sourcingKeys.map((k) => [k, str(fd, k, 5000)])),
      attempt,
    }
  }
  redirect('/thank-you?form=sourcing')
}

export type FinderState = { error?: string }

/** Quote Finder (homepage): industry + selected products with quantities + short contact form. */
export async function submitFinderQuote(_prev: FinderState, fd: FormData): Promise<FinderState> {
  if (isBot(fd, 'quote finder')) redirect('/thank-you?form=finder')

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
  const isEmail = EMAIL.test(contact)
  const destination = str(fd, 'destination', 200)
  const data = {
    name: str(fd, 'name', 120),
    company: str(fd, 'company', 160) || '—',
    email: isEmail ? contact : '',
    phone: isEmail ? str(fd, 'phone', 60) : contact,
    industry: str(fd, 'industry', 120),
    destination,
    zip: ZIP.test(destination) ? destination : '',
    inquiryType: 'pricing' as const,
    product: items.map((i) => i.product).join(', ').slice(0, 500),
    quantity: items.map((i) => `${i.product}: ${i.quantity || '—'}`).join('; ').slice(0, 1000),
    items,
    details: str(fd, 'details', 5000),
    source: 'finder' as const,
    sourcePage: await sourcePage(),
  }

  if (!data.name || !contact) return { error: 'Please add your name and an email or phone number.' }
  if (!isEmail && contact.replace(/\D/g, '').length < 7) return { error: 'Please enter a valid email or phone number.' }
  if (!items.length && !data.details) return { error: 'Please choose at least one product or describe what you need.' }

  try {
    await saveInquiry({ ...data, email: data.email || undefined })
  } catch (err) {
    console.error('Finder quote submission failed', err)
    return { error: 'Sorry, something went wrong. Please try again or contact us directly.' }
  }
  redirect('/thank-you?form=finder')
}
