import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { authenticated, publishedOrAuthenticated } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'
import { pageBlocks } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'About, services, policies and any other standalone page. URL is /your-slug.',
  },
  versions: { drafts: true, maxPerDoc: 25 },
  access: { read: publishedOrAuthenticated, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text', admin: { description: 'Defaults to the page title.' } },
        { name: 'intro', type: 'textarea' },
      ],
    },
    { name: 'layout', label: 'Page sections', type: 'blocks', blocks: pageBlocks },
    slugField('title'),
  ],
}
