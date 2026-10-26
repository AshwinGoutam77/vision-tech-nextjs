import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/** Called by Strapi's "Open preview" button. Shows drafts for the given page or product. */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  if (!process.env.PREVIEW_SECRET || sp.get('secret') !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview token', { status: 401 })
  }
  const dm = await draftMode()
  if (sp.get('status') === 'published') dm.disable()
  else dm.enable()

  const path = sp.get('path') || '/'
  redirect(path.startsWith('/') && !path.startsWith('//') ? path : '/')
}
