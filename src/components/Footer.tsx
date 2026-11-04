import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/lib/payload'
import { telHref } from '@/lib/contact'
import { Brand } from './Brand'

export async function Footer() {
  const [settings, nav] = await Promise.all([getSiteSettings(), getNavigation()])
  return (
    <footer className="footer">
      <div className="container">
        <div className="footergrid">
          <div>
            <Brand settings={settings} tone="light" />
            {settings.footerAbout && <p>{settings.footerAbout}</p>}
            <address className="footer-contact">
              {settings.email && (
                <a href={`mailto:${settings.email}`} data-track="email_click">
                  {settings.email}
                </a>
              )}
              {settings.phone && (
                <a href={telHref(settings.phone)} data-track="phone_click">
                  {settings.phone}
                </a>
              )}
              {settings.address && <span>{settings.address}</span>}
              {settings.hours && <span>{settings.hours}</span>}
            </address>
            {!!settings.social?.length && (
              <div className="social">
                {settings.social.map((s) => (
                  <a key={s.id} href={s.url} rel="noopener noreferrer" target="_blank">
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
          {nav.footerColumns?.map((col) => (
            <div key={col.id}>
              <h2 className="footer-title">{col.title}</h2>
              {col.links?.map((l) => (
                <Link key={l.id} href={l.url}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {nav.copyright || settings.companyName}
          </span>
          <span>
            <Link href="/blog">Blog</Link> · <Link href="/quality-assurance">Quality assurance</Link> · <Link href="/privacy-policy">Privacy</Link> · <Link href="/terms">Terms</Link> ·{' '}
            <Link href="/quote">Request a quote ↗</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
