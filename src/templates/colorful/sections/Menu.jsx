import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { CategoryIcon } from '../../../components/CategoryIcon.jsx'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { ALL, useMenuFilter } from '../../../hooks/useMenuFilter.js'
import { Img } from '../../../components/Img.jsx'
import { VegMark } from '../../../components/VegMark.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { BestsellerSticker, popBg, Sticker, Title } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

const SPRING = { type: 'spring', stiffness: 380, damping: 26 }

/** Food Categories (colour-coded chips with a morphing blob) + Interactive Menu (sticker cards). */
export function Menu() {
  const { menu } = useCafe()
  const { active, select, items, counts, tabs } = useMenuFilter(menu)
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const tabRefs = useRef([])

  const onKey = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + tabs.length) % tabs.length
    tabRefs.current[next]?.focus()
    select(tabs[next].id)
  }

  // "All" shows a playful sampler (first 2 of each category); a category shows everything.
  const shown = active === ALL ? menu.categories.flatMap((c) => items.filter((i) => i.category === c.id).slice(0, 2)) : items
  const catIndex = (id) => menu.categories.findIndex((c) => c.id === id)

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative border-y-[3px] border-ink bg-pop-yellow py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Sticker rotate={3} className="bg-white text-ink">
              The menu
            </Sticker>
            <Title id="menu-title" className="mt-5">
              Pick your <span className="ff-stroke text-pop-pink">poison</span>
            </Title>
          </div>
          <p data-ff-pop className="max-w-sm text-lg font-semibold leading-snug text-ink">
            Burgers, pizza, pasta, shakes and a lot of sugar. Tap anything to see what’s inside and order on WhatsApp.
          </p>
        </div>

        {/* Food categories */}
        <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 mt-12 flex snap-x gap-2.5 overflow-x-auto px-5 py-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {tabs.map((tab, i) => {
            const selected = active === tab.id
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`ff-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="ff-menu-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  'relative flex h-12 shrink-0 snap-start items-center gap-2 rounded-full border-2 border-ink px-4 font-bold text-ink transition-transform active:scale-95',
                  !selected && 'bg-white hover:-rotate-2',
                )}
              >
                {selected && <motion.span layoutId="ff-tab-blob" className={cn('absolute inset-[-2px] rounded-full border-2 border-ink shadow-[3px_3px_0_var(--c-ink)]', i === 0 ? 'bg-pop-teal' : popBg(i - 1))} transition={SPRING} />}
                <span className="relative flex items-center gap-2">
                  <CategoryIcon name={tab.icon} className="size-[18px]" strokeWidth={2.25} />
                  {tab.label}
                  <span className="grid min-w-6 place-items-center rounded-full bg-ink px-1.5 text-[11px] text-white">{counts[tab.id]}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Interactive menu */}
        <div id="ff-menu-panel" role="tabpanel" aria-labelledby={`ff-tab-${active}`}>
        <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((item, idx) => {
              const ci = catIndex(item.category)
              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, transition: { ...SPRING, delay: Math.min(idx * 0.03, 0.3) } }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 6, transition: { duration: 0.15 } }}
                >
                  <button type="button" onClick={() => openDish(item)} className="ff-card group flex h-full w-full flex-col overflow-hidden bg-white text-left transition-transform duration-300 ease-spring hover:-translate-y-1.5 hover:-rotate-1">
                    <div className={cn('relative border-b-2 border-ink p-2 sm:p-3', popBg(ci))}>
                      <div className="overflow-hidden rounded-[14px] border-2 border-ink sm:rounded-[18px]">
                        <Img src={item.image} position={item.focus} alt="" ratio="4 / 3" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw" imgClassName="transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:rotate-2" />
                      </div>
                      {item.bestseller && <BestsellerSticker className="absolute -right-1 top-1 scale-75 sm:scale-100" rotate={8} />}
                    </div>
                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <div className="flex items-start gap-2">
                        <VegMark veg={item.veg} size={15} className="mt-1" />
                        <h3 className="text-base font-extrabold leading-tight tracking-tight text-ink sm:text-xl">{item.name}</h3>
                      </div>
                      <p className="mt-2 hidden text-sm font-medium leading-snug text-muted sm:line-clamp-2">{item.description}</p>
                      <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4">
                        <span className="rounded-full border-2 border-ink bg-pop-yellow px-2.5 py-0.5 text-base font-extrabold text-ink sm:px-3 sm:text-lg">{price(item.price)}</span>
                        <span className="grid size-8 place-items-center rounded-full border-2 border-ink bg-ink text-white transition-transform duration-300 ease-spring group-hover:rotate-90 sm:size-10" aria-hidden="true">
                          <Plus className="size-5" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </button>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
        </div>
        {active === ALL && (
          <p className="mt-8 text-center font-bold text-ink">
            That’s just a taste — pick a category above for the full line-up ({menu.items.length} dishes).
          </p>
        )}
      </div>
    </section>
  )
}
