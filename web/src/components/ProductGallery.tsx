'use client'

import { useState } from 'react'

/** Main image + thumbnails, like the WooCommerce product gallery. */
export default function ProductGallery({ images, name }: { images: { src: string; alt: string }[]; name: string }) {
  const [i, setI] = useState(0)
  if (!images.length) return <div className="pd-stage" />
  const cur = images[Math.min(i, images.length - 1)]
  return (
    <div className="pd-gallery">
      <div className="pd-stage">
        <img src={cur.src} alt={cur.alt || name} />
      </div>
      {images.length > 1 ? (
        <div className="pd-thumbs" role="tablist">
          {images.map((im, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`${name} ${n + 1}`}
              className={n === i ? 'on' : undefined}
              onClick={() => setI(n)}
            >
              <img src={im.src} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
