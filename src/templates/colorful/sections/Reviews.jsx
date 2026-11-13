import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, EffectCards, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { useReducedMotion } from '../../../hooks/useMediaQuery.js'
import { Stars } from '../../../components/Stars.jsx'
import { Sticker, Title } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

const CARD_BG = ['bg-pop-yellow', 'bg-white', 'bg-pop-pink', 'bg-pop-teal', 'bg-pop-orange', 'bg-white']

/** Stacked, swipeable review cards. */
export function Reviews() {
  const { testimonials, rating } = useCafe()
  const reduced = useReducedMotion()
  const swiper = useRef(null)
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-pop-violet py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <Sticker rotate={-4} className="bg-pop-yellow text-ink">
            Reviews
          </Sticker>
          <Title id="reviews-title" className="mt-5 text-white">
            People <span className="ff-stroke text-pop-yellow">love</span> us
          </Title>
          <div data-ff-pop className="mt-8 inline-flex items-center gap-5 rounded-[28px] border-2 border-ink bg-white p-5 shadow-[5px_5px_0_var(--c-ink)]">
            <span className="text-6xl font-extrabold leading-none text-ink">{rating.value}</span>
            <span>
              <Stars rating={rating.value} size={20} color="var(--c-ink)" />
              <span className="mt-1 block text-sm font-bold text-ink">
                {rating.count} reviews on {rating.source}
              </span>
            </span>
          </div>
          <p className="mt-6 text-xl font-bold text-white">Swipe the cards →</p>
        </div>

        <div data-ff-pop className="ff-reviews mx-auto w-[min(78vw,400px)]">
          <Swiper
            modules={[A11y, Autoplay, EffectCards, Keyboard]}
            effect="cards"
            grabCursor
            cardsEffect={{ perSlideOffset: 9, perSlideRotate: 3, slideShadows: false }}
            speed={reduced ? 0 : 500}
            keyboard={{ enabled: true, onlyInViewport: true }}
            autoplay={reduced ? false : { delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            a11y={{ enabled: true, prevSlideMessage: 'Previous review', nextSlideMessage: 'Next review' }}
            onSwiper={(s) => (swiper.current = s)}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.name} className={cn('!flex flex-col border-[3px] border-ink p-7 text-ink', CARD_BG[i % CARD_BG.length])}>
                <Stars rating={t.rating} size={20} color="var(--c-ink)" />
                <blockquote className="mt-5 flex-1 text-xl font-bold leading-snug">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-full border-2 border-ink bg-white font-extrabold">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block font-extrabold">{t.name}</span>
                    <span className="block text-sm font-semibold opacity-80">
                      {t.locality} · {t.source}
                    </span>
                  </span>
                </figcaption>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-10 flex justify-center gap-3">
            <button type="button" onClick={() => swiper.current?.slidePrev()} aria-label="Previous review" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--c-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
              <ArrowLeft className="size-5" strokeWidth={2.5} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => swiper.current?.slideNext()} aria-label="Next review" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-pop-yellow text-ink shadow-[3px_3px_0_var(--c-ink)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
              <ArrowRight className="size-5" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
