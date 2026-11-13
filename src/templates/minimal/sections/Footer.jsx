import { ArrowUp } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useSmoothScroll } from '../../../animation/SmoothScroll.jsx'
import { SOCIAL_ICONS } from '../../../components/BrandIcons.jsx'
import { telUrl } from '../../../lib/whatsapp.js'

export function Footer() {
  const { identity, navigation, contact } = useCafe()
  const { scrollTo } = useSmoothScroll()
  return (
    <footer className="bg-ink pb-28 pt-20 text-bg md:pb-10 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="max-w-4xl font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95]">
          See you at <em className="text-accent-soft">the counter.</em>
        </p>
        <div className="mt-16 grid gap-10 border-t border-bg/15 pt-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-3xl">{identity.name}</p>
            <p className="mt-2 text-sm text-bg/60">{identity.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="space-y-2 text-sm text-bg/75">
              {navigation.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-bg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <address className="space-y-2 text-sm not-italic text-bg/75">
            <p>
              {contact.address.line1}
              <br />
              {contact.address.line2}
            </p>
            <p>
              <a href={telUrl(contact.phone)} className="hover:text-bg">{contact.phone}</a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`} className="hover:text-bg">{contact.email}</a>
            </p>
          </address>
          <ul className="flex gap-2 md:justify-end" aria-label="Social media">
            {Object.entries(contact.socials).map(([k, s]) => {
              const Icon = SOCIAL_ICONS[k]
              return (
                <li key={k}>
                  <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${identity.name} on ${k}`} className="grid size-11 place-items-center rounded-full border border-bg/20 transition hover:bg-bg hover:text-ink">
                    {Icon && <Icon className="size-[18px]" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 text-xs text-bg/50 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {identity.name}. Photography via{' '}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-bg">
              Unsplash
            </a>
            .
          </p>
          <button type="button" onClick={() => scrollTo('#top')} className="inline-flex items-center gap-2 self-start text-bg/75 hover:text-bg md:self-auto">
            Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}
