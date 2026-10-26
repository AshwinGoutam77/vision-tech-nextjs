import { formatPrice, mediaUrl, type Any } from '@/lib/strapi'
import { dict, lh, type Lang } from '@/lib/i18n'
import { v } from '@/blocks/Section'
import QuoteButton from './QuoteButton'

/** Product tile used by the products grid, category pages, search and related products. */
export default function ProductCard({ p, lang, i = 0, currency = 'CAD' }: { p: Any; lang: Lang; i?: number; currency?: string }) {
  const t = dict(lang)
  const href = lh(lang, `/product/${p.slug}`)
  const img = mediaUrl(p.image)
  const onSale = p.showPrice && p.salePrice != null && p.price != null && Number(p.salePrice) < Number(p.price)

  return (
    <div className="pc tilt rv" style={i ? v({ '--i': i % 3 }) : undefined}>
      {onSale ? <span className="pc-sale">{t.sale}</span> : null}
      <a className="st" href={href} aria-label={p.name}>
        {img ? <img src={img} alt={p.image?.alternativeText || p.name} loading="lazy" /> : null}
      </a>
      {p.brand ? <span className="pc-brand">{p.brand}</span> : null}
      <h3>
        <a href={href}>{p.name}</a>
      </h3>
      {p.shortDescription ? <p>{p.shortDescription}</p> : null}
      {p.showPrice && p.price != null ? (
        <div className="pc-price">
          {onSale ? (
            <>
              <del>{formatPrice(p.price, currency, lang)}</del> <b>{formatPrice(p.salePrice, currency, lang)}</b>
            </>
          ) : (
            <b>{formatPrice(p.price, currency, lang)}</b>
          )}
        </div>
      ) : null}
      <div className="pc-act">
        <a className="btn l" href={href}>
          {t.learnMore}
        </a>
        {p.canQuote !== false ? (
          <QuoteButton slug={p.slug} name={p.name} image={img} label={t.addToQuote} addedLabel={t.inQuote} compact />
        ) : null}
      </div>
    </div>
  )
}
