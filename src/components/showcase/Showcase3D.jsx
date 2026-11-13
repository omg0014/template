import { lazy, Suspense, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView.js'
import { get3DMode } from '../../lib/device.js'
import { ErrorBoundary } from '../ErrorBoundary.jsx'
import { cn } from '../../lib/cn.js'

// The entire three.js / R3F / drei stack lives behind this dynamic import.
const ShowcaseCanvas = lazy(() => import('../../three/ShowcaseCanvas.jsx'))

/**
 * Capability gate for the 3D showcase (PRD §11). Contains no three.js imports.
 *  - Loads the canvas chunk only when the section is within ~1 viewport.
 *  - No WebGL → poster (photo) only.
 *  - Data-saver / low-memory devices → poster + opt-in button (renderOptIn).
 *  - Runtime/WebGL errors → ErrorBoundary falls back to the poster.
 */
export function Showcase3D({ stage, items, active, showLabels = true, apiRef, className, poster, renderOptIn, labelClassName, ariaLabel }) {
  const ref = useRef(null)
  const [mode] = useState(() => (typeof window === 'undefined' ? 'none' : get3DMode()))
  const [optedIn, setOptedIn] = useState(false)
  const near = useInView(ref, { rootMargin: '100% 0px', once: true })
  const visible = useInView(ref, { rootMargin: '15% 0px' })
  const load = mode !== 'none' && near && (mode === 'auto' || optedIn)

  return (
    <div ref={ref} className={cn('relative', className)}>
      {!load && poster}
      {load && (
        <ErrorBoundary fallback={poster}>
          <Suspense fallback={poster}>
            <ShowcaseCanvas
              stage={stage}
              items={items}
              active={active}
              showLabels={showLabels}
              apiRef={apiRef}
              visible={visible}
              labelClassName={labelClassName}
              ariaLabel={ariaLabel}
            />
          </Suspense>
        </ErrorBoundary>
      )}
      {mode === 'opt-in' && !optedIn && renderOptIn?.(() => setOptedIn(true))}
    </div>
  )
}

export { get3DMode }
