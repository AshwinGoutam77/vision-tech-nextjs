import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGallery from '@/components/ProductGallery'
import ProductCard from '@/components/ProductCard'
import QuoteButton from '@/components/QuoteButton'
import EnquiryForm from '@/components/EnquiryForm'
import CmsDown from '@/components/CmsDown'
import RenderBlocks from '@/blocks/RenderBlocks'
import { Rich } from '@/blocks/components/General'
import { ContactDetails } from '@/blocks/components/Catalog'
import { v } from '@/blocks/Section'
import {
  categoryChain,
  categoryHref,
  formatPrice,
  getDesign,
  getProduct,
  getProducts,
  getSettings,
  mediaUrl,
  type Any,
} from '@/lib/strapi'
import { asLang, dict, lh } from '@/lib/i18n'

type Props = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params
  const lang = asLang(p.lang)
  const [{ data: product }, s] = await Promise.all([getProduct(p.slug, lang), getSettings(lang)])
  if (!product) return { title: s.siteTitle }
  const image = mediaUrl(product.seo?.shareImage) || mediaUrl(product.image)
  return {
    title: product.seo?.metaTitle || `${product.name} | ${s.siteTitle}`,
    description: product.seo?.metaDescription || product.shortDescription || undefined,
    openGraph: image ? { images: [image] } : undefined,
    alternates: { languages: { en: `/en/product/${product.slug}`, fr: `/fr/product/${product.slug}` } },
  }
}

export default async function ProductPage({ params }: Props) {
  const p = await params
  const lang = asLang(p.lang)
  const t = dict(lang)
  const { data: product, error } = await getProduct(p.slug, lang)
  if (error) return <CmsDown lang={lang} />
  if (!product) return notFound()

  const design = await getDesign()
  const primaryCat = product.categories?.[0]
  const chain = primaryCat ? await categoryChain(lang, primaryCat) : []

  const crumbs = [
    { label: t.home, href: '/' },
    { label: t.products, href: '/products' },
    ...chain.map((c, i) => ({ label: c.name, href: categoryHref(chain.slice(0, i + 1)) })),
    { label: product.name },
  ]

  const images = [product.image, ...(product.gallery ?? [])]
    .filter(Boolean)
    .map((m: Any) => ({ src: mediaUrl(m), alt: m.alternativeText || '' }))
    .filter((m) => m.src)
  const mainImg = mediaUrl(product.image)

  const onSale = product.showPrice && product.salePrice != null && product.price != null && Number(product.salePrice) < Number(product.price)
  const brochure = mediaUrl(product.brochure)
  const specs: Any[] = (product.specs ?? []).filter((s: Any) => s.label || s.value)
  const hasOverview = (Array.isArray(product.description) && product.description.length) || specs.length

  // related: chosen in the CMS, otherwise others from the same category
  let related: Any[] = (product.related ?? []).filter((r: Any) => r.slug !== product.slug)
  if (!related.length && primaryCat?.slug) {
    related = (await getProducts(lang, { category: primaryCat.slug, pageSize: 4 })).items.filter((r) => r.slug !== product.slug).slice(0, 3)
  }

  return (
    <>
      {/* ---------- hero ---------- */}
      <header className="pd">
        <div className="w pd-grid">
          <div className="pd-info">
            <Breadcrumbs items={crumbs} lang={lang} />
            {product.brand ? <span className="tag">{product.brand}</span> : null}
            <h1>{product.name}</h1>
            {product.tagline ? <p className="pd-tagline">{product.tagline}</p> : null}
            {product.shortDescription ? <p className="pd-short">{product.shortDescription}</p> : null}

            <div className="pd-meta">
              <span className={`av av-${product.availability || 'onRequest'}`}>
                <i />
                {t.availability[product.availability || 'onRequest']}
              </span>
              {product.showPrice && product.price != null ? (
                <span className="pd-price">
                  {onSale ? (
                    <>
                      <del>{formatPrice(product.price, design.currency, lang)}</del>
                      <b>{formatPrice(product.salePrice, design.currency, lang)}</b>
                    </>
                  ) : (
                    <b>{formatPrice(product.price, design.currency, lang)}</b>
                  )}
                </span>
              ) : (
                <span className="pd-price muted">{t.priceOnRequest}</span>
              )}
              {product.sku ? (
                <span className="pd-sku">
                  {t.sku}: {product.sku}
                </span>
              ) : null}
            </div>

            <div className="cta">
              {product.canQuote !== false ? (
                <QuoteButton slug={product.slug} name={product.name} image={mainImg} label={t.addToQuote} addedLabel={t.inQuote} />
              ) : null}
              {product.canRent ? (
                <a className="btn o mag" href={lh(lang, `/rental-form?product=${encodeURIComponent(product.name)}`)}>
                  {t.rent}
                </a>
              ) : null}
              {product.showEnquiryForm !== false ? (
                <a className="btn o mag" href="#enquiry">
                  {t.getInTouch}
                </a>
              ) : null}
            </div>
            {brochure ? (
              <a className="pd-brochure" href={brochure} target="_blank" rel="noopener noreferrer">
                ↓ {t.brochure}
              </a>
            ) : null}
          </div>
          <ProductGallery images={images} name={product.name} />
        </div>
      </header>

      {/* ---------- overview + specifications ---------- */}
      {hasOverview ? (
        <section className="gx">
          <div className={`w pd-ov${specs.length && product.description?.length ? '' : ' is-single'}`}>
            {product.description?.length ? (
              <div className="rv">
                <span className="tag">{t.overview}</span>
                <Rich data={product.description} />
              </div>
            ) : null}
            {specs.length ? (
              <div className="specs rv" style={v({ '--i': 1 })}>
                <h3>{t.specifications}</h3>
                <dl>
                  {specs.map((s: Any, i: number) => (
                    <div key={i}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---------- flexible sections from the CMS ---------- */}
      <RenderBlocks blocks={product.sections} lang={lang} />

      {/* ---------- enquiry ---------- */}
      {product.showEnquiryForm !== false ? (
        <section className="gx" id="enquiry">
          <div className="w ef">
            <div className="ef-intro rv">
              <span className="tag">{t.getInTouch}</span>
              <h2>{t.enquiryHeading(product.name)}</h2>
              <p className="rt">{t.enquiryText}</p>
              <ContactDetails lang={lang} />
            </div>
            <div className="ef-card rv" style={v({ '--i': 1 })}>
              <EnquiryForm type="product" lang={lang} t={{ form: t.form }} product={product.name} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------- related ---------- */}
      {related.length ? (
        <section className="lt">
          <div className="w">
            <div className="hd rv">
              <h2>{t.related}</h2>
            </div>
            <div className="pr">
              {related.map((r: Any, i: number) => (
                <ProductCard p={r} lang={lang} i={i} currency={design.currency} key={r.documentId ?? i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

    </>
  )
}
