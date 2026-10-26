'use client'

import { useEffect } from 'react'

/**
 * All the motion from the original page script, unchanged in behaviour:
 * scroll reveal, word scrub, CBRNE panels, card tilt, magnetic buttons,
 * cursor glow, progress bar, hide-on-scroll nav, parallax, bento tilt and
 * the "how it works" progress line.
 */
export default function Interactions() {
  useEffect(() => {
    const ac = new AbortController()
    const opt = { signal: ac.signal }
    const rm =
      matchMedia('(prefers-reduced-motion:reduce)').matches || document.documentElement.classList.contains('no-motion')
    const $ = (s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<HTMLElement>(s))
    let raf = 0

    /* reveal */
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('in')
            io.unobserve(x.target)
          }
        }),
      { threshold: 0.15 },
    )
    $('.rv').forEach((el) => io.observe(el))

    /* scrub words (words are already split into spans on the server) */
    const scrubs = $('.scrub').map((el) => ({ el, ws: $('span', el) }))

    /* panels (each .pn group works on its own) */
    $('.pn').forEach((group) => {
      const pn = $(':scope>div', group)
      pn.forEach((p) =>
        ['mouseenter', 'focus', 'click'].forEach((ev) =>
          p.addEventListener(
            ev,
            () => {
              pn.forEach((q) => q.classList.remove('on'))
              p.classList.add('on')
            },
            opt,
          ),
        ),
      )
    })

    /* tilt */
    $('.tilt').forEach((c) => {
      c.addEventListener(
        'mousemove',
        (e) => {
          const r = c.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width
          const y = (e.clientY - r.top) / r.height
          c.style.setProperty('--mx', x * 100 + '%')
          c.style.setProperty('--my', y * 100 + '%')
          if (!rm) c.style.transform = `rotateY(${(x - 0.5) * 12}deg) rotateX(${(0.5 - y) * 12}deg)`
        },
        opt,
      )
      c.addEventListener('mouseleave', () => (c.style.transform = ''), opt)
    })

    /* magnetic buttons */
    if (!rm)
      $('.mag').forEach((b) => {
        b.addEventListener(
          'mousemove',
          (e) => {
            const r = b.getBoundingClientRect()
            b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`
          },
          opt,
        )
        b.addEventListener('mouseleave', () => (b.style.transform = ''), opt)
      })

    /* cursor glow */
    const cg = document.getElementById('cg')
    let tx = innerWidth / 2,
      ty = 300,
      cx = tx,
      cy = ty
    addEventListener(
      'mousemove',
      (e) => {
        tx = e.clientX
        ty = e.clientY
      },
      opt,
    )
    const loop = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      if (cg) cg.style.transform = `translate(${cx}px,${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    /* scroll-driven effects */
    const bar = document.getElementById('bar')
    const nav = document.getElementById('nav')
    const bts = $('.bento')
    const sts = $('.sp')
    const bg = $('[data-p]')
    let ly = 0

    const sc = () => {
      if (!rm)
        bts.forEach((bt) => {
          const q = Math.min(1, scrollY / 420)
          bt.style.setProperty('--rx', 10 * (1 - q) + 'deg')
          bt.style.setProperty('--sc', String(0.94 + 0.06 * q))
        })
      const y = scrollY
      const h = document.documentElement.scrollHeight - innerHeight
      if (bar) bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`
      nav?.classList.toggle('hide', y > ly && y > 300)
      ly = y

      scrubs.forEach(({ el, ws }) => {
        const r = el.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)))
        const n = Math.round(p * ws.length)
        ws.forEach((w, i) => w.classList.toggle('on', i < n))
      })

      if (!rm)
        bg.forEach((b) => {
          const q = (b.parentNode as HTMLElement).getBoundingClientRect()
          b.style.transform = `translateY(${(q.top + q.height / 2 - innerHeight / 2) * -0.18}px)`
        })

      sts.forEach((st) => {
        const s = st.getBoundingClientRect()
        st.style.setProperty('--pg', String(Math.min(1, Math.max(0, (innerHeight * 0.75 - s.top) / (s.height + 120)))))
      })
    }
    addEventListener('scroll', sc, { passive: true, signal: ac.signal })
    sc()

    return () => {
      ac.abort()
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
