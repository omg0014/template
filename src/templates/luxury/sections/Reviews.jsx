import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, EffectFade, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useReducedMotion } from '../../../hooks/useMediaQuery.js'
import { Stars } from '../../../components/Stars.jsx'
import { Eyebrow } from '../ui.jsx'

export function Reviews() {
  const { testimonials, rating } = useCafe()
  const reduced = useReducedMotion()
  const swiper = useRef(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(!reduced)

  const toggle = () => {
    if (!swiper.current) return
    if (playing) swiper.current.autoplay.stop()
    else swiper.current.autoplay.start()
    setPlaying(!playing)
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden py-28 md:py-44">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-10">
        <div className="flex justify-center">
          <Eyebrow>Guestbook</Eyebrow>
        </div>
        <h2 id="reviews-title" className="sr-only">
          Customer reviews
        </h2>
        <p data-lux-reveal className="mt-6 flex items-center justify-center gap-3 text-sm text-muted">
          <Stars rating={rating.value} size={14} color="var(--c-accent)" />
          <span>
            {rating.value} average · {rating.count} reviews on {rating.source}
          </span>
        </p>

        <div data-lux-reveal className="lux-reviews mt-12" aria-roledescription="carousel" aria-label="Customer testimonials">
          <Swiper
            modules={[A11y, Autoplay, EffectFade, Keyboard]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={reduced ? 0 : 1200}
            loop
            autoHeight
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={reduced ? false : { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            a11y={{ enabled: true, prevSlideMessage: 'Previous review', nextSlideMessage: 'Next review' }}
            onSwiper={(s) => (swiper.current = s)}
            onSlideChange={(s) => setIndex(s.realIndex)}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <figure className="px-1">
                  <blockquote className="font-display text-[clamp(1.75rem,4.4vw,3.4rem)] font-light italic leading-[1.15] text-ink text-balance">“{t.text}”</blockquote>
                  <figcaption className="mt-10 flex flex-col items-center gap-3">
                    <Stars rating={t.rating} size={14} color="var(--c-accent)" />
                    <span className="text-[11px] uppercase tracking-[0.3em] text-accent-soft">{t.name}</span>
                    <span className="text-xs text-muted">
                      {t.locality} · via {t.source}
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button type="button" onClick={() => swiper.current?.slidePrev()} aria-label="Previous review" className="grid size-12 place-items-center border border-line text-ink transition hover:border-accent hover:text-accent">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <p className="min-w-20 text-[11px] tabular-nums tracking-[0.3em] text-muted" aria-hidden="true">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {String(testimonials.length).padStart(2, '0')}
          </p>
          <button type="button" onClick={() => swiper.current?.slideNext()} aria-label="Next review" className="grid size-12 place-items-center border border-line text-ink transition hover:border-accent hover:text-accent">
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          {!reduced && (
            <button type="button" onClick={toggle} aria-label={playing ? 'Pause autoplay' : 'Play autoplay'} className="grid size-12 place-items-center text-muted transition hover:text-accent">
              {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
