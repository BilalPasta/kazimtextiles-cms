/**
 * Gives the healthcare category and the hospital industry page different H1s and search titles (they were identical).
 * - Category  /categories/healthcare-institutional → the healthcare product range.
 * - Industry  /industries/healthcare-medical       → hospital and clinic supply needs.
 * Safe to re-run. Usage: pnpm payload run ./src/seed/set-healthcare-headings.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

const payload = await getPayload({ config })
const ctx = { disableRevalidate: true } // CLI runs outside Next; pages pick up the change on the next deploy

const updates = [
  {
    collection: 'categories',
    slug: 'healthcare-institutional',
    heading: 'Wholesale Healthcare Textiles: Scrubs, Gowns & Sheets',
    metaTitle: 'Wholesale Healthcare Textiles & Scrubs | Kazim Textiles',
  },
  {
    collection: 'industries',
    slug: 'healthcare-medical',
    heading: 'Linen and Uniform Supply for Hospitals and Clinics',
    metaTitle: 'Hospital & Clinic Linen Supply | Kazim Textiles',
  },
] as const

for (const u of updates) {
  const doc = (await payload.find({ collection: u.collection, where: { slug: { equals: u.slug } }, limit: 1, depth: 0, draft: false })).docs[0]
  if (!doc) {
    payload.logger.warn(`${u.collection}/${u.slug} not found, skipped`)
    continue
  }
  await payload.update({
    collection: u.collection,
    id: doc.id,
    data: { heading: u.heading, meta: { ...doc.meta, title: u.metaTitle } } as never,
    depth: 0,
    draft: false,
    context: ctx,
  })
  payload.logger.info(`${u.collection}/${u.slug} → H1 "${u.heading}", title "${u.metaTitle}"`)
}
process.exit(0)
