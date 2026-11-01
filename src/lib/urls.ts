export const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

const prefixes: Record<string, string> = {
  products: '/products/',
  categories: '/categories/',
  industries: '/industries/',
  guides: '/guides/',
  posts: '/blog/',
  pages: '/',
}

/** Public path for a CMS document, e.g. docPath('products', { slug: 'shop-towels' }) → /products/shop-towels */
export const docPath = (collection: string | undefined, doc: unknown): string => {
  const slug = (doc as { slug?: string } | undefined)?.slug
  if (!collection || !slug) return '/'
  if (collection === 'pages' && slug === 'home') return '/'
  return `${prefixes[collection] ?? '/'}${slug}`
}

export const absoluteUrl = (path = '/') =>
  /^https?:\/\//.test(path) ? path : `${serverUrl}${path.startsWith('/') ? path : `/${path}`}`
