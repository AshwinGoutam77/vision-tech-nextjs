import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import QuoteList from '@/components/QuoteList'
import { getSettings } from '@/lib/strapi'
import { asLang, dict, lh } from '@/lib/i18n'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLang((await params).lang)
  const s = await getSettings(lang)
  return { title: `${dict(lang).quoteTitle} | ${s.siteTitle}`, robots: { index: false } }
}

export default async function QuotePage({ params }: Props) {
  const lang = asLang((await params).lang)
  const t = dict(lang)
  return (
    <>
      <PageHero lang={lang} title={t.quoteTitle} subtitle={t.quoteSubtitle} crumbs={[{ label: t.home, href: '/' }, { label: t.quote }]} />
      <section className="gx gx-tight">
        <div className="w">
          <QuoteList
            lang={lang}
            productsHref={lh(lang, '/products')}
            t={{
              form: t.form,
              quoteEmpty: t.quoteEmpty,
              quantity: t.quantity,
              remove: t.remove,
              sendQuote: t.sendQuote,
              continueBrowsing: t.continueBrowsing,
            }}
          />
        </div>
      </section>
    </>
  )
}
