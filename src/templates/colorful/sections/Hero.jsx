import { useEffect, useRef } from 'react'
import { gsap, MQ, useGSAP } from '../../../animation/gsap.js'
import { SplitChars } from '../../../animation/Split.jsx'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpeningStatus } from '../../../hooks/useOpeningStatus.js'
import { useFinePointer, useReducedMotion } from '../../../hooks/useMediaQuery.js'
import { Img } from '../../../components/Img.jsx'
import { Stars } from '../../../components/Stars.jsx'
import { WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { whatsappUrl } from '../../../lib/whatsapp.js'
import { ChunkyButton } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

// Positions for the floating food "cut-outs" around the main image.
const FLOATERS = [
  { cls: 'left-[-4%] top-[6%] w-[30%] bg-pop-yellow', r: -8, depth: 30 },
  { cls: 'right-[-2%] top-[-2%] w-[26%] bg-pop-teal', r: 10, depth: 45 },
  { cls: 'right-[-6%] bottom-[14%] w-[30%] bg-pop-violet', r: 6, depth: 25 },
  { cls: 'left-[2%] bottom-[-2%] w-[24%] bg-pop-orange', r: -12, depth: 40 },
]

export function Hero() {
  const root = useRef(null)
  const cafe = useCafe()
  const { hero, contact, rating, identity, locale } = cafe
  const status = useOpeningStatus(contact.hours, locale.timezone)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ delay: 0.1 })
        tl.from('.split-char', { yPercent: 120, rotate: () => gsap.utils.random(-25, 25), opacity: 0, duration: 0.8, ease: 'back.out(2)', stagger: 0.03 })
          .from('[data-hero-main]', { scale: 0.4, rotate: -20, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.6)' }, 0.2)
          .from('[data-floater]', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2.2)', stagger: 0.08 }, 0.45)
          .from('[data-hero-pop]', { y: 30, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.07 }, 0.2) // no opacity: hero copy is an LCP candidate
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  // Pointer parallax for the food cut-outs (desktop pointer only).
  useEffect(() => {
    if (!fine || reduced) return
    const el = root.current
    const items = [...el.querySelectorAll('[data-depth]')].map((n) => ({
      x: gsap.quickTo(n, 'x', { duration: 0.8, ease: 'power3' }),
      y: gsap.quickTo(n, 'y', { duration: 0.8, ease: 'power3' }),
      d: Number(n.dataset.depth),
    }))
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      items.forEach((it) => {
        it.x(nx * it.d)
        it.y(ny * it.d)
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [fine, reduced])

  return (
    <section id="home" ref={root} aria-label="Welcome" className="ff-dots relative overflow-hidden bg-pop-pink pb-0 pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-16 md:px-8 lg:grid-cols-2 lg:gap-6 lg:pb-24">
        <div className="relative z-10">
          <p data-hero-pop className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-1.5 text-sm font-bold text-ink shadow-[3px_3px_0_var(--c-ink)]">
            <span aria-hidden="true" className={cn('size-2.5 rounded-full border border-ink', status.isOpen ? 'bg-pop-teal' : 'bg-pop-orange')} />
            {status.isOpen ? 'Open now' : 'Closed right now'} · {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-[clamp(4rem,15vw,10.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.04em] text-ink">
            {hero.headline.map((line, i) => (
              <span key={line} className={cn('block', i === 1 && 'ff-stroke text-pop-yellow', i === 2 && 'md:pl-[10%]')}>
                <SplitChars text={line} />
              </span>
            ))}
          </h1>
          <p data-hero-pop className="mt-7 max-w-md text-pretty text-lg font-medium leading-relaxed text-ink md:text-xl">
            {hero.description}
          </p>
          <div data-hero-pop className="mt-8 flex flex-wrap gap-3">
            <ChunkyButton href={hero.primaryCta.href} color="yellow">
              {hero.primaryCta.label} →
            </ChunkyButton>
            {hero.whatsappCta && (
              <ChunkyButton href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer" color="white" icon={WhatsAppIcon}>
                {hero.whatsappCta.label}
              </ChunkyButton>
            )}
          </div>
          <div data-hero-pop className="mt-8 flex items-center gap-3 text-sm font-bold text-ink">
            <Stars rating={rating.value} size={18} color="var(--c-ink)" />
            {rating.value} from {rating.count} happy humans
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div data-depth="12" className="absolute inset-[12%]">
            <div data-hero-main className="relative size-full overflow-hidden rounded-full border-[3px] border-ink shadow-[10px_10px_0_var(--c-ink)]">
              <Img src={hero.image} alt="A tower of sprinkle donuts" fill priority sizes="(min-width: 1024px) 420px, 76vw" />
            </div>
          </div>
          {hero.floating?.slice(0, 4).map((img, i) => {
            const f = FLOATERS[i]
            return (
              <div key={img} data-depth={f.depth} className={cn('absolute aspect-square', f.cls.split(' ').filter((c) => !c.startsWith('bg-')).join(' '))}>
                <div data-floater className="ff-float size-full" style={{ '--r': `${f.r}deg`, animationDelay: `${i * -1.4}s` }}>
                  <div className={cn('size-full overflow-hidden rounded-full border-[3px] border-ink p-1.5 shadow-[5px_5px_0_var(--c-ink)]', f.cls.split(' ').find((c) => c.startsWith('bg-')))}>
                    <div className="relative size-full overflow-hidden rounded-full">
                      <Img src={img} alt="" fill sizes="160px" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {/* Spinning circular badge */}
          <div data-floater className="absolute bottom-[30%] left-[-2%] z-10 size-28 md:size-32">
            <svg viewBox="0 0 120 120" className="ff-spin size-full" aria-hidden="true">
              <defs>
                <path id="ff-badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <circle cx="60" cy="60" r="58" fill="var(--c-yellow)" stroke="var(--c-ink)" strokeWidth="3" />
              <text fontSize="12.5" fontWeight="800" letterSpacing="2.4" fill="var(--c-ink)">
                <textPath href="#ff-badge-circle">{`SINCE ${identity.established} • ${contact.address.city.toUpperCase()} • YUM •`}</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center text-3xl" aria-hidden="true">
              ✺
            </span>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative z-10 -rotate-1 border-y-[3px] border-ink bg-pop-yellow py-3 md:py-4" aria-hidden="true">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 whitespace-nowrap text-xl font-extrabold uppercase tracking-tight text-ink md:text-3xl">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8">
              {[...hero.ticker, ...hero.ticker].map((w, i) => (
                <span key={i} className="flex items-center gap-8">
                  {w}
                  <span className="text-pop-pink">✺</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
