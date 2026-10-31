import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { faqsField } from '../fields/faqs'
import { anyone, authenticated } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: { useAsTitle: 'name', group: 'Catalog', defaultColumns: ['name', 'slug', 'sortOrder', 'updatedAt'] },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Page H1, e.g. "Wholesale Hotel Linens & Hospitality Textiles". Defaults to the name.' },
    },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'Shown on industry cards and under the page heading.' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'box',
      admin: { description: 'Icon shown in the homepage Quote Finder.' },
      options: [
        { label: 'Hotel / bed', value: 'bed' },
        { label: 'Restaurant', value: 'utensils' },
        { label: 'Hospital', value: 'cross' },
        { label: 'Care home', value: 'heart' },
        { label: 'Cleaning', value: 'spray' },
        { label: 'Laundry', value: 'washer' },
        { label: 'Industrial', value: 'wrench' },
        { label: 'Spa / salon', value: 'sparkle' },
        { label: 'Catering / events', value: 'glass' },
        { label: 'Home / rental', value: 'home' },
        { label: 'School', value: 'cap' },
        { label: 'Distributor', value: 'box' },
      ],
    },
    {
      name: 'buyers',
      label: 'Who buys',
      type: 'text',
      admin: { description: 'Comma-separated, e.g. "Hotels, resorts, motels, vacation rentals"' },
    },
    { name: 'intro', label: 'Page content', type: 'richText' },
    {
      name: 'needs',
      label: 'What this industry needs',
      type: 'array',
      admin: { description: 'Short benefit/need cards.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    { name: 'categories', label: 'Relevant categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Optional. If empty, products tagged with this industry are shown.' },
    },
    faqsField(),
    slugField('name'),
    { name: 'sortOrder', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    { name: 'showOnHome', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
