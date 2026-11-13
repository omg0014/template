# Implementation Plan — Template Café

Companion to [PRD.md](PRD.md). Section numbers in brackets (e.g. *PRD §11*) refer to the PRD.

---

## 0. Repository audit (starting state)

| Finding | Implication |
|--------|-------------|
| The repo contained only `a.md` (the brief). No `package.json`, no git history | A greenfield Vite + React project. Nothing existing to preserve except `a.md` |
| No food photography or 3D assets supplied | Photos: download free-licence Unsplash images into `public/images` (decided with the owner). 3D: **procedural models built in code** (decided with the owner) |
| The owner targets Indian cafes | Demo cafes are fictional Indian brands with ₹ pricing, the veg/non-veg convention and `+91` WhatsApp links |
| Environment: Node 24, npm 11, macOS | Pin `engines.node >= 20.19` for Render compatibility with Vite 8 |

---

## 1. Recommended project architecture

```
                    ┌────────────────────────────── index.html (meta, fonts preconnect-free, root)
                    │
main.jsx ──► App.jsx ──► <MotionConfig reducedMotion="user">          (entry ≈ 155 KB gzip)
                           <TransitionProvider>       (template-switch curtain)
                             <BrowserRouter> routes:
                               /            → SelectorPage            (eager, small)
                               /:template   → TemplateRoute ──lazy──► templates/luxury   (chunk)
                                                                ├──► templates/minimal  (chunk)
                                                                └──► templates/colorful (chunk)
                               *            → NotFound
                           <TemplateSwitcher/> (showcase mode only, on template routes)

Each template chunk ──► resolveCafe() + <CafeProvider cafe={config}> + <SmoothScroll> + its own sections
                       (cafe configs, GSAP and Lenis live here, not in the entry bundle)
                     └─ <Showcase3D> ──lazy (when near viewport)──► three/ShowcaseCanvas (3D chunk)
```

- **Routing:** `react-router` (BrowserRouter). Routes are code-split per template with `React.lazy`.
- **State:** no global state library. React context only for:
  - `CafeContext`: the active cafe config.
  - `TransitionContext`: the curtain state.
  - `SmoothScrollContext`: the Lenis instance and a `scrollTo` helper.
  
  Menu filter and dialog state are local to the components.
- **Config → UI:** templates read everything through `useCafe()` (plus derived selectors such as `useMenu()` and `useOpeningStatus()`). No cafe copy is hard-coded in components.

## 2. Folder structure

