import { useRef, useState } from 'react'
import { Box, Eye, EyeOff, RotateCcw, RotateCw } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Showcase3D } from '../../../components/showcase/Showcase3D.jsx'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { ChunkyButton, popBg, Sticker } from '../ui.jsx'
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
      <Img src={current.dish.image} alt={current.dish.name} ratio="1 / 1" sizes="(min-width: 768px) 420px, 80vw" className="w-[70%] max-w-[420px] rounded-full border-[3px] border-white" />
    </div>
  )

  return (
    <section id="showcase" aria-labelledby="spin-title" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div aria-hidden="true" className="absolute -left-40 top-10 size-[28rem] rounded-full bg-pop-pink/40 blur-[100px]" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 size-[28rem] rounded-full bg-pop-teal/40 blur-[100px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-center">
          <Sticker rotate={-5} className="bg-pop-yellow text-ink">
            3D snack lab
          </Sticker>
          <h2 id="spin-title" data-ff-pop className="mt-5 text-[clamp(2.6rem,8vw,6.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em]">
            Spin the <span className="text-pop-yellow">snacks!</span>
          </h2>
          <p data-ff-pop className="mx-auto mt-4 max-w-md text-lg font-medium text-white/80">
            Grab and drag to twirl our favourites. Every layer’s labelled — no secrets here.
          </p>
        </div>

        <Showcase3D
          stage="colorful"
          items={items}
          active={active}
          showLabels={labels}
          apiRef={api}
          labelClassName="ff-label"
          ariaLabel={`Interactive 3D model of ${current.dish.name}. Drag or use arrow keys to rotate.`}
          className="mx-auto mt-6 h-[54svh] min-h-[360px] max-w-5xl md:h-[62vh]"
          poster={poster}
          renderOptIn={(load) => (
            <ChunkyButton onClick={load} className="absolute bottom-4 left-1/2 -translate-x-1/2" icon={Box}>
              View in 3D
            </ChunkyButton>
          )}
        />

        <div className="mt-6 flex flex-col items-center gap-5">
          <div role="group" aria-label="Choose a dish" className="flex flex-wrap justify-center gap-3">
            {items.map((it, i) => (
              <button
                key={it.dishId}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  'h-12 rounded-full border-2 px-5 font-bold transition-[transform,background-color] duration-300 ease-spring',
                  active === i ? cn('-rotate-2 scale-105 border-white text-ink', popBg(i)) : 'border-white/40 text-white hover:border-white',
                )}
              >
                {it.dish.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: 'Rotate left', icon: RotateCcw, onClick: () => api.current?.rotate(-1) },
              { label: 'Rotate right', icon: RotateCw, onClick: () => api.current?.rotate(1) },
              { label: labels ? 'Hide labels' : 'Show labels', icon: labels ? EyeOff : Eye, onClick: () => setLabels((v) => !v), pressed: labels },
            ].map(({ label, icon: Icon, onClick, pressed }) => (
              <button key={label} type="button" onClick={onClick} aria-label={label} aria-pressed={pressed} title={label} className="grid size-12 place-items-center rounded-full border-2 border-white bg-white text-ink transition active:scale-90">
                <Icon className="size-5" aria-hidden="true" strokeWidth={2.25} />
              </button>
            ))}
            <button type="button" onClick={() => openDish(current.dish)} className="ml-1 h-12 rounded-full bg-pop-pink px-5 font-bold text-ink">
              {price(current.dish.price)} · Order
            </button>
          </div>
          {/* Ingredient labels: visible chips on phones, screen-reader list on larger screens (where they float in 3D). */}
          <ul className={cn('flex flex-wrap justify-center gap-2 sm:sr-only', !labels && 'hidden')} aria-label="Ingredients">
            {Object.values(current.labels ?? {}).map((l) => (
              <li key={l} className="ff-label">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
