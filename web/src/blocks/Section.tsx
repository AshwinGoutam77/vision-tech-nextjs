import type { CSSProperties, ReactNode } from 'react'
import type { Any } from '@/lib/strapi'
import { lh, type Lang } from '@/lib/i18n'

/** Inline style with CSS custom properties (e.g. --i). */
export const v = (o: Record<string, string | number | undefined>) => o as CSSProperties
export const bgUrl = (src: string) => (src ? `url("${src}")` : undefined)

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i

/**
 * Turns a block's “Section design” settings into id / className / style.
 * Every block renders its root element with these, so editors can recolour,
 * re-space or anchor any section without touching code.
 */
export function sectionProps(
  settings: Any,
  base: { className?: string; id?: string; style?: CSSProperties } = {},
) {
  const s = settings ?? {}
  const cls = [base.className]
  const style: Record<string, Any> = { ...(base.style ?? {}) }

  switch (s.background) {
    case 'page':
      cls.push('bg-page')
      break
    case 'white':
      cls.push('bg-white')
      break
    case 'tint':
      cls.push('bg-tint')
      break
    case 'dark':
      cls.push('bg-dark', 'on-dark')
      break
    case 'custom':
      if (HEX.test(s.customColor ?? '')) {
        cls.push('bg-custom')
        style['--sec-bg'] = s.customColor
        if (s.textColor === 'light') cls.push('on-dark')
      }
      break
  }

  if (s.spacing && s.spacing !== 'default') {
    cls.push(`pad-${s.spacing}`)
    delete style.paddingTop
  }

  return {
    id: (s.anchor || base.id || undefined)?.replace(/^#/, ''),
    className: cls.filter(Boolean).join(' ') || undefined,
    style: Object.keys(style).length ? (style as CSSProperties) : undefined,
  }
}

export function SectionHead({ tag, heading, intro, center }: { tag?: string; heading?: string; intro?: ReactNode; center?: boolean }) {
  if (!tag && !heading && !intro) return null
  return (
    <div className={`hd rv${center ? ' hd-c' : ''}`}>
      {tag ? <span className="tag">{tag}</span> : null}
      {heading ? <h2>{heading}</h2> : null}
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

/** Props every section component receives. */
export type BlockProps = { b: Any; lang: Lang }

export function Buttons({
  items,
  lang,
  className = 'cta',
}: {
  items?: ({ label?: string; href?: string } | null | undefined)[]
  lang: Lang
  className?: string
}) {
  const list = (items ?? []).filter((b): b is { label: string; href?: string } => Boolean(b?.label))
  if (!list.length) return null
  return (
    <div className={className}>
      {list.map((b, i) => (
        <a key={i} className={`btn mag${i > 0 ? ' o' : ''}`} href={lh(lang, b.href)}>
          {b.label}
        </a>
      ))}
    </div>
  )
}
