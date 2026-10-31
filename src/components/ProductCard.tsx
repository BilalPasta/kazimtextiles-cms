import Link from 'next/link'
import type { Category, Product } from '@/payload-types'
import { availabilityOptions } from '@/collections/Products'
import { Img } from './Img'

export const availabilityLabel = (value?: string | null) =>
  availabilityOptions.find((o) => o.value === value)?.label ?? 'Made to order'

export function ProductCard({ product }: { product: Product }) {
  const category = typeof product.category === 'object' ? (product.category as Category) : null
  const href = `/products/${product.slug}`
  return (
    <article className="product-card">
      <Link href={href} tabIndex={-1} aria-hidden="true">
        <Img media={product.image} className="photo" sizes="(max-width: 520px) 100vw, (max-width: 1100px) 33vw, 25vw" />
      </Link>
      <div className="copy">
        <div className="tagline">
          {category && <span className="overline">{category.name}</span>}
        </div>
        <h3>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p>{product.shortDescription}</p>
        {product.priceGuide && <p className="price-guide">{product.priceGuide}</p>}
        <div className="card-foot">
          <span className={`tag${product.availability === 'custom' ? ' amber' : ''}`}>{availabilityLabel(product.availability)}</span>
          <Link href={href} className="textlink">
            View details →
          </Link>
        </div>
      </div>
    </article>
  )
}
