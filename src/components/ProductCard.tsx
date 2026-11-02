import Link from 'next/link'
import type { Category, Product } from '@/payload-types'
import { availabilityOptions } from '@/collections/Products'
import { Img } from './Img'

export const availabilityLabel = (value?: string | null) =>
  availabilityOptions.find((o) => o.value === value)?.label ?? 'Quoted to specification'

export function ProductCard({ product, headingLevel = 3 }: { product: Product; headingLevel?: 2 | 3 }) {
  const category = typeof product.category === 'object' ? (product.category as Category) : null
  const href = `/products/${product.slug}`
  const Heading = `h${headingLevel}` as const
  return (
    <article className="product-card">
      <Link href={href} tabIndex={-1} aria-hidden="true">
        <Img media={product.image} className="photo" sizes="(max-width: 520px) 100vw, (max-width: 1100px) 33vw, 25vw" />
      </Link>
      <div className="copy">
        <div className="tagline">{category && <span className="overline">{category.name}</span>}</div>
        <Heading className="card-title">
          <Link href={href}>{product.name}</Link>
        </Heading>
        <p>{product.shortDescription}</p>
        {product.priceGuide && <p className="price-guide">{product.priceGuide}</p>}
        <div className="card-foot">
          <Link href={href} className="textlink" aria-label={`View details: ${product.name}`}>
            View details →
          </Link>
          <Link href={`/quote?product=${product.slug}`} className="btn smallbtn ghost" aria-label={`Request a quote for ${product.name}`}>
            Request quote
          </Link>
        </div>
      </div>
    </article>
  )
}
