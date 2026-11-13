import { lazy, Suspense } from 'react'
import { preload } from 'react-dom'
import { RotateCw } from 'lucide-react'
import { templateByKey } from '../data/templates.js'
import { resolveImage } from '../lib/images.js'
import { APP_CONFIG } from '../config/app.config.js'
import { TemplateSwitcher } from './TemplateSwitcher.jsx'
import { ErrorBoundary } from '../components/ErrorBoundary.jsx'

/** Each template is its own lazy chunk (JS + CSS + fonts). */
const LOADERS = {
  luxury: () => import('../templates/luxury/index.jsx'),
  minimal: () => import('../templates/minimal/index.jsx'),
  colorful: () => import('../templates/colorful/index.jsx'),
}
const COMPONENTS = Object.fromEntries(Object.entries(LOADERS).map(([k, load]) => [k, lazy(load)]))

export const TEMPLATE_KEYS = Object.keys(LOADERS)

/** Warm a template chunk (e.g. on card hover) so the transition feels instant. */
export const preloadTemplate = (key) => LOADERS[key]?.().catch(() => {})

function ChunkError() {
  return (
    <div role="alert" className="grid min-h-svh place-items-center bg-bg p-6 text-center text-ink">
      <div>
        <p className="text-lg">This page couldn’t load. Please check your connection.</p>
        <button type="button" onClick={() => window.location.reload()} className="mt-6 inline-flex items-center gap-2 rounded-full border border-current px-6 py-3">
          <RotateCw className="size-4" aria-hidden="true" /> Reload
        </button>
      </div>
    </div>
  )
}

export function TemplateRoute({ templateKey, cafeId, showcase = false }) {
  const Template = COMPONENTS[templateKey]
  // Start fetching the hero (LCP) image in parallel with the template chunk.
  const meta = templateByKey(templateKey)
  const hero = resolveImage(meta?.image)
  if (hero?.srcSet) preload(hero.src, { as: 'image', imageSrcSet: hero.srcSet, imageSizes: meta.heroSizes ?? '100vw', fetchPriority: 'high' })
  return (
    <>
      <ErrorBoundary fallback={<ChunkError />}>
        <Suspense fallback={<div className="min-h-svh" style={{ background: templateByKey(templateKey)?.colors.bg }} />}>
          {/* Cafe config, CafeProvider, GSAP and Lenis live inside each template chunk to keep the entry bundle small */}
          <Template key={cafeId ?? templateKey} cafeId={cafeId} />
        </Suspense>
      </ErrorBoundary>
      {showcase && APP_CONFIG.mode === 'showcase' && <TemplateSwitcher current={templateKey} />}
    </>
  )
}
