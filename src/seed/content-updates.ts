/**
 * Content changes shared by the CLI scripts (add-blog-posts.ts, set-healthcare-headings.ts) and the
 * 20261104_080000_blog_posts_and_healthcare_titles migration, which applies them on deploy.
 * Both functions are idempotent: re-running updates the same documents.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload, PayloadRequest } from 'payload'
import { blogPosts } from './blog-posts'

const imagesDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'images')
// CLI and migrations run outside Next, so there is nothing to revalidate; the deploy rebuilds the pages.
const context = { disableRevalidate: true }

export async function publishBlogPosts(payload: Payload, req?: PayloadRequest) {
  for (const post of blogPosts) {
    const existingMedia = (
      await payload.find({ collection: 'media', where: { filename: { equals: post.image.filename } }, limit: 1, depth: 0, req })
    ).docs[0]
    const media =
      existingMedia ??
      (await payload.create({ collection: 'media', data: { alt: post.image.alt }, filePath: path.join(imagesDir, post.image.file), context, req }))
    if (existingMedia && existingMedia.alt !== post.image.alt) {
      await payload.update({ collection: 'media', id: existingMedia.id, data: { alt: post.image.alt }, depth: 0, context, req })
    }

    const related = await payload.find({ collection: 'products', where: { slug: { in: post.relatedProducts } }, limit: 20, depth: 0, req })
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

    const existing = (await payload.find({ collection: 'posts', where: { slug: { equals: post.slug } }, limit: 1, depth: 0, draft: true, req })).docs[0]
    const saved = existing
      ? await payload.update({ collection: 'posts', id: existing.id, data: data as never, depth: 0, context, req })
      : await payload.create({ collection: 'posts', data: { ...data, publishedAt: new Date().toISOString() } as never, depth: 0, context, req })
    payload.logger.info(`${existing ? 'Updated' : 'Created'} /blog/${saved.slug} (image ${media.id}, ${relatedIds.length} related products)`)
  }
}

/** The healthcare category and the hospital industry page had the same H1 and title. */
const healthcare = [
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

export async function setHealthcareHeadings(payload: Payload, req?: PayloadRequest) {
  for (const u of healthcare) {
    const doc = (await payload.find({ collection: u.collection, where: { slug: { equals: u.slug } }, limit: 1, depth: 0, draft: false, req })).docs[0]
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
      context,
      req,
    })
    payload.logger.info(`${u.collection}/${u.slug} → H1 "${u.heading}", title "${u.metaTitle}"`)
  }
}
