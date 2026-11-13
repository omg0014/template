import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Check, LayoutTemplate, X } from 'lucide-react'
import { TEMPLATES } from '../data/templates.js'
import { Img } from '../components/Img.jsx'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { usePageTransition } from './TransitionProvider.jsx'
import { preloadTemplate } from './TemplateRoute.jsx'
import { cn } from '../lib/cn.js'

/**
 * Persistent floating switcher (PRD §7.4). Neutral dark-glass styling so it reads
 * clearly on all three templates without belonging to any of them.
 */
export function TemplateSwitcher({ current }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)
  const id = useId()
  const { go } = usePageTransition()
  useFocusTrap(panelRef, open, { onEscape: () => setOpen(false) })

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!panelRef.current?.contains(e.target) && !triggerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const choose = (t) => {
    setOpen(false)
    if (t.key === current) return
    go(t.path, { color: t.colors.bg, fg: t.colors.fg, label: t.cafe, font: t.font })
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-[90] font-[Inter_Variable,system-ui,sans-serif] md:bottom-6 md:left-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-label="Switch template"
            data-lenis-prevent
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom left' }}
            className="absolute bottom-[calc(100%+12px)] left-0 w-[min(22rem,calc(100vw-2rem))] rounded-3xl border border-white/12 bg-[#121110]/95 p-3 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-2 pb-2 pt-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Templates</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close template switcher" className="grid size-9 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <ul className="space-y-1.5">
              {TEMPLATES.map((t) => {
                const active = t.key === current
                return (
                  <li key={t.key}>
                    <button
                      type="button"
                      onClick={() => choose(t)}
                      onPointerEnter={() => preloadTemplate(t.key)}
                      aria-current={active ? 'page' : undefined}
                      className={cn('flex w-full items-center gap-3 rounded-2xl p-2 text-left transition-colors hover:bg-white/8', active && 'bg-white/10')}
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl" style={{ background: t.colors.bg }}>
                        <Img src={t.image} alt="" fill sizes="56px" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold leading-tight">{t.name}</span>
                        <span className="block text-[13px] text-white/60">{t.cafe}</span>
                      </span>
                      {active && <Check className="mr-2 size-4 text-emerald-400" aria-label="Currently viewing" />}
                    </button>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                go('/', { color: '#0E0D0C', fg: '#F3EFE9', label: 'Template Café', font: "'Instrument Serif', serif" })
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/12 px-4 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> All templates
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        className="flex h-12 items-center gap-2 rounded-full border border-white/15 bg-[#121110]/85 pl-4 pr-5 text-sm font-medium text-white shadow-[0_12px_40px_-10px_rgba(0,0,0,.6)] backdrop-blur-xl transition hover:bg-[#121110] active:scale-95"
      >
        <LayoutTemplate className="size-[18px]" aria-hidden="true" />
        Templates
      </button>
    </div>
  )
}
