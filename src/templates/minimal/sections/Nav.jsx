import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useScrollState } from '../../../hooks/useScrollState.js'
import { useLockBodyScroll } from '../../../hooks/useLockBodyScroll.js'
import { useFocusTrap } from '../../../hooks/useFocusTrap.js'
import { WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { whatsappUrl } from '../../../lib/whatsapp.js'
import { cn } from '../../../lib/cn.js'

export function Nav() {
  const { identity, navigation, contact } = useCafe()
  const { scrolled, hidden } = useScrollState(24)
  const [open, setOpen] = useState(false)
  const sheet = useRef(null)
  useLockBodyScroll(open)
  useFocusTrap(sheet, open, { onEscape: () => setOpen(false) })

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500',
        scrolled || open ? 'bg-bg/90 shadow-[0_1px_0_var(--c-line)] backdrop-blur-lg' : 'bg-transparent',
        hidden && !open ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-10">
        <a href="#home" className="font-display text-2xl leading-none text-ink md:text-[26px]">
          {identity.name}
          <span className="sr-only">, back to top</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-sm text-ink/75 transition hover:bg-beige/70 hover:text-ink">
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
            className="hidden h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition hover:bg-accent sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" /> Order
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="min-mobile-nav"
            className="flex h-11 items-center gap-2.5 rounded-full px-3 text-sm font-medium text-ink md:hidden"
          >
            {open ? 'Close' : 'Menu'}
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span className={cn('absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300', open && 'translate-y-1.5 rotate-45')} />
              <span className={cn('absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300', open && '-translate-y-1.5 -rotate-45')} />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={sheet}
            id="min-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="px-5 py-4">
              {navigation.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.04 }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-line py-4 font-display text-3xl text-ink">
                    {l.label}
                    <span className="text-xs text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pb-6">
              <a
                href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-bg"
              >
                <WhatsAppIcon className="size-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
