/**
 * Publishes the blog posts in blog-posts.ts with their cover images, SEO title/description, tag and caption.
 * Also applied on deploy by the 20261104_080000_blog_posts_and_healthcare_titles migration. Safe to re-run.
 *   pnpm payload run ./src/seed/add-blog-posts.ts
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { publishBlogPosts } from './content-updates'

const payload = await getPayload({ config })
await publishBlogPosts(payload)
process.exit(0)
