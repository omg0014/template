import { MapPin } from 'lucide-react'
import { mapsEmbedUrl } from '../lib/whatsapp.js'
import { cn } from '../lib/cn.js'

/**
 * Lazy Google Maps embed (no API key). A styled placeholder sits underneath while loading / if blocked.
 * Pass a positioning class (`relative` default, or `absolute inset-0`).
 */
export function MapEmbed({ query, title, className = 'relative', iframeClassName, style }) {
  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="absolute inset-0 grid place-items-center opacity-60" aria-hidden="true">
        <MapPin className="size-8" />
      </div>
      <iframe
        title={title ?? `Map showing ${query}`}
        src={mapsEmbedUrl(query)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={cn('relative size-full border-0', iframeClassName)}
        style={style}
        allowFullScreen
      />
    </div>
  )
}
