'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export default function SortSelect({ value, label, options }: { value: string; label: string; options: { value: string; label: string }[] }) {
  const pathname = usePathname()
  const params = useSearchParams()
  return (
    <label className="sort">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => {
          const q = new URLSearchParams(params.toString())
          q.delete('page')
          if (e.target.value === 'default') q.delete('sort')
          else q.set('sort', e.target.value)
          window.location.assign(`${pathname}${q.size ? `?${q}` : ''}`)
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
