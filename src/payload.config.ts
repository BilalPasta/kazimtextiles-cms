import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Industries } from './collections/Industries'
import { Pages } from './collections/Pages'
import { Guides } from './collections/Guides'
import { Posts } from './collections/Posts'
import { Inquiries } from './collections/Inquiries'
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Homepage } from './globals/Homepage'
import { revalidateAfterChange } from './hooks/revalidate'
import { docPath, serverUrl } from './lib/urls'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: '— Kazim Textiles CMS' },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo',
        Icon: '@/components/admin/AdminIcon',
      },
    },
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) =>
        `${serverUrl}${globalConfig?.slug === 'homepage' ? '/' : docPath(collectionConfig?.slug, data)}`,
      collections: ['products', 'categories', 'industries', 'pages', 'guides', 'posts'],
      globals: ['homepage'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  // Tables are used in blog posts (care checklists, troubleshooting).
  editor: lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, EXPERIMENTAL_TableFeature()] }),
  // Dev auto-pushes the schema; production applies src/migrations in the Vercel build (pnpm run vercel-build).
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '' } }),
  // Without a key Payload falls back to logging emails to the console; quote requests are still saved.
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.RESEND_FROM_ADDRESS || 'onboarding@resend.dev',
        defaultFromName: process.env.RESEND_FROM_NAME || 'Kazim Textiles',
      })
    : undefined,
  collections: [Products, Categories, Industries, Pages, Guides, Posts, Inquiries, Media, Users],
  globals: [Homepage, SiteSettings, Navigation],
  plugins: [
    // Vercel's filesystem is read-only, so uploads go to Vercel Blob whenever a token is configured.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Media URLs point straight at the public Blob CDN instead of streaming through the app.
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    seoPlugin({
      collections: ['products', 'categories', 'industries', 'pages', 'guides', 'posts'],
      globals: ['homepage'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => {
        const d = doc as { name?: string; title?: string }
        return `${d.name || d.title || 'Wholesale Textiles'} | Kazim Textiles`
      },
      generateDescription: ({ doc }) => {
        const d = doc as { shortDescription?: string; intro?: string; summary?: string; excerpt?: string }
        return (d.shortDescription || d.intro || d.summary || d.excerpt || '').slice(0, 160)
      },
      generateURL: ({ doc, collectionSlug }) => `${serverUrl}${docPath(collectionSlug, doc)}`,
    }),
    redirectsPlugin({
      collections: ['pages', 'products', 'categories', 'industries', 'guides', 'posts'],
      overrides: {
        admin: { group: 'Settings' },
        hooks: { afterChange: [revalidateAfterChange] },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
