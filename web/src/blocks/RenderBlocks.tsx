import type { ComponentType } from 'react'
import type { Any } from '@/lib/strapi'
import type { Lang } from '@/lib/i18n'
import type { BlockProps } from './Section'
import * as O from './components/Original'
import * as G from './components/General'
import * as K from './components/Catalog'
import Generic from './components/Generic'

/**
 * Strapi component name → React component.
 * Sections you create in Strapi without adding a line here still render,
 * using the Generic layout.
 */
const components: Record<string, ComponentType<BlockProps>> = {
  'blocks.page-header': K.PageHeader,
  'blocks.categories': K.Categories,
  'blocks.partners': K.Partners,
  'blocks.enquiry-form': K.EnquiryBlock,
  'blocks.columns': G.Columns,
  'blocks.split-list': G.SplitList,
  'blocks.hero': O.Hero,
  'blocks.statement': O.Statement,
  'blocks.solutions': O.Solutions,
  'blocks.spectrum': O.Spectrum,
  'blocks.marquee': O.Marquee,
  'blocks.products': O.Products,
  'blocks.banner': O.Banner,
  'blocks.steps': O.Steps,
  'blocks.news': O.News,
  'blocks.contact': O.Contact,
  'blocks.rich-text': G.Content,
  'blocks.image-text': G.ImageText,
  'blocks.cards': G.Cards,
  'blocks.stats': G.Stats,
  'blocks.faq': G.Faq,
  'blocks.video': G.Video,
  'blocks.gallery': G.Gallery,
  'blocks.custom-html': G.Html,
}

export default function RenderBlocks({ blocks, lang }: { blocks?: Any[] | null; lang: Lang }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((b, i) => {
        if (b?.settings?.hidden) return null
        const C = components[b?.__component] ?? Generic
        return <C b={b} lang={lang} key={`${b.__component}-${b.id ?? i}`} />
      })}
    </>
  )
}
