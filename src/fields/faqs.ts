import type { Field } from 'payload'

/** FAQ list — rendered as an accordion and as FAQPage structured data. */
export const faqsField = (name = 'faqs'): Field => ({
  name,
  label: 'FAQs',
  type: 'array',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { initCollapsed: true, description: 'Buyer questions. These also appear in Google as FAQ structured data.' },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
  ],
})
