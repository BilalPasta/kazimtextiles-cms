import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig: NextConfig = {
  images: {
    // Uploads are already compressed WebP; serving them as-is avoids Vercel's image-optimization quota
    // (shared across the whole Vercel account), which returns 402 for every image once it runs out.
    unoptimized: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Framing protection. SAMEORIGIN (not DENY) keeps Payload's admin live preview working.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          // Report-only first: browsers log violations in the console but nothing is blocked. Check the public pages,
          // the quote form, Google Analytics and the admin, then rename to Content-Security-Policy to enforce it.
          { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
        ],
      },
    ]
  },
  // The default Vercel address serves the same pages; send it to the real domain so only one copy is indexed.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'kazim-textiles.vercel.app' }],
        destination: 'https://www.kazimtextiles.com/:path*',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  turbopack: { root: path.resolve(dirname) },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
