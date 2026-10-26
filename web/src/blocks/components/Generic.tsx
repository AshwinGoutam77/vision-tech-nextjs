import { mediaUrl, type Any } from '@/lib/strapi'
import { lh } from '@/lib/i18n'
import { Buttons, SectionHead, sectionProps, v, type BlockProps } from '../Section'
import { Rich } from './General'

/**
 * Fallback for sections created in Strapi's Content-Type Builder that don't
 * have their own design yet. It looks for common field names and lays them
 * out in the site's style, so new sections show up without any code:
 *   tag · heading/title · intro/subtitle/description/text · body (rich text)
 *   image · buttons/links/cta · items/cards/list (repeatable with title/text/image)
 */
const isMedia = (v: Any) => v && typeof v === 'object' && typeof v.url === 'string' && 'mime' in v
const isLink = (v: Any) => v && typeof v === 'object' && 'href' in v && 'label' in v
const isRich = (v: Any) => Array.isArray(v) && v[0]?.type && Array.isArray(v[0]?.children)

export default function Generic({ b, lang }: BlockProps) {
  const entries = (Object.entries(b) as [string, Any][]).filter(([k]) => !['id', '__component', 'settings'].includes(k))
  const heading = b.heading ?? b.title
  const intro = b.intro ?? b.subtitle ?? b.description ?? (typeof b.text === 'string' ? b.text : undefined)

  const rich = entries.filter(([, x]) => isRich(x)).map(([, x]) => x)
  const images = entries.filter(([, x]) => isMedia(x)).map(([, x]) => x)
  const buttons = entries.flatMap(([, x]) => (isLink(x) ? [x] : Array.isArray(x) && x.every(isLink) ? x : []))
  const lists = entries.filter(([, x]) => Array.isArray(x) && x.length && typeof x[0] === 'object' && !isRich(x) && !x.every(isLink))
  const extraText = entries.filter(
    ([k, x]) => typeof x === 'string' && x.length > 0 && !['tag', 'heading', 'title', 'intro', 'subtitle', 'description', 'text'].includes(k),
  )

  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className={`w${images.length && !lists.length ? ' gx-split' : ''}`}>
        <div className="gx-text rv">
          <SectionHead tag={b.tag} heading={heading} intro={intro} />
          {extraText.map(([k, x]) => (
            <p key={k} style={{ color: 'var(--mu)' }}>
              {x as string}
            </p>
          ))}
          {rich.map((r, i) => (
            <Rich data={r} key={i} />
          ))}
          <Buttons items={buttons} lang={lang} />
        </div>
        {images.length && !lists.length ? (
          <div className="gx-media rv" style={v({ '--i': 1 })}>
            <img src={mediaUrl(images[0])} alt={images[0].alternativeText ?? ''} />
          </div>
        ) : null}
        {lists.map(([k, items]) => (
          <div className="gx-grid" style={v({ '--cols': Math.min(4, (items as Any[]).length) })} key={k}>
            {(items as Any[]).map((it, i) => {
              const img = Object.values(it).find(isMedia)
              const link = Object.values(it).find(isLink) as Any
              return (
                <div className="gx-card rv" style={v({ '--i': i % 4 })} key={i}>
                  {img ? (
                    <div className="gx-card-img">
                      <img src={mediaUrl(img)} alt="" />
                    </div>
                  ) : null}
                  <div className="gx-card-tx">
                    <h3>{it.title ?? it.name ?? it.heading ?? it.label ?? it.question ?? it.value}</h3>
                    {(it.text ?? it.description ?? it.answer) ? <p>{it.text ?? it.description ?? it.answer}</p> : null}
                    {link?.label ? (
                      <a className="gx-more" href={lh(lang, link.href)}>
                        {link.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
