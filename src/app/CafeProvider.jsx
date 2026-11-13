import { useLayoutEffect } from 'react'
import { CafeContext } from '../hooks/useCafe.js'
import { SmoothScroll } from '../animation/SmoothScroll.jsx'
import { PRESETS } from '../animation/presets.js'
import { CafeSEO } from '../components/SEO.jsx'
import { SkipLink } from '../components/SkipLink.jsx'

const kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

/**
 * Applies the cafe's theme tokens as CSS custom properties on <html>
 * (so portals/dialogs inherit them), provides the config via context,
 * and sets up smooth scrolling + SEO for the template.
 */
export function CafeProvider({ cafe, children }) {
  useLayoutEffect(() => {
    const root = document.documentElement
    const vars = {}
    Object.entries(cafe.theme.colors).forEach(([k, v]) => (vars[`--c-${kebab(k)}`] = v))
    vars['--f-display'] = cafe.theme.fonts.display
    vars['--f-body'] = cafe.theme.fonts.body
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v))
    root.dataset.template = cafe.template
    return () => {
      Object.keys(vars).forEach((k) => root.style.removeProperty(k))
      delete root.dataset.template
    }
  }, [cafe])

  return (
    <CafeContext.Provider value={cafe}>
      <SmoothScroll enabled={cafe.smoothScroll} options={PRESETS[cafe.template]?.lenis}>
        <SkipLink />
        <CafeSEO />
        {children}
      </SmoothScroll>
    </CafeContext.Provider>
  )
}
