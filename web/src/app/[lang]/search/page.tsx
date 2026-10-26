import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import { getDesign, getProducts, getSettings, searchPages, type Any } from '@/lib/strapi'
import { asLang, dict, lh } from '@/lib/i18n'

type Props = { params: Promise<{ lang: string }>; searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang)
  const s = await getSettings(lang)
  return { title: `${dict(lang).search} | ${s.siteTitle}`, robots: { index: false } }
}

export default async function SearchPage({ params, searchParams }: Props) {
  const lang = asLang((await params).lang)
  const t = dict(lang)
  const q = ((await searchParams).q ?? '').trim().slice(0, 80)

  const [products, pages, design] = q
    ? await Promise.all([getProducts(lang, { q, pageSize: 24 }), searchPages(lang, q), getDesign()])
    : [{ items: [] as Any[] }, [] as Any[], await getDesign()]

  return (
    <>
      <PageHero lang={lang} title={t.search} crumbs={[{ label: t.home, href: '/' }, { label: t.search }]}>
        <form className="sf" action={lh(lang, '/search')} role="search">
          <input name="q" defaultValue={q} placeholder={t.searchPlaceholder} aria-label={t.search} autoFocus />
          <button className="btn" type="submit">
            {t.search}
          </button>
        </form>
      </PageHero>
      {q ? (
        <section className="gx gx-tight">
          <div className="w">
            <p className="tb">
              {t.searchResultsFor} “{q}”
            </p>
            {pages.length ? (
              <ul className="sr-pages">
                {pages.map((pg: Any) => (
                  <li key={pg.documentId}>
                    <a href={lh(lang, pg.slug === 'home' ? '/' : `/${pg.slug}`)}>{pg.title}</a>
                    {pg.seo?.metaDescription ? <span>{pg.seo.metaDescription}</span> : null}
                  </li>
                ))}
              </ul>
            ) : null}
            {products.items.length ? (
              <div className="pr">
                {products.items.map((p: Any, i: number) => (
                  <ProductCard p={p} lang={lang} i={i} currency={design.currency} key={p.documentId ?? i} />
                ))}
              </div>
            ) : null}
            {!pages.length && !products.items.length ? <p className="empty">{t.noResults}</p> : null}
          </div>
        </section>
      ) : null}
    </>
  )
}
