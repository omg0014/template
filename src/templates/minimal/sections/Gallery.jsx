import { useState } from 'react'
import { useCafe } from '../../../hooks/useCafe.js'
import { Img } from '../../../components/Img.jsx'
import { Lightbox } from '../../../components/Lightbox.jsx'
import { Heading, Kicker } from '../ui.jsx'

export function Gallery() {
  const { gallery } = useCafe()
  const [index, setIndex] = useState(null)
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Kicker>Gallery</Kicker>
            <Heading id="gallery-title" className="mt-5">
              A day at <em className="text-accent">the cafe.</em>
            </Heading>
          </div>
          <p data-min-reveal className="max-w-xs text-muted">Morning light, slow pours and fresh bakes. Tap to view.</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
          {gallery.map((g, i) => (
            <li key={g.image + i} data-min-card className={i % 4 === 1 || i % 4 === 3 ? 'md:mt-16' : undefined}>
              <button type="button" onClick={() => setIndex(i)} className="group block w-full text-left" aria-label={`Open image: ${g.alt}`}>
                <span className="block overflow-hidden rounded-2xl">
                  <Img src={g.image} alt={g.alt} ratio="4 / 5" sizes="(min-width: 768px) 24vw, 50vw" imgClassName="transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]" />
                </span>
                <span className="mt-3 flex items-start justify-between gap-3 text-sm">
                  <span className="line-clamp-2 text-ink/80">{g.alt}</span>
                  <span className="shrink-0 text-xs capitalize text-muted">{g.tag}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={gallery} index={index} onClose={() => setIndex(null)} onChange={setIndex} classes={{ overlay: 'bg-[#1d1712]/92', caption: 'text-white/80' }} />
    </section>
  )
}
