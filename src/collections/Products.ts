import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { faqsField } from '../fields/faqs'
import { anyone, authenticated } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const availabilityOptions = [
  { label: 'Made to order', value: 'made-to-order' },
  { label: 'Regular production program', value: 'program' },
  { label: 'Custom development', value: 'custom' },
]

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    group: 'Catalog',
    defaultColumns: ['name', 'category', 'featured', 'availability', 'updatedAt'],
    listSearchableFields: ['name', 'shortDescription'],
  },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'category', type: 'relationship', relationTo: 'categories', required: true, admin: { width: '50%' } },
        {
          name: 'industries',
          type: 'relationship',
          relationTo: 'industries',
          hasMany: true,
          admin: { width: '50%', description: 'Industries that buy this product.' },
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences for product cards and the top of the product page.' },
    },
    { name: 'application', label: 'Typical use', type: 'text', admin: { description: 'e.g. "Back-of-house cleaning and food prep"' } },
    { name: 'image', label: 'Main image', type: 'upload', relationTo: 'media', required: true },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'description', label: 'Full description', type: 'richText' },
    {
      name: 'specs',
      label: 'Specifications',
      type: 'array',
      admin: { description: 'Shown as a table on the product page. Only list specs you can actually supply.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'value', type: 'text', required: true, admin: { width: '60%' } },
          ],
        },
      ],
    },
    {
      name: 'customization',
      label: 'Customization options',
      type: 'array',
      admin: { description: 'e.g. Custom sizes, Logo embroidery, Private-label packaging' },
      fields: [{ name: 'option', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        { name: 'moq', label: 'Minimum order (MOQ)', type: 'text', admin: { width: '50%', placeholder: 'Confirmed with quote' } },
        { name: 'leadTime', label: 'Lead time', type: 'text', admin: { width: '50%', placeholder: 'Confirmed with quote' } },
      ],
    },
    {
      name: 'priceGuide',
      label: 'Price guide (optional)',
      type: 'text',
      admin: {
        placeholder: 'e.g. From $18 / dozen',
        description: 'Shown on product cards, the product page and the Quote Finder. Leave blank to hide pricing.',
      },
    },
    faqsField(),
    { name: 'relatedProducts', type: 'relationship', relationTo: 'products', hasMany: true },
    slugField('name'),
    {
      name: 'availability',
      type: 'select',
      defaultValue: 'made-to-order',
      options: availabilityOptions,
      admin: { position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', admin: { position: 'sidebar', description: 'Show on the homepage.' } },
    { name: 'sortOrder', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
  ],
}
