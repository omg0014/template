import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useScrollState } from '../../../hooks/useScrollState.js'
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll.js'
import { useFocusTrap } from '../../../hooks/useFocusTrap.js'
import { WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { whatsappUrl, telUrl } from '../../../lib/whatsapp.js'
import { cn } from '../../../lib/cn.js'

const EASE = [0.76, 0, 0.24, 1]

export function Nav() {
  const { identity, navigation, contact } = useCafe()
  const { scrolled, hidden } = useScrollState(40)
  const [open, setOpen] = useState(false)
  const panel = useRef(null)
  useLockBodyScroll(open)
  useFocusTrap(panel, open, { onEscape: () => setOpen(false) })
  const left = navigation.slice(0, 3)
  const right = navigation.slice(3)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-out-expo',
          scrolled ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <nav aria-label="Primary" className="mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-20 md:px-10">
          <ul className="hidden items-center gap-9 lg:flex">
            {left.map((l) => (
              <li key={l.href}>
                <NavLink {...l} />
              </li>
            ))}
          </ul>
          <a href="#home" className="col-start-1 justify-self-start font-display text-2xl tracking-wide text-ink lg:col-start-2 lg:justify-self-center lg:text-[28px]">
            <span className="italic text-accent">{identity.name.split(' ')[0]}</span> {identity.name.split(' ').slice(1).join(' ')}
            <span className="sr-only">, back to top</span>
          </a>
          <div className="col-start-3 flex items-center justify-end gap-9">
            <ul className="hidden items-center gap-9 lg:flex">
              {right.map((l) => (
                <li key={l.href}>
                  <NavLink {...l} />
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)}
              target="_blank"
              rel="noreferrer"
              className="hidden h-11 items-center gap-2 border border-accent/60 px-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-soft transition hover:bg-accent hover:text-bg md:inline-flex"
            >
              <WhatsAppIcon className="size-4" /> Order
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="lux-mobile-nav"
              aria-label="Open menu"
              className="grid size-12 place-items-center text-ink lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="lux-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-bg px-6 pb-safe pt-5"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl italic text-accent">{identity.name}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-12 place-items-center text-ink">
                <X className="size-6" aria-hidden="true" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="mt-14 flex-1 space-y-2">
              {navigation.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-1 font-display text-5xl font-light text-ink"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.07 }}
                  >
                    <span className="text-xs tracking-[0.3em] text-accent">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="space-y-4 border-t border-line pt-6 text-sm text-muted">
              <p>{contact.address.line1}, {contact.address.line2}</p>
              <div className="flex gap-6">
                <a href={telUrl(contact.phone)} className="text-ink underline-offset-4 hover:underline">{contact.phone}</a>
                <a href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer" className="text-accent-soft underline-offset-4 hover:underline">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, label }) {
  return (
    <a href={href} className="group relative py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-ink/80 transition-colors hover:text-accent-soft">
      {label}
      <span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
    </a>
  )
}
