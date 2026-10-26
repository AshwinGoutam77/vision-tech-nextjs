import type { Viewport } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Interactions from '@/components/Interactions'
import ThemeStyle, { fontHref } from '@/components/ThemeStyle'
import { getCategoryTree, getDesign, getSettings, isPreview } from '@/lib/strapi'
import { dict, isLang, type Lang } from '@/lib/i18n'
import './globals.css'
import './blocks.css'
import './catalog.css'

export const dynamic = 'force-dynamic'

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const raw = (await params).lang
  if (!isLang(raw)) return notFound()
  const lang: Lang = raw

  const [settings, design, preview, tree] = await Promise.all([getSettings(lang), getDesign(), isPreview(), getCategoryTree(lang)])
  const fx = design.effects

  return (
    <html lang={lang === 'fr' ? 'fr-CA' : 'en-CA'} data-theme="light" className={fx.animations ? undefined : 'no-motion'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href={fontHref(design)} rel="stylesheet" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="fr" href="/fr" />
        <ThemeStyle d={design} />
      </head>
      <body>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: '.rv{opacity:1!important;transform:none!important;filter:none!important}' }} />
        </noscript>
        {fx.progressBar ? <div id="bar"></div> : null}
        {fx.cursorGlow ? <div id="cg"></div> : null}
        {fx.preloader ? (
          <div id="pre">
            <div>
              <img src={settings.logo} alt={settings.siteTitle} />
            </div>
          </div>
        ) : null}
        <Header s={settings} lang={lang} tree={tree} />
        <main>{children}</main>
        <Footer s={settings} lang={lang} />
        <Interactions />
        {preview ? (
          <a className="preview-bar" href="/api/exit-preview">
            {dict(lang).previewOn}
          </a>
        ) : null}
      </body>
    </html>
  )
}
