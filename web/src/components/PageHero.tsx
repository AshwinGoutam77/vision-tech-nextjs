import type { ReactNode } from 'react'
import type { Lang } from '@/lib/i18n'
import Breadcrumbs, { type Crumb } from './Breadcrumbs'
import { v } from '@/blocks/Section'

/**
 * Header for inner pages (About, categories, contact…): the homepage hero's
 * light gradient + grid, with breadcrumbs, a big title and an optional photo card.
 */
export default function PageHero({
  title,
  subtitle,
  image,
  crumbs,
  lang,
  children,
  className,
  style,
  id,
}: {
  title: string
  subtitle?: string
  image?: string
  crumbs?: Crumb[]
  lang: Lang
  children?: ReactNode
  className?: string
  style?: Record<string, unknown>
  id?: string
}) {
  return (
    <header id={id} className={`pgh${image ? ' has-img' : ''}${className ? ` ${className}` : ''}`} style={style as never}>
      <div className="w ph-grid">
        <div className="ph-text">
          {crumbs?.length ? <Breadcrumbs items={crumbs} lang={lang} /> : null}
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
          {children}
        </div>
        {image ? (
          <div className="ph-img" style={v({ backgroundImage: `url("${image}")` })} role="img" aria-label="" />
        ) : null}
      </div>
    </header>
  )
}
