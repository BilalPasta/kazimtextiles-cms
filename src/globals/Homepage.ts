import type { GlobalConfig } from 'payload'
import { linkFields, linkGroup } from '../fields/link'
import { faqsField } from '../fields/faqs'
import { revalidateGlobal } from '../hooks/revalidate'

const sectionHeader = (name: string, label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [
    { name: 'eyebrow', type: 'text' as const },
    { name: 'heading', type: 'text' as const },
    { name: 'intro', type: 'textarea' as const },
  ],
})

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text', required: true, admin: { description: 'The page H1 — include "wholesale textiles" or your main keyword.' } },
        { name: 'text', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        linkGroup('primaryCta', 'Primary button'),
        linkGroup('secondaryCta', 'Secondary button'),
      ],
    },
    {
      name: 'finder',
      label: 'Quote Finder (hero)',
      type: 'group',
      admin: { description: 'The step-by-step quote widget at the top of the homepage.' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Untick to show the hero image instead.' } },
        { name: 'title', type: 'text', defaultValue: 'Get a wholesale quote' },
        { name: 'subtitle', type: 'text', defaultValue: "Pick your business, choose products, tell us how many. We'll get back to you as soon as we can." },
      ],
    },
    {
      name: 'trustItems',
      label: 'Trust strip',
      type: 'array',
      maxRows: 4,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    sectionHeader('categoriesSection', 'Categories section'),
    {
      type: 'collapsible',
      label: 'Featured products section',
      fields: [
        sectionHeader('productsSection', 'Heading'),
        {
          name: 'featuredProducts',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          admin: { description: 'Leave empty to show products marked "Featured".' },
        },
      ],
    },
    sectionHeader('industriesSection', 'Industries section'),
    {
      name: 'process',
      label: 'How it works',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'intro', type: 'textarea' },
        linkGroup('cta', 'Button'),
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'whyUs',
      label: 'Why buyers choose us',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'ctaBand',
      label: 'Bottom call to action',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'text', type: 'textarea' },
        { name: 'buttons', type: 'array', maxRows: 2, fields: linkFields },
      ],
    },
    faqsField(),
  ],
}
