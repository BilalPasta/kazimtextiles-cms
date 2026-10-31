import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', description: 'Product photos and site images. Always write descriptive alt text — it helps SEO and accessibility.' },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'large', width: 1600 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image, e.g. "Stack of white cotton huck towels for janitorial use".' },
    },
  ],
}
