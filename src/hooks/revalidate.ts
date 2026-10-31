import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Pages are statically generated; any CMS edit refreshes the whole site cache.
 * The catalog is small enough that a site-wide revalidate is simpler and safer
 * than tracking which pages show which document.
 */
const revalidateSite = async (context: Record<string, unknown>) => {
  if (context?.disableRevalidate) return
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next (e.g. the seed script) — nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc, context }) => {
  await revalidateSite(context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc, context }) => {
  await revalidateSite(context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, context }) => {
  await revalidateSite(context)
  return doc
}
