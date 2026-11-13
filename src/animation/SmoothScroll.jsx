import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap.js'

const Ctx = createContext({ scrollTo: () => {} })
export const useSmoothScroll = () => useContext(Ctx)

/**
 * Lenis smooth scrolling — desktop pointer devices only, never under reduced motion
 * (touch devices keep native momentum scrolling; PRD §13). Also handles in-page
 * anchor links with a header offset and moves focus to the target for a11y.
 */
export function SmoothScroll({ enabled = true, options, offset = -72, children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!enabled || !fine || reduced) return
    const lenis = new Lenis({ smoothWheel: true, ...options })
    lenisRef.current = lenis
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      lenisRef.current = null
      if (window.__lenis === lenis) window.__lenis = null
    }
    // options are static per template
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  const scrollTo = useCallback(
    (target, { immediate = false } = {}) => {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (target === 0 || target === '#top' || target === '#home') {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate })
        else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
        return
      }
      if (!el) return
      if (lenisRef.current) lenisRef.current.scrollTo(el, { offset, immediate, duration: 1.4 })
      else el.scrollIntoView({ behavior: immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
      // Move keyboard focus to the section without scrolling again.
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
    },
    [offset],
  )

  // Delegate all in-page anchor clicks.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const hash = a.getAttribute('href')
      if (hash.length < 2) return
      const el = document.querySelector(hash)
      if (!el && hash !== '#top') return
      e.preventDefault()
      scrollTo(hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [scrollTo])

  const value = useMemo(() => ({ scrollTo }), [scrollTo])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
