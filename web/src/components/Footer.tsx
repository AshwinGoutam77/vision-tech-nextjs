import { Fragment } from 'react'
import type { Any, Settings } from '@/lib/strapi'
import { dict, lh, type Lang } from '@/lib/i18n'

export default function Footer({ s, lang }: { s: Settings; lang: Lang }) {
  const t = dict(lang)
  const lines = String(s.address ?? '').split('\n').filter(Boolean)
  return (
    <footer>
      <div className="w">
        <div className="fg">
          <div>
            <img src={s.logo} alt={s.siteTitle} />
            {lines.length ? (
              <p>
                {lines.map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    {i < lines.length - 1 ? <br /> : null}
                  </Fragment>
                ))}
              </p>
            ) : null}
            <p className="f-contact">
              {s.phone ? (
                <a href={`tel:${s.phone.replace(/[^\d+]/g, '')}`}>
                  {t.call}: {s.phone}
                </a>
              ) : null}
              {s.email ? <a href={`mailto:${s.email}`}>{s.email}</a> : null}
              {s.linkedin ? (
                <a href={s.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              ) : null}
            </p>
          </div>
          {(s.footerColumns ?? []).map((col: Any, i: number) => (
            <div key={i}>
              <h4>{col.heading}</h4>
              {(col.links ?? []).map((l: Any, j: number) => (
                <a href={lh(lang, l.href)} key={j}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="cp">
          <span>{s.copyright}</span>
          <a href="#" style={{ textDecoration: 'none' }}>
            {s.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
