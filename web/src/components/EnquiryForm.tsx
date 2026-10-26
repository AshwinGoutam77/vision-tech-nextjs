'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Dict } from '@/lib/i18n'
import { readQuote, writeQuote, type QuoteItem } from '@/lib/quote'

type Props = {
  type: string
  lang: string
  t: Pick<Dict, 'form'>
  showCompany?: boolean
  showPhone?: boolean
  showDates?: boolean
  product?: string
  submitLabel?: string
  successMessage?: string
  /** quote page: send the quote list along and clear it afterwards */
  withQuoteItems?: boolean
  onSent?: () => void
}

/** Sends to /api/enquiry → saved in Strapi under “Enquiry”. */
export default function EnquiryForm(props: Props) {
  const { t } = props
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const messageRef = useRef<HTMLTextAreaElement>(null)

  // "/rental-form?product=Sentry" (from a product's Rent button) pre-fills the message
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('product')
    if (p && messageRef.current && !messageRef.current.value) messageRef.current.value = `${p}\n`
  }, [])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    if (!data.name?.trim() || !data.email?.trim()) {
      setState('error')
      setMsg(t.form.required)
      return
    }
    setState('sending')
    let items: QuoteItem[] | undefined
    if (props.withQuoteItems) items = readQuote()
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          type: props.type,
          product: props.product,
          items,
          language: props.lang,
          pageUrl: window.location.href,
        }),
      })
      if (!res.ok) throw new Error()
      setState('sent')
      form.reset()
      if (props.withQuoteItems) writeQuote([])
      props.onSent?.()
    } catch {
      setState('error')
      setMsg(t.form.error)
    }
  }

  if (state === 'sent') {
    return (
      <div className="ef-done" role="status">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12l5 5 9-10" />
        </svg>
        <p>{props.successMessage || t.form.thanks}</p>
      </div>
    )
  }

  return (
    <form className="ef-form" onSubmit={submit} noValidate>
      {/* honeypot for spam bots – humans never see it */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="ef-hp" aria-hidden="true" />
      <div className="ef-row">
        <label>
          <span>{t.form.name} *</span>
          <input name="name" autoComplete="name" required />
        </label>
        {props.showCompany !== false ? (
          <label>
            <span>{t.form.company}</span>
            <input name="company" autoComplete="organization" />
          </label>
        ) : null}
      </div>
      <div className="ef-row">
        <label>
          <span>{t.form.email} *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        {props.showPhone !== false ? (
          <label>
            <span>{t.form.phone}</span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
        ) : null}
      </div>
      {props.showDates ? (
        <div className="ef-row">
          <label>
            <span>{t.form.startDate}</span>
            <input name="startDate" type="date" />
          </label>
          <label>
            <span>{t.form.endDate}</span>
            <input name="endDate" type="date" />
          </label>
        </div>
      ) : null}
      <label>
        <span>{t.form.message}</span>
        <textarea ref={messageRef} name="message" rows={5} defaultValue={props.product ? `${props.product}\n` : undefined} />
      </label>
      {state === 'error' ? (
        <p className="ef-err" role="alert">
          {msg}
        </p>
      ) : null}
      <button className="btn" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? t.form.sending : props.submitLabel || t.form.submit}
      </button>
    </form>
  )
}
