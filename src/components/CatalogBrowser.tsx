'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { track } from './Analytics'

type Item = { id: number | string; search: string; category: string; card: ReactNode }

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

/** Every word must match, and simple plurals match singulars ("bar mops" finds "bar mop"). */
const matches = (haystack: string, query: string) =>
  normalize(query)
    .split(' ')
    .filter(Boolean)
    .every((word) => haystack.includes(word) || (word.length > 3 && word.endsWith('s') && haystack.includes(word.slice(0, -1))))

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

  // Deep links such as /products?category=kitchen-foodservice-towels or ?q=bar+mops
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const c = params.get('category')
    if (c && categories.some((x) => x.slug === c)) setCat(c)
    const query = params.get('q')
    if (query) setQ(query)
  }, [categories])

  const index = useMemo(() => items.map((i) => ({ ...i, haystack: ` ${normalize(i.search)} ` })), [items])
  const shown = useMemo(() => index.filter((i) => (!cat || i.category === cat) && (!q.trim() || matches(i.haystack, q))), [index, q, cat])
  const filtered = Boolean(q.trim() || cat)

  const choose = (slug: string) => {
    setCat(slug)
    if (slug) track('category_filter', { category: slug })
  }
  const reset = () => {
    setQ('')
    setCat('')
  }

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
          placeholder="Search e.g. bar mops, shop towels, wiping rags…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <ul className="catalog-filters" aria-label="Filter by category">
        <li>
          <button type="button" aria-pressed={!cat} onClick={() => choose('')}>
            All categories
          </button>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <button type="button" aria-pressed={cat === c.slug} onClick={() => choose(c.slug)}>
              {c.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="count-row">
        <p className="count" aria-live="polite">
          Showing {shown.length} of {items.length} products
        </p>
        {filtered && (
          <button type="button" className="linkbtn" onClick={reset}>
            Reset search and filters
          </button>
        )}
      </div>
      <div className="product-grid">
        {shown.map((i) => (
          <div key={i.id} className="grid-cell">
            {i.card}
          </div>
        ))}
      </div>
      {shown.length === 0 && (
        <p className="notice">
          No matching product in the core catalog. <Link href="/custom-textile-sourcing">Send a custom sourcing inquiry →</Link>
        </p>
      )}
    </>
  )
}
