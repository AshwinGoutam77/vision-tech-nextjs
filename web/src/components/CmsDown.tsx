import { dict, type Lang } from '@/lib/i18n'
import { STRAPI_URL } from '@/lib/strapi'

/** Shown instead of a blank page when Strapi isn't running. */
export default function CmsDown({ lang }: { lang: Lang }) {
  const t = dict(lang)
  return (
    <section className="gx" style={{ minHeight: '70vh' }}>
      <div className="w">
        <div className="gx-text">
          <span className="tag">CMS</span>
          <h2>{t.cmsDownTitle}</h2>
          <p style={{ color: 'var(--mu)' }}>
            {t.cmsDownText} <code>{STRAPI_URL}</code>
          </p>
        </div>
      </div>
    </section>
  )
}
