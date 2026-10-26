'use client'

import { useEffect, useState } from 'react'
import { onQuoteChange, readQuote, writeQuote, type QuoteItem } from '@/lib/quote'
import type { Dict } from '@/lib/i18n'
import EnquiryForm from './EnquiryForm'

type T = Pick<Dict, 'form' | 'quoteEmpty' | 'quantity' | 'remove' | 'sendQuote' | 'continueBrowsing'>

/** The quote list page – WooCommerce's cart + checkout, ending in a quote request. */
export default function QuoteList({ t, lang, productsHref }: { t: T; lang: string; productsHref: string }) {
  const [items, setItems] = useState<QuoteItem[] | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const sync = () => setItems(readQuote())
    sync()
    return onQuoteChange(sync)
  }, [])

  const update = (slug: string, qty: number) => writeQuote((items ?? []).map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)))
  const remove = (slug: string) => writeQuote((items ?? []).filter((i) => i.slug !== slug))

  if (items === null) return null

  return (
    <div className="ql">
      <div className="ql-items">
        {items.length === 0 && !sent ? (
          <div className="ql-empty">
            <p>{t.quoteEmpty}</p>
            <a className="btn" href={productsHref}>
              {t.continueBrowsing}
            </a>
          </div>
        ) : null}
        {items.map((it) => (
          <div className="ql-row" key={it.slug}>
            <div className="ql-img">{it.image ? <img src={it.image} alt="" /> : null}</div>
            <a className="ql-name" href={`/${lang}/product/${it.slug}`}>
              {it.name}
            </a>
            <div className="ql-qty">
              <span>{t.quantity}</span>
              <button type="button" onClick={() => update(it.slug, it.qty - 1)} aria-label="−">
                −
              </button>
              <input
                type="number"
                min={1}
                value={it.qty}
                onChange={(e) => update(it.slug, Number(e.target.value) || 1)}
                aria-label={t.quantity}
              />
              <button type="button" onClick={() => update(it.slug, it.qty + 1)} aria-label="+">
                +
              </button>
            </div>
            <button type="button" className="ql-rm" onClick={() => remove(it.slug)}>
              {t.remove}
            </button>
          </div>
        ))}
        {items.length ? (
          <a className="ql-more" href={productsHref}>
            ← {t.continueBrowsing}
          </a>
        ) : null}
      </div>
      {items.length || sent ? (
        <div className="ef-card">
          <EnquiryForm
            type="quote"
            lang={lang}
            t={{ form: t.form }}
            withQuoteItems
            submitLabel={t.sendQuote}
            onSent={() => setSent(true)}
          />
        </div>
      ) : null}
    </div>
  )
}
