import type { Any, Settings } from '@/lib/strapi'
import { dict, lh, LOCALES, type Lang } from '@/lib/i18n'
import { LangSwitch, MobileMenu, QuoteBadge } from './HeaderClient'

type Props = { s: Settings; lang: Lang; tree: Any[] }

const catHref = (path: string[]) => `/products/${path.join('/')}`

/** Dropdown content for a menu item: its own children, or the product categories. */
function Dropdown({ item, tree, lang }: { item: Any; tree: Any[]; lang: Lang }) {
  if (item.showProductCategories && tree.length) {
    return (
      <div className="dd dd-mega">
        {tree.map((top) => (
          <div key={top.documentId}>
            <a className="dd-h" href={lh(lang, catHref([top.slug]))}>
              {top.name}
            </a>
            {top.kids.map((k: Any) => (
              <a key={k.documentId} href={lh(lang, catHref([top.slug, k.slug]))}>
                {k.name}
              </a>
            ))}
          </div>
        ))}
        <a className="dd-all" href={lh(lang, '/products')}>
          {dict(lang).allProducts} →
        </a>
      </div>
    )
  }
  if (item.children?.length) {
    return (
      <div className="dd">
        {item.children.map((c: Any, i: number) => (
          <a key={i} href={lh(lang, c.href)}>
            {c.label}
          </a>
        ))}
      </div>
    )
  }
  return null
}

export default function Header({ s, lang, tree }: Props) {
  const t = dict(lang)
  const items = s.navItems ?? []

  return (
    <nav className="nav" id="nav">
      <a href={lh(lang, '/')} className="nav-logo">
        <img src={s.logo} alt={s.siteTitle} />
      </a>
      <ul>
        {items.map((it: Any, i: number) => {
          const hasDd = (it.showProductCategories && tree.length) || it.children?.length
          return (
            <li key={i} className={hasDd ? 'has-dd' : undefined}>
              <a href={lh(lang, it.href)}>{it.label}</a>
              {hasDd ? <Dropdown item={it} tree={tree} lang={lang} /> : null}
            </li>
          )
        })}
      </ul>
      <div className="nav-tools">
        <a className="nav-ic" href={lh(lang, '/search')} aria-label={t.search} title={t.search}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
        </a>
        <QuoteBadge href={lh(lang, '/quote')} label={t.quote} />
        <LangSwitch lang={lang} locales={[...LOCALES]} />
        {s.navCta?.label ? (
          <a className="btn mag nav-cta" href={lh(lang, s.navCta.href)}>
            {s.navCta.label}
          </a>
        ) : null}
        <MobileMenu label={t.menu} closeLabel={t.close}>
          <div className="mm-in">
            {items.map((it: Any, i: number) => (
              <div className="mm-group" key={i}>
                <a className="mm-top" href={lh(lang, it.href)}>
                  {it.label}
                </a>
                {it.showProductCategories
                  ? tree.map((top) => (
                      <a key={top.documentId} href={lh(lang, catHref([top.slug]))}>
                        {top.name}
                      </a>
                    ))
                  : (it.children ?? []).map((c: Any, j: number) => (
                      <a key={j} href={lh(lang, c.href)}>
                        {c.label}
                      </a>
                    ))}
              </div>
            ))}
            {s.navCta?.label ? (
              <a className="btn" href={lh(lang, s.navCta.href)}>
                {s.navCta.label}
              </a>
            ) : null}
          </div>
        </MobileMenu>
      </div>
    </nav>
  )
}
