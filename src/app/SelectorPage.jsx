import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight, ArrowUpRight, Box, Clapperboard, Gauge, Images, MapPin, MessageSquareQuote, Settings2, Smartphone, Sparkles, UtensilsCrossed,
} from 'lucide-react'
import { TEMPLATES } from '../data/templates.js'
import { Img } from '../components/Img.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { usePageReady, usePageTransition } from './TransitionProvider.jsx'
import { preloadTemplate } from './TemplateRoute.jsx'
import { SkipLink } from '../components/SkipLink.jsx'
import { cn } from '../lib/cn.js'

import '@fontsource-variable/inter'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/cormorant-garamond'
import '@fontsource-variable/bricolage-grotesque'

const EASE = [0.16, 1, 0.3, 1]
const SERIF = "font-['Instrument_Serif',serif]"

const FEATURES = [
  { icon: Clapperboard, title: 'Cinematic hero', text: 'Full-screen imagery with animated typography and WhatsApp CTA.' },
  { icon: Sparkles, title: 'Signature dishes', text: 'Large, image-led showcases with reveal animations.' },
  { icon: UtensilsCrossed, title: 'Interactive menu', text: '8 categories, smooth filtering, veg marks and dish detail sheets.' },
  { icon: Box, title: '3D food showcase', text: 'Rotatable dishes with ingredient labels — with graceful fallbacks.' },
  { icon: MessageSquareQuote, title: 'Reviews & gallery', text: 'Swipeable testimonials and a full-screen photo lightbox.' },
  { icon: MapPin, title: 'Visit & order', text: 'Live open/closed hours, map, call and WhatsApp ordering.' },
  { icon: Smartphone, title: 'Mobile-first', text: 'Designed for the phone first — touch-friendly, no overflow.' },
  { icon: Settings2, title: 'Config-driven', text: 'Brand, menu, prices and content live in one file per cafe.' },
]

