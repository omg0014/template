import { useCafe } from '../../../hooks/useCafe.js'
import { Img } from '../../../components/Img.jsx'
import { Heading, Kicker } from '../ui.jsx'

export function Story() {
  const { story } = useCafe()
  return (
    <section id="story" aria-labelledby="story-title" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Kicker>{story.eyebrow}</Kicker>
        <Heading id="story-title" className="mt-5 max-w-4xl text-[clamp(2.6rem,7vw,6rem)]">
          {story.heading}
        </Heading>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div data-min-card className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[28px]">
              <div data-min-parallax className="relative">
                <Img src={story.image} alt="Inside the cafe" ratio="5 / 6" sizes="(min-width: 1024px) 48vw, 100vw" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:col-start-8">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {story.paragraphs.map((p) => (
                <p data-min-reveal key={p.slice(0, 20)} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
            <figure data-min-reveal className="rounded-[24px] bg-bg p-7 md:p-8">
              <blockquote className="font-display text-3xl leading-snug text-ink">“{story.founder.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <Img src={story.founder.image} alt={story.founder.name} ratio="1 / 1" sizes="56px" className="w-14 rounded-full" />
                <span>
                  <span className="block font-medium text-ink">{story.founder.name}</span>
                  <span className="block text-sm text-muted">{story.founder.role}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3">
          {story.highlights.map((h, i) => (
            <div key={h.title} data-min-card className="border-t border-ink pt-6">
              <p className="text-sm text-muted">0{i + 1}</p>
              <h3 className="mt-3 font-display text-3xl text-ink">{h.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{h.text}</p>
            </div>
          ))}
        </div>
        <dl className="mt-16 grid grid-cols-3 divide-x divide-line rounded-[24px] border border-line">
          {story.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center px-2 py-8 text-center md:py-10">
              <dt className="mt-2 text-xs text-muted md:text-sm">{s.label}</dt>
              <dd className="font-display text-5xl text-ink md:text-7xl">
                <span data-count={s.value}>{s.value}</span>
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
