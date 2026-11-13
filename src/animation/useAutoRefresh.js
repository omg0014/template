import { useEffect } from 'react'
import { ScrollTrigger } from './gsap.js'

/**
 * Keeps ScrollTrigger positions in sync with the page. Menu filtering, "See all", web fonts,
 * dialogs and lazy content all change the document height; without a refresh, reveal triggers
 * below the change keep stale positions and their content can stay hidden.
 */
export function useAutoRefresh(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    let last = el.offsetHeight
    let timer
    const ro = new ResizeObserver(() => {
      const h = el.offsetHeight
      if (Math.abs(h - last) < 2) return
      last = h
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 120)
    })
    ro.observe(el)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      ro.disconnect()
      clearTimeout(timer)
    }
  }, [ref])
}
