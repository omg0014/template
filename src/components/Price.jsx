import { useCafe } from '../hooks/useCafe.js'
import { formatPrice } from '../lib/format.js'

export function Price({ value, className }) {
  const { locale } = useCafe()
  return <span className={className}>{formatPrice(value, locale)}</span>
}

export const usePriceFormatter = () => {
  const { locale } = useCafe()
  return (v) => formatPrice(v, locale)
}
