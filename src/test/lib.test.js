import { formatPrice, formatTime } from '../lib/format.js'
import { orderMessage, telUrl, whatsappUrl } from '../lib/whatsapp.js'
import { getOpeningStatus, weekOrder } from '../lib/hours.js'
import { filterMenu, ALL } from '../hooks/useMenuFilter.js'
import { MENU_ITEMS } from '../data/menu.js'

describe('formatPrice', () => {
  it('formats INR without decimals', () => {
    expect(formatPrice(549)).toBe('₹549')
    expect(formatPrice(1299)).toBe('₹1,299')
  })
  it('supports other currencies', () => {
    expect(formatPrice(12, { locale: 'en-US', currency: 'USD' })).toBe('$12')
  })
})

describe('formatTime', () => {
  it('converts 24h to 12h labels', () => {
    expect(formatTime('07:30')).toBe('7:30 am')
    expect(formatTime('12:00')).toBe('12 pm')
    expect(formatTime('00:30')).toBe('12:30 am')
    expect(formatTime('21:00')).toBe('9 pm')
  })
})

describe('whatsapp helpers', () => {
  it('strips formatting from the number and encodes the message', () => {
    expect(whatsappUrl('+91 98765-43210', 'Hi & hello')).toBe('https://wa.me/919876543210?text=Hi%20%26%20hello')
  })
  it('builds an order message with price', () => {
    expect(orderMessage('Maison Noir', { name: 'Truffle Smash Burger' }, '₹549')).toBe("Hi Maison Noir! I'd like to order: Truffle Smash Burger (₹549)")
  })
  it('builds tel links', () => {
    expect(telUrl('+91 98765 43210')).toBe('tel:+919876543210')
  })
})

describe('getOpeningStatus (Asia/Kolkata)', () => {
  const late = [0, 1, 2, 3, 4, 5, 6].map((day) => ({ day, open: '12:00', close: '00:30' }))
  const ist = (iso) => new Date(`${iso}+05:30`)

  it('is open during normal hours', () => {
    const s = getOpeningStatus(late, 'Asia/Kolkata', ist('2026-11-11T13:00:00')) // Wednesday
    expect(s.isOpen).toBe(true)
    expect(s.today).toBe(3)
    expect(s.label).toBe('Open now · closes 12:30 am')
  })
  it('stays open after midnight on the previous day’s hours', () => {
    expect(getOpeningStatus(late, 'Asia/Kolkata', ist('2026-11-12T00:15:00')).isOpen).toBe(true)
  })
  it('is closed between closing and opening', () => {
    const s = getOpeningStatus(late, 'Asia/Kolkata', ist('2026-11-12T09:00:00'))
    expect(s.isOpen).toBe(false)
    expect(s.label).toBe('Closed · opens 12 pm')
  })
  it('skips closed days when finding the next opening', () => {
    const hours = [{ day: 1, closed: true }, ...[0, 2, 3, 4, 5, 6].map((day) => ({ day, open: '07:30', close: '21:00' }))]
    const s = getOpeningStatus(hours, 'Asia/Kolkata', ist('2026-11-16T10:00:00')) // Monday
    expect(s.isOpen).toBe(false)
    expect(s.label).toBe('Closed · opens tomorrow 7:30 am')
  })
  it('orders the week Monday → Sunday', () => {
    expect(weekOrder(late).map((h) => h.day)).toEqual([1, 2, 3, 4, 5, 6, 0])
  })
})

describe('filterMenu', () => {
  it('returns everything for ALL', () => {
    expect(filterMenu(MENU_ITEMS, ALL)).toHaveLength(MENU_ITEMS.length)
  })
  it('filters by category', () => {
    const pizza = filterMenu(MENU_ITEMS, 'pizza')
    expect(pizza.length).toBeGreaterThanOrEqual(4)
    expect(pizza.every((i) => i.category === 'pizza')).toBe(true)
  })
})
