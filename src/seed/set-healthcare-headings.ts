/**
 * Gives the healthcare category and the hospital industry page different H1s and search titles.
 * Also applied on deploy by the 20261104_080000_blog_posts_and_healthcare_titles migration. Safe to re-run.
 *   pnpm payload run ./src/seed/set-healthcare-headings.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { setHealthcareHeadings } from './content-updates'

const payload = await getPayload({ config })
await setHealthcareHeadings(payload)
process.exit(0)
