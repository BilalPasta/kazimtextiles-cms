import type { Block } from 'payload'
import { linkFields } from '../fields/link'

const sectionHeader = [
  { name: 'eyebrow', type: 'text' as const },
  { name: 'heading', type: 'text' as const },
  { name: 'intro', type: 'textarea' as const },
]

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Text content', plural: 'Text content' },
  fields: [
    { name: 'content', type: 'richText', required: true },
    { name: 'narrow', type: 'checkbox', defaultValue: true, admin: { description: 'Readable text width' } },
  ],
}

export const CardsBlock: Block = {
  slug: 'cards',
  labels: { singular: 'Card grid', plural: 'Card grids' },
  fields: [
    ...sectionHeader,
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        { name: 'linkLabel', type: 'text' },
        { name: 'linkUrl', type: 'text' },
      ],
    },
  ],
}

export const ChecklistBlock: Block = {
  slug: 'checklist',
  labels: { singular: 'Checklist', plural: 'Checklists' },
  fields: [
    ...sectionHeader,
    { name: 'items', type: 'array', minRows: 1, fields: [{ name: 'text', type: 'text', required: true }] },
  ],
}

export const StepsBlock: Block = {
  slug: 'steps',
  labels: { singular: 'Process steps', plural: 'Process steps' },
  fields: [
    ...sectionHeader,
    {
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}

export const ProductsBlock: Block = {
  slug: 'products',
  labels: { singular: 'Product grid', plural: 'Product grids' },
  fields: [
    ...sectionHeader,
    { name: 'products', type: 'relationship', relationTo: 'products', hasMany: true, required: true },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    ...sectionHeader,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to action band', plural: 'Call to action bands' },
  fields: [
    ...sectionHeader,
    { name: 'buttons', type: 'array', maxRows: 2, fields: linkFields },
  ],
}

export const pageBlocks: Block[] = [ContentBlock, CardsBlock, ChecklistBlock, StepsBlock, ProductsBlock, FaqBlock, CtaBlock]
