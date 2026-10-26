'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { onQuoteChange, readQuote } from '@/lib/quote'

/** EN | FR switch – keeps you on the same page in the other language. */
export function LangSwitch({ lang, locales }: { lang: string; locales: string[] }) {
  const pathname = usePathname() || `/${lang}`
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')
  return (
    <div className="ls" role="group" aria-label="Language">
      {locales.map((l) => (
        <a key={l} href={`/${l}${rest}`} className={l === lang ? 'on' : undefined} hrefLang={l} lang={l} aria-current={l === lang ? 'true' : undefined}>
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  )
}

/** Quote list icon with item count (like the WooCommerce mini-cart). */
export function QuoteBadge({ href, label }: { href: string; label: string }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const sync = () => setN(readQuote().reduce((s, i) => s + i.qty, 0))
    sync()
    return onQuoteChange(sync)
  }, [])
  return (
    <a className="nav-ic" href={href} aria-label={`${label} (${n})`} title={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 7h12l-1 13H7L6 7z" />
        <path d="M9 7a3 3 0 016 0" />
      </svg>
      {n ? <span className="nav-n">{n}</span> : null}
    </a>
  )
}

/** Hamburger for small screens; the menu content is passed in from the server. */
export function MobileMenu({ label, closeLabel, children }: { label: string; closeLabel: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])
  return (
    <>
      <button type="button" className="nav-burger" aria-expanded={open} aria-label={open ? closeLabel : label} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>
      <div className={`mm${open ? ' is-open' : ''}`} onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
        {children}
      </div>
    </>
  )
}
