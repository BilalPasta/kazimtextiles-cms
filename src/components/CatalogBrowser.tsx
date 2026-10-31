'use client'

import { useMemo, useState, type ReactNode } from 'react'

type Item = { id: number | string; search: string; category: string; card: ReactNode }

/** Client-side search + category filter over server-rendered product cards. */
export function CatalogBrowser({
  items,
  categories,
  initialCategory = '',
}: {
  items: Item[]
  categories: { slug: string; name: string }[]
  initialCategory?: string
}) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState(initialCategory)
  const shown = useMemo(() => {
    const needle = q.toLowerCase().trim()
    return items.filter((i) => (!cat || i.category === cat) && (!needle || i.search.includes(needle)))
  }, [items, q, cat])

  return (
    <>
      <div className="filterbar" role="search">
        <label className="sr-only" htmlFor="catalogSearch">
          Search products
        </label>
        <input
          id="catalogSearch"
          className="input"
          type="search"
          placeholder="Search e.g. bar mop, scrubs, napkins…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <label className="sr-only" htmlFor="catalogCategory">
          Filter by category
        </label>
        <select id="catalogCategory" className="input select" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <p className="count" aria-live="polite">
        {shown.length} of {items.length} products
      </p>
      <div className="product-grid">
        {shown.map((i) => (
          <div key={i.id} className="grid-cell">
            {i.card}
          </div>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="notice">
          No match — we make many textiles to order that aren&apos;t listed. <a href="/quote">Send us your requirement →</a>
        </p>
      )}
    </>
  )
}
