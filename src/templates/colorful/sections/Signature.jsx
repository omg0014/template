import { motion } from 'motion/react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpenDish } from '../../../hooks/useDishDialog.js'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { Squiggle, Sticker, Title } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

const CARD = [
  { bg: 'bg-pop-yellow', rot: -2.5 },
  { bg: 'bg-pop-teal', rot: 2 },
  { bg: 'bg-pop-violet', rot: -1.5, light: true },
]

export function Signature() {
  const cafe = useCafe()
  const openDish = useOpenDish()
  const price = usePriceFormatter()
  const dishes = cafe.lookup.items(cafe.signatureIds)

  return (
    <section id="signature" aria-labelledby="sig-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-center">
          <Sticker rotate={-4} className="bg-pop-teal text-ink" >
            Signature
          </Sticker>
          <Title id="sig-title" className="mt-5">
            The big three
          </Title>
          <Squiggle className="mx-auto mt-3" />
        </div>
        <ul className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-7">
          {dishes.map((dish, i) => {
            const c = CARD[i % CARD.length]
            return (
              <li key={dish.id} data-ff-pop>
                <motion.div style={{ rotate: c.rot }} whileHover={{ rotate: 0, y: -10, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <button type="button" onClick={() => openDish(dish)} className={cn('ff-card block w-full p-4 text-left', c.bg, c.light ? 'text-white' : 'text-ink')} aria-label={`View ${dish.name}`}>
                  <div className="relative overflow-hidden rounded-[20px] border-2 border-ink">
                    <Img src={dish.image} position={dish.focus} alt={dish.name} ratio="1 / 1" sizes="(min-width: 768px) 30vw, 90vw" />
                    <span className="absolute left-3 top-3 grid size-12 place-items-center rounded-full border-2 border-ink bg-white text-lg font-extrabold text-ink">#{i + 1}</span>
                  </div>
                  <div className="px-2 pb-3 pt-5">
                    <h3 className="text-3xl font-extrabold leading-[0.95] tracking-tight">{dish.name}</h3>
                    <p className={cn('mt-3 font-medium leading-snug', c.light ? 'text-white' : 'text-ink/80')}>{cafe.signatureNotes?.[dish.id] ?? dish.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="rounded-full border-2 border-ink bg-white px-4 py-1 text-xl font-extrabold text-ink">{price(dish.price)}</span>
                      <span className="text-sm font-bold underline decoration-2 underline-offset-4">Peek inside →</span>
                    </div>
                  </div>
                </button>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
