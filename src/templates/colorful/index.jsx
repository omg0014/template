import { useRef, useState } from 'react'
import '@fontsource-variable/bricolage-grotesque'
import './colorful.css'
import { CafeProvider } from '../../app/CafeProvider.jsx'
import { usePageReady } from '../../app/TransitionProvider.jsx'
import { gsap, MQ, useGSAP } from '../../animation/gsap.js'
import { batchReveal, countUp } from '../../animation/reveal.js'
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

const P = PRESETS.colorful

/** Creative & Colorful template — loud, playful, bouncy. */
export default function ColorfulTemplate({ cafeId }) {
  return (
    <CafeProvider cafe={resolveCafe('colorful', cafeId)}>
      <ColorfulPage />
    </CafeProvider>
  )
}

function ColorfulPage() {
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
        // Pop-in reveals with a little overshoot. Motion owns hover/tilt on the same cards via inner elements.
        batchReveal('[data-ff-pop]', main.current, { y: P.distance, scale: 0.92, duration: P.duration, ease: P.ease, stagger: P.stagger, start: 'top 90%' })
        countUp('[data-count]', main.current, { duration: 1.4, ease: 'back.out(1.4)' })
      })
      return () => mm.revert()
    },
    { scope: main, dependencies: [rest], revertOnUpdate: true },
  )

  return (
    <DishDialogContext.Provider value={setDish}>
      <div id="top" className="min-h-svh bg-bg font-body text-ink antialiased selection:bg-pop-yellow selection:text-ink">
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
