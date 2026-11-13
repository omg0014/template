import { gsap, ScrollTrigger } from './gsap.js'

/**
 * Reusable GSAP scroll reveals. Call ONLY inside useGSAP()/gsap.matchMedia() so they
 * are reverted automatically on unmount and skipped under reduced motion.
 */

/** Batched fade/rise for many elements (one ScrollTrigger per batch, not per element). */
export function batchReveal(selector, scope, { y = 40, x = 0, rotate = 0, scale = 1, duration = 1, ease = 'power3.out', stagger = 0.08, start = 'clamp(top 88%)' } = {}) {
  const els = gsap.utils.toArray(selector, scope)
  if (!els.length) return
  // opacity (not autoAlpha/visibility) so unrevealed headings stay in the accessibility tree
  gsap.set(els, { opacity: 0, y, x, rotate, scale })
  ScrollTrigger.batch(els, {
    start,
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1, duration, ease, stagger, overwrite: true }),
  })
}

/** Clip-path image reveal (bottom → top) with an inner zoom-out. */
export function clipReveal(selector, scope, { duration = 1.4, ease = 'power4.inOut', from = 'inset(100% 0% 0% 0%)', innerScale = 1.3, start = 'clamp(top 85%)' } = {}) {
  gsap.utils.toArray(selector, scope).forEach((el) => {
    const inner = el.querySelector('img:not([aria-hidden])')
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true } })
    tl.fromTo(el, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration, ease })
    if (inner) tl.fromTo(inner, { scale: innerScale }, { scale: 1, duration: duration * 1.3, ease: 'power3.out' }, 0)
  })
}

/** Scrubbed vertical parallax for elements inside their parent. */
export function parallax(selector, scope, { amount = 12, trigger } = {}) {
  gsap.utils.toArray(selector, scope).forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -amount / 2 },
      { yPercent: amount / 2, ease: 'none', scrollTrigger: { trigger: trigger ?? el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    )
  })
}

/** Count-up numbers: elements with data-count="48". */
export function countUp(selector, scope, { duration = 2, ease = 'power2.out' } = {}) {
  gsap.utils.toArray(selector, scope).forEach((el) => {
    const end = Number(el.dataset.count)
    const obj = { v: 0 }
    gsap.to(obj, {
      v: end,
      duration,
      ease,
      scrollTrigger: { trigger: el, start: 'clamp(top 90%)', once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString('en-IN')),
    })
  })
}
