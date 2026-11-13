import { useMemo, useState, useTransition } from 'react'

export const ALL = 'all'

/** Pure filter — exported for tests. */
export function filterMenu(items, category) {
  return category === ALL ? items : items.filter((i) => i.category === category)
}

/**
 * Menu filter state. Uses a React transition so rapid taps stay responsive and
 * always settle on the last-selected category.
 */
export function useMenuFilter(menu, initial = ALL) {
  const [active, setActive] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const items = useMemo(() => filterMenu(menu.items, active), [menu.items, active])
  const counts = useMemo(() => {
    const c = { [ALL]: menu.items.length }
    menu.items.forEach((i) => (c[i.category] = (c[i.category] ?? 0) + 1))
    return c
  }, [menu.items])
  const tabs = useMemo(() => [{ id: ALL, label: 'All' }, ...menu.categories], [menu.categories])
  const select = (id) => startTransition(() => setActive(id))
  return { active, select, items, counts, tabs, isPending }
}