```
template-cafe/
├─ PRD.md · PLAN.md · README.md · a.md
├─ index.html                 # base meta, theme-color, OG defaults
├─ render.yaml                # Render static-site blueprint
├─ .nvmrc
├─ package.json · vite.config.js · eslint.config.js · vitest.config.js
├─ public/
│  ├─ images/<slug>-{480,960,1600}.webp   # optimised photography
│  ├─ favicon.svg · og-cover.jpg · robots.txt · sitemap.xml
├─ scripts/
│  ├─ fetch-images.py         # reproducible download + WebP + LQIP manifest
│  └─ validate-config.mjs     # `npm run validate`
└─ src/
   ├─ main.jsx · App.jsx · index.css         # Tailwind entry + global tokens/resets
   ├─ config/
   │  ├─ app.config.js        # mode: 'showcase' | 'single', singleCafe
   │  ├─ defineCafe.js        # defaults + light normalisation
   │  ├─ index.js             # registry: cafes by template key
   │  └─ cafes/ maison-noir.js · oat-and-linen.js · funky-fork.js
   ├─ data/
   │  ├─ images.js            # AUTO-GENERATED image manifest (size, LQIP, credit)
   │  ├─ menu.js              # master menu: categories + items
   │  ├─ templates.js         # selector metadata (name, blurb, tags, colours)
   │  └─ validate.js          # pure validation fns (used by script + tests)
   ├─ lib/                    # pure helpers: format.js, whatsapp.js, hours.js, device.js, cn.js
   ├─ hooks/                  # useCafe, useMenuFilter, useMediaQuery, useReducedMotion,
   │                          # useInView, useLockBodyScroll, useFocusTrap, useScrollDirection, useDocumentMeta
   ├─ components/             # SHARED HEADLESS / PRIMITIVE components only
   │  ├─ Img.jsx              # responsive <img srcset> + blur-up + error fallback
   │  ├─ Dialog.jsx           # accessible modal/sheet shell (unstyled)
   │  ├─ Lightbox.jsx         # accessible gallery lightbox shell
   │  ├─ VegMark.jsx · Stars.jsx · Price.jsx · SkipLink.jsx · ErrorBoundary.jsx · SEO.jsx
   │  ├─ MapEmbed.jsx · BrandIcons.jsx · CategoryIcon.jsx
   │  └─ showcase/Showcase3D.jsx    # lazy gate + fallback logic (no three imports)
   ├─ animation/              # gsap.js (registers plugins once), presets per template, SmoothScroll.jsx
   ├─ three/                  # ONLY imported via dynamic import()
   │  ├─ ShowcaseCanvas.jsx   # Canvas, lights, env, controls, labels, camera rig
   │  ├─ models/ Burger.jsx · Latte.jsx · Donut.jsx
   │  └─ stages.js            # per-template lighting/background presets
   ├─ app/                    # shell: SelectorPage, TemplateRoute, TemplateSwitcher, TransitionCurtain, NotFound
   └─ templates/
      ├─ useTemplateCafe.js   # resolves the cafe for a template chunk (showcase vs single mode)
      ├─ luxury/   index.jsx · luxury.css · sections/*.jsx · ui/*.jsx
      ├─ minimal/  index.jsx · minimal.css · sections/*.jsx · ui/*.jsx
      └─ colorful/ index.jsx · colorful.css · sections/*.jsx · ui/*.jsx
```

## 3. Technology and library decisions

| Library | Decision | Reasoning |
|--------|----------|-----------|
| **Vite 8** | ✅ | Fast dev, Rollup/Rolldown code-splitting, static output for Render |
| **React 19 + JS** | ✅ | Required. Concurrent features keep filtering responsive |
| **react-router** | ✅ | Real URLs (`/luxury`) for sharing in pitches, back/forward, lazy routes |
| **Tailwind CSS v4** (`@tailwindcss/vite`) | ✅ | Utility-first and mobile-first. `@theme` tokens plus per-template CSS variables give independent palettes without config duplication |
| **GSAP 3 + ScrollTrigger + `@gsap/react`** | ✅ | Timelines and scroll-linked reveals/parallax: hero reveals, clip-path reveals, loaders. `useGSAP` handles cleanup |
| **Motion** (`motion/react`) | ✅ | Declarative component animation: `AnimatePresence` for filters/dialogs/curtain, `layoutId` for tab indicators, springs for the Colorful template |
| **Lenis** | ✅ desktop only | Smooth wheel scrolling for the premium feel, synced to the GSAP ticker. Disabled on touch and reduced motion, so there's no mobile scroll hijack |
| **Three.js + R3F + Drei** | ✅ lazy chunk | The 3D showcase. Drei is used selectively (`Float`, `ContactShadows`, `Environment` + `Lightformer`) and tree-shaken. Labels are a plain DOM overlay (see §8), not drei `<Html>` |
| **Swiper** | ✅ reviews only | Mature touch carousel with an a11y module and effects (fade, cards). Other rails use native CSS scroll-snap: zero JS, native momentum |
| **Lucide React** | ✅ | Tree-shakeable icons |
| **Fontsource** | ✅ | Self-hosted fonts imported inside each template chunk, so fonts are code-split too. No Google Fonts request chain |
| **Vitest + Testing Library + jsdom** | ✅ | Unit/integration tests for config, menu logic, hours and dialog accessibility |

**Animation-conflict rule:** GSAP owns scroll-linked and timeline motion. Motion owns mount/unmount, layout and gesture motion. **They never animate the same element.** CSS transitions handle simple hover states.

## 4. Reusable component strategy

Three layers:

