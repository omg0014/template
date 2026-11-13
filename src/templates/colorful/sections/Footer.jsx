import { ArrowUp } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useSmoothScroll } from '../../../animation/SmoothScroll.jsx'
import { SOCIAL_ICONS } from '../../../components/BrandIcons.jsx'
import { telUrl } from '../../../lib/whatsapp.js'
import { popBg } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

export function Footer() {
  const { identity, navigation, contact } = useCafe()
  const { scrollTo } = useSmoothScroll()
  const words = identity.name.split(' ')
  return (
    <footer className="relative bg-ink pb-28 pt-6 text-white md:pb-10">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute inset-x-0 -top-px h-10 w-full md:h-14" aria-hidden="true">
        <path d="M0 0h1440v20c-120 30-240 30-360 0s-240-30-360 0-240 30-360 0S120-10 0 20z" fill="var(--c-bg)" />
      </svg>
      <div className="mx-auto max-w-[1400px] px-5 pt-20 md:px-8 md:pt-28">
        <p aria-hidden="true" className="flex flex-wrap gap-x-4 text-[clamp(3.5rem,13vw,11rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em]">
          {words.map((w, i) => (
            <span key={w} className={['text-pop-pink', 'text-pop-yellow', 'text-pop-teal'][i % 3]}>
              {w}
            </span>
          ))}
        </p>
        <div className="mt-14 grid gap-10 border-t-2 border-white/15 pt-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-2xl font-extrabold">{identity.tagline}</p>
            <p className="mt-2 text-sm font-medium text-white/70">
              {contact.address.line1}, {contact.address.line2}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="space-y-2 font-semibold">
              {navigation.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-pop-yellow">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-2 font-semibold">
            <p>
              <a href={telUrl(contact.phone)} className="hover:text-pop-yellow">{contact.phone}</a>
            </p>
            <p className="break-all">
              <a href={`mailto:${contact.email}`} className="hover:text-pop-yellow">{contact.email}</a>
            </p>
          </div>
          <ul className="flex gap-3 md:justify-end" aria-label="Social media">
            {Object.entries(contact.socials).map(([k, s], i) => {
              const Icon = SOCIAL_ICONS[k]
              return (
                <li key={k}>
                  <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${identity.name} on ${k}`} className={cn('grid size-12 place-items-center rounded-full border-2 border-white text-ink transition hover:-rotate-12', popBg(i))}>
                    {Icon && <Icon className="size-5" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 text-sm font-medium text-white/60 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {identity.name}. Made with extra sprinkles. Photos via{' '}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-white">
              Unsplash
            </a>
            .
          </p>
          <button type="button" onClick={() => scrollTo('#top')} className="inline-flex items-center gap-2 self-start rounded-full border-2 border-white px-4 py-2 font-bold text-white hover:bg-white hover:text-ink md:self-auto">
            Back to top <ArrowUp className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
