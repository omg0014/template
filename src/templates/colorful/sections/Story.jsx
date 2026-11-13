import { Dog, Leaf, Users } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { Img } from '../../../components/Img.jsx'
import { popBg, Sticker, Title } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

const HIGHLIGHT_ICONS = [Leaf, Users, Dog]

/** Comic-panel storytelling layout. */
export function Story() {
  const { story, identity, contact } = useCafe()
  return (
    <section id="story" aria-labelledby="story-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Sticker rotate={-4} className="bg-pop-orange text-ink">
          {story.eyebrow}
        </Sticker>
        <Title id="story-title" className="mt-5 max-w-5xl">
          {story.heading}
        </Title>

        <div className="mt-14 grid gap-5 md:grid-cols-6 md:grid-rows-[auto_auto]">
          <div data-ff-pop className="ff-card relative min-h-[320px] overflow-hidden bg-white md:col-span-4 md:row-span-2 md:min-h-[520px]">
            <Img src={story.image} alt="Inside the cafe" fill sizes="(min-width: 768px) 66vw, 100vw" />
            <Sticker rotate={-6} className="absolute bottom-5 left-5 bg-white text-ink">
              Est. {identity.established} · {contact.address.city}
            </Sticker>
          </div>
          <div data-ff-pop className="ff-card bg-white p-7 md:col-span-2">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} className="mt-3 text-[17px] font-medium leading-relaxed text-ink first:mt-0">
                {p}
              </p>
            ))}
          </div>
          <figure data-ff-pop className="ff-card relative bg-pop-pink p-7 md:col-span-2">
            <blockquote className="relative rounded-[22px] border-2 border-ink bg-white p-5 text-xl font-extrabold leading-snug text-ink">
              “{story.founder.quote}”
              <span aria-hidden="true" className="absolute -bottom-3 left-10 size-5 rotate-45 border-b-2 border-r-2 border-ink bg-white" />
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Img src={story.founder.image} alt={story.founder.name} ratio="1 / 1" sizes="64px" className="w-16 rounded-full border-2 border-ink" />
              <span className="text-ink">
                <span className="block text-lg font-extrabold leading-tight">{story.founder.name}</span>
                <span className="block text-sm font-semibold">{story.founder.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {story.highlights.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]
            return (
              <div key={h.title} data-ff-pop className={cn('ff-card ff-wobble p-6 text-ink', popBg(i + 1))}>
                <span className="grid size-12 place-items-center rounded-full border-2 border-ink bg-white">
                  <Icon className="size-6" aria-hidden="true" strokeWidth={2.25} />
                </span>
                <h3 className="mt-4 text-2xl font-extrabold tracking-tight">{h.title}</h3>
                <p className="mt-2 font-medium leading-snug">{h.text}</p>
              </div>
            )
          })}
        </div>

        <dl className="mt-14 flex flex-wrap justify-center gap-6 md:gap-12">
          {story.stats.map((s, i) => (
            <div key={s.label} data-ff-pop className={cn('grid size-36 place-items-center rounded-full border-[3px] border-ink text-center text-ink shadow-[5px_5px_0_var(--c-ink)] md:size-44', ['bg-pop-yellow', 'bg-pop-violet text-white', 'bg-pop-teal'][i % 3])} style={{ rotate: `${[-6, 4, -3][i % 3]}deg` }}>
              <div className="flex flex-col-reverse">
                <dt className="px-4 text-xs font-bold uppercase leading-tight md:text-sm">{s.label}</dt>
                <dd className="text-5xl font-extrabold leading-none md:text-6xl">
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
