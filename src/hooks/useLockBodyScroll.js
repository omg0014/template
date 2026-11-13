import { useEffect } from 'react'

let locks = 0
/** Lock page scroll while `active` (ref-counted so nested dialogs work). Also pauses Lenis. */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return
    locks++
    const html = document.documentElement
    const scrollbar = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`
    window.__lenis?.stop()
    return () => {
      locks--
      if (locks === 0) {
        html.style.overflow = ''
        html.style.paddingRight = ''
        window.__lenis?.start()
      }
    }
  }, [active])
}
