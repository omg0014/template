import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { gsap } from '../../../animation/gsap.js'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { ALL, useMenuFilter } from '../../../hooks/useMenuFilter.js'
import { useFinePointer } from '../../../hooks/useMediaQuery.js'
import { Img } from '../../../components/Img.jsx'
import { VegMark } from '../../../components/VegMark.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { imageUrl } from '../../../lib/images.js'
import { Eyebrow, SectionTitle } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

const EASE = [0.16, 1, 0.3, 1]

/** Food Categories (image reel tabs) + Interactive Menu (classic price list with cursor-following preview). */
export function Menu() {
  const { menu } = useCafe()
  const { active, select, items, counts, tabs } = useMenuFilter(menu)
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const fine = useFinePointer()
  const preview = useRef(null)
  const previewImg = useRef(null)
  const tabRefs = useRef([])

  // Cursor-following image preview (desktop pointer only).
  useEffect(() => {
    if (!fine || !preview.current) return
    const xTo = gsap.quickTo(preview.current, 'x', { duration: 0.6, ease: 'power3' })
    const yTo = gsap.quickTo(preview.current, 'y', { duration: 0.6, ease: 'power3' })
    const move = (e) => {
      xTo(e.clientX + 24)
      yTo(e.clientY - 120)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [fine])

  const showPreview = (item) => {
    if (!fine || !preview.current) return
    previewImg.current.src = imageUrl(item.image, 480)
    previewImg.current.alt = ''
    gsap.to(preview.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
  }
  const hidePreview = () => fine && preview.current && gsap.to(preview.current, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: 'power3.out' })

  // Keyboard navigation for the tablist (roving focus).
  const onTabKey = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + tabs.length) % tabs.length
    tabRefs.current[next]?.focus()
    select(tabs[next].id)
  }

  const groups = (active === ALL ? menu.categories : menu.categories.filter((c) => c.id === active))
    .map((c) => {
      const all = items.filter((i) => i.category === c.id)
      // In the "All" overview show a taste of each category; the tab shows the full list.
      return { ...c, total: all.length, items: active === ALL ? all.slice(0, 4) : all }
    })
    .filter((g) => g.items.length)

  const categoryImage = (id) => menu.items.find((i) => i.category === id)?.image

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative border-t border-line bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>La Carte</Eyebrow>
            <SectionTitle className="mt-6">
              <span id="menu-title">
                The <em className="text-accent-soft">menu</em>
              </span>
            </SectionTitle>
          </div>
          <p data-lux-reveal className="max-w-md text-pretty leading-relaxed text-muted md:justify-self-end">
            From the wood-fire to the espresso bar. Tap any dish for its story, ingredients and a one-touch WhatsApp order.
          </p>
        </div>

        {/* Food categories */}
        <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-20 md:px-0">
          {tabs.map((tab, i) => {
            const selected = active === tab.id
            const img = tab.id === ALL ? 'interior-evening' : categoryImage(tab.id)
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`lux-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="lux-menu-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className="group relative h-40 w-32 shrink-0 snap-start overflow-hidden text-left md:h-48 md:w-40"
              >
                <Img src={img} alt="" fill sizes="160px" imgClassName={cn('transition-[transform,filter] duration-1000 ease-out-expo group-hover:scale-110', selected ? 'grayscale-0' : 'grayscale-[60%] brightness-75')} />
                <span className={cn('absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent transition-opacity duration-500', selected ? 'opacity-70' : 'opacity-100')} />
                <span className="absolute inset-x-3 bottom-3">
                  <span className="block text-[10px] tracking-[0.25em] text-accent">{String(counts[tab.id] ?? 0).padStart(2, '0')}</span>
                  <span className={cn('mt-1 block font-display text-xl leading-tight transition-colors', selected ? 'text-ink' : 'text-ink/70')}>{tab.label}</span>
                </span>
                {selected && <motion.span layoutId="lux-tab-frame" className="absolute inset-0 border border-accent" transition={{ duration: 0.6, ease: EASE }} />}
              </button>
            )
          })}
        </div>

        {/* Interactive menu */}
        <div id="lux-menu-panel" role="tabpanel" aria-labelledby={`lux-tab-${active}`} className="mt-16 md:mt-24" onPointerLeave={hidePreview}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease: EASE }} className="space-y-20">
              {groups.map((group) => (
                <div key={group.id}>
                  <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5">
                    <h3 className="font-display text-3xl font-light text-ink md:text-4xl">{group.label}</h3>
                    <p className="hidden text-sm italic text-muted md:block">{group.blurb}</p>
                  </div>
                  <ul className="grid gap-x-16 md:grid-cols-2">
                    {group.items.map((item, idx) => (
                      <motion.li key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: Math.min(idx * 0.05, 0.4) }}>
                        <button
                          type="button"
                          onClick={() => openDish(item)}
                          onPointerEnter={() => showPreview(item)}
                          onPointerLeave={hidePreview}
                          className="group flex w-full gap-4 border-b border-line py-6 text-left md:gap-5"
                        >
                          <Img src={item.image} position={item.focus} alt="" sizes="80px" ratio="1 / 1" className="w-16 shrink-0 md:w-20 lg:hidden" />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-baseline">
                              <span className="font-display text-xl text-ink transition-colors duration-500 group-hover:text-accent-soft md:text-2xl">{item.name}</span>
                              <span className="lux-leader" aria-hidden="true" />
                              <span className="font-display text-xl text-accent-soft md:text-2xl">{price(item.price)}</span>
                            </span>
                            <span className="mt-2 flex items-start gap-2.5">
                              <VegMark veg={item.veg} size={14} className="mt-0.5" />
                              <span className="line-clamp-2 text-sm leading-relaxed text-muted">{item.description}</span>
                            </span>
                            {item.bestseller && <span className="mt-3 inline-block text-[10px] uppercase tracking-[0.3em] text-accent">✦ Bestseller</span>}
                          </span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                  {group.total > group.items.length && (
                    <button
                      type="button"
                      onClick={() => {
                        select(group.id)
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft underline-offset-8 hover:underline"
                    >
                      See all {group.total} {group.label} →
                    </button>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {fine && (
        <div ref={preview} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40 hidden h-60 w-48 overflow-hidden opacity-0 shadow-2xl lg:block" style={{ transform: 'scale(.9)' }}>
          <img ref={previewImg} alt="" className="size-full object-cover" />
        </div>
      )}
    </section>
  )
}
