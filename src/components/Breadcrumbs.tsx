import Link from 'next/link'
import { Fragment } from 'react'
import { absoluteUrl } from '@/lib/urls'
import { JsonLd } from './JsonLd'

export type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items]
  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        {all.map((c, i) => (
          <Fragment key={i}>
            {i > 0 && ' / '}
            {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </Fragment>
        ))}
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: absoluteUrl(c.href) } : {}),
          })),
        }}
      />
    </>
  )
}
