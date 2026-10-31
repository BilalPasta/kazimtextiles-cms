import type { Field } from 'payload'

/** Simple button/link: a label and an internal path (/quote) or full URL. */
export const linkFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
      {
        name: 'url',
        type: 'text',
        required: true,
        admin: { width: '50%', description: 'e.g. /quote, /products, https://…' },
      },
    ],
  },
]

export const linkGroup = (name: string, label?: string): Field => ({
  name,
  label,
  type: 'group',
  fields: linkFields,
})
