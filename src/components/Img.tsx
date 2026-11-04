import { preload } from 'react-dom'
import type { Media } from '@/payload-types'

type Variant = 'thumbnail' | 'card' | 'large'

/**
 * Responsive <img> for Payload media.
 *
 * Image optimization is off (see next.config.ts), so next/image would only ever emit one URL. Instead this builds a
 * srcset from the sizes Payload already stored (400 / 800 / 1600px and the original) and lets the browser pick the
 * smallest file that covers the slot described by `sizes`. `variant` caps the largest candidate offered.
 *
 * `priority` marks the page's main (LCP) image: it is preloaded with fetchpriority=high and never lazy-loaded.
 * Every other image stays lazy.
 */
export function Img({
  media,
  className,
  sizes = '(max-width: 780px) 100vw, 33vw',
  priority,
  variant = 'card',
}: {
  media: number | Media | null | undefined
  className?: string
  sizes?: string
  priority?: boolean
  variant?: Variant
}) {
  if (!media || typeof media !== 'object' || !media.url) return null

  const chosen = media.sizes?.[variant]
  const src = chosen?.url || media.url
  const width = chosen?.width || media.width || 800
  const height = chosen?.height || media.height || 600

  const candidates = [media.sizes?.thumbnail, media.sizes?.card, media.sizes?.large, { url: media.url, width: media.width }]
  const seen = new Set<number>()
  const srcSet = candidates
    .filter((c): c is { url: string; width: number } => Boolean(c?.url && c.width && c.width <= width))
    .sort((a, b) => a.width - b.width)
    .filter((c) => (seen.has(c.width) ? false : (seen.add(c.width), true)))
    .map((c) => `${c.url} ${c.width}w`)
    .join(', ')

  if (priority) preload(src, { as: 'image', fetchPriority: 'high', imageSrcSet: srcSet || undefined, imageSizes: srcSet ? sizes : undefined })

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      alt={media.alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      style={media.focalX != null ? { objectPosition: `${media.focalX}% ${media.focalY}%` } : undefined}
    />
  )
}
