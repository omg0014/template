import { ArrowRight } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { Heading, Kicker } from '../ui.jsx'

export function Signature() {
  const cafe = useCafe()
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const dishes = cafe.lookup.items(cafe.signatureIds)

  return (
    <section id="signature" aria-labelledby="sig-title" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker>Signature dishes</Kicker>
            <Heading id="sig-title" className="mt-5">
              Made slowly, <em className="text-accent">on purpose.</em>
            </Heading>
          </div>
          <p data-min-reveal className="max-w-sm leading-relaxed text-muted">
            Three plates we’d stake our name on — each one perfected through a hundred quiet mornings.
          </p>
        </div>
        <ul className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {dishes.map((dish, i) => (
            <li key={dish.id} data-min-card>
              <button type="button" onClick={() => openDish(dish)} className="group block w-full text-left" aria-label={`View ${dish.name}`}>
                <div className="relative overflow-hidden rounded-2xl">
                  <Img src={dish.image} position={dish.focus} alt={dish.name} ratio="4 / 5" sizes="(min-width: 768px) 30vw, 100vw" imgClassName="transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]" />
                  <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur">No. 0{i + 1}</span>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl leading-tight text-ink">{dish.name}</h3>
                  <span className="mt-1 shrink-0 font-display text-2xl text-ink">{price(dish.price)}</span>
                </div>
                <p className="mt-3 text-pretty leading-relaxed text-muted">{cafe.signatureNotes?.[dish.id] ?? dish.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  View dish
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
