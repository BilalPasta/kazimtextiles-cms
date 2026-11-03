import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

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
