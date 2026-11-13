import { useRef, useState } from 'react'
import { Eye, EyeOff, RotateCcw, RotateCw, Box } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Showcase3D } from '../../../components/showcase/Showcase3D.jsx'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { Eyebrow, SectionTitle } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

export function Showcase() {
  const cafe = useCafe()
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const [active, setActive] = useState(0)
  const [labels, setLabels] = useState(true)
  const api = useRef(null)
  const items = cafe.showcase.map((s) => ({ ...s, dish: cafe.lookup.item(s.dishId) }))
  const current = items[active]

  const poster = (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[78%] max-w-[520px] overflow-hidden rounded-full border border-line">
        <Img src={current.dish.image} position={current.dish.focus} alt={current.dish.name} fill sizes="(min-width: 1024px) 40vw, 80vw" />
      </div>
    </div>
  )

  return (
    <section id="showcase" aria-labelledby="atelier-title" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden="true" className="absolute right-[-10%] top-1/2 h-[80vh] w-[80vh] -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
        <div>
          <Eyebrow>The Atelier · 3D</Eyebrow>
          <SectionTitle className="mt-6">
            <span id="atelier-title">
              Turn it. Study it. <em className="text-accent-soft">Crave it.</em>
            </span>
          </SectionTitle>
          <p data-lux-reveal className="mt-6 max-w-md leading-relaxed text-muted">
            Drag to rotate our signatures and discover what goes into every layer. Use the arrow keys or buttons if you prefer.
          </p>

          <ul className="mt-10 border-t border-line" aria-label="Choose a dish">
            {items.map((it, i) => (
              <li key={it.dishId}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={cn('group flex w-full items-center gap-5 border-b border-line py-5 text-left transition-colors', active === i ? 'text-ink' : 'text-muted hover:text-ink')}
                >
                  <span className={cn('text-[11px] tracking-[0.3em] transition-colors', active === i ? 'text-accent' : '')}>0{i + 1}</span>
                  <span className="flex-1 font-display text-2xl md:text-3xl">{it.dish.name}</span>
                  <span className={cn('h-px bg-accent transition-[width] duration-700 ease-out-expo', active === i ? 'w-12' : 'w-0 group-hover:w-6')} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ControlButton onClick={() => api.current?.rotate(-1)} label="Rotate left" icon={RotateCcw} />
            <ControlButton onClick={() => api.current?.rotate(1)} label="Rotate right" icon={RotateCw} />
            <ControlButton onClick={() => setLabels((v) => !v)} label={labels ? 'Hide labels' : 'Show labels'} icon={labels ? EyeOff : Eye} pressed={labels} />
            <button type="button" onClick={() => openDish(current.dish)} className="ml-auto text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft underline-offset-8 hover:underline">
              {price(current.dish.price)} · Details
            </button>
          </div>
          {/* Ingredient labels: visible chips on phones, screen-reader list on larger screens (where they float in 3D). */}
          <ul className={cn('mt-2 flex flex-wrap gap-2 sm:sr-only', !labels && 'hidden')} aria-label="Ingredients">
            {Object.values(current.labels ?? {}).map((l) => (
              <li key={l} className="lux-label">
                {l}
              </li>
            ))}
          </ul>
        </div>

        <Showcase3D
          stage="luxury"
          items={items}
          active={active}
          showLabels={labels}
          apiRef={api}
          labelClassName="lux-label"
          ariaLabel={`Interactive 3D model of ${current.dish.name}. Drag or use arrow keys to rotate.`}
          className="h-[62svh] min-h-[420px] lg:h-[78vh]"
          poster={poster}
          renderOptIn={(load) => (
            <button type="button" onClick={load} className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 border border-accent/60 bg-bg/80 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-accent-soft backdrop-blur">
              <Box className="size-4" aria-hidden="true" /> View in 3D
            </button>
          )}
        />
      </div>
    </section>
  )
}

function ControlButton({ onClick, label, icon: Icon, pressed }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className="grid size-12 place-items-center border border-line text-ink/80 transition hover:border-accent hover:text-accent"
    >
      <Icon className="size-[18px]" aria-hidden="true" strokeWidth={1.5} />
    </button>
  )
}
