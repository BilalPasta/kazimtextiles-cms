import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "image_caption" varchar;
  ALTER TABLE "posts" ADD COLUMN "tag" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_image_caption" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_tag" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "image_caption";
  ALTER TABLE "posts" DROP COLUMN "tag";
  ALTER TABLE "_posts_v" DROP COLUMN "version_image_caption";
  ALTER TABLE "_posts_v" DROP COLUMN "version_tag";`)
}
