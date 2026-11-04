import Link from 'next/link'
import type { SiteSetting } from '@/payload-types'

// Built-in logo files, resized to 2x their display height (header 72px, footer 110px) so the browser doesn't
// download the full-size brand-sheet cut (kazim-logo-v2.png) on every page. A logo uploaded in Site Settings overrides them.
const builtIn = {
  dark: { src: '/brand/kazim-logo-header.webp', width: 166, height: 144 },
  light: { src: '/brand/kazim-logo-footer.webp', width: 274, height: 220 },
}

/** `dark` = green logo for light backgrounds (header); `light` = gold/cream logo for dark backgrounds (footer). */
export function Brand({ settings, tone = 'dark' }: { settings: SiteSetting; tone?: 'dark' | 'light' }) {
  const uploaded = tone === 'dark' ? settings.logo : settings.logoOnDark
  const sized = uploaded && typeof uploaded === 'object' ? uploaded.sizes?.thumbnail : undefined
  const logo =
    uploaded && typeof uploaded === 'object' && uploaded.url
      ? sized?.url
        ? { src: sized.url, width: sized.width ?? 400, height: sized.height ?? 340 }
        : { src: uploaded.url, width: uploaded.width ?? 600, height: uploaded.height ?? 500 }
      : builtIn[tone]
  return (
    <Link className="brand" href="/" aria-label={`${settings.companyName} home`}>
      {/* Plain <img>: next/image adds a <link rel=preload> for eager images, and the logo is never the LCP element,
          so it shouldn't compete with the page's main image. The header logo loads normally; the footer one lazily. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="brandlogo"
        src={logo.src}
        alt={`${settings.companyName} logo`}
        width={logo.width}
        height={logo.height}
        loading={tone === 'dark' ? undefined : 'lazy'}
        decoding="async"
      />
    </Link>
  )
}
