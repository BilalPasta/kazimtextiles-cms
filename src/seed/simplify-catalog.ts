/**
 * One-off, safe to re-run: narrows the catalog to 5 categories, removes the quote timing promise and adds Blog links.
 * Nothing is deleted. Hidden items can be restored with the "Hidden" checkbox in the admin.
 *
 * BACKUP_FILE=/path/backup.json pnpm payload run ./src/seed/simplify-catalog.ts
 */
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'

const backupFile = process.env.BACKUP_FILE
if (!backupFile) throw new Error('Set BACKUP_FILE to a path for the JSON backup.')

const hiddenCategories = ['home-decorative', 'technical-industrial-fabrics', 'apparel-uniforms-workwear']
const aprons = ['Bib Aprons', 'Waist Aprons']
const context = { disableRevalidate: true }

const payload = await getPayload({ config })
const products = (await payload.find({ collection: 'products', limit: 1000, depth: 0 })).docs
const categories = (await payload.find({ collection: 'categories', limit: 100, depth: 0 })).docs
const homepage = await payload.findGlobal({ slug: 'homepage', depth: 0 })
const navigation = await payload.findGlobal({ slug: 'navigation', depth: 0 })

// Refuse to overwrite: on a re-run the first backup is the one holding the original values.
fs.writeFileSync(backupFile, JSON.stringify({ products, categories, homepage, navigation }, null, 2), { flag: 'wx' })

const bySlug = (slug: string) => {
  const category = categories.find((c) => c.slug === slug)
  if (!category) throw new Error(`Category not found: ${slug}`)
  return category
}
const kitchen = bySlug('kitchen-foodservice-towels')
const hiddenIds = hiddenCategories.map((slug) => bySlug(slug).id)

for (const name of aprons) {
  const apron = products.find((p) => p.name === name)
  if (!apron) throw new Error(`Product not found: ${name}`)
  await payload.update({ collection: 'products', id: apron.id, data: { category: kitchen.id, hidden: false }, depth: 0, context })
}

let hiddenCount = 0
for (const product of products) {
  if (aprons.includes(product.name) || !hiddenIds.includes(product.category as number) || product.hidden) continue
  await payload.update({ collection: 'products', id: product.id, data: { hidden: true, featured: false }, depth: 0, context })
  hiddenCount++
}
for (const id of hiddenIds) {
  await payload.update({ collection: 'categories', id, data: { hidden: true }, depth: 0, context })
}

if (!/apron/i.test(kitchen.intro)) {
  await payload.update({
    collection: 'categories',
    id: kitchen.id,
    data: { intro: `${kitchen.intro} Bib and waist aprons are also available.` },
    depth: 0,
    context,
  })
}

const kitchenTowels = products.find((p) => p.name === 'Kitchen Towels')
if (kitchenTowels) {
  await payload.update({ collection: 'products', id: kitchenTowels.id, data: { featured: true }, depth: 0, context })
}

await payload.updateGlobal({
  slug: 'homepage',
  data: {
    finder: {
      ...homepage.finder,
      title: 'Get a wholesale quote',
      subtitle: "Pick your business, choose products, tell us how many. We'll get back to you as soon as we can.",
    },
  },
  depth: 0,
  context,
})

// Footer: drop links to hidden categories. Header and footer: add Blog right after the Guides link.
const hiddenUrls = hiddenCategories.map((slug) => `/categories/${slug}`)
type Link = { label: string; url: string; id?: string | null }
const addBlog = (links: Link[] | null | undefined, label: string) => {
  const list = (links ?? []).filter((l) => !hiddenUrls.includes(l.url))
  const guides = list.findIndex((l) => l.url === '/guides')
  if (guides !== -1 && !list.some((l) => l.url === '/blog')) list.splice(guides + 1, 0, { label, url: '/blog' })
  return list
}
await payload.updateGlobal({
  slug: 'navigation',
  data: {
    headerLinks: addBlog(navigation.headerLinks, 'Blog'),
    footerColumns: navigation.footerColumns?.map((column) => ({ ...column, links: addBlog(column.links, 'Blog') })),
  },
  depth: 0,
  context,
})

payload.logger.info(`Hidden ${hiddenCount} products and ${hiddenIds.length} categories. Backup: ${backupFile}`)
process.exit(0)
