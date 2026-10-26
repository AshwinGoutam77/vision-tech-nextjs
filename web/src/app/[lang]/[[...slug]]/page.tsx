import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RenderBlocks from '@/blocks/RenderBlocks'
import CmsDown from '@/components/CmsDown'
import { getPage, getSettings, mediaUrl } from '@/lib/strapi'
import { asLang } from '@/lib/i18n'

type Props = { params: Promise<{ lang: string; slug?: string[] }> }

const toSlug = (parts?: string[]) => (parts?.length ? parts.map(decodeURIComponent).join('/') : 'home')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params
  const lang = asLang(p.lang)
  const slug = toSlug(p.slug)
  const [{ data: page }, s] = await Promise.all([getPage(slug, lang), getSettings(lang)])
  if (!page) return { title: s.siteTitle }
  const title = page.seo?.metaTitle || (slug === 'home' ? s.siteTitle : `${page.title} | ${s.siteTitle}`)
  const image = mediaUrl(page.seo?.shareImage)
  const path = slug === 'home' ? '' : `/${slug}`
  return {
    title,
    description: page.seo?.metaDescription || undefined,
    openGraph: image ? { images: [image] } : undefined,
    alternates: { languages: { en: `/en${path}`, fr: `/fr${path}` } },
  }
}

export default async function Page({ params }: Props) {
  const p = await params
  const lang = asLang(p.lang)
  const { data: page, error } = await getPage(toSlug(p.slug), lang)
  if (error) return <CmsDown lang={lang} />
  if (!page) return notFound()

  return (
    <>
      <RenderBlocks blocks={page.sections} lang={lang} />
    </>
  )
}
