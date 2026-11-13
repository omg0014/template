import { useCafe } from '../../../hooks/useCafe.js'
import { Img } from '../../../components/Img.jsx'
import { Eyebrow, SectionTitle } from '../ui.jsx'

export function Story() {
  const { story } = useCafe()
  return (
    <section id="story" aria-labelledby="story-title" className="relative py-28 md:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <div data-lux-clip className="relative aspect-[4/5] overflow-hidden">
            <div data-lux-parallax className="absolute inset-[-10%_0]">
              <Img src={story.image} alt="Inside the restaurant" fill sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </div>
          <div data-lux-clip className="absolute -bottom-12 right-0 aspect-[3/4] w-[46%] overflow-hidden border-[10px] border-bg md:-right-10 md:w-[42%]">
            <Img src={story.founder.image} alt={`${story.founder.name}, ${story.founder.role}`} fill sizes="(min-width: 1024px) 22vw, 46vw" />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <SectionTitle className="mt-6 text-[clamp(2.4rem,5.5vw,4.5rem)]">
            <span id="story-title">{story.heading}</span>
          </SectionTitle>
          {story.paragraphs.map((p) => (
            <p data-lux-reveal key={p.slice(0, 20)} className="mt-6 text-pretty leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <figure data-lux-reveal className="mt-12 border-t border-line pt-10">
            <blockquote className="font-display text-3xl font-light italic leading-snug text-ink md:text-4xl">
              <span className="text-accent">“</span>
              {story.founder.quote}
              <span className="text-accent">”</span>
            </blockquote>
            <figcaption className="mt-6 text-[11px] uppercase tracking-[0.3em] text-accent">
              {story.founder.name} <span className="text-muted">— {story.founder.role}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-[1600px] px-5 md:mt-44 md:px-10">
        <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
          {story.highlights.map((h, i) => (
            <li key={h.title} data-lux-card className="bg-bg p-8 md:p-10">
              <span className="text-[11px] tracking-[0.3em] text-accent">0{i + 1}</span>
              <h3 className="mt-6 font-display text-3xl font-light text-ink">{h.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{h.text}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-16 grid grid-cols-3 gap-4 text-center">
          {story.stats.map((s) => (
            <div key={s.label}>
              <dt className="order-2 mt-3 text-[10px] uppercase tracking-[0.25em] text-muted md:text-[11px]">{s.label}</dt>
              <dd className="font-display text-5xl font-light text-accent-soft md:text-8xl">
                <span data-count={s.value}>{s.value}</span>
                <span className="text-3xl md:text-5xl">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
