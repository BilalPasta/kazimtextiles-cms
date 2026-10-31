import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'

export function PageHead({ crumbs, eyebrow, title, intro, children }: { crumbs: Crumb[]; eyebrow?: string | null; title: string; intro?: string | null; children?: ReactNode }) {
  return (
    <section className="pagehead">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <span className="eyebrow light">{eyebrow}</span>}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {children}
      </div>
    </section>
  )
}
