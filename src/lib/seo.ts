import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { getSiteSettings } from './payload'
import { absoluteUrl } from './urls'

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

type Meta = { title?: string | null; description?: string | null; image?: number | Media | null } | null | undefined

export const mediaUrl = (media: number | Media | null | undefined, size?: 'thumbnail' | 'card' | 'large' | 'og') => {
  if (!media || typeof media !== 'object') return undefined
  return (size && media.sizes?.[size]?.url) || media.url || undefined
}

/**
 * Builds page metadata. CMS "SEO" tab values win; otherwise fall back to the
 * page's own title/summary. Every page gets a canonical URL and Open Graph tags.
 */
export async function buildMetadata({
  meta,
  title,
  description,
  path,
  image,
  type = 'website',
}: {
  meta?: Meta
  title: string
  description?: string | null
  path: string
  image?: number | Media | null
  type?: 'website' | 'article'
}): Promise<Metadata> {
  const settings = await getSiteSettings()
  const suffix = settings.titleSuffix ?? '| Kazim Textiles'
  const metaTitle = meta?.title || `${title} ${suffix}`.trim()
  const metaDescription = meta?.description || description || settings.defaultDescription || undefined
  const ogImage = mediaUrl(meta?.image, 'og') || mediaUrl(image, 'og') || mediaUrl(settings.defaultOgImage, 'og')
  const url = absoluteUrl(path)

  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    alternates: { canonical: url },
    robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type,
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: settings.companyName,
      locale: 'en_US',
      images: ogImage ? [{ url: absoluteUrl(ogImage), width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription },
  }
}
