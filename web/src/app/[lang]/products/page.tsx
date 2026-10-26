import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Listing, { SORTS } from '@/components/Listing'
import { CategoryGrid } from '@/blocks/components/Catalog'
import { getCategoryTree, getDesign, getProducts, getSettings } from '@/lib/strapi'
import { asLang, dict } from '@/lib/i18n'

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ page?: string; sort?: string }> }

const PAGE_SIZE = 12

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang)
  const s = await getSettings(lang)
  return { title: `${dict(lang).products} | ${s.siteTitle}`, alternates: { languages: { en: '/en/products', fr: '/fr/products' } } }
}

/** The shop page: top-level categories, then every product. */
export default async function ProductsPage({ params, searchParams }: Props) {
  const lang = asLang((await params).lang)
  const sp = await searchParams
  const t = dict(lang)
  const page = Math.max(1, Number(sp.page) || 1)
  const sort = sp.sort && SORTS[sp.sort] ? sp.sort : 'default'

  const [tree, list, design] = await Promise.all([
    getCategoryTree(lang),
    getProducts(lang, { page, pageSize: PAGE_SIZE, sort: SORTS[sort] }),
    getDesign(),
  ])

  return (
    <>
      <PageHero lang={lang} title={t.products} crumbs={[{ label: t.home, href: '/' }, { label: t.products }]} />
      {tree.length ? (
        <section className="gx gx-tight">
          <div className="w">
            <CategoryGrid cats={tree} lang={lang} />
          </div>
        </section>
      ) : null}
      <section className="gx" id="all">
        <div className="w">
          <div className="hd rv">
            <h2>{t.allProducts}</h2>
          </div>
          <Listing
            lang={lang}
            items={list.items}
            total={list.total}
            page={page}
            pageCount={list.pageCount}
            pageSize={PAGE_SIZE}
            sort={sort}
            basePath="/products"
            currency={design.currency}
          />
        </div>
      </section>
    </>
  )
}
