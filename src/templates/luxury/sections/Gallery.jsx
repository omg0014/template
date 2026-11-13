import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCafe } from '../../../hooks/useCafe.js'
import { Img } from '../../../components/Img.jsx'
import { Lightbox } from '../../../components/Lightbox.jsx'
import { Eyebrow, SectionTitle } from '../ui.jsx'
import { cn } from '../../../lib/cn.js'

// Editorial mosaic spans (desktop). Repeats if more images are configured.
const SPANS = ['md:col-span-2 md:row-span-2', '', 'md:row-span-2', '', 'md:col-span-2', '', '', 'md:col-span-2']

export function Gallery() {
  const { gallery } = useCafe()
  const [index, setIndex] = useState(null)
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="border-t border-line bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <SectionTitle className="mt-6">
              <span id="gallery-title">
                After <em className="text-accent-soft">dark</em>
              </span>
            </SectionTitle>
          </div>
          <p data-lux-reveal className="max-w-sm text-muted">Candlelight, copper and the glow of the wood-fire. Tap any frame to view it full screen.</p>
        </div>
        <ul className="mt-16 grid auto-rows-[44vw] grid-cols-2 gap-3 md:mt-20 md:auto-rows-[18vw] md:grid-cols-4 md:gap-4">
          {gallery.map((g, i) => (
            <li key={g.image + i} data-lux-card className={cn(SPANS[i % SPANS.length])}>
              <button type="button" onClick={() => setIndex(i)} className="group relative block size-full overflow-hidden" aria-label={`Open image: ${g.alt}`}>
                <Img src={g.image} alt={g.alt} fill sizes="(min-width: 768px) 40vw, 50vw" imgClassName="transition-[transform,filter] duration-[1.6s] ease-out-expo group-hover:scale-110 group-hover:brightness-75" />
                <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="grid size-14 place-items-center rounded-full border border-accent/70 text-accent-soft backdrop-blur-sm">
                    <Plus className="size-5" aria-hidden="true" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-ink/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{g.tag}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={gallery} index={index} onClose={() => setIndex(null)} onChange={setIndex} classes={{ button: 'rounded-none border border-accent/50 bg-black/40 text-accent-soft hover:bg-accent hover:text-black', caption: 'font-display text-lg italic text-accent-soft', counter: 'tracking-[0.3em] text-accent' }} />
    </section>
  )
}
