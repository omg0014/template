import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Keyboard, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useReducedMotion } from '../../../hooks/useMediaQuery.js'
import { Stars } from '../../../components/Stars.jsx'
import { Heading, Kicker } from '../ui.jsx'

export function Reviews() {
  const { testimonials, rating } = useCafe()
  const reduced = useReducedMotion()
  const swiper = useRef(null)
  const initials = (n) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-beige/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker>Kind words</Kicker>
            <Heading id="reviews-title" className="mt-5">
              {rating.value} stars, <em className="text-accent">{rating.count} reviews.</em>
            </Heading>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => swiper.current?.slidePrev()} aria-label="Previous reviews" className="grid size-12 place-items-center rounded-full border border-ink/20 bg-surface text-ink transition hover:border-ink">
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => swiper.current?.slideNext()} aria-label="Next reviews" className="grid size-12 place-items-center rounded-full border border-ink/20 bg-surface text-ink transition hover:border-ink">
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div data-min-reveal className="min-reviews mt-12 md:mt-16">
          <Swiper
            modules={[A11y, Autoplay, Keyboard, Pagination]}
            slidesPerView={1.08}
            spaceBetween={16}
            breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 24 } }}
            speed={reduced ? 0 : 600}
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={reduced ? false : { delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: '.min-pagination' }}
            a11y={{ enabled: true, prevSlideMessage: 'Previous review', nextSlideMessage: 'Next review' }}
            onSwiper={(s) => (swiper.current = s)}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name} className="!h-auto">
                <figure className="flex h-full flex-col rounded-[24px] border border-line bg-surface p-7 md:p-8">
                  <div className="flex items-center justify-between">
                    <Stars rating={t.rating} size={15} color="var(--c-accent)" />
                    <Quote className="size-6 text-beige" aria-hidden="true" />
                  </div>
                  <blockquote className="mt-6 flex-1 text-pretty text-[17px] leading-relaxed text-ink">“{t.text}”</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                    <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-beige text-sm font-medium text-accent">
                      {initials(t.name)}
                    </span>
                    <span className="text-sm">
                      <span className="block font-medium text-ink">{t.name}</span>
                      <span className="block text-muted">
                        {t.locality} · {t.source}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="min-pagination mt-8 flex justify-center gap-1 [&_.swiper-pagination-bullet]:!bg-ink [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet-active]:!w-6 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet]:transition-all" />
        </div>
      </div>
    </section>
  )
}
