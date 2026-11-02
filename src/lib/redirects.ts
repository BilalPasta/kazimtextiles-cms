import 'server-only'
import { cache } from 'react'
import { permanentRedirect } from 'next/navigation'
import type { Redirect } from '@/payload-types'
import { getPayloadClient } from './payload'
import { docPath } from './urls'

/** All entries from Settings → Redirects, keyed by their "from" path. */
const getRedirectMap = cache(async () => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'redirects', limit: 1000, depth: 1, pagination: false })
  return new Map(res.docs.map((r) => [normalize(r.from), r]))
})

const normalize = (path: string) => {
  try {
    path = new URL(path, 'http://x').pathname
  } catch {
    // keep as is
  }
  return path.replace(/\/+$/, '') || '/'
}

const targetOf = (r: Redirect): string | null => {
  if (r.to?.type === 'custom') return r.to.url || null
  const ref = r.to?.reference
  if (!ref || typeof ref.value !== 'object' || !ref.value) return null
  if ((ref.value as { hidden?: boolean | null }).hidden) return null
  return docPath(ref.relationTo, ref.value)
}

/**
 * Sends a permanent (308) redirect when the CMS has one for this path. Call it before notFound() or a
 * generic fallback, so retired and renamed URLs land on the most relevant live page.
 */
export async function followRedirect(path: string) {
  const entry = (await getRedirectMap()).get(normalize(path))
  const target = entry && targetOf(entry)
  if (target && normalize(target) !== normalize(path)) permanentRedirect(target)
}
