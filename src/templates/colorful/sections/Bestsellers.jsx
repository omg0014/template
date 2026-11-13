import { motion } from 'motion/react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { popBg, Sticker, Title } from '../ui.jsx'

const ROT = [-3, 2.5, -1.5, 3]

export function Bestsellers() {
  const cafe = useCafe()
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const items = cafe.lookup.items(cafe.bestsellerIds)

  return (
    <section id="bestsellers" aria-labelledby="best-title" className="relative overflow-hidden border-y-[3px] border-ink bg-pop-teal py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Sticker rotate={-3} className="bg-pop-pink text-ink">
              Crowd favourites
            </Sticker>
            <Title id="best-title" className="mt-5">
              Fan <span className="ff-stroke text-white">faves</span>
            </Title>
          </div>
          <p data-ff-pop className="max-w-xs text-lg font-semibold text-ink">The ones that disappear first. Every. Single. Day.</p>
        </div>
        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 py-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.id} data-ff-pop className="w-[74vw] shrink-0 snap-center sm:w-[44vw] md:w-auto">
              <motion.div style={{ rotate: ROT[i % ROT.length] }} whileHover={{ rotate: 0, scale: 1.04 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
              <button type="button" onClick={() => openDish(item)} className="ff-card relative block w-full bg-white p-3 text-left">
                <span className="absolute -left-3 -top-3 z-10 grid size-14 place-items-center rounded-full border-2 border-ink bg-pop-yellow text-xl font-extrabold text-ink shadow-[3px_3px_0_var(--c-ink)]">
                  {i + 1}
                </span>
                <div className={`overflow-hidden rounded-[20px] border-2 border-ink ${popBg(i + 2)}`}>
                  <Img src={item.image} position={item.focus} alt={item.name} ratio="4 / 5" sizes="(min-width: 1024px) 24vw, (min-width: 768px) 46vw, 74vw" />
                </div>
                <div className="px-2 pb-2 pt-4">
                  <p className="text-sm font-bold text-pop-violet">{cafe.bestsellerReasons?.[item.id]}</p>
                  <h3 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-ink">{item.name}</h3>
                  <p className="mt-3 text-xl font-extrabold text-ink">{price(item.price)}</p>
                </div>
              </button>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
