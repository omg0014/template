import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { Eyebrow, SectionTitle } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

export function Signature() {
  const cafe = useCafe()
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const dishes = cafe.lookup.items(cafe.signatureIds)

  return (
    <section id="signature" aria-labelledby="sig-title" className="relative py-28 md:py-44">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>Signature</Eyebrow>
            <SectionTitle className="mt-6">
              <span id="sig-title">
                The plates that <em className="text-accent-soft">made our name</em>
              </span>
            </SectionTitle>
          </div>
          <p data-lux-reveal className="max-w-md text-pretty leading-relaxed text-muted md:justify-self-end">
            Three dishes, refined over hundreds of evenings. Each one is built around fire, patience and a single, unforgettable idea.
          </p>
        </div>

        <ol className="mt-20 space-y-28 md:mt-32 md:space-y-48">
          {dishes.map((dish, i) => {
            const flip = i % 2 === 1
            return (
              <li key={dish.id} className={cn('grid items-center gap-10 md:grid-cols-12 md:gap-8')}>
                <button
                  type="button"
                  onClick={() => openDish(dish)}
                  className={cn('group relative block md:col-span-7', flip && 'md:order-2 md:col-start-6')}
                  aria-label={`View ${dish.name}`}
                >
                  <div data-lux-clip className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
                    <div data-lux-parallax className="absolute inset-[-8%_0]">
                      <Img src={dish.image} position={dish.focus} alt={dish.name} fill sizes="(min-width: 768px) 58vw, 100vw" imgClassName="transition-transform duration-[1.6s] ease-out-expo group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
                  </div>
                  <span aria-hidden="true" className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-[width] duration-1000 ease-out-expo group-hover:w-full" />
                </button>
                <div className={cn('md:col-span-4', flip ? 'md:order-1 md:col-start-1' : 'md:col-start-9')}>
                  <p data-lux-reveal className="lux-outline font-display text-[7rem] font-light leading-none md:text-[9rem]" aria-hidden="true">
                    0{i + 1}
                  </p>
                  <h3 data-lux-reveal className="mt-4 font-display text-4xl font-light leading-[1] text-ink md:text-5xl">
                    {dish.name}
                  </h3>
                  <p data-lux-reveal className="mt-5 text-pretty leading-relaxed text-muted">
                    {dish.description}
                  </p>
                  {cafe.signatureNotes?.[dish.id] && (
                    <p data-lux-reveal className="mt-6 border-l border-accent/50 pl-5 font-display text-xl italic leading-snug text-accent-soft">
                      “{cafe.signatureNotes[dish.id]}”
                    </p>
                  )}
                  <div data-lux-reveal className="mt-8 flex items-center gap-6">
                    <span className="font-display text-3xl text-ink">{price(dish.price)}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-line" />
                    <button type="button" onClick={() => openDish(dish)} className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft underline-offset-8 hover:underline">
                      Discover
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
