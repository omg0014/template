/** Build a wa.me deep link. Number may include +, spaces or dashes. */
export function whatsappUrl(number, message = '') {
  const digits = String(number).replace(/[^\d]/g, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${text}`
}

/** Pre-filled order message for a menu item. */
export function orderMessage(cafeName, item, priceLabel) {
  return `Hi ${cafeName}! I'd like to order: ${item.name}${priceLabel ? ` (${priceLabel})` : ''}`
}

export const telUrl = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`

export const mapsDirectionsUrl = (query) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`

export const mapsEmbedUrl = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