1. **Pure logic** (`lib/`, `hooks/`): price formatting, WhatsApp URL building, opening-hours status, menu filtering, focus trap, body-scroll lock, device capability detection. Unit tested.
2. **Headless/primitive components** (`components/`): behaviour and accessibility without visual opinion. Each takes `className` / render props:
   - `Dialog` (portal, focus trap, Esc, scroll lock, `aria-*`)
   - `Lightbox` (keyboard, swipe, preload neighbours)
   - `Img` (srcset, blur-up, aspect ratio, error placeholder)
   - `VegMark`, `Stars`, `Price`, `SEO`, `ErrorBoundary`, `Showcase3D` (capability gate)
3. **Template components** (`templates/<name>/`): all visual design. Each template composes the primitives with its own markup, styles and animation presets.

## 5. Template separation strategy

- Each template is a **self-contained folder** with its own `index.jsx` (page composition), CSS file (fonts plus tokens scoped to `[data-template="<name>"]`), `sections/` and `ui/` (buttons, headings, badges in that template's style).
- Templates **never import from each other**. Shared code flows only from `components/`, `hooks/`, `lib/`, `animation/` and `three/`.
- Each template folder is a lazy chunk, so its CSS, fonts and code load only on its route.
- A template receives its cafe through `CafeProvider`. Any cafe config can be rendered by any template, because they all use the same schema.

## 6. Configuration and static data structure

```js
// src/config/cafes/maison-noir.js
import { defineCafe } from '../defineCafe'
import { MENU } from '../../data/menu'

export default defineCafe({
  id: 'maison-noir',
  template: 'luxury',
  identity: { name: 'Maison Noir', shortName: 'Noir', monogram: 'MN', tagline: '…', logo: null },
  theme: { colors: { bg: '#0B0907', surface: '#15110D', accent: '#C9A35B', … }, fonts: { display: 'Cormorant Garamond Variable', body: 'Manrope Variable' } },
  seo: { title: '…', description: '…', ogImage: '/images/burger-noir-1600.webp' },
  hero: { eyebrow: '…', headline: ['An ode to', 'slow fire'], description: '…', image: 'burger-noir', video: null,
          primaryCta: { label: 'Explore Menu', href: '#menu' }, whatsappCta: { label: 'Order on WhatsApp' } },
  menu: MENU,                                  // or a cafe-specific override
  signatureIds: ['truffle-smash', 'bombay-chilli-prawn', 'burnt-basque'],
  bestsellerIds: [...], showcase: [{ model: 'burger', dishId: 'truffle-smash', labels: [...] }, …],
  story: { heading, paragraphs[], founder: { name, role, quote, image }, highlights[], stats[] },
  gallery: [{ image, alt, tag }], testimonials: [...], rating: { value: 4.8, count: '1,200+' },
  contact: { address: {...}, geo, mapQuery, phone, whatsapp: { number, message }, email, hours: [...], socials: {...} },
  locale: { locale: 'en-IN', currency: 'INR', timezone: 'Asia/Kolkata' },
})
```

- **Menu item schema:** `{ id, name, description, price, category, veg, bestseller, spicy, image, ingredients[], tags[] }`
- **Category schema:** `{ id, label, icon, blurb }`
- **Hours schema:** `{ day: 0–6, open: 'HH:mm', close: 'HH:mm' } | { day, closed: true }`. Closing after midnight is supported.
- **Theme colours** are written as CSS custom properties on the template root by `CafeProvider`. Tailwind utilities reference them (`bg-[--c-bg]` or `@theme` aliases), so changing brand colours needs no CSS edits.
- `defineCafe()` fills defaults and freezes the object. `data/validate.js` checks referential integrity and powers both `npm run validate` and the tests.

## 7. Animation architecture

- `animation/gsap.js`: registers `ScrollTrigger` and `useGSAP` once. It is the only place plugins are registered.
- `animation/presets.js`: per-template tokens (`duration`, `ease`, `stagger`, `distance`), so each template's personality is codified, not ad hoc.
- **Pattern:**
  - Every section that animates uses `useGSAP(() => {...}, { scope: ref })`, which reverts automatically on unmount.
  - Inside it, `gsap.matchMedia()` gates motion: `(prefers-reduced-motion: no-preference)`, and `(min-width: 1024px)` for parallax.
- **Reveals:** a `data-*-reveal` attribute convention per template plus `ScrollTrigger.batch` for card grids. There is one batched trigger per grid, not one per card. Reveals tween **opacity, not `autoAlpha`**: `visibility: hidden` would remove unrevealed headings from the accessibility tree, so screen-reader users couldn't navigate to sections they haven't scrolled to.
- **Text splitting:** a tiny in-house `SplitLines`/`SplitChars` React component wraps words/chars in spans with `aria-hidden` and keeps an `sr-only` full string, so there's no paid plugin and accessibility is preserved.
- **Smooth scroll:** the `SmoothScroll` provider creates Lenis only when `(pointer: fine)` and there is no reduced motion. `lenis.on('scroll', ScrollTrigger.update)` plus `gsap.ticker.add(t => lenis.raf(t*1000))`. It exposes `scrollTo(selector)`, with a fallback to native `scrollIntoView`.
- **Template switch:** `TransitionProvider.go(path, color)`:
  1. Curtain animates in (Motion).
  2. `navigate()`.
  3. The new route's `useEffect` calls `reveal()` once the lazy chunk has mounted.
  4. Curtain animates out.
  
  `ScrollTrigger.killAll` is not needed because `useGSAP` reverts on unmount. `ScrollTrigger.refresh()` runs after the curtain finishes.
- **Reduced motion:** `MotionConfig reducedMotion="user"` plus GSAP `matchMedia` plus CSS `@media (prefers-reduced-motion)` overrides.

## 8. 3D asset architecture

- `components/showcase/Showcase3D.jsx` (in the template chunk, no three imports):
  - Observes the section with IntersectionObserver (`rootMargin: 100% 0px`).
  - Checks capability (`lib/device.js`): WebGL available, `saveData`, `deviceMemory`, reduced motion.
  - Decides between `auto` (load the canvas), `opt-in` (poster plus "View in 3D" button) and `fallback` (photo only).
  - Renders `React.lazy(() => import('../../three/ShowcaseCanvas'))` inside `ErrorBoundary` + `Suspense` (poster as fallback).
- `three/ShowcaseCanvas.jsx`:
  - `<Canvas dpr={[1, cap]} frameloop={visible ? 'always' : 'never'} gl={{ antialias: true, powerPreference: 'high-performance' }}>`
  - Lights from the template **stage preset** (`stages.js`: background, key/rim colours, float intensity).
  - `Environment` built from `Lightformer`s, with no HDR download.
  - `ContactShadows` and `Float`.
  - A camera rig lerps to each dish's focus point. A custom drag-rotate binds to pointer events with `touch-action: pan-y`. Keyboard/buttons rotate by 45°.
  - Labels are a **DOM overlay owned by our React tree**. A tiny `<LabelProjector>` projects fixed anchors (beside the model, so they stay readable while it spins) to screen space each frame and moves the spans there.
    - *Decision during build:* drei `<Html>` portals caused a `removeChild` DOM error when a template unmounted mid-switch, so they were replaced.
    - On phones (< 640 px), labels render as chips under the canvas instead of floating, since they would clip at the edges. Larger screens also mirror them in an `sr-only` list.
- **Models** (`three/models/*.jsx`) are built from Three primitives (`LatheGeometry` for the cup and bun, `TorusGeometry` for the donut, `InstancedMesh` for sesame seeds and sprinkles, `CanvasTexture` for latte art), with `MeshPhysicalMaterial` (clearcoat for glaze and sauce).
- **Future glTF:** `showcase[].modelUrl` is optional. If present, the canvas loads it with `useGLTF` (Draco-ready); otherwise it uses the procedural model.
- **Budget:** < 60k triangles total, 1 shadow source (contact shadows, no shadow maps), DPR cap 1.5 on mobile.

## 9. Responsive development strategy

- Mobile-first Tailwind (unprefixed = mobile). Design at 390 px first, then `md`, `lg`, `xl`.
- Fluid type with `clamp()` in each template's CSS. Heroes use `svh`.
- `html, body { overflow-x: clip }` as a safety net, but each component is checked at 320 px.
- Touch: `scroll-snap` rails for categories and bestsellers, `touch-action: pan-y` on draggable things, 44 px minimum targets.
- `useMediaQuery('(pointer: fine)')` gates cursor effects, magnetic hovers and pointer parallax.
- Images use per-slot `sizes` (e.g. `(min-width:1024px) 33vw, 90vw`) so phones download the 480/960 variants.

## 10. Performance optimisation strategy

| Area | Technique |
|------|-----------|
| JS | Route-level lazy chunks per template. Each chunk also contains its cafe config, `CafeProvider`, GSAP and Lenis, keeping them out of the entry. The 3D chunk (three/R3F/drei) is created automatically by the dynamic import and is IO-gated. Swiper is imported only by the review sections. GSAP lives in a shared lazy chunk |
| Images | WebP at 3 widths, `srcset`/`sizes`, `loading="lazy"` + `decoding="async"` below the fold. Hero gets `fetchpriority="high"` and `<link rel="preload">` injected per route. LQIP blur placeholders inline in the manifest. Explicit `width`/`height` → CLS ≈ 0 |
| Fonts | Fontsource woff2 latin subsets, imported per template. Display fonts on the selector are limited to 1 weight each |
| Animation | Transform/opacity only. `will-change` applied only during animation. Batched ScrollTriggers. The R3F frameloop stops off-screen |
| Render path | **Progressive mounting** (`useDeferredMount`): each template paints nav + hero first, then mounts the remaining sections in a React transition on the next frame. Scroll reveals are created only after that. This cut mobile render delay by about 1 s per template |
| LCP-safe motion | The LCP element is never hidden at first paint. Priority images skip the fade-in. Entrances use transform, blur or partial clip instead of `opacity: 0`, e.g. luxury's "focus pull" and minimal's arch opening from 22%. The template's hero image is `preload()`-ed from the entry bundle, in parallel with its chunk |
| Intro trade-off | Luxury's monogram intro is configurable (`introLoader` in the cafe config) for clients who prefer raw speed |
| Third-party | The Maps iframe loads lazily |
| Caching | Hashed assets → immutable cache headers on Render |

## 11. SEO and accessibility implementation

- `SEO.jsx` / `useDocumentMeta` updates `title`, `description`, `og:*`, `theme-color` and injects JSON-LD (`CafeOrCoffeeShop`) per cafe route.
- `public/robots.txt`, `public/sitemap.xml` (static routes), and `index.html` OG defaults.
- A skip link, landmarks, a single `h1` and logical heading order per section.
- Focus management in `Dialog`, `Lightbox`, the mobile nav and the switcher via `useFocusTrap`. Focus is restored to the opener.
- Category tabs: `role="tablist"`, `aria-selected`, roving tabindex, and arrow-key support.
- Contrast is verified for each palette. Gold text uses `#D4B074`+ on dark backgrounds for body sizes, and colourful text sits on ink or white, never on yellow.

## 12. Testing strategy

| Level | Tooling | Coverage |
|------|---------|----------|
| Static | ESLint (React hooks rules) | All source |
| Config integrity | `npm run validate` + Vitest | Unique ids, curated ids exist, images exist in the manifest, categories valid, hours valid, required fields present |
| Unit | Vitest | `formatPrice`, `whatsappUrl`, `getOpeningStatus` (incl. after-midnight, closed day, timezone), `filterMenu` |
| Component | Vitest + Testing Library + jsdom | Category tabs filter items. `Dialog` traps focus and closes on Esc. Selector page renders 3 cards with correct links |
| Build | `npm run build` | Chunk-size check (no `three` in entry/template chunks) |
| Manual / visual | Chrome DevTools device mode + headless Chrome screenshots | 360/390/768/1280/1440/1920 widths, reduced motion, WebGL disabled, keyboard pass |
| Performance | Lighthouse (mobile + desktop) | PRD §18 targets per route |

## 13. Render deployment procedure

1. Push the repo to GitHub/GitLab.
2. Render → **New → Static Site** (or **Blueprint**, using `render.yaml`).
3. **Build command:** `npm ci && npm run build`. **Publish directory:** `dist`.
4. **Redirects/Rewrites:** Source `/*` → Destination `/index.html` → Action **Rewrite**.
5. **Headers:** `/assets/*` → `Cache-Control: public, max-age=31536000, immutable`. `/images/*` → `Cache-Control: public, max-age=2592000`.
6. Set the env var `NODE_VERSION=22` (or rely on `.nvmrc`).
7. After deploy, verify the deep links `/luxury`, `/minimal`, `/colorful` and `/nonexistent` (branded 404).

`render.yaml` encodes steps 3–6.

## 14. Implementation phases

### Phase 1: Project setup and design foundation
- **Build:**
  - Vite + React + Tailwind v4, ESLint, Vitest, folder skeleton.
  - `index.css` tokens and resets.
  - `lib/*`, `hooks/*`, `data/menu.js`, image manifest and pipeline script, `defineCafe` and 3 cafe configs, validator.
  - Primitives: `Img`, `Dialog`, `Lightbox`, `VegMark`, `Stars`, `Price`, `SEO`, `ErrorBoundary`, `SkipLink`.
  - GSAP registration, Lenis provider.
- **Expected result:** `npm run dev` serves a placeholder route. `npm test` and `npm run validate` pass.
- **Dependencies:** none.
- **Done when:** lint/test/validate are green, configs load, and `Img` renders responsive images with blur-up.

### Phase 2: Template selection landing page
- **Build:**
  - `SelectorPage` with 3 preview cards, hover/focus/entrance animations and the "includes" grid.
  - Router plus lazy template routes, `TransitionProvider` + curtain, `TemplateSwitcher`, `NotFound`.
- **Expected result:** a polished landing page. Clicking a card animates into a stub template page. The switcher works.
- **Dependencies:** Phase 1.
- **Done when:** it works at 360–1920 px, keyboard focus is visible, links are real `<a>`s, back/forward works and the curtain shows < 700 ms per direction.

### Phase 3: Luxury Cinematic template
- **Build:** all 11 sections, nav, loader, footer, luxury CSS tokens and fonts, gold UI kit.
- **Expected result:** a complete dark cinematic site from the Maison Noir config.
- **Dependencies:** Phases 1–2. Uses the Phase 6 menu logic, and the Phase 7 slot is in place with a fallback until the canvas lands.
- **Done when:** all sections render from config, there's no overflow at 320 px, and the luxury motion presets are applied.

### Phase 4: Modern Minimal template
- **Build:** all 11 sections with the editorial grid, arched hero, sticky category index and minimal UI kit.
- **Expected result:** a complete cream editorial site from the Oat & Linen config.
- **Dependencies:** Phases 1–2.
- **Done when:** the same checks as Phase 3 pass, and it is visually distinct (no shared section components).

### Phase 5: Creative & Colorful template
- **Build:** all 11 sections with the sticker UI kit, bouncing headline, marquee, polaroid gallery and stacked review cards.
- **Expected result:** a complete playful site from the Funky Fork config.
- **Dependencies:** Phases 1–2.
- **Done when:** the same checks as Phase 3 pass.

### Phase 6: Interactive food menu and category system
- **Build:**
  - `useMenuFilter` and the accessible tablist behaviour.
  - Per-template menu presentations (luxury list with cursor preview, minimal sticky index plus grid, colorful chip cards).
  - Detail dialog/sheet with WhatsApp ordering.
- **Expected result:** filtering animates smoothly in every template, and dialogs are accessible.
- **Dependencies:** Phase 1 (logic). Integrated in Phases 3–5 (presentation).
- **Done when:** PRD §10 and acceptance criterion 5 are met.

### Phase 7: 3D food showcase
- **Build:**
  - `Showcase3D` gate and `ShowcaseCanvas`.
  - The 3 procedural models, stage presets per template, labels, drag/keyboard rotation, camera rig, scroll entrance, fallbacks.
- **Expected result:** each template has an interactive 3D section in its own staging.
- **Dependencies:** Phase 1. Slots into Phases 3–5.
- **Done when:** PRD §11 and acceptance criterion 6 are met, and there's no three.js in the initial or template chunks.

### Phase 8: Advanced animations and transitions
- **Build:**
  - Refine each template's intro, hero, reveal, parallax and hover language to the PRD §14 matrix.
  - Curtain polish, reduced-motion audit.
- **Expected result:** a coherent, distinct motion personality per template.
- **Dependencies:** Phases 3–7.
- **Done when:** the reduced-motion pass is clean, there are no leaked ScrollTriggers after switching templates 10×, and no long tasks > 50 ms from animation setup.

### Phase 9: Mobile responsiveness and performance
- **Build:**
  - A device-matrix pass, touch-target audit, image `sizes` tuning, chunk analysis, font subsetting check.
  - Lighthouse fixes.
- **Expected result:** PRD §13 and §18 targets are met.
- **Dependencies:** Phases 3–8.
- **Done when:** acceptance criteria 9 and 11 are met.

### Phase 10: Testing, optimisation and Render deployment
- **Build:** test suite completion, `render.yaml`, `README.md` (customisation guide), final QA and deploy.
- **Expected result:** a live Render URL with deep links working.
- **Dependencies:** all phases.
- **Done when:** every PRD §23 acceptance criterion is checked.

## 15. Dependencies between phases

```
P1 ──► P2 ──► P3 ─┐
 │            P4 ─┼──► P8 ──► P9 ──► P10
 ├──► P6 ────►P5 ─┤
 └──► P7 ─────────┘
```
- P6 (logic) and P7 (3D) can be built in parallel with P3–P5, since they plug into the template slots.
- P8 needs all visual sections in place. P9 needs final motion (animation affects performance). P10 is last.

## 16. Definition of done (applies to every phase)

- The feature works on a 390 px touch viewport **and** a 1440 px pointer viewport.
- Keyboard operable, with visible focus. Reduced-motion is respected.
- No console errors or warnings. Lint and tests pass. `npm run build` succeeds.
- No hard-coded cafe copy in templates. Content comes from config.
- No reservation UI introduced.

## 17. Technical risks and mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Bundle bloat from three/drei | Slow first load | Lazy, IO-gated chunk. Selective drei imports. `manualChunks` isolates the vendor. Build check |
| GSAP + Motion fighting over the same element | Jank, broken states | Ownership rule (§3). Code review checklist |
| Lenis on mobile breaking native scroll / iOS bounce | Bad UX on the primary audience | Lenis enabled only on `(pointer: fine)`. Native scroll on touch |
| ScrollTrigger leaks across template switches | Memory, wrong triggers | `useGSAP` scoping. `ScrollTrigger.refresh()` after the curtain. Switch-10× test |
| WebGL context loss / low-end GPUs | Crash or jank | Capability gate, ErrorBoundary, DPR cap, `frameloop` pause, opt-in mode |
| Canvas swallowing touch scroll | Users stuck in the 3D section | `touch-action: pan-y` plus a custom horizontal drag. No OrbitControls zoom |
| Heavy photography | LCP regressions | 3-width WebP, `sizes`, hero preload, LQIP, lazy below the fold |
| Lazy chunk fails to load (offline/deploy race) | Blank route | Error boundary with a "Reload" action around the routes |
| Google Maps iframe blocked | Empty box | Styled fallback card with the address and Directions link always visible beside the map |
| Image licensing | Legal risk when reselling | Unsplash licence (free commercial use). Credits recorded in the manifest. README instructs replacing them with the client's own photography for production |
| Same fonts across templates diluting identity | "Feels like a re-skin" | Distinct font families, layouts and motion presets per template (PRD §8) |
| Fictional contact data mistaken for real | Customer confusion | Clearly placeholder numbers (`+91 98765 43210`) and a README note to replace them |
