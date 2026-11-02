import type { CollectionConfig } from 'payload'
import { authenticated } from '../lib/access'

const emailFields: [string, string][] = [
  ['inquiryType', 'Inquiry type'],
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['industry', 'Industry'],
  ['product', 'Product'],
  ['quantity', 'Quantity'],
  ['quantityUnit', 'Unit'],
  ['material', 'Material'],
  ['size', 'Dimensions'],
  ['zip', 'Delivery ZIP'],
  ['destination', 'Delivery location'],
  ['details', 'Details'],
  ['source', 'Form'],
  ['sourcePage', 'Sent from'],
  ['createdAt', 'Received'],
]

const emailBody = (doc: Record<string, unknown>) => {
  const lines = emailFields.filter(([key]) => doc[key]).map(([key, label]) => `${label}: ${String(doc[key])}`)
  const items = (doc.items as { product: string; quantity?: string | null }[] | undefined) ?? []
  if (items.length) lines.push('', 'Requested products:', ...items.map((i) => `- ${i.product}${i.quantity ? `: ${i.quantity}` : ''}`))
  return lines.join('\n')
}

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
    defaultColumns: ['company', 'name', 'product', 'inquiryType', 'source', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: { read: authenticated, create: authenticated, update: authenticated, delete: authenticated },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc
        const settings = await req.payload.findGlobal({ slug: 'site-settings', req }).catch(() => null)
        const sourcing = doc.inquiryType === 'custom-sourcing'
        // 1. Alert the sales team.
        try {
          const to = settings?.notificationEmail
          if (to) {
            await req.payload.sendEmail({
              to,
              replyTo: doc.email || undefined,
              subject: `New ${sourcing ? 'custom sourcing inquiry' : 'quote request'}: ${doc.product || 'Product'} — ${doc.company}`,
              text: emailBody(doc),
            })
          }
        } catch (err) {
          req.payload.logger.error({ err, msg: 'Quote notification email failed' })
        }
        // 2. Confirm receipt to the buyer, with a copy of what they sent.
        try {
          if (doc.email) {
            const company = settings?.companyName || 'Kazim Textiles'
            const contact = [settings?.phone && `Phone: ${settings.phone}`, settings?.email && `Email: ${settings.email}`].filter(Boolean)
            await req.payload.sendEmail({
              to: doc.email,
              replyTo: settings?.email || settings?.notificationEmail || undefined,
              subject: `We received your ${sourcing ? 'sourcing inquiry' : 'quote request'} — ${company}`,
              text: [
                `Hello ${doc.name},`,
                '',
                `Thank you for contacting ${company}. We have received your ${sourcing ? 'custom sourcing inquiry' : 'quote request'} and will review your requirements.`,
                sourcing
                  ? 'Sourcing feasibility, minimum order quantity and lead time are confirmed with our manufacturing partners before any quotation is issued.'
                  : 'Pricing, minimum order quantity and lead time are confirmed in a written quotation based on your specifications.',
                '',
                'Your request:',
                emailBody({ ...doc, sourcePage: undefined, createdAt: undefined, source: undefined }),
                '',
                ...(contact.length ? ['Questions in the meantime?', ...contact, ''] : []),
                company,
              ].join('\n'),
            })
          }
        } catch (err) {
          req.payload.logger.error({ err, msg: 'Quote acknowledgement email failed' })
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
        {
          name: 'inquiryType',
          type: 'select',
          options: [
            { label: 'Pricing', value: 'pricing' },
            { label: 'Samples', value: 'samples' },
            { label: 'Custom sourcing', value: 'custom-sourcing' },
          ],
        },
        { name: 'industry', type: 'text' },
      ],
    },
    { name: 'product', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'quantity', type: 'text' },
        { name: 'quantityUnit', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'zip', label: 'Delivery ZIP code', type: 'text' },
        { name: 'destination', label: 'Delivery location', type: 'text' },
      ],
    },
    { name: 'material', type: 'text' },
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
        { label: 'Custom sourcing page', value: 'custom-sourcing' },
      ],
      admin: { readOnly: true, position: 'sidebar' },
    },
    { name: 'sourcePage', type: 'text', admin: { readOnly: true } },
  ],
  timestamps: true,
}
