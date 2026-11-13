import { X } from 'lucide-react'
import { Dialog } from '../../components/Dialog.jsx'
import { Img } from '../../components/Img.jsx'
import { VegMark } from '../../components/VegMark.jsx'
import { WhatsAppIcon } from '../../components/BrandIcons.jsx'
import { usePriceFormatter } from '../../components/Price.jsx'
import { useCafe } from '../../hooks/useCafe.js'
import { orderMessage, whatsappUrl } from '../../lib/whatsapp.js'
import { cn } from '../../lib/cn.js'

/** Gold button with a slow fill-sweep on hover. Renders <a> when href is set. */
export function GoldButton({ href, children, variant = 'outline', className, icon: Icon, ...rest }) {
  const Comp = href ? 'a' : 'button'
  const solid = variant === 'solid'
  return (
    <Comp
      href={href}
      type={href ? undefined : 'button'}
      className={cn(
        'group/btn relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-7 text-[11px] font-semibold uppercase tracking-[0.28em] transition-colors duration-700',
        solid ? 'bg-accent text-bg hover:text-accent' : 'border border-accent/60 text-accent-soft hover:text-bg',
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover/btn:scale-y-100',
          solid ? 'bg-bg' : 'bg-accent',
        )}
      />
      {solid && <span aria-hidden="true" className="absolute inset-0 border border-accent" />}
      {Icon && <Icon className="relative size-4" aria-hidden="true" />}
      <span className="relative">{children}</span>
    </Comp>
  )
}

export function Eyebrow({ children, className }) {
  return (
    <p data-lux-reveal className={cn('flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.38em] text-accent', className)}>
      <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
      {children}
    </p>
  )
}

export function SectionTitle({ children, className, as: Tag = 'h2' }) {
  return (
    <Tag data-lux-reveal className={cn('font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.01em] text-ink text-balance', className)}>
      {children}
    </Tag>
  )
}

export function BestsellerBadge({ className }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 border border-accent/50 bg-bg/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-accent-soft backdrop-blur', className)}>
      ✦ Bestseller
    </span>
  )
}

/** Dish detail — bottom sheet on mobile, split modal on desktop. */
export function DishDialog({ dish, onClose }) {
  const cafe = useCafe()
  const price = usePriceFormatter()
  const category = dish && cafe.lookup.category(dish.category)
  return (
    <Dialog
      open={!!dish}
      onClose={onClose}
      title={dish?.name}
      className="items-end justify-center md:items-center md:p-8"
      overlayClassName="bg-black/75 backdrop-blur-md"
      panelClassName="w-full max-h-[92svh] overflow-y-auto border-t border-line bg-surface text-ink md:grid md:max-w-5xl md:grid-cols-2 md:overflow-hidden md:border"
      panel={{
        initial: { opacity: 0, y: 80 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: 60, transition: { duration: 0.35 } },
      }}
    >
      {dish && (
        <>
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[560px]">
            <Img src={dish.image} position={dish.focus} alt={dish.name} fill sizes="(min-width: 768px) 50vw, 100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-surface/20" />
          </div>
          <div className="relative flex flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:max-h-[86svh] md:overflow-y-auto md:p-12">
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-11 place-items-center border border-line text-muted transition hover:border-accent hover:text-accent">
              <X className="size-4" aria-hidden="true" />
            </button>
            <p className="text-[11px] uppercase tracking-[0.35em] text-accent">{category?.label}</p>
            <h3 className="mt-4 pr-12 font-display text-4xl font-light leading-none md:text-5xl">{dish.name}</h3>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted">
              <VegMark veg={dish.veg} />
              <span>{dish.veg ? 'Vegetarian' : 'Non-vegetarian'}</span>
              {dish.spicy && <span className="text-accent-soft">· Spicy</span>}
              {dish.bestseller && <BestsellerBadge />}
            </div>
            <p className="mt-6 leading-relaxed text-ink/80">{dish.description}</p>
            {dish.ingredients?.length > 0 && (
              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted">Composed of</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-ink/85">
                  {dish.ingredients.map((ing) => (
                    <li key={ing} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="size-1 rotate-45 bg-accent" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-auto pt-10">
              <div className="flex items-end justify-between border-t border-line pt-6">
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted">Price</span>
                <span className="font-display text-4xl text-accent-soft">{price(dish.price)}</span>
              </div>
              <GoldButton
                variant="solid"
                icon={WhatsAppIcon}
                className="mt-6 w-full"
                href={whatsappUrl(cafe.contact.whatsapp.number, orderMessage(cafe.identity.name, dish, price(dish.price)))}
                target="_blank"
                rel="noreferrer"
              >
                Order on WhatsApp
              </GoldButton>
            </div>
          </div>
        </>
      )}
    </Dialog>
  )
}
