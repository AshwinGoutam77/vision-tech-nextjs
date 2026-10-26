import { cache } from 'react'
import { draftMode } from 'next/headers'
import { DEFAULT_LOCALE, type Lang } from './i18n'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Any = any

export const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '')

type Params = Record<string, string | number | undefined>

/** GET /api/<path> from Strapi. Always fresh, so edits show on refresh. */
export async function strapi(path: string, params: Params = {}): Promise<Any> {
  const qs = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== '')
      .map(([k, v]) => [k, String(v)]),
  ).toString()
  const res = await fetch(`${STRAPI_URL}/api/${path}${qs ? `?${qs}` : ''}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Strapi ${res.status} on /api/${path}`)
  return res.json()
}

/** Absolute URL for a Strapi media field. */
export const mediaUrl = (m: Any): string => {
  const url: string | undefined = m?.url ?? m?.data?.url
  if (!url) return ''
  return url.startsWith('/') ? `${STRAPI_URL}${url}` : url
}

const nonEmpty = (v: unknown, d: string) => (typeof v === 'string' && v.trim() ? v : d)

export async function isPreview() {
  return (await draftMode()).isEnabled
}
const status = async () => ((await isPreview()) ? 'draft' : 'published')

/** Try the visitor's language first, then English, so untranslated items still show. */
async function withFallback<T>(lang: Lang, run: (locale: Lang) => Promise<T | null>): Promise<T | null> {
  const first = await run(lang)
  if (first || lang === DEFAULT_LOCALE) return first
  return run(DEFAULT_LOCALE)
}

/* ---------- Header & Footer ---------- */
export const getSettings = cache(async (lang: Lang) => {
  let g: Any = {}
  try {
    g = (await withFallback(lang, async (locale) => (await strapi('global', { locale })).data ?? null)) ?? {}
  } catch (e) {
    console.error('[strapi] global not available:', (e as Error).message)
  }
  return {
    siteTitle: nonEmpty(g.siteName, 'Visiontec Systems'),
    logo: mediaUrl(g.logo) || '/images/logo.png',
    navItems: (g.navItems ?? []) as Any[],
    navCta: g.navCta ?? null,
    address: (g.address ?? '') as string,
    phone: (g.phone ?? '') as string,
    email: (g.email ?? '') as string,
    linkedin: (g.linkedin ?? '') as string,
    footerColumns: (g.footerColumns ?? []) as Any[],
    copyright: (g.copyright ?? '') as string,
    backToTop: nonEmpty(g.backToTop, 'Back to top'),
  }
})
export type Settings = Awaited<ReturnType<typeof getSettings>>

/* ---------- Design & Colours ---------- */
const font = (f: unknown, d: string) => (typeof f === 'string' && f ? f.replace(/_/g, ' ') : d)
const bool = (v: unknown) => v !== false

export const getDesign = cache(async () => {
  let d: Any = {}
  try {
    d = (await strapi('design')).data ?? {}
  } catch {}
  return {
    colors: {
      accent: d.accentColor,
      primary: d.primaryColor,
      glow: d.glowColor,
      background: d.backgroundColor,
      text: d.textColor,
      muted: d.mutedColor,
      card: d.cardColor,
      line: d.lineColor,
      dark: d.darkColor,
      footer: d.footerColor,
    },
    fonts: { heading: font(d.headingFont, 'Sora'), body: font(d.bodyFont, 'DM Sans'), baseSize: d.baseFontSize ?? 17 },
    effects: {
      preloader: bool(d.showPreloader),
      cursorGlow: bool(d.showCursorGlow),
      progressBar: bool(d.showProgressBar),
      animations: bool(d.enableAnimations),
    },
    currency: nonEmpty(d.currency, 'CAD'),
    customCss: d.customCss ?? '',
  }
})

/* ---------- Pages ---------- */
export type Result<T> = { data: T | null; error?: string }

export async function getPage(slug: string, lang: Lang): Promise<Result<Any>> {
  try {
    const st = await status()
    const data = await withFallback(lang, async (locale) => {
      const res = await strapi('pages', { 'filters[slug][$eq]': slug, locale, status: st })
      return res.data?.[0] ?? null
    })
    return { data }
  } catch (e) {
    return { data: null, error: (e as Error).message }
  }
}

/* ---------- Categories ---------- */
export const getCategories = cache(async (lang: Lang): Promise<Any[]> => {
  try {
    return (
      (await withFallback(lang, async (locale) => {
        const res = await strapi('categories', { locale, sort: 'sortOrder:asc', 'pagination[pageSize]': 100 })
        return res.data?.length ? res.data : null
      })) ?? []
    )
  } catch {
    return []
  }
})

