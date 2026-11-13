import { Clock, MapPin, Navigation, Phone, Mail } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpeningStatus } from '../../../hooks/useOpeningStatus.js'
import { MapEmbed } from '../../../components/MapEmbed.jsx'
import { SOCIAL_ICONS, WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { DAY_NAMES, hoursLabel, weekOrder } from '../../../lib/hours.js'
import { mapsDirectionsUrl, telUrl, whatsappUrl } from '../../../lib/whatsapp.js'
import { Eyebrow, GoldButton, SectionTitle } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

export function Visit() {
  const { contact, locale, identity } = useCafe()
  const status = useOpeningStatus(contact.hours, locale.timezone)
  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-line bg-surface py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Visit</Eyebrow>
          <SectionTitle className="mt-6">
            <span id="visit-title">
              Come by <em className="text-accent-soft">candlelight</em>
            </span>
          </SectionTitle>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div data-lux-reveal>
              <h3 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent">
                <MapPin className="size-4" aria-hidden="true" /> Address
              </h3>
              <address className="mt-4 not-italic leading-relaxed text-ink/85">
                {contact.address.line1}
                <br />
                {contact.address.line2}
              </address>
              <a href={mapsDirectionsUrl(contact.mapQuery)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent-soft underline-offset-8 hover:underline">
                <Navigation className="size-3.5" aria-hidden="true" /> Get directions
              </a>
            </div>
            <div data-lux-reveal>
              <h3 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent">
                <Phone className="size-4" aria-hidden="true" /> Contact
              </h3>
              <ul className="mt-4 space-y-2 text-ink/85">
                <li>
                  <a href={telUrl(contact.phone)} className="hover:text-accent-soft">{contact.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-accent-soft">
                    <Mail className="size-4 text-muted" aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
              </ul>
              <ul className="mt-5 flex gap-3" aria-label="Social media">
                {Object.entries(contact.socials).map(([k, s]) => {
                  const Icon = SOCIAL_ICONS[k]
                  return (
                    <li key={k}>
                      <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${identity.name} on ${k}`} className="grid size-11 place-items-center border border-line text-ink/80 transition hover:border-accent hover:text-accent">
                        {Icon && <Icon className="size-[18px]" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div data-lux-reveal className="mt-12">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-accent">
                <Clock className="size-4" aria-hidden="true" /> Hours
              </h3>
              <span className={cn('flex items-center gap-2 text-xs', status.isOpen ? 'text-emerald-300' : 'text-muted')}>
                <span aria-hidden="true" className={cn('size-1.5 rounded-full', status.isOpen ? 'bg-emerald-400' : 'bg-muted')} />
                {status.label}
              </span>
            </div>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {weekOrder(contact.hours).map((h) => {
                const today = h.day === status.today
                return (
                  <div key={h.day} className={cn('flex justify-between py-3 text-sm', today ? 'text-accent-soft' : 'text-ink/75')} aria-current={today ? 'date' : undefined}>
                    <dt className="flex items-center gap-3">
                      {DAY_NAMES[h.day]}
                      {today && <span className="text-[9px] uppercase tracking-[0.3em] text-accent">Today</span>}
                    </dt>
                    <dd className="tabular-nums">{hoursLabel(h)}</dd>
                  </div>
                )
              })}
            </dl>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <GoldButton variant="solid" icon={WhatsAppIcon} href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer">
              WhatsApp us
            </GoldButton>
            <GoldButton icon={Phone} href={telUrl(contact.phone)}>
              Call
            </GoldButton>
          </div>
        </div>

        <div data-lux-clip className="relative min-h-[420px] overflow-hidden border border-line lg:min-h-full">
          <MapEmbed query={contact.mapQuery} title={`Map showing ${identity.name}, ${contact.address.line2}`} className="lux-map absolute inset-0 bg-bg text-accent/40" />
        </div>
      </div>
    </section>
  )
}
