import { Flame, X } from 'lucide-react'
import { Dialog } from '../../components/Dialog.jsx'
import { Img } from '../../components/Img.jsx'
import { VegMark } from '../../components/VegMark.jsx'
import { WhatsAppIcon } from '../../components/BrandIcons.jsx'
import { usePriceFormatter } from '../../components/Price.jsx'
import { useCafe } from '../../hooks/useCafe.js'
import { orderMessage, whatsappUrl } from '../../lib/whatsapp.js'
import { cn } from '../../lib/cn.js'

/** Cycle of pop colours used across the template (index → token). */
export const POP = ['bg-pop-pink', 'bg-pop-yellow', 'bg-pop-teal', 'bg-pop-orange', 'bg-pop-violet']
export const popBg = (i) => POP[i % POP.length]

const BTN = {
  yellow: 'bg-pop-yellow text-ink',
  pink: 'bg-pop-pink text-ink',
  teal: 'bg-pop-teal text-ink',
  white: 'bg-white text-ink',
  ink: 'bg-ink text-white',
}

/** Chunky sticker button: offset shadow, lifts on hover, presses flat on click. */
export function ChunkyButton({ href, children, color = 'yellow', className, icon: Icon, ...rest }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      type={href ? undefined : 'button'}
      className={cn(
        'inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-ink px-6 text-base font-bold shadow-[4px_4px_0_var(--c-ink)] transition-[transform,box-shadow] duration-200 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--c-ink)] active:translate-x-1 active:translate-y-1 active:shadow-none',
        BTN[color],
        className,
      )}
      {...rest}
    >
      {Icon && <Icon className="size-5" aria-hidden="true" />}
      {children}
    </Comp>
  )
}

export function Sticker({ children, className, rotate = -6 }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 text-xs font-extrabold uppercase tracking-wide shadow-[2px_2px_0_var(--c-ink)]', className)} style={{ rotate: `${rotate}deg` }}>
      {children}
    </span>
  )
}

export function BestsellerSticker({ className, rotate = -8 }) {
  return (
    <Sticker rotate={rotate} className={cn('bg-pop-yellow text-ink', className)}>
      <Flame className="size-3.5" aria-hidden="true" /> Bestseller
    </Sticker>
  )
}

/** Hand-drawn squiggle underline. */
export function Squiggle({ className, color = 'var(--c-pink)' }) {
  return (
    <svg viewBox="0 0 220 18" className={cn('h-3 w-40 md:h-4 md:w-56', className)} fill="none" aria-hidden="true">
      <path d="M2 12C20 2 34 2 50 10s30 8 46 0 30-8 46 0 30 8 46 0 22-6 30-2" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function Title({ children, className, id, as: Tag = 'h2' }) {
  return (
    <Tag id={id} data-ff-pop className={cn('text-[clamp(2.6rem,8vw,6.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-ink text-balance', className)}>
      {children}
    </Tag>
  )
}

export function DishDialog({ dish, onClose }) {
  const cafe = useCafe()
  const price = usePriceFormatter()
  const category = dish && cafe.lookup.category(dish.category)
  return (
    <Dialog
      open={!!dish}
      onClose={onClose}
      title={dish?.name}
      className="items-end justify-center p-3 md:items-center md:p-6"
      overlayClassName="bg-ink/50 backdrop-blur-sm"
      panelClassName="ff-card w-full max-h-[90svh] overflow-y-auto bg-white text-ink md:max-w-3xl"
      panel={{
        initial: { opacity: 0, y: 120, rotate: -4, scale: 0.9 },
        animate: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 22 } },
        exit: { opacity: 0, y: 80, rotate: 3, scale: 0.95, transition: { duration: 0.2 } },
      }}
    >
      {dish && (
        <div className="md:grid md:grid-cols-2">
          <div className="relative bg-pop-yellow p-4 md:p-5">
            <Img src={dish.image} position={dish.focus} alt={dish.name} ratio="1 / 1" sizes="(min-width: 768px) 380px, 100vw" className="rounded-[20px] border-2 border-ink" />
            {dish.bestseller && <BestsellerSticker className="absolute left-7 top-7" />}
          </div>
          <div className="relative flex flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:p-8">
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border-2 border-ink bg-pop-pink text-ink shadow-[2px_2px_0_var(--c-ink)] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
              <X className="size-5" aria-hidden="true" strokeWidth={2.5} />
            </button>
            <Sticker rotate={-3} className="w-fit bg-pop-teal text-ink">
              {category?.label}
            </Sticker>
            <h3 className="mt-4 pr-12 text-4xl font-extrabold leading-[0.95] tracking-tight">{dish.name}</h3>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold">
              <VegMark veg={dish.veg} />
              {dish.veg ? 'Veg' : 'Non-veg'}
              {dish.spicy && <span className="rounded-full bg-pop-orange/25 px-2 py-0.5 text-xs">🌶 Spicy</span>}
            </div>
            <p className="mt-4 text-[17px] leading-relaxed text-muted">{dish.description}</p>
            {dish.ingredients?.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Ingredients">
                {dish.ingredients.map((ing, i) => (
                  <li key={ing} className={cn('rounded-full border-2 border-ink px-3 py-1 text-xs font-bold', i % 2 ? 'bg-pop-pink/25' : 'bg-pop-teal/25')}>
                    {ing}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex items-center justify-between gap-4 md:mt-auto md:pt-8">
              <span className="rounded-2xl border-2 border-ink bg-pop-yellow px-4 py-1.5 text-3xl font-extrabold shadow-[3px_3px_0_var(--c-ink)]">{price(dish.price)}</span>
              <ChunkyButton color="teal" icon={WhatsAppIcon} href={whatsappUrl(cafe.contact.whatsapp.number, orderMessage(cafe.identity.name, dish, price(dish.price)))} target="_blank" rel="noreferrer">
                Order
              </ChunkyButton>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
