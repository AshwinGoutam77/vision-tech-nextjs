import { dict, lh, type Lang } from '@/lib/i18n'
import type { Any } from '@/lib/strapi'
import ProductCard from './ProductCard'
import SortSelect from './SortSelect'

export const SORTS: Record<string, string> = {
  default: 'sortOrder:asc',
  name: 'name:asc',
  newest: 'createdAt:desc',
}

/** WooCommerce-style shop grid: result count, sorting, products, pagination. */
export default function Listing({
  lang,
  items,
  total,
  page,
  pageCount,
  pageSize,
  sort,
  basePath,
  currency,
}: {
  lang: Lang
  items: Any[]
  total: number
  page: number
  pageCount: number
  pageSize: number
  sort: string
  basePath: string
  currency: string
}) {
  const t = dict(lang)
  const from = total ? (page - 1) * pageSize + 1 : 0
  const to = Math.min(page * pageSize, total)
  const href = (p: number) => {
    const q = new URLSearchParams()
    if (p > 1) q.set('page', String(p))
    if (sort !== 'default') q.set('sort', sort)
    const s = q.toString()
    return lh(lang, `${basePath}${s ? `?${s}` : ''}`)
  }

  return (
    <div className="ls-wrap">
      <div className="tb">
        <p>{t.showing(from, to, total)}</p>
        {total > 1 ? (
          <SortSelect
            value={sort}
            label={t.sortBy}
            options={[
              { value: 'default', label: t.sortDefault },
              { value: 'name', label: t.sortName },
              { value: 'newest', label: t.sortNewest },
            ]}
          />
        ) : null}
      </div>

      {items.length ? (
        <div className="pr">
          {items.map((p, i) => (
            <ProductCard p={p} lang={lang} i={i} currency={currency} key={p.documentId ?? i} />
          ))}
        </div>
      ) : (
        <p className="empty">{t.noProducts}</p>
      )}

      {pageCount > 1 ? (
        <nav className="pg" aria-label="Pagination">
          {page > 1 ? (
            <a href={href(page - 1)} aria-label={t.previous}>
              ←
            </a>
          ) : null}
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) =>
            n === page ? (
              <span key={n} aria-current="page">
                {n}
              </span>
            ) : (
              <a key={n} href={href(n)}>
                {n}
              </a>
            ),
          )}
          {page < pageCount ? (
            <a href={href(page + 1)} aria-label={t.next}>
              →
            </a>
          ) : null}
        </nav>
      ) : null}
    </div>
  )
}
