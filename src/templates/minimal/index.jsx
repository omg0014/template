import { useRef, useState } from 'react'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/inter'
import './minimal.css'
import { CafeProvider } from '../../app/CafeProvider.jsx'
import { usePageReady } from '../../app/TransitionProvider.jsx'
import { gsap, MQ, useGSAP } from '../../animation/gsap.js'
import { batchReveal, countUp, parallax } from '../../animation/reveal.js'
import { PRESETS } from '../../animation/presets.js'
import { useAutoRefresh } from '../../animation/useAutoRefresh.js'
import { DishDialogContext } from '../../hooks/useDishDialog.js'
import { useDeferredMount } from '../../hooks/useDeferredMount.js'
import { resolveCafe } from '../useTemplateCafe.js'
import { DishDialog } from './ui.jsx'
import { Nav } from './sections/Nav.jsx'
import { Hero } from './sections/Hero.jsx'
import { Signature } from './sections/Signature.jsx'
import { Menu } from './sections/Menu.jsx'
import { Showcase } from './sections/Showcase.jsx'
import { Bestsellers } from './sections/Bestsellers.jsx'
import { Story } from './sections/Story.jsx'
import { Gallery } from './sections/Gallery.jsx'
import { Reviews } from './sections/Reviews.jsx'
import { Visit } from './sections/Visit.jsx'
import { Footer } from './sections/Footer.jsx'

const P = PRESETS.minimal

/** Modern Minimal template — cream, editorial, quiet motion. */
export default function MinimalTemplate({ cafeId }) {
  return (
    <CafeProvider cafe={resolveCafe('minimal', cafeId)}>
      <MinimalPage />
    </CafeProvider>
  )
}

function MinimalPage() {
  usePageReady()
  const main = useRef(null)
  const rest = useDeferredMount() // below-the-fold sections mount after the hero's first paint
  const [dish, setDish] = useState(null)

  useAutoRefresh(main) // re-measure scroll triggers whenever the page height changes (menu filters, fonts…)

  useGSAP(
    () => {
      if (!rest) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        batchReveal('[data-min-reveal]', main.current, { y: P.distance, duration: P.duration, ease: P.ease, stagger: P.stagger })
        batchReveal('[data-min-card]', main.current, { y: 32, duration: 0.9, ease: P.ease, stagger: 0.08 })
        countUp('[data-count]', main.current, { duration: 1.6 })
      })
      mm.add(MQ.desktop, () => parallax('[data-min-parallax]', main.current, { amount: 8 }))
      return () => mm.revert()
    },
    { scope: main, dependencies: [rest], revertOnUpdate: true },
  )

  return (
    <DishDialogContext.Provider value={setDish}>
      <div id="top" className="min-h-svh bg-bg font-body text-ink antialiased selection:bg-accent selection:text-bg">
        <Nav />
        <main id="main" ref={main} tabIndex={-1} className="outline-none">
          <Hero />
          {rest && (
            <>
              <Signature />
              <Menu />
              <Showcase />
              <Bestsellers />
              <Story />
              <Gallery />
              <Reviews />
              <Visit />
            </>
          )}
        </main>
        {rest && <Footer />}
        <DishDialog dish={dish} onClose={() => setDish(null)} />
      </div>
    </DishDialogContext.Provider>
  )
}