export function SelectorPage() {
  usePageReady()
  useDocumentMeta({
    title: 'Template Café — Premium website templates for modern cafés',
    description: 'Three award-level cafe website templates — Luxury Cinematic, Modern Minimal and Creative & Colorful. Mobile-first, configurable, with an interactive 3D food showcase.',
    image: '/images/interior-evening-1600.webp',
    themeColor: '#0E0D0C',
  })
  const [hovered, setHovered] = useState(null)
  const glow = hovered ? TEMPLATES.find((t) => t.key === hovered).colors.accent : '#C9A35B'

  return (
    <div className="grain relative min-h-svh overflow-x-clip bg-[#0E0D0C] font-[Inter_Variable,system-ui,sans-serif] text-[#F3EFE9] selection:bg-[#F3EFE9] selection:text-[#0E0D0C]">
      <SkipLink />
      {/* Ambient glow that takes on the hovered template's accent colour */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[-20vh] h-[80vh] w-[120vw] -translate-x-1/2 rounded-[50%] opacity-25 blur-[120px] transition-[background-color] duration-1000"
          style={{ backgroundColor: glow }}
        />
      </div>

      <header className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <a href="/" className="flex items-center gap-2.5" aria-label="Template Café home">
          <svg viewBox="0 0 64 64" className="size-8" aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#F3EFE9" />
            <path d="M18 26h24v8a12 12 0 0 1-12 12h0a12 12 0 0 1-12-12z" fill="none" stroke="#0E0D0C" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M42 29h3a5 5 0 0 1 0 10h-4" fill="none" stroke="#0E0D0C" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <span className={cn(SERIF, 'text-2xl leading-none')}>Template Café</span>
        </a>
        <p className="hidden text-sm text-white/60 md:block">3 templates · 11 sections · Mobile-first · 3D</p>
      </header>

      <main id="main" className="relative z-10">
        {/* Intro */}
        <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-6 md:px-10 md:pb-14 md:pt-10" aria-labelledby="intro-heading">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" /> Cafe website collection · 2026
          </motion.p>
          <h1 id="intro-heading" className={cn(SERIF, 'text-[clamp(3.2rem,9.5vw,8.75rem)] leading-[0.88] tracking-[-0.02em]')}>
            {['Three cafés.', 'Three worlds.'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={cn('block', i === 1 && 'italic text-white/55')}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
              className="max-w-xl text-pretty text-lg leading-relaxed text-white/70 md:text-xl"
            >
              Premium, fully-configurable website experiences for modern cafés. Each one has its own design language, typography and motion — choose a design to explore the complete site.
            </motion.p>
            <motion.a
              href="#templates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 self-start text-sm text-white/70 underline-offset-4 hover:text-white hover:underline md:self-auto"
            >
              Choose a template <ArrowRight className="size-4 rotate-90" aria-hidden="true" />
            </motion.a>
          </div>
        </section>

        {/* Template cards */}
        <section id="templates" aria-labelledby="templates-heading" className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 id="templates-heading" className="sr-only">Choose a template</h2>
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {TEMPLATES.map((t, i) => (
              <TemplateCard key={t.key} t={t} index={i} onHover={setHovered} />
            ))}
          </ul>
        </section>

        {/* What's included */}
        <section aria-labelledby="included-heading" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">What every template includes</p>
              <h2 id="included-heading" className={cn(SERIF, 'mt-4 text-5xl leading-[0.95] md:text-6xl')}>
                Everything a café needs. <span className="italic text-white/55">Nothing it doesn’t.</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-white/65">
                Eleven polished sections, a real interactive menu and WhatsApp ordering — all driven by a single configuration file, so your café goes live in days, not months.
              </p>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="bg-[#0E0D0C] p-6 md:p-8">
                  <Icon className="size-6 text-white/80" aria-hidden="true" strokeWidth={1.5} />
                  <h3 className="mt-5 text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process strip */}
        <section aria-labelledby="process-heading" className="mx-auto max-w-[1600px] px-5 pb-24 md:px-10 md:pb-32">
          <div className="rounded-[32px] bg-[#F3EFE9] p-8 text-[#0E0D0C] md:p-14">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <h2 id="process-heading" className={cn(SERIF, 'max-w-2xl text-5xl leading-[0.95] md:text-7xl')}>
                Your brand, your menu — <span className="italic">live in a day.</span>
              </h2>
              <a href="#templates" className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-[#0E0D0C] px-6 text-sm font-medium text-[#F3EFE9] transition hover:gap-3">
                Pick a template <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <ol className="mt-12 grid gap-8 border-t border-black/15 pt-8 md:grid-cols-3">
              {[
                ['Choose', 'Pick the design that matches your café’s personality.'],
                ['Configure', 'Swap in your name, colours, menu, prices, photos and hours.'],
                ['Launch', 'Deploy as a fast static site with your own domain.'],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="text-sm tabular-nums text-black/40">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium">{title}</h3>
                    <p className="mt-1 leading-relaxed text-black/65">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-3 border-t border-white/10 px-5 py-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Template Café. Demo cafés and contact details are fictional.</p>
        <p>
          Photography from{' '}
          <a className="underline underline-offset-4 hover:text-white" href="https://unsplash.com" target="_blank" rel="noreferrer">
            Unsplash
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

function TemplateCard({ t, index, onHover }) {
  const { go } = usePageTransition()
  const Preview = PREVIEWS[t.key]
  const warm = () => {
    onHover(t.key)
    preloadTemplate(t.key)
  }
  return (
    <motion.li
      // Transform-only entrance: the preview image is the LCP element, so it must be visible from the first paint.
      initial={{ y: 56, scale: 0.97 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.25 + index * 0.1 }}
    >
      <a
        href={t.path}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return
          e.preventDefault()
          go(t.path, { color: t.colors.bg, fg: t.colors.fg, label: t.cafe, font: t.font })
        }}
        onPointerEnter={warm}
        onFocus={warm}
        onPointerLeave={() => onHover(null)}
        onBlur={() => onHover(null)}
        className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#161412] transition-[transform,border-color,box-shadow] duration-500 ease-out-expo hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] focus-visible:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {/* Website preview */}
        <div aria-hidden="true" className="relative m-2.5 aspect-[4/4.3] overflow-hidden rounded-[20px] sm:aspect-[4/4.6]" style={{ background: t.colors.bg }}>
          <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center gap-1.5 bg-black/25 px-3.5 backdrop-blur-md">
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
              <span key={c} className="size-2.5 rounded-full" style={{ background: c }} aria-hidden="true" />
            ))}
            <span className="mx-auto max-w-[60%] truncate rounded-md bg-black/45 px-3 py-0.5 text-[11px] text-white">
              {t.cafe.toLowerCase().replace(/[^a-z]+/g, '')}.cafe
            </span>
          </div>
          <Preview t={t} />
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col p-5 pt-4 md:p-7 md:pt-5">
          <div className="flex items-center justify-between text-sm text-white/50">
            <span className="tabular-nums">{t.number}</span>
            <span>{t.cafe}</span>
          </div>
          <h3 className={cn(SERIF, 'mt-3 text-4xl leading-none md:text-[2.6rem]')}>{t.name}</h3>
          <p className="mt-3 text-pretty leading-relaxed text-white/65">{t.description}</p>
          <ul className="mb-7 mt-5 flex flex-wrap gap-2" aria-label="Style">
            {t.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/70">
                {tag}
              </li>
            ))}
          </ul>
          <span className="relative mt-auto inline-flex h-12 items-center justify-between overflow-hidden rounded-full border border-white/20 px-6 text-sm font-medium">
            <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-[#F3EFE9] transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            <span className="relative transition-colors duration-300 group-hover:text-[#0E0D0C] group-focus-visible:text-[#0E0D0C]">
              Preview Website<span className="sr-only"> — {t.name}</span>
            </span>
            <ArrowRight className="relative size-4 transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-[#0E0D0C] group-focus-visible:text-[#0E0D0C]" aria-hidden="true" />
          </span>
        </div>
      </a>
    </motion.li>
  )
}

/* ─── Mini website previews, rendered in each template's real fonts & colours ─── */

function PreviewLuxury({ t }) {
  return (
    <div className="absolute inset-0" style={{ color: t.colors.fg }}>
      <Img src={t.image} alt="" fill priority sizes="(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 94vw" imgClassName="transition-transform duration-[1.6s] ease-out-expo group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      <div className="absolute inset-x-0 top-12 flex items-center justify-between px-5 text-[9px] uppercase tracking-[0.3em] text-white/70">
        <span>Menu</span>
        <span className="font-['Cormorant_Garamond_Variable',serif] text-lg italic tracking-normal" style={{ color: t.colors.accent }}>
          MN
        </span>
        <span>Visit</span>
      </div>
      <div className="absolute inset-x-5 bottom-6 transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2">
        <p className="text-[9px] uppercase tracking-[0.35em]" style={{ color: t.colors.accent }}>
          Colaba · Mumbai
        </p>
        <p className="mt-2 font-['Cormorant_Garamond_Variable',serif] text-[clamp(2.4rem,4.4vw,3.4rem)] font-light leading-[0.88]">
          An ode to
          <br />
          <em style={{ color: t.colors.accent }}>slow fire</em>
        </p>
        <span className="mt-4 inline-block border px-4 py-2 text-[9px] uppercase tracking-[0.3em]" style={{ borderColor: t.colors.accent, color: t.colors.accent }}>
          Explore the Menu
        </span>
      </div>
    </div>
  )
}

function PreviewMinimal({ t }) {
  return (
    <div className="absolute inset-0 pt-9" style={{ color: t.colors.fg }}>
      <div className="flex items-center justify-between px-5 py-3 text-[10px]">
        <span className="font-['Instrument_Serif',serif] text-base">Oat & Linen</span>
        <span className="flex gap-3 opacity-80">
          <span>Menu</span>
          <span>Story</span>
          <span>Visit</span>
        </span>
      </div>
      <div className="grid h-[calc(100%-3rem)] grid-cols-[1.1fr_1fr] grid-rows-1 gap-3 px-5 pb-5">
        <div className="flex flex-col justify-end pb-2">
          <p className="text-[8px] uppercase tracking-[0.25em] opacity-80">Specialty coffee</p>
          <p className="mt-2 font-['Instrument_Serif',serif] text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[0.95]">
            Slow coffee, <em className="opacity-70">honest food.</em>
          </p>
          <span className="mt-3 h-1.5 w-4/5 rounded-full bg-current opacity-10" />
          <span className="mt-1.5 h-1.5 w-3/5 rounded-full bg-current opacity-10" />
          <span className="mt-4 inline-flex w-fit rounded-full px-3 py-1.5 text-[9px] text-[#F6F1EA]" style={{ background: t.colors.fg }}>
            Explore Menu
          </span>
        </div>
        <div className="relative h-full">
          <div className="absolute inset-x-0 bottom-0 top-[6%] overflow-hidden rounded-t-full transition-transform duration-700 ease-out-quart group-hover:-translate-y-2">
            <Img src={t.image} alt="" fill priority sizes="(min-width: 1024px) 15vw, 45vw" imgClassName="transition-transform duration-1000 ease-out-quart group-hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewColorful({ t }) {
  return (
    <div className="absolute inset-0 overflow-hidden pt-9 font-['Bricolage_Grotesque_Variable',sans-serif]" style={{ color: t.colors.fg }}>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="rounded-full border-2 border-current bg-white px-2.5 py-0.5 text-[10px] font-extrabold">Funky Fork</span>
        <span className="rounded-full border-2 border-current bg-[#FFD23F] px-2.5 py-0.5 text-[10px] font-bold shadow-[2px_2px_0_currentColor]">Order</span>
      </div>
      <p className="relative z-10 px-4 pt-2 text-[clamp(2.6rem,5vw,3.8rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
        <span className="block">Flippin’</span>
        <span className="block text-[#FFD23F] [-webkit-text-stroke:2px_#1B1035]">good</span>
        <span className="block">food!</span>
      </p>
      <div className="absolute -bottom-6 -right-6 size-[62%] rotate-6 overflow-hidden rounded-full border-[3px] border-[#1B1035] shadow-[6px_6px_0_#1B1035] transition-transform duration-700 ease-spring group-hover:rotate-[-6deg] group-hover:scale-105">
        <Img src={t.image} alt="" fill priority sizes="(min-width: 1024px) 20vw, 60vw" />
      </div>
      <div className="absolute left-4 top-[58%] grid size-16 rotate-[-12deg] place-items-center rounded-full border-2 border-[#1B1035] bg-[#14B8A6] text-center text-[9px] font-extrabold uppercase leading-tight text-white transition-transform duration-700 ease-spring group-hover:rotate-[20deg] group-hover:scale-110">
        Since
        <br />
        2022
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t-2 border-[#1B1035] bg-[#FFD23F] py-1.5 text-[10px] font-bold uppercase">
        <div className="flex w-max animate-[marquee_12s_linear_infinite] gap-4 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-4" aria-hidden={k === 1}>
              {['Smash burgers', '✺', 'Freakshakes', '✺', 'Donuts', '✺', 'Good vibes', '✺'].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const PREVIEWS = { luxury: PreviewLuxury, minimal: PreviewMinimal, colorful: PreviewColorful }
