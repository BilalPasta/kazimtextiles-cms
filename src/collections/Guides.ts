import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { authenticated, publishedOrAuthenticated } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Guides: CollectionConfig = {
  slug: 'guides',
  labels: { singular: 'Guide / Article', plural: 'Guides & Articles' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'publishedAt', '_status'],
    description: 'Buying guides and articles — the best way to rank for long-tail searches.',
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 25 },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText', required: true },
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
  ],
}
