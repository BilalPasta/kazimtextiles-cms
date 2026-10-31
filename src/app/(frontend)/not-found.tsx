import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p className="muted">The page may have moved. Try the catalog or send us your requirement.</p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link className="btn" href="/products">
            Browse products
          </Link>
          <Link className="btn ghost" href="/quote">
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  )
}
