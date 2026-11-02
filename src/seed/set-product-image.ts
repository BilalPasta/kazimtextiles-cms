/**
 * Uploads an image and makes it a product's main image. The previous image stays in the media library.
 *   PRODUCT=medical-scrub-sets IMAGE=/path/photo.webp ALT="..." pnpm payload run ./src/seed/set-product-image.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'

const { PRODUCT: slug, IMAGE: filePath, ALT: alt } = process.env
if (!slug || !filePath || !alt) throw new Error('Set PRODUCT, IMAGE and ALT.')

const payload = await getPayload({ config })
const product = (await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0]
if (!product) throw new Error(`Product not found: ${slug}`)

const media = await payload.create({ collection: 'media', data: { alt }, filePath, context: { disableRevalidate: true } })
await payload.update({ collection: 'products', id: product.id, data: { image: media.id }, depth: 0, context: { disableRevalidate: true } })
payload.logger.info(`${slug}: image ${product.image} → ${media.id} (${media.url})`)
process.exit(0)
