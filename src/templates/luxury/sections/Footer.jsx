import { ArrowUp } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useSmoothScroll } from '../../../animation/SmoothScroll.jsx'
import { SOCIAL_ICONS } from '../../../components/BrandIcons.jsx'
import { telUrl } from '../../../lib/whatsapp.js'

export function Footer() {
  const { identity, navigation, contact } = useCafe()
  const { scrollTo } = useSmoothScroll()
  return (
    <footer className="relative overflow-hidden pb-28 pt-24 md:pb-10">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 border-b border-line pb-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-4xl font-light italic text-accent-soft">{identity.tagline}.</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {contact.address.line1}, {contact.address.line2}
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-ink/80">
              {navigation.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-accent-soft">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-accent">Say hello</p>
            <ul className="mt-5 space-y-3 text-sm text-ink/80">
              <li>
                <a href={telUrl(contact.phone)} className="hover:text-accent-soft">{contact.phone}</a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-accent-soft">{contact.email}</a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-4" aria-label="Social media">
              {Object.entries(contact.socials).map(([k, s]) => {
                const Icon = SOCIAL_ICONS[k]
                return (
                  <li key={k}>
                    <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${identity.name} on ${k}`} className="text-ink/70 transition hover:text-accent">
                      {Icon && <Icon className="size-5" />}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="lux-outline select-none whitespace-nowrap py-10 text-center font-display text-[17vw] font-light leading-none tracking-[-0.03em] md:py-6">
          {identity.name}
        </p>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {identity.name}. All rights reserved. · Photography via{' '}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-ink">
              Unsplash
            </a>
          </p>
          <button type="button" onClick={() => scrollTo('#top')} className="inline-flex items-center gap-2 uppercase tracking-[0.3em] text-accent-soft hover:text-accent">
            Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
