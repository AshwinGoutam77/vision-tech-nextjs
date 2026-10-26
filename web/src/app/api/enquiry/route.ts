import { NextResponse, type NextRequest } from 'next/server'

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '')
const TYPES = ['contact', 'quote', 'rental', 'support', 'product']

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const date = (v: unknown) => (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null)

/** Receives website forms and saves them in Strapi → “Enquiry”. */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // honeypot: bots fill every field, people never see this one
  if (str(body.website)) return NextResponse.json({ ok: true })

  const name = str(body.name, 120)
  const email = str(body.email, 200)
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'name and email required' }, { status: 422 })
  }

  const items = Array.isArray(body.items)
    ? body.items.slice(0, 50).map((i: Record<string, unknown>) => ({ slug: str(i.slug, 120), name: str(i.name, 200), qty: Math.max(1, Math.min(999, Number(i.qty) || 1)) }))
    : undefined

  const data = {
    type: TYPES.includes(str(body.type)) ? str(body.type) : 'contact',
    name,
    email,
    company: str(body.company, 200),
    phone: str(body.phone, 60),
    message: str(body.message, 5000),
    startDate: date(body.startDate),
    endDate: date(body.endDate),
    product: str(body.product, 200),
    items,
    language: str(body.language, 10),
    pageUrl: str(body.pageUrl, 500),
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (process.env.STRAPI_API_TOKEN) headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`

  try {
    const res = await fetch(`${STRAPI_URL}/api/enquiries`, { method: 'POST', headers, body: JSON.stringify({ data }) })
    if (!res.ok) {
      console.error('[enquiry] Strapi said', res.status, await res.text())
      return NextResponse.json({ ok: false }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[enquiry] Strapi unreachable', e)
    return NextResponse.json({ ok: false }, { status: 502 })
  }
}
