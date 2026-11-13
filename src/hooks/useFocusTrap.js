import { useEffect } from 'react'

const FOCUSABLE = 'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Trap keyboard focus inside `ref` while active, close on Escape,
 * and restore focus to the previously focused element on deactivate.
 */
export function useFocusTrap(ref, active, { onEscape, initialFocus } = {}) {
  useEffect(() => {
    if (!active) return
    const node = ref.current
    if (!node) return
    const previouslyFocused = document.activeElement
    const focusables = () => [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement)

    const first = initialFocus?.current ?? focusables()[0] ?? node
    requestAnimationFrame(() => first?.focus({ preventScroll: true }))

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onEscape?.()
        return
      }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (!list.length) {
        e.preventDefault()
        return
      }
      const firstEl = list[0]
      const lastEl = list[list.length - 1]
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }
    node.addEventListener('keydown', onKey)
    return () => {
      node.removeEventListener('keydown', onKey)
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
}
