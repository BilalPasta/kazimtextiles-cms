import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Settings' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            { name: 'companyName', type: 'text', required: true, defaultValue: 'Kazim Textiles' },
            { name: 'tagline', type: 'text' },
            {
              name: 'logo',
              label: 'Logo (for light backgrounds)',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. Leave empty to use the built-in Kazim Textiles logo.' },
            },
            {
              name: 'logoOnDark',
              label: 'Logo (for dark backgrounds — footer)',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. Leave empty to use the built-in gold logo.' },
            },
            { name: 'footerAbout', label: 'Footer description', type: 'textarea' },
          ],
        },
        {
          label: 'Contact',
          description: 'Leave a field blank to hide it on the site. Only publish verified contact details.',
          fields: [
            { name: 'email', type: 'email' },
            { name: 'phone', type: 'text' },
            { name: 'whatsapp', type: 'text', admin: { description: 'International format, digits only, e.g. 923001234567' } },
            { name: 'address', type: 'textarea' },
            { name: 'hours', label: 'Business hours', type: 'text' },
            {
              name: 'notificationEmail',
              label: 'Send quote requests to',
              type: 'email',
              admin: { description: 'Every new quote request is emailed here. Requires RESEND_API_KEY (see README).' },
            },
            {
              name: 'social',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: ['LinkedIn', 'Facebook', 'Instagram', 'YouTube', 'X'].map((v) => ({ label: v, value: v.toLowerCase() })),
                    },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Announcement bar',
          fields: [
            { name: 'topbarLeft', type: 'text' },
            { name: 'topbarRight', type: 'text' },
          ],
        },
        {
          label: 'SEO & tracking',
          fields: [
            { name: 'titleSuffix', type: 'text', defaultValue: '| Kazim Textiles', admin: { description: 'Added after every page title.' } },
            { name: 'defaultDescription', type: 'textarea' },
            { name: 'defaultOgImage', label: 'Default social share image', type: 'upload', relationTo: 'media' },
            { name: 'googleSiteVerification', type: 'text', admin: { description: 'Google Search Console verification code (content value only).' } },
            { name: 'googleAnalyticsId', type: 'text', admin: { description: 'GA4 Measurement ID, e.g. G-XXXXXXX' } },
          ],
        },
      ],
    },
  ],
}
