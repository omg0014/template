import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useOpeningStatus } from '../../../hooks/useOpeningStatus.js'
import { MapEmbed } from '../../../components/MapEmbed.jsx'
import { SOCIAL_ICONS, WhatsAppIcon } from '../../../components/BrandIcons.jsx'
import { DAY_NAMES, hoursLabel, weekOrder } from '../../../lib/hours.js'
import { mapsDirectionsUrl, telUrl, whatsappUrl } from '../../../lib/whatsapp.js'
import { ChunkyButton, Sticker, Title } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

export function Visit() {
  const { contact, locale, identity } = useCafe()
  const status = useOpeningStatus(contact.hours, locale.timezone)
  return (
    <section id="visit" aria-labelledby="visit-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Sticker rotate={3} className="bg-pop-teal text-ink">
          Visit us
        </Sticker>
        <Title id="visit-title" className="mt-5">
          Come hang <span className="ff-stroke text-pop-orange">out</span>
        </Title>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6">
            <div data-ff-pop className="ff-card bg-pop-orange p-6 text-ink">
              <MapPin className="size-7" strokeWidth={2.25} aria-hidden="true" />
              <h3 className="mt-3 text-2xl font-extrabold">Find us</h3>
              <address className="mt-2 font-semibold not-italic leading-snug">
                {contact.address.line1}
                <br />
                {contact.address.line2}
              </address>
              <a href={mapsDirectionsUrl(contact.mapQuery)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-bold">
                <Navigation className="size-4" aria-hidden="true" /> Directions
              </a>
            </div>
            <div data-ff-pop className="ff-card bg-pop-teal p-6 text-ink">
              <Phone className="size-7" strokeWidth={2.25} aria-hidden="true" />
              <h3 className="mt-3 text-2xl font-extrabold">Holler at us</h3>
              <p className="mt-2 font-semibold">
                <a href={telUrl(contact.phone)} className="underline decoration-2 underline-offset-4">
                  {contact.phone}
                </a>
              </p>
              <p className="mt-1 break-all font-semibold">
                <a href={`mailto:${contact.email}`} className="underline decoration-2 underline-offset-4">
                  {contact.email}
                </a>
              </p>
              <ul className="mt-4 flex gap-2" aria-label="Social media">
                {Object.entries(contact.socials).map(([k, s]) => {
                  const Icon = SOCIAL_ICONS[k]
                  return (
                    <li key={k}>
                      <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${identity.name} on ${k}`} className="grid size-11 place-items-center rounded-full border-2 border-ink bg-white transition hover:-rotate-12">
                        {Icon && <Icon className="size-5" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div data-ff-pop className="ff-card bg-white p-6 text-ink sm:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-2xl font-extrabold">
                  <Clock className="size-6" strokeWidth={2.25} aria-hidden="true" /> Opening hours
                </h3>
                <span className={cn('rounded-full border-2 border-ink px-3 py-1 text-sm font-bold', status.isOpen ? 'bg-pop-teal' : 'bg-pop-orange')}>{status.label}</span>
              </div>
              <dl className="mt-4 grid gap-1.5">
                {weekOrder(contact.hours).map((h) => {
                  const today = h.day === status.today
                  return (
                    <div key={h.day} className={cn('flex justify-between rounded-xl px-3 py-1.5 font-semibold', today && 'border-2 border-ink bg-pop-yellow')} aria-current={today ? 'date' : undefined}>
                      <dt>
                        {DAY_NAMES[h.day]} {today && <span className="text-xs font-extrabold uppercase">· today</span>}
                      </dt>
                      <dd className="tabular-nums">{hoursLabel(h)}</dd>
                    </div>
                  )
                })}
              </dl>
              <ChunkyButton className="mt-6 w-full" color="pink" icon={WhatsAppIcon} href={whatsappUrl(contact.whatsapp.number, contact.whatsapp.message)} target="_blank" rel="noreferrer">
                Order on WhatsApp
              </ChunkyButton>
            </div>
          </div>
          <div data-ff-pop className="ff-card relative min-h-[380px] overflow-hidden bg-white lg:col-span-6">
            <MapEmbed query={contact.mapQuery} title={`Map showing ${identity.name}, ${contact.address.line2}`} className="ff-map absolute inset-0 bg-pop-yellow/40 text-ink" />
          </div>
        </div>
      </div>
    </section>
  )
}
