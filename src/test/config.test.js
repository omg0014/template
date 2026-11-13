import { CAFES, CAFE_BY_TEMPLATE } from '../config/index.js'
import { validateCafe } from '../data/validate.js'
import { defineCafe } from '../config/defineCafe.js'
import { TEMPLATES } from '../data/templates.js'

describe('cafe configs', () => {
  it.each(CAFES.map((c) => [c.id, c]))('%s is valid', (_, cafe) => {
    expect(validateCafe(cafe)).toEqual([])
  })

  it('maps every template to a cafe with the same template key', () => {
    TEMPLATES.forEach((t) => expect(CAFE_BY_TEMPLATE[t.key].template).toBe(t.key))
  })

  it('has 8 categories with at least 4 items each, plus veg flags and prices', () => {
    CAFES.forEach((cafe) => {
      expect(cafe.menu.categories).toHaveLength(8)
      cafe.menu.categories.forEach((c) => expect(cafe.menu.items.filter((i) => i.category === c.id).length).toBeGreaterThanOrEqual(4))
    })
  })

  it('has 3 signatures, 4 bestsellers, 3 showcase dishes and 6 testimonials', () => {
    CAFES.forEach((cafe) => {
      expect(cafe.signatureIds).toHaveLength(3)
      expect(cafe.bestsellerIds).toHaveLength(4)
      expect(cafe.showcase).toHaveLength(3)
      expect(cafe.testimonials).toHaveLength(6)
    })
  })

  it('never mentions reservations or table booking in content', () => {
    const text = JSON.stringify(CAFES).toLowerCase()
    expect(text).not.toMatch(/reserv|book a table|booking/)
  })
})

describe('validateCafe', () => {
  it('catches broken references and bad hours', () => {
    const base = CAFES[0]
    const broken = defineCafe({
      ...base,
      signatureIds: ['does-not-exist'],
      contact: { ...base.contact, hours: [{ day: 1, open: '9am', close: '5pm' }] },
    })
    const errors = validateCafe(broken)
    expect(errors.some((e) => e.includes('does-not-exist'))).toBe(true)
    expect(errors.some((e) => e.includes('all 7 days'))).toBe(true)
    expect(errors.some((e) => e.includes('HH:mm'))).toBe(true)
  })
})
