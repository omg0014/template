import { useRef, useState } from 'react'
import { Box, Eye, EyeOff, RotateCcw, RotateCw } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Showcase3D } from '../../../components/showcase/Showcase3D.jsx'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { Heading, Kicker } from '../ui.jsx'
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
      <Img src={current.dish.image} alt={current.dish.name} ratio="1 / 1" sizes="(min-width: 768px) 420px, 80vw" className="w-[72%] max-w-[420px] rounded-full" />
    </div>
  )

  return (
    <section id="showcase" aria-labelledby="studio-title" className="bg-beige/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 text-center md:px-10">
        <div className="flex justify-center">
          <Kicker>In the studio · 3D</Kicker>
        </div>
        <Heading id="studio-title" className="mx-auto mt-5 max-w-3xl">
          Take a closer look.
        </Heading>
        <p data-min-reveal className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          Drag to turn each dish and see what it’s made of. Arrow keys work too.
        </p>

        <div className="relative mx-auto mt-10 max-w-5xl">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[min(80vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface" />
          <Showcase3D
            stage="minimal"
            items={items}
            active={active}
            showLabels={labels}
            apiRef={api}
            labelClassName="min-label"
            ariaLabel={`Interactive 3D model of ${current.dish.name}. Drag or use arrow keys to rotate.`}
            className="h-[56svh] min-h-[380px] md:h-[64vh]"
            poster={poster}
            renderOptIn={(load) => (
              <button type="button" onClick={load} className="absolute bottom-4 left-1/2 inline-flex h-11 -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 text-sm text-bg">
                <Box className="size-4" aria-hidden="true" /> View in 3D
              </button>
            )}
          />
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-5">
          <div role="group" aria-label="Choose a dish" className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1">
            {items.map((it, i) => (
              <button
                key={it.dishId}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
                className={cn('relative shrink-0 rounded-full px-4 py-2.5 text-sm transition-colors sm:px-5', active === i ? 'bg-ink text-bg' : 'text-ink/70 hover:text-ink')}
              >
                {it.dish.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: 'Rotate left', icon: RotateCcw, onClick: () => api.current?.rotate(-1) },
              { label: 'Rotate right', icon: RotateCw, onClick: () => api.current?.rotate(1) },
              { label: labels ? 'Hide labels' : 'Show labels', icon: labels ? EyeOff : Eye, onClick: () => setLabels((v) => !v), pressed: labels },
            ].map(({ label, icon: Icon, onClick, pressed }) => (
              <button key={label} type="button" onClick={onClick} aria-label={label} aria-pressed={pressed} title={label} className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink transition hover:border-ink">
                <Icon className="size-4" aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={() => openDish(current.dish)} className="ml-2 h-11 rounded-full px-4 text-sm font-medium text-ink underline-offset-4 hover:underline">
              {price(current.dish.price)} · Details
            </button>
          </div>
          {/* Ingredient labels: visible chips on phones, screen-reader list on larger screens (where they float in 3D). */}
          <ul className={cn('flex flex-wrap justify-center gap-2 sm:sr-only', !labels && 'hidden')} aria-label="Ingredients">
            {Object.values(current.labels ?? {}).map((l) => (
              <li key={l} className="min-label">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
