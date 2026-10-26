import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import PageHero from '@/components/PageHero'
import Listing, { SORTS } from '@/components/Listing'
import { CategoryGrid } from '@/blocks/components/Catalog'
import { categoryChain, categoryHref, getCategories, getDesign, getProducts, getSettings, mediaUrl, type Any } from '@/lib/strapi'
import { asLang, dict, lh, type Lang } from '@/lib/i18n'

type Props = {
  params: Promise<{ lang: string; path: string[] }>
  searchParams: Promise<{ page?: string; sort?: string }>
}

const PAGE_SIZE = 12

/** Finds the category for /products/a/b/c and checks the whole path matches. */
async function resolve(lang: Lang, path: string[]) {
  const all = await getCategories(lang)
  const slug = decodeURIComponent(path[path.length - 1])
  const cat = all.find((c) => c.slug === slug)
  if (!cat) return null
  const chain = await categoryChain(lang, cat)
  if (chain.map((c) => c.slug).join('/') !== path.map(decodeURIComponent).join('/')) return { cat, chain, redirect: true }
  return { cat, chain, kids: all.filter((c) => c.parent?.documentId === cat.documentId), redirect: false }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params
  const lang = asLang(p.lang)
  const [r, s] = await Promise.all([resolve(lang, p.path), getSettings(lang)])
  if (!r) return { title: s.siteTitle }
  const path = categoryHref(r.chain)
  return {
    title: r.cat.seo?.metaTitle || `${r.cat.name} | ${s.siteTitle}`,
    description: r.cat.seo?.metaDescription || r.cat.description || undefined,
    alternates: { languages: { en: `/en${path}`, fr: `/fr${path}` } },
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const p = await params
  const lang = asLang(p.lang)
  const sp = await searchParams
  const t = dict(lang)
  const r = await resolve(lang, p.path)
  if (!r) return notFound()
  if (r.redirect) return redirect(lh(lang, categoryHref(r.chain)))
  const { cat, chain } = r
  const kids: Any[] = r.kids ?? []

  const page = Math.max(1, Number(sp.page) || 1)
  const sort = sp.sort && SORTS[sp.sort] ? sp.sort : 'default'
  const [list, design] = await Promise.all([
    getProducts(lang, { category: cat.slug, page, pageSize: PAGE_SIZE, sort: SORTS[sort] }),
    getDesign(),
  ])

  // siblings as filter chips (like WooCommerce's category widget)
  const all = await getCategories(lang)
  const parentId = cat.parent?.documentId ?? null
  const siblings = parentId ? all.filter((c) => c.parent?.documentId === parentId) : []
  const parentChain = chain.slice(0, -1)

  const crumbs = [
    { label: t.home, href: '/' },
    { label: t.products, href: '/products' },
    ...chain.map((c, i) => ({ label: c.name, href: categoryHref(chain.slice(0, i + 1)) })),
  ]

  return (
    <>
      <PageHero
        lang={lang}
        title={cat.name}
        subtitle={cat.description || undefined}
        image={mediaUrl(cat.heroImage) || mediaUrl(cat.image)}
        crumbs={crumbs}
      />

      {kids.length ? (
        <section className="gx gx-tight">
          <div className="w">
            <CategoryGrid cats={kids} lang={lang} />
          </div>
        </section>
      ) : null}

      {!kids.length || list.total ? (
        <section className="gx gx-tight">
          <div className="w">
            {siblings.length > 1 ? (
              <nav className="chips" aria-label={t.subcategories}>
                {siblings.map((s) => (
                  <a
                    key={s.documentId}
                    href={lh(lang, categoryHref([...parentChain, s]))}
                    className={s.documentId === cat.documentId ? 'on' : undefined}
                    aria-current={s.documentId === cat.documentId ? 'page' : undefined}
                  >
                    {s.name}
                  </a>
                ))}
              </nav>
            ) : null}
            <Listing
              lang={lang}
              items={list.items}
              total={list.total}
              page={page}
              pageCount={list.pageCount}
              pageSize={PAGE_SIZE}
              sort={sort}
              basePath={categoryHref(chain)}
              currency={design.currency}
            />
          </div>
        </section>
      ) : null}
    </>
  )
}
