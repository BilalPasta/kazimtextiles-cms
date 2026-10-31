import type { Field, FieldHook } from 'payload'

export const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return toSlug(value)
    const source = data?.[fallback] ?? originalDoc?.[fallback]
    return typeof source === 'string' ? toSlug(source) : value
  }

/** URL slug, auto-filled from `fallback` (usually the title) when left blank. */
export const slugField = (fallback = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  label: 'URL slug',
  admin: {
    position: 'sidebar',
    description: `Used in the page URL. Leave blank to generate from the ${fallback}. Changing it on a live page breaks old links — add a redirect if you do.`,
  },
  hooks: { beforeValidate: [formatSlug(fallback)] },
})
