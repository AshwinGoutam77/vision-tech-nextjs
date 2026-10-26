import { headers } from 'next/headers'
import { asLang, dict, lh } from '@/lib/i18n'

export default async function NotFound() {
  const h = await headers()
  const lang = asLang(h.get('x-lang'))
  const t = dict(lang)
  return (
    <section className="gx" style={{ minHeight: '70vh' }}>
      <div className="w">
        <div className="gx-text">
          <span className="tag">404</span>
          <h2>{t.notFoundTitle}</h2>
          <p style={{ color: 'var(--mu)' }}>{t.notFoundText}</p>
          <div className="cta">
            <a className="btn" href={lh(lang, '/')}>
              {t.backHome}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
