import type { CollectionConfig } from 'payload'
import { authenticated } from '../lib/access'

/**
 * Quote requests from the website form. Created by the server action in
 * app/(frontend)/quote/actions.ts (local API), so public REST create stays closed.
 */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Quote Request', plural: 'Quote Requests' },
  admin: {
    useAsTitle: 'company',
    group: 'Leads',
    defaultColumns: ['company', 'name', 'product', 'industry', 'source', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc
        try {
          const settings = await req.payload.findGlobal({ slug: 'site-settings', req })
          const to = settings?.notificationEmail
          if (to) {
            await req.payload.sendEmail({
              to,
              replyTo: doc.email || undefined,
              subject: `New quote request: ${doc.product || 'Product'} — ${doc.company}`,
              text: Object.entries(doc)
                .filter(([k]) => !['id', 'updatedAt', 'status', 'notes', 'items'].includes(k))
                .map(([k, v]) => `${k}: ${v ?? ''}`)
                .join('\n'),
            })
          }
        } catch (err) {
          req.payload.logger.error({ err, msg: 'Quote notification email failed' })
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', label: 'Internal notes', type: 'textarea', admin: { position: 'sidebar' } },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'company', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'industry', type: 'text' },
        { name: 'product', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'quantity', type: 'text' },
        { name: 'destination', label: 'Delivery location', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'size', type: 'text' },
        { name: 'weight', label: 'GSM / weight', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'packing', type: 'text' },
        { name: 'targetDate', label: 'Target delivery', type: 'text' },
      ],
    },
    {
      name: 'items',
      label: 'Requested products',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'product', type: 'text', required: true },
            { name: 'quantity', type: 'text' },
          ],
        },
      ],
    },
    { name: 'details', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'quote-form',
      options: [
        { label: 'Quote form', value: 'quote-form' },
        { label: 'Quote Finder', value: 'finder' },
      ],
      admin: { readOnly: true, position: 'sidebar' },
    },
    { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
  ],
  timestamps: true,
}
