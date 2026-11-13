import { useRef } from 'react'
import { gsap, useGSAP } from '../../../animation/gsap.js'
import { useCafe } from '../../../hooks/useCafe.js'

export const LOADER_DURATION = 1.7

/** Cinematic intro: monogram + counter, then a curtain lift. Shown once per session on direct visits. */
export function Loader({ onDone }) {
  const root = useRef(null)
  const { identity } = useCafe()

  useGSAP(
    () => {
      const counter = { v: 0 }
      const num = root.current.querySelector('[data-count]')
      const tl = gsap.timeline({ onComplete: onDone })
      tl.from('[data-mono] span', { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.1 })
        .to(counter, { v: 100, duration: 1.0, ease: 'power2.inOut', onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, '0')) }, 0)
        .fromTo('[data-line]', { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power2.inOut' }, 0)
        .to('[data-mono], [data-meta]', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, 1.0)
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'power4.inOut' }, 1.1)
    },
    { scope: root },
  )

  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[150] grid place-items-center bg-bg" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="text-center">
        <p data-mono className="flex justify-center overflow-hidden font-display text-7xl italic text-accent md:text-8xl">
          {[...identity.monogram].map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </p>
        <div data-meta className="mt-8 flex w-56 items-center gap-4 text-[11px] tracking-[0.3em] text-muted">
          <span data-count className="tabular-nums">000</span>
          <span data-line className="h-px flex-1 origin-left bg-accent/60" />
          <span>{identity.established}</span>
        </div>
      </div>
    </div>
  )
}
