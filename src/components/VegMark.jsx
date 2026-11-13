import { cn } from '../lib/cn.js'

/** Indian FSSAI-style veg / non-veg indicator with an accessible label. */
export function VegMark({ veg, className, size = 16 }) {
  const color = veg ? '#16833A' : '#963A1E'
  return (
    <span
      role="img"
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
      title={veg ? 'Vegetarian' : 'Non-vegetarian'}
      className={cn('inline-grid shrink-0 place-items-center rounded-[3px] border-[1.5px] bg-white', className)}
      style={{ width: size, height: size, borderColor: color }}
    >
      {veg ? (
        <span className="rounded-full" style={{ width: size * 0.45, height: size * 0.45, background: color }} />
      ) : (
        <svg viewBox="0 0 10 10" width={size * 0.55} height={size * 0.55} aria-hidden="true">
          <path d="M5 1 9.3 8.6H.7z" fill={color} />
        </svg>
      )}
    </span>
  )
}