/** Categories as a tree (top level, each with .kids). */
export async function getCategoryTree(lang: Lang): Promise<Any[]> {
  const all = await getCategories(lang)
  const byParent = (id: string | null): Any[] =>
    all.filter((c) => (c.parent?.documentId ?? null) === id).map((c) => ({ ...c, kids: byParent(c.documentId) }))
  return byParent(null)
}

/** The chain of categories from the top level down to `cat`. */
export async function categoryChain(lang: Lang, cat: Any): Promise<Any[]> {
  const all = await getCategories(lang)
  const chain: Any[] = []
  let cur = all.find((c) => c.documentId === cat?.documentId)
  while (cur && chain.length < 6) {
    chain.unshift(cur)
    const parentId = cur.parent?.documentId
    cur = parentId ? all.find((c) => c.documentId === parentId) : null
  }
  return chain
}
export const categoryHref = (chain: Any[]) => `/products/${chain.map((c) => c.slug).join('/')}`

/* ---------- Products ---------- */
export type ProductQuery = {
  category?: string
  featured?: boolean
  page?: number
  pageSize?: number
  sort?: string
  q?: string
  slugs?: string[]
}

export async function getProducts(lang: Lang, opts: ProductQuery = {}): Promise<{ items: Any[]; total: number; pageCount: number }> {
  const st = await status()
  const run = async (locale: Lang) => {
    const params: Params = {
      locale,
      status: st,
      populate: 'image',
      sort: opts.sort || 'sortOrder:asc',
      'pagination[page]': opts.page ?? 1,
      'pagination[pageSize]': opts.pageSize ?? 12,
    }
    if (opts.category) params['filters[categories][slug][$eq]'] = opts.category
    if (opts.featured) params['filters[featured][$eq]'] = 'true'
    if (opts.q) {
      params['filters[$or][0][name][$containsi]'] = opts.q
      params['filters[$or][1][shortDescription][$containsi]'] = opts.q
      params['filters[$or][2][brand][$containsi]'] = opts.q
    }
    opts.slugs?.forEach((s, i) => (params[`filters[slug][$in][${i}]`] = s))
    const res = await strapi('products', params)
    return res.data?.length ? res : null
  }
  try {
    const res = await withFallback(lang, run)
    return {
      items: res?.data ?? [],
      total: res?.meta?.pagination?.total ?? 0,
      pageCount: res?.meta?.pagination?.pageCount ?? 1,
    }
  } catch {
    return { items: [], total: 0, pageCount: 1 }
  }
}

export async function getProduct(slug: string, lang: Lang): Promise<Result<Any>> {
  try {
    const st = await status()
    const data = await withFallback(lang, async (locale) => {
      const res = await strapi('products', { 'filters[slug][$eq]': slug, locale, status: st })
      return res.data?.[0] ?? null
    })
    return { data }
  } catch (e) {
    return { data: null, error: (e as Error).message }
  }
}

/* ---------- Other collections ---------- */
async function list(path: string, lang: Lang | null, params: Params = {}): Promise<Any[]> {
  try {
    const run = async (locale: Lang | null) => {
      const res = await strapi(path, { ...(locale ? { locale } : {}), sort: 'sortOrder:asc', ...params })
      return res.data?.length ? res.data : null
    }
    return ((lang ? await withFallback(lang, run) : await run(null)) ?? []) as Any[]
  } catch {
    return []
  }
}
export const getArticles = (lang: Lang, limit = 3) => list('articles', lang, { populate: 'image', 'pagination[pageSize]': limit })
export const getEvents = (lang: Lang) => list('events', lang, { 'pagination[pageSize]': 50 })
export const getPartners = () => list('partners', null, { populate: 'logo', 'pagination[pageSize]': 100 })

export async function searchPages(lang: Lang, q: string): Promise<Any[]> {
  try {
    const res = await strapi('pages', { locale: lang, 'filters[title][$containsi]': q, populate: 'seo' })
    return res.data ?? []
  } catch {
    return []
  }
}

/** Format a price in the shop currency for the visitor's language. */
export function formatPrice(value: unknown, currency: string, lang: Lang) {
  const n = Number(value)
  if (value === null || value === undefined || value === '' || !Number.isFinite(n)) return ''
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { style: 'currency', currency }).format(n)
}
