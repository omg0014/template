import { useState } from 'react'
import { motion } from 'motion/react'
import { useCafe } from '../../../hooks/useCafe.js'
import { Img } from '../../../components/Img.jsx'
import { Lightbox } from '../../../components/Lightbox.jsx'
import { Squiggle, Sticker, Title } from '../ui.jsx'

const TILT = [-4, 3, -2, 5, -5, 2, -3, 4]

/** Polaroid collage. */
export function Gallery() {
  const { gallery } = useCafe()
  const [index, setIndex] = useState(null)
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="ff-dots overflow-hidden border-y-[3px] border-ink bg-pop-orange py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="text-center">
          <Sticker rotate={4} className="bg-white text-ink">
            Gallery
          </Sticker>
          <Title id="gallery-title" className="mt-5">
            Say cheese!
          </Title>
          <Squiggle className="mx-auto mt-3" color="var(--c-ink)" />
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-8 md:gap-y-12">
          {gallery.map((g, i) => (
            <li key={g.image + i} data-ff-pop className="relative hover:z-10">
              <motion.div style={{ rotate: TILT[i % TILT.length] }} whileHover={{ rotate: 0, scale: 1.06 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }} className="relative">
              <button type="button" onClick={() => setIndex(i)} className="block w-full rounded-md border-2 border-ink bg-white p-2.5 pb-3 text-left shadow-[5px_5px_0_var(--c-ink)] md:p-3 md:pb-4" aria-label={`Open image: ${g.alt}`}>
                <Img src={g.image} alt={g.alt} ratio="1 / 1" sizes="(min-width: 768px) 22vw, 46vw" className="rounded-sm" />
                <span className="mt-2.5 block truncate text-center text-sm font-extrabold text-ink md:text-base">#{g.tag}</span>
              </button>
              {i % 3 === 0 && <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-[-4deg] bg-pop-yellow/80" />}
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={gallery} index={index} onClose={() => setIndex(null)} onChange={setIndex} classes={{ overlay: 'bg-ink/95', button: 'border-2 border-white bg-pop-pink text-ink hover:bg-pop-yellow', caption: 'font-bold text-white' }} />
    </section>
  )
}
