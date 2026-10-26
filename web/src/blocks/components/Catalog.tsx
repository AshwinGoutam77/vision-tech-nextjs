import { Fragment } from 'react'
import { categoryChain, categoryHref, getCategories, getPartners, getSettings, mediaUrl, type Any } from '@/lib/strapi'
import { dict, lh } from '@/lib/i18n'
import PageHero from '@/components/PageHero'
import EnquiryForm from '@/components/EnquiryForm'
import { SectionHead, sectionProps, v, type BlockProps } from '../Section'
import { Rich } from './General'

/* ---------------- Page header ---------------- */
export function PageHeader({ b, lang }: BlockProps) {
  const t = dict(lang)
  const sp = sectionProps(b.settings)
  return (
    <PageHero
      id={sp.id}
      className={sp.className}
      style={sp.style as never}
      lang={lang}
      title={b.title}
      subtitle={b.subtitle}
      image={mediaUrl(b.image)}
      crumbs={b.showBreadcrumb !== false ? [{ label: t.home, href: '/' }, { label: b.title }] : undefined}
    />
  )
}

/* ---------------- Category cards ---------------- */
export async function CategoryGrid({ cats, lang }: { cats: Any[]; lang: Parameters<typeof dict>[0] }) {
  const all = await getCategories(lang)
  return (
    <div className="cg">
      {await Promise.all(
        cats.map(async (c: Any, i: number) => {
          const chain = await categoryChain(lang, c)
          const count = all.filter((x) => x.parent?.documentId === c.documentId).length
          return (
            <a
              className="cc rv"
              href={lh(lang, categoryHref(chain))}
              style={v({ '--i': i % 3, backgroundImage: mediaUrl(c.image) ? `url("${mediaUrl(c.image)}")` : undefined })}
              key={c.documentId}
            >
              {count ? <span className="cc-n">{count}</span> : null}
              <span className="lb">
                {c.name}
                <i>↗</i>
              </span>
            </a>
          )
        }),
      )}
    </div>
  )
}

export async function Categories({ b, lang }: BlockProps) {
  const all = await getCategories(lang)
  const parentId = b.parent?.documentId ?? null
  const cats = all.filter((c) => (c.parent?.documentId ?? null) === parentId)
  return (
    <section {...sectionProps(b.settings)}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} intro={b.intro} />
        <CategoryGrid cats={cats} lang={lang} />
      </div>
    </section>
  )
}

/* ---------------- Partner logos ---------------- */
export async function Partners({ b }: BlockProps) {
  const partners = await getPartners()
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} intro={b.intro} center />
        <div className="ptg">
          {partners.map((p: Any, i: number) => {
            const logo = <img src={mediaUrl(p.logo)} alt={p.name} loading="lazy" />
            return p.url ? (
              <a className="pt rv" href={p.url} target="_blank" rel="noopener noreferrer" style={v({ '--i': i % 4 })} key={i} title={p.name}>
                {logo}
              </a>
            ) : (
              <div className="pt rv" style={v({ '--i': i % 4 })} key={i} title={p.name}>
                {logo}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Enquiry form ---------------- */
export async function ContactDetails({ lang }: { lang: BlockProps['lang'] }) {
  const s = await getSettings(lang)
  const t = dict(lang)
  const lines = s.address.split('\n').filter(Boolean)
  return (
    <div className="ef-details">
      <h4>{t.contactDetails}</h4>
      {lines.length ? (
        <p>
          {lines.map((l, i) => (
            <Fragment key={i}>
              {l}
              {i < lines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </p>
      ) : null}
      {s.phone ? (
        <p>
          {t.call}: <a href={`tel:${s.phone.replace(/[^\d+]/g, '')}`}>{s.phone}</a>
        </p>
      ) : null}
      {s.email ? (
        <p>
          {t.emailUs}: <a href={`mailto:${s.email}`}>{s.email}</a>
        </p>
      ) : null}
    </div>
  )
}

export async function EnquiryBlock({ b, lang }: BlockProps) {
  const t = dict(lang)
  return (
    <section {...sectionProps(b.settings, { className: 'gx', id: 'enquiry' })}>
      <div className="w ef">
        <div className="ef-intro rv">
          {b.tag ? <span className="tag">{b.tag}</span> : null}
          {b.heading ? <h2>{b.heading}</h2> : null}
          <Rich data={b.body} />
          {b.showContactDetails ? <ContactDetails lang={lang} /> : null}
        </div>
        <div className="ef-card rv" style={v({ '--i': 1 })}>
          <EnquiryForm
            type={b.formType || 'contact'}
            lang={lang}
            t={{ form: t.form }}
            showCompany={b.showCompany}
            showPhone={b.showPhone}
            showDates={b.showDates}
            submitLabel={b.submitLabel}
            successMessage={b.successMessage}
          />
        </div>
      </div>
    </section>
  )
}
