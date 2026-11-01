import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { faqsField } from '../fields/faqs'
import { authenticated, publishedOrAuthenticated } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'publishedAt', '_status'],
    description: 'Articles shown at /blog. "Draft" is only visible to you; "Published" is live on the website.',
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 25 },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true, admin: { description: 'Short summary shown on the blog page and at the top of the post.' } },
    { name: 'image', label: 'Main image', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
    faqsField(),
    { name: 'relatedProducts', type: 'relationship', relationTo: 'products', hasMany: true },
    slugField('title'),
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
      hooks: {
        beforeChange: [({ value, siblingData }) => (!value && siblingData._status === 'published' ? new Date() : value)],
      },
    },
    { name: 'author', type: 'text', defaultValue: 'Kazim Textiles', admin: { position: 'sidebar' } },
    { name: 'readTime', type: 'text', admin: { position: 'sidebar', placeholder: '5 min read' } },
  ],
}
