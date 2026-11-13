import { useRef } from 'react'
import { Star } from 'lucide-react'
import { gsap, MQ, useGSAP } from '../../../animation/gsap.js'
import { SplitWords } from '../../../animation/Split.jsx'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpeningStatus } from '../../../hooks/useOpeningStatus.js'
import { Img } from '../../../components/Img.jsx'
import { usePriceFormatter } from '../../../components/Price.jsx'
import { WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { whatsappUrl } from '../../../lib/whatsapp.js'
import { PillButton } from '../ui.jsx'

export function Hero() {
  const root = useRef(null)
  const cafe = useCafe()
  const { hero, contact, rating, locale } = cafe
  const status = useOpeningStatus(contact.hours, locale.timezone)
  const price = usePriceFormatter()
  const featured = cafe.lookup.item(cafe.signatureIds[0])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power2.out' } })
        tl.from('.split-word', { yPercent: 100, opacity: 0, duration: 0.9, stagger: 0.06 })
          .from('[data-hero-fade]', { opacity: 0, y: 16, duration: 0.8, stagger: 0.07 }, 0.35)
          .fromTo('[data-hero-arch]', { clipPath: 'inset(22% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' }, 0) // starts partly open: it's the LCP image
          .from('[data-hero-arch] img:not([aria-hidden])', { scale: 1.12, duration: 1.6, ease: 'power2.out' }, 0.1)
      })
      mm.add(MQ.desktop, () => {
        gsap.to('[data-hero-arch]', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section id="home" ref={root} aria-label="Welcome" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 md:px-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-14">
        <div className="lg:col-span-7 lg:pb-6">
          <p data-hero-fade className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[clamp(3.4rem,9.5vw,9rem)] leading-[0.92] tracking-[-0.02em] text-ink">
            {hero.headline.map((line, i) => (
              <span key={line} className="block">
                <SplitWords text={line} mask className={i === 1 ? 'italic text-accent' : undefined} />
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-muted">
            {hero.description}
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <PillButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PillButton>
            {hero.whatsappCta && (
              <PillButton variant="ghost" href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer" icon={WhatsAppIcon}>
                {hero.whatsappCta.label}
              </PillButton>
            )}
          </div>
          <dl data-hero-fade className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-line border-y border-line text-sm">
            <div className="py-4 pr-4">
              <dt className="text-xs text-muted">Today</dt>
              <dd className="mt-1 flex items-center gap-1.5 text-ink">
                <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${status.isOpen ? 'bg-emerald-600' : 'bg-muted'}`} />
                <span className="truncate">{status.isOpen ? 'Open now' : 'Closed'}</span>
              </dd>
            </div>
            <div className="px-4 py-4">
              <dt className="text-xs text-muted">Find us</dt>
              <dd className="mt-1 truncate text-ink">{contact.address.city}</dd>
            </div>
            <div className="py-4 pl-4">
              <dt className="text-xs text-muted">Rated</dt>
              <dd className="mt-1 flex items-center gap-1 text-ink">
                <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
                {rating.value} <span className="text-muted">({rating.count})</span>
              </dd>
            </div>
          </dl>
        </div>
        <figure className="relative lg:col-span-5">
          <div data-hero-arch className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-t-full lg:aspect-auto lg:h-[min(76svh,760px)] lg:max-w-none">
            <Img src={hero.image} alt={`${featured?.name ?? 'Coffee'} being poured`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          {featured && (
            <figcaption data-hero-fade className="mx-auto mt-4 flex max-w-[520px] items-center justify-between text-sm text-muted lg:max-w-none">
              <span>
                Pictured: <span className="text-ink">{featured.name}</span>
              </span>
              <span className="font-display text-xl text-ink">{price(featured.price)}</span>
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  )
}
