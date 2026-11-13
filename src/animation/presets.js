/**
 * Motion personality per template (PRD §14). Components read these instead of
 * hard-coding durations/eases, so each template's feel is consistent and tunable.
 */
export const PRESETS = {
  luxury: {
    duration: 1.4, ease: 'expo.out', stagger: 0.12, distance: 60,
    reveal: 'power4.inOut', lenis: { lerp: 0.075, wheelMultiplier: 0.9 },
    motionEase: [0.16, 1, 0.3, 1],
  },
  minimal: {
    duration: 0.8, ease: 'power2.out', stagger: 0.06, distance: 24,
    reveal: 'power2.inOut', lenis: { lerp: 0.1, wheelMultiplier: 1 },
    motionEase: [0.25, 0.1, 0.25, 1],
  },
  colorful: {
    duration: 0.7, ease: 'back.out(1.7)', stagger: 0.05, distance: 40,
    reveal: 'back.out(1.4)', lenis: { lerp: 0.12, wheelMultiplier: 1.1 },
    spring: { type: 'spring', stiffness: 320, damping: 20 },
  },
}
