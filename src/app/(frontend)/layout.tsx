import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Analytics } from '@/components/Analytics'
import { phoneE164 } from '@/lib/contact'
import { getSiteSettings } from '@/lib/payload'
import { allowIndexing, mediaUrl } from '@/lib/seo'
import { absoluteUrl, serverUrl } from '@/lib/urls'
import './styles.css'

const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display', display: 'swap' })

export const viewport: Viewport = { themeColor: '#0d2440' }

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    metadataBase: new URL(serverUrl),
    applicationName: settings.companyName,
    robots: allowIndexing ? undefined : { index: false, follow: false },
    verification: settings.googleSiteVerification ? { google: settings.googleSiteVerification } : undefined,
    icons: { icon: [{ url: '/favicon.png?v=2', type: 'image/png' }, { url: '/brand/icon-512-v2.png', sizes: '512x512', type: 'image/png' }], apple: '/apple-touch-icon.png?v=2' },
  }
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings()
  const gaId = settings.googleAnalyticsId
  const telephone = phoneE164(settings.phone) ?? undefined
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics enabled={Boolean(gaId)} />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': absoluteUrl('/#organization'),
            name: settings.companyName,
            url: absoluteUrl('/'),
            description: settings.defaultDescription || undefined,
            logo: absoluteUrl(mediaUrl(settings.logo) || '/brand/icon-512-v2.png'),
            email: settings.email || undefined,
            telephone,
            address: settings.address || undefined,
            sameAs: settings.social?.map((s) => s.url),
            contactPoint: settings.email || settings.phone
              ? { '@type': 'ContactPoint', contactType: 'sales', email: settings.email || undefined, telephone, areaServed: 'US', availableLanguage: 'English' }
              : undefined,
          }}
        />
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)});`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
