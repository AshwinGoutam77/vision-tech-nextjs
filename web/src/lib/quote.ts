'use client'

/**
 * The quote list (WooCommerce-style cart, without payment): stored in the
 * visitor's browser and sent to Strapi as an Enquiry when they submit it.
 */
export type QuoteItem = { slug: string; name: string; image?: string; qty: number }

const KEY = 'vt-quote'
const EVENT = 'vt-quote-change'

export function readQuote(): QuoteItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function writeQuote(items: QuoteItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items))
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

export function addToQuote(item: Omit<QuoteItem, 'qty'>, qty = 1) {
  const list = readQuote()
  const found = list.find((i) => i.slug === item.slug)
  if (found) found.qty += qty
  else list.push({ ...item, qty })
  writeQuote(list)
}

export function onQuoteChange(fn: () => void) {
  window.addEventListener(EVENT, fn)
  window.addEventListener('storage', fn)
  return () => {
    window.removeEventListener(EVENT, fn)
    window.removeEventListener('storage', fn)
  }
}
