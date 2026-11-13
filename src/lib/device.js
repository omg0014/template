let webglCache
/** True if a WebGL context can be created. Cached. */
export function hasWebGL() {
  if (webglCache !== undefined) return webglCache
  try {
    const c = document.createElement('canvas')
    webglCache = !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    webglCache = false
  }
  return webglCache
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

/**
 * Decide how the 3D showcase should load.
 * 'auto'    → load when near viewport
 * 'opt-in'  → show poster + "View in 3D" button (low-power / data-saver)
 * 'none'    → photo fallback only (no WebGL)
 */
export function get3DMode() {
  if (typeof window === 'undefined' || !hasWebGL()) return 'none'
  const nav = navigator
  const saveData = nav.connection?.saveData
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2
  const lowCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2
  if (saveData || lowMemory || lowCores) return 'opt-in'
  return 'auto'
}
