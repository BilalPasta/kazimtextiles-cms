import Link from 'next/link'
import { getCategories, getIndustries, getNavigation, getSiteSettings } from '@/lib/payload'
import { Brand } from './Brand'
import { MobileMenu } from './MobileMenu'

export async function Header() {
  const [settings, nav, categories, industries] = await Promise.all([getSiteSettings(), getNavigation(), getCategories(), getIndustries()])
  const cta = nav.headerCta?.url ? { label: nav.headerCta.label, url: nav.headerCta.url } : { label: 'Get a Quote', url: '/quote' }
  return (
    <>
      {(settings.topbarLeft || settings.topbarRight || settings.email || settings.phone) && (
        <div className="topbar">
          <div className="container">
            <span>{settings.topbarLeft}</span>
            <span className="topbar-right">
              {settings.topbarRight}
              {settings.phone && <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}>{settings.phone}</a>}
              {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
            </span>
          </div>
        </div>
      )}
      <header className="header">
        <div className="container headerline">
          <Brand settings={settings} priority />
          <nav className="headerlinks" aria-label="Main navigation">
            {nav.headerLinks?.map((l) => (
              <Link key={l.id} href={l.url}>
                {l.label}
              </Link>
            ))}
            <Link className="btn smallbtn" href={cta.url}>
              {cta.label} ↗
            </Link>
          </nav>
          <MobileMenu
            links={(nav.headerLinks ?? []).map((l) => ({ label: l.label, url: l.url }))}
            categories={categories.map((c) => ({ label: c.name, url: `/categories/${c.slug}` }))}
            industries={industries.map((i) => ({ label: i.name, url: `/industries/${i.slug}` }))}
            cta={cta}
            contact={{ phone: settings.phone, email: settings.email, whatsapp: settings.whatsapp }}
          />
        </div>
        {nav.showCategoryBar !== false && categories.length > 0 && (
          <nav className="catnav" aria-label="Product categories">
            <div className="container">
              {categories.map((c) => (
                <Link key={c.id} href={`/categories/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
