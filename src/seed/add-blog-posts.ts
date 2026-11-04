/**
 * Publishes the blog posts in blog-posts.ts with their cover images, SEO title/description, tag and caption.
 * Safe to re-run: existing posts (matched by slug) are updated and an image already uploaded is reused.
 *   pnpm payload run ./src/seed/add-blog-posts.ts
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { blogPosts } from './blog-posts'

const imagesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'images')
const payload = await getPayload({ config })
const ctx = { disableRevalidate: true } // CLI runs outside Next; pages pick up the change on the next deploy

for (const post of blogPosts) {
  const existingMedia = (await payload.find({ collection: 'media', where: { filename: { equals: post.image.filename } }, limit: 1, depth: 0 })).docs[0]
  const media =
    existingMedia ??
    (await payload.create({ collection: 'media', data: { alt: post.image.alt }, filePath: path.join(imagesDir, post.image.file), context: ctx }))
  if (existingMedia && existingMedia.alt !== post.image.alt) {
    await payload.update({ collection: 'media', id: existingMedia.id, data: { alt: post.image.alt }, depth: 0, context: ctx })
  }

  const related = await payload.find({ collection: 'products', where: { slug: { in: post.relatedProducts } }, limit: 20, depth: 0 })
  const relatedIds = post.relatedProducts.map((s) => related.docs.find((d) => d.slug === s)?.id).filter((id): id is number => id != null)

  const data = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    image: media.id,
    imageCaption: post.image.caption,
    content: post.content,
    relatedProducts: relatedIds,
    tag: post.tag,
    author: 'Kazim Textiles',
    readTime: post.readTime,
    meta: { title: post.metaTitle, description: post.metaDescription, image: media.id },
    _status: 'published' as const,
  }

  const existing = (await payload.find({ collection: 'posts', where: { slug: { equals: post.slug } }, limit: 1, depth: 0, draft: true })).docs[0]
  const saved = existing
    ? await payload.update({ collection: 'posts', id: existing.id, data: data as never, depth: 0, context: ctx })
    : await payload.create({ collection: 'posts', data: { ...data, publishedAt: new Date().toISOString() } as never, depth: 0, context: ctx })
  payload.logger.info(`${existing ? 'Updated' : 'Created'} /blog/${saved.slug} (image ${media.id}, ${relatedIds.length} related products)`)
}
process.exit(0)
