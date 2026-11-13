import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useScrollState } from '../../../hooks/useScrollState.js'
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll.js'
import { useFocusTrap } from '../../../hooks/useFocusTrap.js'
import { WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { whatsappUrl } from '../../../lib/whatsapp.js'
import { cn } from '../../../lib/cn.js'
import { popBg } from '../ui.jsx'

export function Nav() {
  const { identity, navigation, contact } = useCafe()
  const { scrolled } = useScrollState(30)
  const [open, setOpen] = useState(false)
  const panel = useRef(null)
  useLockBodyScroll(open)
  useFocusTrap(panel, open, { onEscape: () => setOpen(false) })

  return (
    <>
      <header className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-5">
        <nav
          aria-label="Primary"
          className={cn(
            'mx-auto flex h-16 max-w-[1400px] items-center justify-between rounded-full border-2 border-ink bg-white pl-2 pr-2 transition-shadow duration-300 md:pl-3',
            scrolled ? 'shadow-[4px_4px_0_var(--c-ink)]' : 'shadow-none',
          )}
        >
          <a href="#home" className="flex items-center gap-2.5 rounded-full pr-3">
            <span aria-hidden="true" className="grid size-11 place-items-center rounded-full border-2 border-ink bg-pop-pink text-sm font-extrabold text-ink">
              {identity.monogram}
            </span>
            <span className="text-lg font-extrabold tracking-tight text-ink">{identity.shortName}</span>
            <span className="sr-only">, back to top</span>
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-4 py-2 text-[15px] font-semibold text-ink transition hover:bg-pop-yellow">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)}
              target="_blank"
              rel="noreferrer"
              className="hidden h-12 items-center gap-2 rounded-full border-2 border-ink bg-pop-teal px-5 font-bold text-ink transition hover:-rotate-2 sm:inline-flex"
            >
              <WhatsAppIcon className="size-5" /> Order now
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="ff-mobile-nav"
              aria-label="Open menu"
              className="grid size-12 place-items-center rounded-full border-2 border-ink bg-pop-yellow text-ink lg:hidden"
            >
              <Menu className="size-5" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="ff-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="ff-dots fixed inset-0 z-[60] flex flex-col bg-pop-pink px-5 pb-safe pt-5"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex justify-end">
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--c-ink)]">
                <X className="size-5" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-8 flex-1 space-y-3">
              {navigation.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 40, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.15 + i * 0.06 }}>
                  <a href={l.href} onClick={() => setOpen(false)} className={cn('inline-block rounded-2xl border-2 border-ink px-5 py-2 text-5xl font-extrabold uppercase tracking-tight text-ink shadow-[4px_4px_0_var(--c-ink)]', i % 2 ? 'bg-white' : popBg(i + 1))}>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer" className="mb-2 flex h-14 items-center justify-center gap-2 rounded-full border-2 border-ink bg-pop-yellow text-lg font-bold text-ink shadow-[4px_4px_0_var(--c-ink)]">
              <WhatsAppIcon className="size-5" /> Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
