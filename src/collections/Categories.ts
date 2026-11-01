import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { faqsField } from '../fields/faqs'
import { anyone, authenticated } from '../lib/access'
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Product Category', plural: 'Product Categories' },
  admin: {
    useAsTitle: 'name',
    group: 'Catalog',
    defaultColumns: ['name', 'slug', 'sortOrder', 'updatedAt'],
  },
  defaultSort: 'sortOrder',
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'heading',
      type: 'text',
      admin: { description: 'Page H1. Include your main keyword, e.g. "Wholesale Kitchen & Foodservice Towels". Defaults to "Wholesale {name}".' },
    },
    { name: 'intro', type: 'textarea', required: true, admin: { description: 'Short summary shown on cards and at the top of the category page.' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'buyerChecklist',
      label: 'What buyers should tell us',
      type: 'textarea',
      admin: { description: 'Specs to include in a quote request for this category.' },
    },
    { name: 'body', label: 'Category page content', type: 'richText' },
    faqsField(),
    slugField('name'),
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: { position: 'sidebar', description: 'Lower numbers show first in menus.' },
    },
    {
      name: 'hidden',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Removes this category from the site. Untick to bring it back. Its products have their own switch.' },
    },
  ],
}
