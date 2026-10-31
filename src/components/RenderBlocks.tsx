import Link from 'next/link'
import type { Page, Product } from '@/payload-types'
import { populatedList } from '@/lib/payload'
import { CtaBand } from './CtaBand'
import { Faqs } from './Faqs'
import { ProductCard } from './ProductCard'
import { RichText } from './RichText'

type Block = NonNullable<Page['layout']>[number]

function SectionHead({ eyebrow, heading, intro }: { eyebrow?: string | null; heading?: string | null; intro?: string | null }) {
  if (!eyebrow && !heading && !intro) return null
  return (
    <div className="sect-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {heading && <h2>{heading}</h2>}
      </div>
      {intro && <p>{intro}</p>}
    </div>
  )
}

function RenderBlock({ block, index }: { block: Block; index: number }) {
  const alt = index % 2 === 1 ? ' alt' : ''
  switch (block.blockType) {
    case 'content':
      return (
        <section className={`section${alt}`}>
          <div className={`container${block.narrow ? ' narrow' : ''}`}>
            <RichText data={block.content} />
          </div>
        </section>
      )
    case 'cards':
      return (
        <section className={`section${alt}`}>
          <div className="container">
            <SectionHead {...block} />
            <div className="internal-grid">
              {block.cards?.map((c) => (
                <article className="info-card" key={c.id}>
                  <h3>{c.title}</h3>
                  {c.text && <p>{c.text}</p>}
                  {c.linkUrl && (
                    <Link className="textlink" href={c.linkUrl}>
                      {c.linkLabel || 'Learn more'} →
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )
    case 'checklist':
      return (
        <section className={`section${alt}`}>
          <div className="container grid-2">
            <div>
              {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
              {block.heading && <h2>{block.heading}</h2>}
              {block.intro && <p className="sectiontext">{block.intro}</p>}
            </div>
            <ul className="list-check panel">
              {block.items?.map((i) => <li key={i.id}>{i.text}</li>)}
            </ul>
          </div>
        </section>
      )
    case 'steps':
      return (
        <section className="section process">
          <div className="container process-grid">
            <div>
              {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
              {block.heading && <h2>{block.heading}</h2>}
              {block.intro && <p className="sectiontext">{block.intro}</p>}
            </div>
            <ol className="steps">
              {block.steps?.map((s, i) => (
                <li className="step" key={s.id}>
                  <span className="number">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="h4">{s.title}</h3>
                    {s.text && <p>{s.text}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )
    case 'products':
      return (
        <section className={`section${alt}`}>
          <div className="container">
            <SectionHead {...block} />
            <div className="product-grid">
              {populatedList<Product>(block.products).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )
    case 'faq':
      return <Faqs items={block.items} heading={block.heading} eyebrow={block.eyebrow} intro={block.intro} />
    case 'cta':
      return <CtaBand eyebrow={block.eyebrow} heading={block.heading} text={block.intro} buttons={block.buttons} />
    default:
      return null
  }
}

export function RenderBlocks({ blocks }: { blocks?: Page['layout'] }) {
  return <>{blocks?.map((b, i) => <RenderBlock key={b.id ?? i} block={b} index={i} />)}</>
}
