import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'

const Ctx = createContext(null)
export const usePageTransition = () => useContext(Ctx)

const EASE = [0.76, 0, 0.24, 1]

/**
 * Branded curtain for template switching (PRD §7.3):
 * cover (≤700ms) → navigate behind curtain → new page calls ready() once mounted
 * and fonts are loaded → reveal (≤700ms).
 */
export function TransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [state, setState] = useState({ phase: 'idle' })
  const pendingPath = useRef(null)
  const viaTransition = useRef(false)
  const safety = useRef()

  const go = useCallback(
    (to, meta = {}) => {
      if (to === location.pathname) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        viaTransition.current = true
        window.scrollTo(0, 0)
        navigate(to)
        return
      }
      pendingPath.current = to
      setState({ phase: 'cover', color: meta.color ?? '#0e0d0c', fg: meta.fg ?? '#fff', label: meta.label ?? '', font: meta.font })
    },
    [navigate, location.pathname],
  )

  const onCovered = () => {
    window.__lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    viaTransition.current = true
    navigate(pendingPath.current)
    setState((s) => ({ ...s, phase: 'covered' }))
    clearTimeout(safety.current)
    safety.current = setTimeout(() => setState((s) => (s.phase === 'covered' ? { ...s, phase: 'reveal' } : s)), 4000)
  }

  /** Called by each page once it has mounted. Waits briefly for web fonts to avoid a flash. */
  const ready = useCallback(() => {
    const fonts = document.fonts?.ready ?? Promise.resolve()
    Promise.race([fonts, new Promise((r) => setTimeout(r, 900))]).then(() => {
      clearTimeout(safety.current)
      setState((s) => (s.phase === 'covered' ? { ...s, phase: 'reveal' } : s))
    })
  }, [])

  useEffect(() => () => clearTimeout(safety.current), [])

  const value = useMemo(
    () => ({ go, ready, phase: state.phase, consumeArrivedViaTransition: () => viaTransition.current }),
    [go, ready, state.phase],
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {state.phase !== 'idle' && (
          <motion.div
            key="curtain"
            aria-hidden="true"
            className="pointer-events-auto fixed inset-0 z-[300] grid place-items-center"
            style={{ background: state.color, color: state.fg }}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={state.phase === 'reveal' ? { clipPath: 'inset(0% 0% 100% 0%)' } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 0.7, ease: EASE }}
            onAnimationComplete={() => {
              if (state.phase === 'cover') onCovered()
              else if (state.phase === 'reveal') {
                setState({ phase: 'idle' })
                // Re-measure scroll-linked animations now the curtain is gone (gsap is already loaded by templates).
                import('../animation/gsap.js').then(({ ScrollTrigger }) => ScrollTrigger.refresh())
              }
            }}
          >
            <motion.span
              className="px-6 text-center text-4xl leading-none md:text-6xl"
              style={{ fontFamily: state.font }}
              initial={{ opacity: 0, y: 24 }}
              animate={state.phase === 'reveal' ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: state.phase === 'cover' ? 0.15 : 0 }}
            >
              {state.label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

/** Signal the transition curtain that this page is ready to be revealed. */
export function usePageReady() {
  const { ready } = usePageTransition()
  useEffect(() => {
    ready()
  }, [ready])
}
