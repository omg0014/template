import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { ALL, useMenuFilter } from '../../../hooks/useMenuFilter.js'
import { Img } from '../../../components/Img.jsx'
import { VegMark } from '../../../components/VegMark.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { useSmoothScroll } from '../../../animation/SmoothScroll.jsx'
import { Heading, Kicker, Tag } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

const EASE = [0.25, 0.1, 0.25, 1]

/** Food Categories (sticky index / chips) + Interactive Menu (editorial card grid). */
export function Menu() {
  const { menu } = useCafe()
  const { active, select, items, counts, tabs } = useMenuFilter(menu)
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const { scrollTo } = useSmoothScroll()
  const tabRefs = useRef([])

  const choose = (id) => {
    select(id)
    // Keep the top of the list in view on small screens after switching.
    if (window.innerWidth < 1024) scrollTo('#menu-list')
  }
  const onKey = (e, i) => {
    const dir = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + tabs.length) % tabs.length
    tabRefs.current[next]?.focus()
    select(tabs[next].id)
  }

  const groups = (active === ALL ? menu.categories : menu.categories.filter((c) => c.id === active))
    .map((c) => {
      const all = items.filter((i) => i.category === c.id)
      return { ...c, total: all.length, items: active === ALL ? all.slice(0, 3) : all }
    })
    .filter((g) => g.items.length)

  return (
    <section id="menu" aria-labelledby="menu-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="max-w-2xl">
          <Kicker>The menu</Kicker>
          <Heading id="menu-title" className="mt-5">
            Something for <em className="text-accent">every hour.</em>
          </Heading>
          <p data-min-reveal className="mt-5 leading-relaxed text-muted">
            Coffee from 7:30, pasta by noon, cake whenever you like. Tap a dish for ingredients and quick WhatsApp ordering.
          </p>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-12 lg:gap-10">
          {/* Food categories — sticky chip bar on mobile, sticky index on desktop */}
          <div className="sticky top-16 z-20 -mx-5 bg-bg/95 px-5 py-3 backdrop-blur md:top-[72px] lg:top-28 lg:col-span-3 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <div role="tablist" aria-label="Menu categories" aria-orientation="horizontal" className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line">
              {tabs.map((tab, i) => {
                const selected = active === tab.id
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    role="tab"
                    id={`min-tab-${tab.id}`}
                    aria-selected={selected}
                    aria-controls="min-menu-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(tab.id)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={cn(
                      'relative flex shrink-0 items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-sm transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-4 lg:text-[15px]',
                      selected ? 'border-ink bg-ink text-bg lg:bg-transparent lg:text-ink' : 'border-line text-ink/70 hover:text-ink',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {selected && <motion.span layoutId="min-tab-dot" aria-hidden="true" className="hidden size-1.5 rounded-full bg-accent lg:block" transition={{ duration: 0.35, ease: EASE }} />}
                      {tab.label}
                    </span>
                    <span className={cn('text-xs tabular-nums', selected ? 'text-bg/70 lg:text-muted' : 'text-muted')}>{counts[tab.id]}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive menu */}
          <div id="menu-list" data-anchor className="mt-8 lg:col-span-9 lg:mt-0">
            <div id="min-menu-panel" role="tabpanel" aria-labelledby={`min-tab-${active}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="space-y-16">
                  {groups.map((group) => (
                    <div key={group.id}>
                      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                        <h3 className="font-display text-3xl text-ink">{group.label}</h3>
                        <p className="hidden text-sm text-muted sm:block">{group.blurb}</p>
                      </div>
                      <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:mt-8 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-3">
                        {group.items.map((item, idx) => (
                          <motion.li key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE, delay: Math.min(idx * 0.05, 0.3) }}>
                            <button type="button" onClick={() => openDish(item)} className="group block w-full text-left">
                              <div className="relative overflow-hidden rounded-xl bg-beige">
                                <Img src={item.image} position={item.focus} alt="" ratio="4 / 3" sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw" imgClassName="transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]" />
                                {item.bestseller && <Tag className="absolute left-3 top-3 bg-surface/95">Bestseller</Tag>}
                              </div>
                              <div className="mt-3 flex flex-col gap-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                                <h4 className="flex items-start gap-2 text-[15px] font-medium leading-snug text-ink sm:text-[17px]">
                                  <VegMark veg={item.veg} size={14} className="mt-[3px]" />
                                  {item.name}
                                </h4>
                                <span className="shrink-0 font-display text-lg text-ink sm:text-xl">{price(item.price)}</span>
                              </div>
                              <p className="mt-1.5 hidden text-sm leading-relaxed text-muted sm:line-clamp-2">{item.description}</p>
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                      {group.total > group.items.length && (
                        <button type="button" onClick={() => choose(group.id)} className="mt-8 inline-flex h-11 items-center rounded-full border border-line px-5 text-sm text-ink transition hover:border-ink">
                          See all {group.total} {group.label.toLowerCase()}
                        </button>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
