import { useRef, useState } from 'react'
import '@fontsource-variable/cormorant-garamond'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/manrope'
import './luxury.css'
import { CafeProvider } from '../../app/CafeProvider.jsx'
import { usePageReady, usePageTransition } from '../../app/TransitionProvider.jsx'
import { gsap, MQ, useGSAP } from '../../animation/gsap.js'
import { batchReveal, clipReveal, countUp, parallax } from '../../animation/reveal.js'
import { PRESETS } from '../../animation/presets.js'
import { useAutoRefresh } from '../../animation/useAutoRefresh.js'
import { DishDialogContext } from '../../hooks/useDishDialog.js'
import { useCafe } from '../../hooks/useCafe.js'
import { useDeferredMount } from '../../hooks/useDeferredMount.js'
import { resolveCafe } from '../useTemplateCafe.js'
import { DishDialog } from './ui.jsx'
import { Loader, LOADER_DURATION } from './sections/Loader.jsx'
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

const INTRO_KEY = 'tc:luxury-intro'
const P = PRESETS.luxury

/** Luxury Cinematic template — dark, gold, slow and dramatic. */
export default function LuxuryTemplate({ cafeId }) {
  return (
    <CafeProvider cafe={resolveCafe('luxury', cafeId)}>
      <LuxuryPage />
    </CafeProvider>
  )
}

function LuxuryPage() {
  usePageReady()
  const cafe = useCafe()
  const main = useRef(null)
  const rest = useDeferredMount() // below-the-fold sections mount after the hero's first paint
  const { consumeArrivedViaTransition } = usePageTransition()
  const [dish, setDish] = useState(null)
  // Decide once (on mount) whether to play the intro; the hero delay must stay stable afterwards.
  const [intro] = useState(() => {
    try {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return cafe.introLoader !== false && !reduced && !consumeArrivedViaTransition() && !sessionStorage.getItem(INTRO_KEY)
    } catch {
      return false
    }
  })
  const [showLoader, setShowLoader] = useState(intro)
  const heroDelay = intro ? LOADER_DURATION - 0.55 : 0.1

  useAutoRefresh(main) // re-measure scroll triggers whenever the page height changes (menu filters, fonts…)

  // One place for all scroll reveals in this template (reverted automatically on unmount).
  useGSAP(
    () => {
      if (!rest) return
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        batchReveal('[data-lux-reveal]', main.current, { y: P.distance, duration: P.duration, ease: P.ease, stagger: P.stagger })
        batchReveal('[data-lux-card]', main.current, { y: 80, duration: 1.3, ease: P.ease, stagger: 0.1 })
        clipReveal('[data-lux-clip]', main.current, { duration: 1.6, ease: P.reveal })
        countUp('[data-count]', main.current, { duration: 2.4 })
      })
      mm.add(MQ.desktop, () => parallax('[data-lux-parallax]', main.current, { amount: 14 }))
      return () => mm.revert()
    },
    { scope: main, dependencies: [rest], revertOnUpdate: true },
  )

  return (
    <DishDialogContext.Provider value={setDish}>
      <div id="top" className="grain min-h-svh bg-bg font-body text-ink antialiased selection:bg-accent selection:text-bg">
        {showLoader && (
          <Loader
            onDone={() => {
              try {
                sessionStorage.setItem(INTRO_KEY, '1')
              } catch {
                /* storage unavailable */
              }
              setShowLoader(false)
            }}
          />
        )}
        <Nav />
        <main id="main" ref={main} tabIndex={-1} className="outline-none">
          <Hero delay={heroDelay} />
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
