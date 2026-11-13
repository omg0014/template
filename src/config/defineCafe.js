/**
 * defineCafe — normalises a cafe config and fills sensible defaults.
 * Every template reads cafe data exclusively through this shape (see PRD §15).
 */
const DEFAULTS = {
  locale: { locale: 'en-IN', currency: 'INR', timezone: 'Asia/Kolkata' },
  navigation: [
    { label: 'Menu', href: '#menu' },
    { label: 'Signature', href: '#signature' },
    { label: 'Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit', href: '#visit' },
  ],
  smoothScroll: true,
}

export function defineCafe(config) {
  const cafe = {
    ...DEFAULTS,
    ...config,
    locale: { ...DEFAULTS.locale, ...config.locale },
    navigation: config.navigation ?? DEFAULTS.navigation,
  }
  // Derived lookups for fast access in components.
  const itemsById = Object.fromEntries(cafe.menu.items.map((i) => [i.id, i]))
  cafe.lookup = {
    item: (id) => itemsById[id],
    items: (ids = []) => ids.map((id) => itemsById[id]).filter(Boolean),
    category: (id) => cafe.menu.categories.find((c) => c.id === id),
  }
  return Object.freeze(cafe)
}
