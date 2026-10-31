import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHead } from '@/components/PageHead'
import { RenderBlocks } from '@/components/RenderBlocks'
import { getPage, getPages } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getPages()).map((p) => ({ slug: p.slug! }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage((await params).slug)
  if (!page) return {}
  return buildMetadata({ meta: page.meta, title: page.title, description: page.hero?.intro, path: `/${page.slug}` })
}

export default async function CmsPage({ params }: Props) {
  const page = await getPage((await params).slug)
  if (!page) notFound()
  return (
    <>
      <PageHead crumbs={[{ label: page.title }]} eyebrow={page.hero?.eyebrow} title={page.hero?.heading || page.title} intro={page.hero?.intro} />
      <RenderBlocks blocks={page.layout} />
    </>
  )
}
