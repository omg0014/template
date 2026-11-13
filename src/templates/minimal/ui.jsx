import { ArrowUpRight, X } from 'lucide-react'
import { Dialog } from '../../components/Dialog.jsx'
import { Img } from '../../components/Img.jsx'
import { VegMark } from '../../components/VegMark.jsx'
import { WhatsAppIcon } from '../../components/BrandIcons.jsx'
import { usePriceFormatter } from '../../components/Price.jsx'
import { useCafe } from '../../hooks/useCafe.js'
import { orderMessage, whatsappUrl } from '../../lib/whatsapp.js'
import { cn } from '../../lib/cn.js'

export function PillButton({ href, children, variant = 'solid', className, icon: Icon, ...rest }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      type={href ? undefined : 'button'}
      className={cn(
        'group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-300 active:scale-[0.98]',
        variant === 'solid' && 'bg-ink text-bg hover:bg-accent',
        variant === 'ghost' && 'border border-line text-ink hover:border-ink',
        variant === 'light' && 'bg-surface text-ink shadow-sm hover:shadow-md',
        className,
      )}
      {...rest}
    >
      {Icon && <Icon className="size-4" aria-hidden="true" />}
      {children}
      {variant !== 'solid' && !Icon && <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />}
    </Comp>
  )
}

export function Kicker({ children, className }) {
  return (
    <p data-min-reveal className={cn('flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted', className)}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  )
}

export function Heading({ children, className, as: Tag = 'h2', id }) {
  return (
    <Tag id={id} data-min-reveal className={cn('font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1] tracking-[-0.015em] text-ink text-balance', className)}>
      {children}
    </Tag>
  )
}

export function Tag({ children, className }) {
  return <span className={cn('inline-flex items-center rounded-full bg-beige px-2.5 py-1 text-[11px] font-medium text-accent', className)}>{children}</span>
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
      className="items-end justify-center md:items-center md:p-6"
      overlayClassName="bg-ink/40 backdrop-blur-[2px]"
      panelClassName="w-full max-h-[92svh] overflow-y-auto rounded-t-[28px] bg-surface text-ink shadow-2xl md:max-w-3xl md:rounded-[28px]"
      panel={{
        initial: { opacity: 0, y: 48 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
        exit: { opacity: 0, y: 32, transition: { duration: 0.25 } },
      }}
    >
      {dish && (
        <div className="md:grid md:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/3.2] md:aspect-auto md:min-h-[440px]">
            <span aria-hidden="true" className="absolute left-1/2 top-5 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-white/80 md:hidden" />
            <div className="absolute inset-3 bottom-0 overflow-hidden rounded-[20px] md:inset-4 md:right-0">
              <Img src={dish.image} position={dish.focus} alt={dish.name} fill sizes="(min-width: 768px) 380px, 100vw" />
            </div>
          </div>
          <div className="relative flex flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:p-9">
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-beige/70 text-ink transition hover:bg-beige">
              <X className="size-4" aria-hidden="true" />
            </button>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{category?.label}</p>
            <h3 className="mt-3 pr-12 font-display text-4xl leading-none">{dish.name}</h3>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
              <VegMark veg={dish.veg} size={15} />
              <span>{dish.veg ? 'Vegetarian' : 'Non-vegetarian'}</span>
              {dish.bestseller && <Tag>Bestseller</Tag>}
              {dish.tags?.map((t) => (
                <Tag key={t} className="bg-bg text-muted">
                  {t}
                </Tag>
              ))}
            </div>
            <p className="mt-5 leading-relaxed text-ink/80">{dish.description}</p>
            {dish.ingredients?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Ingredients">
                {dish.ingredients.map((ing) => (
                  <li key={ing} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink/80">
                    {ing}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex items-center justify-between border-t border-line pt-6 md:mt-auto">
              <span className="font-display text-4xl">{price(dish.price)}</span>
              <PillButton
                href={whatsappUrl(cafe.contact.whatsapp.number, orderMessage(cafe.identity.name, dish, price(dish.price)))}
                target="_blank"
                rel="noreferrer"
                icon={WhatsAppIcon}
              >
                Order
              </PillButton>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
