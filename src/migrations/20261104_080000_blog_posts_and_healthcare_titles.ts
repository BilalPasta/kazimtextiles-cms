import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { publishBlogPosts, setHealthcareHeadings } from '../seed/content-updates'

/** Content-only migration: distinct healthcare titles and the first two blog posts. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Without the Blob token the cover images would be written to the build server's disk and lost after the build.
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is not set; refusing to upload blog images to local disk.')
  await setHealthcareHeadings(payload, req)
  await publishBlogPosts(payload, req)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Content stays in place; edit or unpublish it in the admin if needed.
  payload.logger.info('blog_posts_and_healthcare_titles: nothing to roll back automatically')
}
