import Image from 'next/image'
import Link from 'next/link'
import type { SiteSetting } from '@/payload-types'

// Built-in logo files (cut from the official brand sheet). A logo uploaded in Site Settings overrides them.
const builtIn = {
  dark: { src: '/brand/kazim-logo-v2.png', width: 625, height: 541 },
  light: { src: '/brand/kazim-logo-light-v2.png', width: 396, height: 318 },
}

/** `dark` = green logo for light backgrounds (header); `light` = gold/cream logo for dark backgrounds (footer). */
export function Brand({ settings, tone = 'dark', priority }: { settings: SiteSetting; tone?: 'dark' | 'light'; priority?: boolean }) {
  const uploaded = tone === 'dark' ? settings.logo : settings.logoOnDark
  const logo =
    uploaded && typeof uploaded === 'object' && uploaded.url
      ? { src: uploaded.url, width: uploaded.width ?? 600, height: uploaded.height ?? 500 }
      : builtIn[tone]
  return (
    <Link className="brand" href="/" aria-label={`${settings.companyName} home`}>
      <Image className="brandlogo" src={logo.src} alt={`${settings.companyName} logo`} width={logo.width} height={logo.height} priority={priority} sizes="160px" />
    </Link>
  )
}
