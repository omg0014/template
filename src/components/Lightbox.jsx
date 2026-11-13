import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog } from './Dialog.jsx'
import { Img } from './Img.jsx'
import { imageUrl } from '../lib/images.js'
import { cn } from '../lib/cn.js'

/**
 * Accessible gallery lightbox: ←/→ keys, swipe, Esc, buttons, live counter.
 * `classes` lets each template restyle buttons/caption.
 */
export function Lightbox({ items, index, onClose, onChange, classes = {} }) {
  const open = index !== null && index !== undefined
  const item = open ? items[index] : null
  const dir = useRef(0)
  const go = (delta) => {
    dir.current = delta
    onChange((index + delta + items.length) % items.length)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    // Preload neighbours
    ;[1, -1].forEach((d) => {
      const n = items[(index + d + items.length) % items.length]
      if (n) new Image().src = imageUrl(n.image, 1600)
    })
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index])

  const btn = cn('grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white', classes.button)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={item ? `Gallery image ${index + 1} of ${items.length}` : 'Gallery'}
      className="items-center justify-center"
      overlayClassName={cn('bg-black/90', classes.overlay)}
      panelClassName="flex h-full w-full flex-col items-center justify-center p-4 md:p-10"
      panel={{ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }}
    >
      <div className="absolute right-4 top-4 z-10 md:right-8 md:top-8">
        <button type="button" className={btn} onClick={onClose} aria-label="Close gallery">
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex w-full max-w-6xl flex-1 items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout" custom={dir.current}>
          {item && (
            <motion.figure
              key={index}
              custom={dir.current}
              initial={{ opacity: 0, x: dir.current * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir.current * -80 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
              className="flex max-h-full w-full cursor-grab flex-col items-center active:cursor-grabbing"
              style={{ touchAction: 'pan-y' }}
            >
              <Img
                src={item.image}
                alt={item.alt}
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority
                className="max-h-[72vh] w-auto max-w-full rounded-lg"
                imgClassName="object-contain"
                draggable={false}
              />
              {item.alt && <figcaption className={cn('mt-4 text-center text-sm text-white/80', classes.caption)}>{item.alt}</figcaption>}
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center gap-4 text-white">
        <button type="button" className={btn} onClick={() => go(-1)} aria-label="Previous image">
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <p aria-live="polite" className={cn('min-w-16 text-center text-sm tabular-nums', classes.counter)}>
          {open ? `${index + 1} / ${items.length}` : ''}
        </p>
        <button type="button" className={btn} onClick={() => go(1)} aria-label="Next image">
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </Dialog>
  )
}
