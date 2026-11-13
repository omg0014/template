import { IMAGE_META } from '../data/images.js'

export const IMAGE_WIDTHS = [480, 960, 1600]

/**
 * Resolve an image reference (slug from the manifest, or an absolute/relative URL)
 * into everything <Img> needs.
 */
export function resolveImage(ref) {
  if (!ref) return null
  const meta = IMAGE_META[ref]
  if (meta) {
    return {
      src: `/images/${ref}-960.webp`,
      srcSet: IMAGE_WIDTHS.map((w) => `/images/${ref}-${w}.webp ${w}w`).join(', '),
      width: meta.w,
      height: meta.h,
      lqip: meta.lqip,
      credit: meta.credit,
    }
  }
  // Custom URL (e.g. client-provided CDN image)
  return { src: ref, srcSet: undefined, width: undefined, height: undefined, lqip: undefined }
}

export const imageUrl = (ref, width = 1600) => (IMAGE_META[ref] ? `/images/${ref}-${width}.webp` : ref)

export const hasImage = (ref) => Boolean(IMAGE_META[ref]) || /^(https?:)?\//.test(ref ?? '')
