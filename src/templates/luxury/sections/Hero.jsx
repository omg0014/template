import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { gsap, MQ, useGSAP } from '../../../animation/gsap.js'
import { MaskLine } from '../../../animation/Split.jsx'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpeningStatus } from '../../../hooks/useOpeningStatus.js'
import { Img } from '../../../components/Img.jsx'
import { Stars } from '../../../components/Stars.jsx'
import { WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { whatsappUrl } from '../../../lib/whatsapp.js'
import { GoldButton } from '../ui.jsx'

export function Hero({ delay = 0 }) {
  const root = useRef(null)
  const cafe = useCafe()
  const { hero, contact, rating, locale } = cafe
  const status = useOpeningStatus(contact.hours, locale.timezone)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ delay })
        tl.fromTo('[data-hero-img]', { scale: 1.28 }, { scale: 1, duration: 2.8, ease: 'power3.out' }, 0)
          .from('[data-hero-dim]', { opacity: 0.85, duration: 2, ease: 'power2.out' }, 0)
          .from('.split-line', { yPercent: 115, rotate: 2, duration: 1.5, ease: 'expo.out', stagger: 0.14 }, 0.25)
          // "Focus pull": copy starts blurred & dim but painted (it's the LCP element), then sharpens.
          .from('[data-hero-fade]', { opacity: 0.25, filter: 'blur(10px)', y: 24, duration: 1.3, ease: 'power3.out', stagger: 0.08, clearProps: 'filter' }, 0.15)
          .from('[data-hero-rule]', { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 0.4)
      })
      mm.add(MQ.desktop, () => {
        gsap.to('[data-hero-parallax]', { yPercent: 16, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to('[data-hero-content]', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      })
      return () => mm.revert()
    },
    { scope: root }, // delay is fixed for the lifetime of the page
  )

  return (
    <section id="home" ref={root} aria-label="Welcome" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <div data-hero-parallax className="absolute inset-0">
        <div data-hero-img className="absolute inset-0 will-change-transform">
          <Img src={hero.image} alt="" fill priority sizes="100vw" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/40" />
      <div className="lux-vignette absolute inset-0" />
      <div data-hero-dim aria-hidden="true" className="absolute inset-0 bg-bg opacity-0" />

      <div data-hero-content className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 pt-28 md:px-10 md:pb-20">
        <p data-hero-fade className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.38em] text-accent">
          <span data-hero-rule aria-hidden="true" className="h-px w-12 origin-left bg-accent" />
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 font-display text-[clamp(3.6rem,13vw,11.5rem)] font-light leading-[0.86] tracking-[-0.02em] text-ink">
          {hero.headline.map((line, i) => (
            <MaskLine key={line} className={i === 1 ? 'pl-[8vw] md:pl-[12vw]' : undefined}>
              {i === 1 ? <em className="lux-gold pr-2">{line}</em> : line}
            </MaskLine>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,32rem)_1fr] md:items-end">
          <div>
            <p data-hero-fade className="max-w-md text-pretty text-[15px] leading-relaxed text-ink/75 md:text-base">
              {hero.description}
            </p>
            <div data-hero-fade className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GoldButton href={hero.primaryCta.href} variant="solid">
                {hero.primaryCta.label}
              </GoldButton>
              {hero.whatsappCta && (
                <GoldButton href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer" icon={WhatsAppIcon}>
                  {hero.whatsappCta.label}
                </GoldButton>
              )}
            </div>
          </div>
          <div data-hero-fade className="flex items-end justify-between gap-6 md:justify-end md:gap-14">
            <div className="text-left md:text-right">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ink/70 md:justify-end">
                <span aria-hidden="true" className={`size-1.5 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-accent/60'}`} />
                {status.label}
              </p>
              <p className="mt-3 flex items-center gap-3 md:justify-end">
                <Stars rating={rating.value} size={13} color="var(--c-accent)" />
                <span className="text-xs text-muted">
                  {rating.value} · {rating.count} reviews
                </span>
              </p>
            </div>
            <a href="#signature" className="hidden flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted md:flex" aria-label="Scroll to signature dishes">
              <span className="relative h-16 w-px overflow-hidden bg-line">
                <span className="lux-scroll-line absolute inset-0 bg-accent" />
              </span>
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
