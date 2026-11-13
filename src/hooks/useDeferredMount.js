import { startTransition, useEffect, useState } from 'react'

/**
 * Returns false for the first paint, then true on the next frame (as a low-priority transition).
 * Templates render the hero immediately and mount below-the-fold sections afterwards, so the
 * LCP element paints without waiting for ~1,000 DOM nodes and dozens of ScrollTriggers.
 */
export function useDeferredMount() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => startTransition(() => setReady(true)))
    return () => cancelAnimationFrame(id)
  }, [])
  return ready
}
