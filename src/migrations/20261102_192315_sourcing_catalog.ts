import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_inquiries_inquiry_type" AS ENUM('pricing', 'samples', 'custom-sourcing');
  ALTER TYPE "public"."enum_inquiries_source" ADD VALUE 'custom-sourcing';
  ALTER TABLE "products" ADD COLUMN "packaging" varchar;
  ALTER TABLE "products" ADD COLUMN "customization_status" varchar;
  ALTER TABLE "products" ADD COLUMN "search_terms" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "inquiry_type" "enum_inquiries_inquiry_type";
  ALTER TABLE "inquiries" ADD COLUMN "quantity_unit" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "zip" varchar;
  ALTER TABLE "inquiries" ADD COLUMN "material" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "inquiries" ALTER COLUMN "source" SET DATA TYPE text;
  ALTER TABLE "inquiries" ALTER COLUMN "source" SET DEFAULT 'quote-form'::text;
  DROP TYPE "public"."enum_inquiries_source";
  CREATE TYPE "public"."enum_inquiries_source" AS ENUM('quote-form', 'finder');
  ALTER TABLE "inquiries" ALTER COLUMN "source" SET DEFAULT 'quote-form'::"public"."enum_inquiries_source";
  ALTER TABLE "inquiries" ALTER COLUMN "source" SET DATA TYPE "public"."enum_inquiries_source" USING "source"::"public"."enum_inquiries_source";
  ALTER TABLE "products" DROP COLUMN "packaging";
  ALTER TABLE "products" DROP COLUMN "customization_status";
  ALTER TABLE "products" DROP COLUMN "search_terms";
  ALTER TABLE "inquiries" DROP COLUMN "inquiry_type";
  ALTER TABLE "inquiries" DROP COLUMN "quantity_unit";
  ALTER TABLE "inquiries" DROP COLUMN "zip";
  ALTER TABLE "inquiries" DROP COLUMN "material";
  DROP TYPE "public"."enum_inquiries_inquiry_type";`)
}
