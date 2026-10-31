import type { MetadataRoute } from 'next'
import { allowIndexing } from '@/lib/seo'
import { absoluteUrl } from '@/lib/urls'

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/thank-you'] },
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
