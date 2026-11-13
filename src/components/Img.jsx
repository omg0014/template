import { useCallback, useState } from 'react'
import { ImageOff } from 'lucide-react'
import { resolveImage } from '../lib/images.js'
import { cn } from '../lib/cn.js'

/**
 * Responsive, lazy image with blur-up placeholder and graceful error state.
 *
 * - `fill`     → absolutely fills the nearest positioned parent
 * - `ratio`    → CSS aspect-ratio for the frame (defaults to the photo's intrinsic ratio)
 * - `priority` → eager + high fetch priority (use for the LCP/hero image only)
 * - `position` → CSS object-position focal point, e.g. '50% 80%' (menu items may set `focus`)
 */
export function Img({ src, alt = '', sizes = '100vw', priority = false, fill = false, ratio, position, className, imgClassName, style, ...rest }) {
  const img = resolveImage(src)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(!img)

  // Handles cached images whose load event fired before React attached the handler.
  const refCb = useCallback((node) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true)
  }, [])

  const aspect = ratio ?? (img?.width && img?.height ? `${img.width} / ${img.height}` : undefined)

  return (
    <span
      className={cn('block overflow-hidden', fill ? 'absolute inset-0' : 'relative', className)}
      style={{ aspectRatio: fill ? undefined : aspect, ...style }}
    >
      {img?.lqip && !failed && (
        <img
          aria-hidden="true"
          alt=""
          src={img.lqip}
          className={cn('absolute inset-0 size-full scale-110 object-cover blur-xl transition-opacity duration-700', loaded ? 'opacity-0' : 'opacity-100')}
          style={position ? { objectPosition: position } : undefined}
        />
      )}
      {!failed && (
        <img
          ref={refCb}
          src={img.src}
          srcSet={img.srcSet}
          sizes={img.srcSet ? sizes : undefined}
          width={img.width}
          height={img.height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn('relative size-full object-cover transition-opacity duration-700', loaded || priority ? 'opacity-100' : 'opacity-0', imgClassName)}
          style={position ? { objectPosition: position } : undefined}
          {...rest}
        />
      )}
      {failed && (
        <span role="img" aria-label={alt || 'Image unavailable'} className="absolute inset-0 grid place-items-center bg-current/5">
          <ImageOff aria-hidden="true" className="size-8 opacity-40" />
        </span>
      )}
    </span>
  )
}
