import { useSyncExternalStore } from 'react'

/** Subscribe to a CSS media query. SSR-safe (returns false on the server). */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMediaQuery('(pointer: fine)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
