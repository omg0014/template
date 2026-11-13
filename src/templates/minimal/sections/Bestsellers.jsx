import { ArrowUpRight } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Img } from '../../../components/Img.jsx'
import { VegMark } from '../../../components/VegMark.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { Heading, Kicker } from '../ui.jsx'

/** Ranked editorial list — distinct from the luxury rail and colorful cards. */
export function Bestsellers() {
  const cafe = useCafe()
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const items = cafe.lookup.items(cafe.bestsellerIds)

  return (
    <section id="bestsellers" aria-labelledby="best-title" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Kicker>Bestsellers</Kicker>
          <Heading id="best-title" className="mt-5">
            The regulars’ <em className="text-accent">order.</em>
          </Heading>
          <p data-min-reveal className="mt-5 max-w-sm leading-relaxed text-muted">
            What our neighbours come back for, week after week.
          </p>
        </div>
        <ol className="border-t border-line lg:col-span-8">
          {items.map((item, i) => (
            <li key={item.id} data-min-card className="border-b border-line">
              <button type="button" onClick={() => openDish(item)} className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-left md:grid-cols-[3rem_6rem_1fr_auto_auto] md:gap-6 md:py-6">
                <span className="hidden font-display text-2xl text-muted md:block">{String(i + 1).padStart(2, '0')}</span>
                <span className="relative block w-20 overflow-hidden rounded-xl md:w-24">
                  <Img src={item.image} position={item.focus} alt="" ratio="1 / 1" sizes="96px" imgClassName="transition-transform duration-700 ease-out-quart group-hover:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-display text-2xl leading-tight text-ink md:text-3xl">
                    {item.name}
                  </span>
                  <span className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <VegMark veg={item.veg} size={13} />
                    {cafe.bestsellerReasons?.[item.id] ?? cafe.lookup.category(item.category)?.label}
                  </span>
                </span>
                <span className="hidden text-sm text-muted md:block">{cafe.lookup.category(item.category)?.label}</span>
                <span className="flex items-center gap-3">
                  <span className="font-display text-2xl text-ink">{price(item.price)}</span>
                  <ArrowUpRight className="hidden size-5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
