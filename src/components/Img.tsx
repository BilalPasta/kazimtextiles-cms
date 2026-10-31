import Image from 'next/image'
import type { Media } from '@/payload-types'

/** next/image wrapper for Payload media. Picks the smallest stored size that covers `variant`. */
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
  variant?: 'thumbnail' | 'card' | 'large'
}) {
  if (!media || typeof media !== 'object' || !media.url) return null
  const src = media.sizes?.[variant]?.url || media.url
  const width = media.sizes?.[variant]?.width || media.width || 800
  const height = media.sizes?.[variant]?.height || media.height || 600
  return (
    <Image
      className={className}
      src={src}
      alt={media.alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      style={media.focalX != null ? { objectPosition: `${media.focalX}% ${media.focalY}%` } : undefined}
    />
  )
}
