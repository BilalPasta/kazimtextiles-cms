import type { GlobalConfig } from 'payload'
import { linkFields, linkGroup } from '../fields/link'
import { revalidateGlobal } from '../hooks/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Header & Footer',
  admin: { group: 'Settings' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Header',
          fields: [
            { name: 'headerLinks', type: 'array', fields: linkFields, admin: { description: 'Main menu links.' } },
            linkGroup('headerCta', 'Header button'),
            {
              name: 'showCategoryBar',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Second menu row listing all product categories (automatic).' },
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerColumns',
              type: 'array',
              maxRows: 4,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'links', type: 'array', fields: linkFields },
              ],
            },
            { name: 'copyright', type: 'text', admin: { description: '"© {year}" is added automatically.' } },
          ],
        },
      ],
    },
  ],
}
