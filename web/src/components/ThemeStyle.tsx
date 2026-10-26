import type { Any } from '@/lib/strapi'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const FONT = /^[A-Za-z0-9 ]+$/

const ok = (c: unknown) => (typeof c === 'string' && HEX.test(c.trim()) ? c.trim() : null)

/** Google Fonts stylesheet URL for the chosen heading + body fonts. */
export function fontHref(d: Any) {
  const fams = Array.from(new Set([d.fonts.heading, d.fonts.body].filter((f: string) => FONT.test(f ?? ''))))
  const q = fams.map((f) => `family=${String(f).replace(/ /g, '+')}:wght@400;500;600;700`).join('&')
  return `https://fonts.googleapis.com/css2?${q}&display=swap`
}

/** Turns the “Design & Colours” global into CSS variables + the editor's custom CSS. */
export default function ThemeStyle({ d }: { d: Any }) {
  const c = d.colors ?? {}
  const map: [string, unknown][] = [
    ['--or', c.accent],
    ['--gr', c.primary],
    ['--glow', c.glow],
    ['--ink', c.background],
    ['--tx', c.text],
    ['--mu', c.muted],
    ['--lcard', c.card],
    ['--lln', c.line],
    ['--deep', c.dark],
    ['--foot', c.footer],
  ]
  const vars = map
    .map(([k, val]) => (ok(val) ? `${k}:${ok(val)};` : ''))
    .join('')
  const font = (f: unknown, fallback: string) => (typeof f === 'string' && FONT.test(f) ? `'${f}', ${fallback}` : null)
  const hf = font(d.fonts?.heading, 'system-ui, sans-serif')
  const bf = font(d.fonts?.body, 'system-ui, sans-serif')
  const size = Number(d.fonts?.baseSize)

  const css =
    `:root:root{${vars}${hf ? `--d:${hf};` : ''}${bf ? `--b:${bf};` : ''}}` +
    (size >= 12 && size <= 24 ? `body{font-size:${size}px}` : '') +
    (d.customCss ? `\n/* Additional CSS */\n${String(d.customCss).replace(/<\/style/gi, '')}` : '')

  return <style id="theme" dangerouslySetInnerHTML={{ __html: css }} />
}
