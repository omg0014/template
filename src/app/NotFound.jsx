import { Link } from 'react-router'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { usePageReady } from './TransitionProvider.jsx'
import '@fontsource/instrument-serif/400.css'
import '@fontsource-variable/inter'

export function NotFound() {
  usePageReady()
  useDocumentMeta({ title: 'Page not found — Template Café', description: 'This page does not exist.', themeColor: '#0E0D0C' })
  return (
    <main id="main" className="grain grid min-h-svh place-items-center bg-[#0E0D0C] px-6 text-center font-[Inter_Variable,system-ui] text-[#F3EFE9]">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">Error 404</p>
        <h1 className="mt-6 font-['Instrument_Serif'] text-6xl leading-none md:text-8xl">This table is empty.</h1>
        <p className="mx-auto mt-6 max-w-md text-white/70">The page you’re looking for doesn’t exist. Let’s get you back to the menu of templates.</p>
        <Link to="/" className="mt-10 inline-flex h-12 items-center rounded-full bg-[#F3EFE9] px-7 font-medium text-[#0E0D0C] transition hover:bg-white">
          Back to templates
        </Link>
      </div>
    </main>
  )
}
