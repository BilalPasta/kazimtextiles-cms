'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { telHref, whatsappHref } from '@/lib/contact'

type NavLink = { label: string; url: string }

/**
 * Slide-in mobile navigation drawer. Rendered into <body> through a portal because the
 * sticky header uses backdrop-filter, which would otherwise trap a fixed-position panel.
 */
export function MobileMenu({
  links,
  categories,
  industries,
  cta,
  contact,
}: {
  links: NavLink[]
  categories: NavLink[]
  industries: NavLink[]
  cta: NavLink
  contact: { phone?: string | null; email?: string | null; whatsapp?: string | null }
}) {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState<'products' | 'industries' | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const closeRef = useRef<HTMLButtonElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  // Plain header links that aren't covered by the two expandable sections.
  const plain = links.filter((l) => !['/products', '/industries', '/contact'].includes(l.url))
  const isActive = (url: string) => (url === '/' ? pathname === '/' : pathname.startsWith(url))
  const phone = telHref(contact.phone)
  const wa = whatsappHref(contact.whatsapp)

  const group = (key: 'products' | 'industries', label: string, items: NavLink[], allUrl: string, allLabel: string) => (
    <li className={`mnav-group${section === key ? ' open' : ''}`}>
      <button type="button" className="mnav-row" aria-expanded={section === key} onClick={() => setSection(section === key ? null : key)}>
        {label}
        <span className="mnav-chevron" aria-hidden="true" />
      </button>
      <ul className="mnav-sub" hidden={section !== key}>
        {items.map((i) => (
          <li key={i.url}>
            <Link href={i.url} aria-current={isActive(i.url) ? 'page' : undefined}>
              {i.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href={allUrl} className="mnav-all">
            {allLabel} →
          </Link>
        </li>
      </ul>
    </li>
  )

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="burger"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>
      {mounted &&
        createPortal(
          <div className={`mnav${open ? ' is-open' : ''}`} inert={!open}>
            <div className="mnav-overlay" onClick={() => setOpen(false)} aria-hidden="true" />
            <div className="mnav-panel" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="mnav-head">
                <Link href="/" className="mnav-logo" aria-label="Kazim Textiles home">
                  <Image src="/brand/kazim-logo-header.webp" alt="Kazim Textiles" width={166} height={144} sizes="64px" />
                </Link>
                <button ref={closeRef} type="button" className="mnav-close" aria-label="Close menu" onClick={() => setOpen(false)}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <nav className="mnav-body" aria-label="Mobile navigation">
                <ul className="mnav-list">
                  {group('products', 'Products', categories, '/products', 'All products')}
                  {group('industries', 'Industries', industries, '/industries', 'All industries')}
                  {plain.map((l) => (
                    <li key={l.url}>
                      <Link href={l.url} className="mnav-row" aria-current={isActive(l.url) ? 'page' : undefined}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/contact" className="mnav-row" aria-current={isActive('/contact') ? 'page' : undefined}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="mnav-foot">
                <Link href={cta.url} className="btn gold mnav-cta">
                  {cta.label} →
                </Link>
                {(phone || wa || contact.email) && (
                  <div className="mnav-contact">
                    {phone && (
                      <a href={phone} data-track="phone_click">
                        Call {contact.phone}
                      </a>
                    )}
                    {wa && (
                      <a href={wa} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    )}
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} data-track="email_click">
                        Email
                      </a>
                    )}
                  </div>
                )}
                <p className="mnav-note">Wholesale textile sourcing & supply.</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
