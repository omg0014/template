import { cn } from '../lib/cn.js'

/**
 * Lightweight text splitting for GSAP/Motion reveals. Screen readers get the
 * full string once; the visual pieces are aria-hidden.
 */
export function SplitChars({ text, className, charClassName = 'split-char', wordClassName }) {
  const words = String(text).split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className={cn('inline-block whitespace-nowrap', wordClassName)}>
            {[...word].map((ch, ci) => (
              <span key={ci} className={cn('inline-block will-change-transform', charClassName)}>
                {ch}
              </span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  )
}

export function SplitWords({ text, className, wordClassName = 'split-word', mask = false }) {
  const words = String(text).split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className={cn('inline-block', mask && 'overflow-hidden pb-[0.08em] align-bottom')}>
            <span className={cn('inline-block will-change-transform', wordClassName)}>{word}</span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </span>
  )
}

/** One masked line: the inner span slides up from below the mask. */
export function MaskLine({ children, className, innerClassName = 'split-line' }) {
  return (
    <span className={cn('block overflow-hidden pb-[0.06em]', className)}>
      <span className={cn('block will-change-transform', innerClassName)}>{children}</span>
    </span>
  )
}
