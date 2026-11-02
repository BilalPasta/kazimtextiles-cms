/**
 * One-off, safe to re-run: applies the November 2026 sourcing update (22-product catalog, redirects,
 * corrected company positioning and phone number) to an existing database. Writes a JSON backup first.
 *
 *   BACKUP_FILE=/path/backup.json pnpm payload run ./src/seed/update-sourcing-catalog.ts
 */
import fs from 'fs'
import { getPayload } from 'payload'
import config from '../payload.config'
import { applySourcingUpdate } from './apply-sourcing-update'

const backupFile = process.env.BACKUP_FILE
if (!backupFile) throw new Error('Set BACKUP_FILE to a path for the JSON backup.')

const payload = await getPayload({ config })

const dump = async (collection: 'products' | 'categories' | 'industries' | 'pages' | 'guides' | 'redirects') =>
  (await payload.find({ collection, limit: 2000, depth: 0, pagination: false, draft: false })).docs
const backup = {
  takenAt: new Date().toISOString(),
  products: await dump('products'),
  categories: await dump('categories'),
  industries: await dump('industries'),
  pages: await dump('pages'),
  guides: await dump('guides'),
  redirects: await dump('redirects'),
  homepage: await payload.findGlobal({ slug: 'homepage', depth: 0 }),
  siteSettings: await payload.findGlobal({ slug: 'site-settings', depth: 0 }),
  navigation: await payload.findGlobal({ slug: 'navigation', depth: 0 }),
}
// Refuse to overwrite: on a re-run the first backup is the one holding the original values.
fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2), { flag: 'wx' })
payload.logger.info(`Backup written: ${backupFile}`)

await applySourcingUpdate(payload)
payload.logger.info('Sourcing update applied.')
process.exit(0)
