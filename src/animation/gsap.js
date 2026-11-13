/** Single place where GSAP plugins are registered (PLAN §7). */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)
gsap.config({ nullTargetWarn: false })

/** Media-query conditions used with gsap.matchMedia() across templates. */
export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
}

export { gsap, ScrollTrigger, useGSAP }
