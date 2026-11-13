const cache = new Map()

/** Format a price in the cafe's currency, e.g. 549 → "₹549". */
export function formatPrice(value, { locale = 'en-IN', currency = 'INR' } = {}) {
  const key = `${locale}|${currency}`
  if (!cache.has(key)) {
    cache.set(key, new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }))
  }
  return cache.get(key).format(value)
}

/** "07:30" → "7:30 am" */
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 && h < 24 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}`
}

export const pad2 = (n) => String(n).padStart(2, '0')
