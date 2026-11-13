import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpeningStatus } from '../../../hooks/useOpeningStatus.js'
import { MapEmbed } from '../../../components/MapEmbed.jsx'
import { SOCIAL_ICONS, WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { DAY_NAMES, hoursLabel, weekOrder } from '../../../lib/hours.js'
import { mapsDirectionsUrl, telUrl, whatsappUrl } from '../../../lib/whatsapp.js'
import { Heading, Kicker, PillButton } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

export function Visit() {
  const { contact, locale, identity } = useCafe()
  const status = useOpeningStatus(contact.hours, locale.timezone)
  return (
    <section id="visit" aria-labelledby="visit-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Kicker>Visit</Kicker>
        <Heading id="visit-title" className="mt-5">
          Pull up a <em className="text-accent">chair.</em>
        </Heading>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div data-min-card className="space-y-px overflow-hidden rounded-[28px] border border-line bg-line lg:col-span-5">
            <div className="bg-surface p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Address</p>
              <address className="mt-3 text-lg not-italic leading-relaxed text-ink">
                {contact.address.line1}
                <br />
                {contact.address.line2}
              </address>
              <a href={mapsDirectionsUrl(contact.mapQuery)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline">
                Get directions <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <div className="bg-surface p-7">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Opening hours</p>
                <span className={cn('rounded-full px-3 py-1 text-xs font-medium', status.isOpen ? 'bg-emerald-50 text-emerald-800' : 'bg-beige text-muted')}>{status.label}</span>
              </div>
              <dl className="mt-4 space-y-2 text-[15px]">
                {weekOrder(contact.hours).map((h) => {
                  const today = h.day === status.today
                  return (
                    <div key={h.day} className={cn('flex justify-between', today ? 'font-medium text-ink' : 'text-muted')} aria-current={today ? 'date' : undefined}>
                      <dt>
                        {DAY_NAMES[h.day]}
                        {today && <span className="ml-2 text-xs text-accent">Today</span>}
                      </dt>
                      <dd className="tabular-nums">{hoursLabel(h)}</dd>
                    </div>
                  )
                })}
              </dl>
            </div>
            <div className="bg-surface p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Get in touch</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <PillButton href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer" icon={WhatsAppIcon}>
                  WhatsApp
                </PillButton>
                <PillButton variant="ghost" href={telUrl(contact.phone)} icon={Phone}>
                  Call
                </PillButton>
                <PillButton variant="ghost" href={`mailto:${contact.email}`} icon={Mail}>
                  Email
                </PillButton>
              </div>
              <ul className="mt-5 flex gap-2" aria-label="Social media">
                {Object.entries(contact.socials).map(([k, s]) => {
                  const Icon = SOCIAL_ICONS[k]
                  return (
                    <li key={k}>
                      <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${identity.name} on ${k}`} className="grid size-11 place-items-center rounded-full bg-bg text-ink transition hover:bg-beige">
                        {Icon && <Icon className="size-[18px]" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div data-min-card className="relative min-h-[380px] overflow-hidden rounded-[28px] border border-line lg:col-span-7">
            <MapEmbed query={contact.mapQuery} title={`Map showing ${identity.name}, ${contact.address.line2}`} className="min-map absolute inset-0 bg-beige text-muted" />
          </div>
        </div>
      </div>
    </section>
  )
}
