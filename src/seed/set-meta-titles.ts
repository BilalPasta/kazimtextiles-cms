/** Applies the shortened search-result titles (≤60 characters) from site-content.ts. Safe to re-run. */
import { getPayload } from 'payload'
import config from '../payload.config'
import { guides, homepage, industries } from './site-content'

const payload = await getPayload({ config })
const ctx = { disableRevalidate: true }

const home = await payload.findGlobal({ slug: 'homepage', depth: 0 })
await payload.updateGlobal({ slug: 'homepage', data: { meta: { ...home.meta, title: homepage.meta.title } }, depth: 0, context: ctx })
payload.logger.info(`homepage → ${homepage.meta.title}`)

for (const [collection, copy] of [['industries', industries], ['guides', guides]] as const) {
  for (const [slug, item] of Object.entries(copy)) {
    if (!item.metaTitle) continue
    const doc = (await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: false })).docs[0]
    if (!doc) continue
    await payload.update({ collection, id: doc.id, data: { meta: { ...doc.meta, title: item.metaTitle } } as never, depth: 0, draft: false, context: ctx })
    payload.logger.info(`${collection}/${slug} → ${item.metaTitle}`)
  }
}
process.exit(0)
