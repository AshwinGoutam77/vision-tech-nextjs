import { NextResponse, type NextRequest } from 'next/server'

const LOCALES = ['en', 'fr']
const DEFAULT = 'en'

/**
 * Every page lives under a language: /en/..., /fr/...
 * A link without one (e.g. "/about" typed in the CMS) is sent to the visitor's
 * current language (remembered in a cookie), else their browser language.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const first = pathname.split('/')[1]

  if (LOCALES.includes(first)) {
    // pass the language on to server components (e.g. the 404 page)
    const headers = new Headers(req.headers)
    headers.set('x-lang', first)
    const res = NextResponse.next({ request: { headers } })
    if (req.cookies.get('lang')?.value !== first) res.cookies.set('lang', first, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return res
  }

  const cookie = req.cookies.get('lang')?.value
  const browser = req.headers.get('accept-language')?.toLowerCase().startsWith('fr') ? 'fr' : DEFAULT
  const lang = cookie && LOCALES.includes(cookie) ? cookie : browser
  const url = req.nextUrl.clone()
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // skip API routes, Next internals and files with an extension (images, favicon…)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
