import { hasImage } from '../lib/images.js'

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/
const TEMPLATES = ['luxury', 'minimal', 'colorful']
const MODELS = ['burger', 'latte', 'donut']

/** Validate a cafe config. Returns an array of human-readable error strings (empty = valid). */
export function validateCafe(cafe) {
  const errors = []
  const err = (m) => errors.push(`[${cafe?.id ?? 'unknown'}] ${m}`)

  if (!cafe?.id) err('missing id')
  if (!TEMPLATES.includes(cafe.template)) err(`template must be one of ${TEMPLATES.join(', ')}`)
  if (!cafe.identity?.name) err('identity.name is required')
  if (!cafe.hero?.headline?.length) err('hero.headline must have at least one line')
  if (!hasImage(cafe.hero?.image)) err(`hero.image "${cafe.hero?.image}" not found`)

  const cats = new Set(cafe.menu.categories.map((c) => c.id))
  const ids = new Set()
  for (const item of cafe.menu.items) {
    if (ids.has(item.id)) err(`duplicate menu item id "${item.id}"`)
    ids.add(item.id)
    if (!cats.has(item.category)) err(`item "${item.id}" has unknown category "${item.category}"`)
    if (typeof item.price !== 'number' || item.price <= 0) err(`item "${item.id}" has invalid price`)
    if (typeof item.veg !== 'boolean') err(`item "${item.id}" must set veg: true|false`)
    if (!hasImage(item.image)) err(`item "${item.id}" image "${item.image}" not found`)
    if (!item.description) err(`item "${item.id}" is missing a description`)
  }
  for (const c of cats) {
    const n = cafe.menu.items.filter((i) => i.category === c).length
    if (n < 4) err(`category "${c}" has ${n} items (min 4)`)
  }

  const refCheck = (list, label) => (list ?? []).forEach((id) => !ids.has(id) && err(`${label} references unknown item "${id}"`))
  refCheck(cafe.signatureIds, 'signatureIds')
  refCheck(cafe.bestsellerIds, 'bestsellerIds')
  ;(cafe.showcase ?? []).forEach((s) => {
    if (!MODELS.includes(s.model) && !s.modelUrl) err(`showcase model "${s.model}" unknown (use ${MODELS.join('/')}, or provide modelUrl)`)
    if (!ids.has(s.dishId)) err(`showcase references unknown item "${s.dishId}"`)
  })

  ;(cafe.gallery ?? []).forEach((g, i) => {
    if (!hasImage(g.image)) err(`gallery[${i}] image "${g.image}" not found`)
    if (!g.alt) err(`gallery[${i}] needs alt text`)
  })
  ;(cafe.testimonials ?? []).forEach((t, i) => {
    if (!(t.rating >= 1 && t.rating <= 5)) err(`testimonials[${i}] rating must be 1–5`)
    if (!t.name || !t.text) err(`testimonials[${i}] needs name and text`)
  })

  const hours = cafe.contact?.hours ?? []
  if (hours.length !== 7) err('contact.hours must list all 7 days (0=Sun … 6=Sat)')
  hours.forEach((h) => {
    if (!(h.day >= 0 && h.day <= 6)) err(`hours: invalid day ${h.day}`)
    if (!h.closed && (!TIME.test(h.open) || !TIME.test(h.close))) err(`hours: day ${h.day} needs HH:mm open/close`)
  })
  if (!cafe.contact?.whatsapp?.number) err('contact.whatsapp.number is required')
  if (!cafe.contact?.address?.line1) err('contact.address.line1 is required')

  return errors
}
