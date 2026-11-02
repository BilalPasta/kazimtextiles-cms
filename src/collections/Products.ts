import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { faqsField } from '../fields/faqs'
import { anyone, authenticated } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

/** Supply status. Values are stored in the database; only the labels are shown on the site. */
export const availabilityOptions = [
  { label: 'Quoted to specification', value: 'made-to-order' },
  { label: 'Confirmed supply program', value: 'program' },
  { label: 'Custom sourcing inquiry', value: 'custom' },
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
    {
      name: 'application',
      label: 'Typical commercial applications',
      type: 'text',
      admin: { description: 'Comma-separated, e.g. "Restaurants, bars, catering kitchens"' },
    },
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
      label: 'Available options',
      type: 'array',
      admin: { description: 'Styles and variants offered on this page, e.g. "Bib aprons", "Waist aprons". Only list options the supplier has confirmed or mark them as subject to quotation.' },
      fields: [{ name: 'option', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        { name: 'moq', label: 'Minimum order (MOQ)', type: 'text', admin: { width: '50%', placeholder: 'Confirmed with quotation' } },
        { name: 'leadTime', label: 'Lead time', type: 'text', admin: { width: '50%', placeholder: 'Confirmed with quotation' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'packaging', type: 'text', admin: { width: '50%', placeholder: 'Based on approved specification' } },
        {
          name: 'customizationStatus',
          label: 'Customization',
          type: 'text',
          admin: { width: '50%', placeholder: 'Subject to supplier availability' },
        },
      ],
    },
    {
      name: 'searchTerms',
      type: 'textarea',
      admin: { description: 'Other names buyers search for, e.g. "bar mops, restaurant towels". Used by catalog search only; not shown.' },
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
    {
      name: 'hidden',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Removes this product from the site. Untick to bring it back.' },
    },
  ],
}
