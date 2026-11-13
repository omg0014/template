import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { BestsellerBadge, Eyebrow, SectionTitle } from '../ui.jsx'

export function Bestsellers() {
  const cafe = useCafe()
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const items = cafe.lookup.items(cafe.bestsellerIds)

  return (
    <section id="bestsellers" aria-labelledby="best-title" className="border-t border-line bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Eyebrow>Most loved</Eyebrow>
        <SectionTitle className="mt-6">
          <span id="best-title">
            Ordered again, <em className="text-accent-soft">and again</em>
          </span>
        </SectionTitle>
      </div>
      <ul className="no-scrollbar mx-auto mt-16 flex max-w-[1600px] snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mt-20 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-10 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id} data-lux-card className="w-[78vw] shrink-0 snap-center sm:w-[46vw] md:w-auto">
            <button type="button" onClick={() => openDish(item)} className="group block w-full text-left">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Img src={item.image} position={item.focus} alt={item.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw" imgClassName="transition-transform duration-[1.8s] ease-out-expo group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
                <BestsellerBadge className="absolute left-4 top-4" />
                <span className="absolute right-4 top-4 font-display text-5xl font-light text-ink/30">0{i + 1}</span>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-display text-sm italic text-accent-soft">{cafe.bestsellerReasons?.[item.id]}</p>
                  <h3 className="mt-2 font-display text-3xl font-light leading-none text-ink">{item.name}</h3>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-[11px] uppercase tracking-[0.3em] text-muted">{cafe.lookup.category(item.category)?.label}</span>
                    <span className="font-display text-2xl text-ink">{price(item.price)}</span>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
