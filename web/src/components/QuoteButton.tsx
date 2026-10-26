'use client'

import { useEffect, useState } from 'react'
import { addToQuote, onQuoteChange, readQuote } from '@/lib/quote'

type Props = {
  slug: string
  name: string
  image?: string
  label: string
  addedLabel: string
  compact?: boolean
}

/** "Add to quote" – like WooCommerce's add-to-cart button. */
export default function QuoteButton({ slug, name, image, label, addedLabel, compact }: Props) {
  const [inQuote, setInQuote] = useState(false)

  useEffect(() => {
    const sync = () => setInQuote(readQuote().some((i) => i.slug === slug))
    sync()
    return onQuoteChange(sync)
  }, [slug])

  if (compact) {
    return (
      <button
        type="button"
        className={`qb-icon${inQuote ? ' is-on' : ''}`}
        aria-label={inQuote ? addedLabel : label}
        title={inQuote ? addedLabel : label}
        onClick={() => addToQuote({ slug, name, image })}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {inQuote ? <path d="M5 12l5 5 9-10" /> : <path d="M12 5v14M5 12h14" />}
        </svg>
      </button>
    )
  }

  return (
    <button type="button" className="btn mag" onClick={() => addToQuote({ slug, name, image })}>
      {inQuote ? addedLabel : label}
    </button>
  )
}
