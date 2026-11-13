import { useId } from 'react'
import { cn } from '../lib/cn.js'

/** Star rating with half-star support and an accessible label. */
export function Stars({ rating, className, size = 16, color = 'currentColor', emptyColor }) {
  const id = useId()
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className={cn('inline-flex gap-0.5', className)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        const gid = `${id}-${i}`
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={gid}>
                <stop offset={`${fill * 100}%`} stopColor={color} />
                <stop offset={`${fill * 100}%`} stopColor={emptyColor ?? color} stopOpacity={emptyColor ? 1 : 0.25} />
              </linearGradient>
            </defs>
            <path fill={`url(#${gid})`} d="M12 2.5l2.94 6.1 6.56.86-4.8 4.58 1.2 6.52L12 17.4l-5.9 3.16 1.2-6.52-4.8-4.58 6.56-.86z" />
          </svg>
        )
      })}
    </span>
  )
}
