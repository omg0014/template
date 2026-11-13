# Product Requirements Document — Template Café

**Product:** Template Café: a premium, multi-template cafe website showcase
**Version:** 1.0
**Date:** 2026-11-11
**Status:** Approved for build
**Companion document:** [PLAN.md](PLAN.md), the implementation roadmap. Both documents use the same terms, names and decisions.

---

## 1. Product overview

Template Café is a frontend-only React application with three complete cafe websites:

| # | Template | Demo brand | Personality |
|---|----------|-----------|-------------|
| 1 | **Luxury Cinematic** | *Maison Noir* (Colaba, Mumbai) | Dark, gold, serif, slow and dramatic |
| 2 | **Modern Minimal** | *Oat & Linen* (Indiranagar, Bengaluru) | Cream, editorial, spacious, quiet |
| 3 | **Creative & Colorful** | *The Funky Fork* (Assagao, Goa) | Vibrant, expressive, playful, bouncy |

Visitors land on a **template selection screen**, pick a design and move into that full cafe website through an animated transition. A persistent **template switcher** lets them jump between templates or go back to the selection screen at any time.

Each website is driven by a **cafe configuration file**: brand, colours, fonts, hero, menu, reviews, gallery, contact and so on. To resell a template to a real cafe, you edit data, not components.

## 2. Product vision

> "The cafe owner opens the link on their phone, scrolls for ten seconds, and asks *how soon can mine look like this?*"

- Every template is a **different website**, not a re-skin. Each has its own layout system, typography, component set, animation language and 3D staging.
- Quality should match award-level showcase sites (Awwwards / FWA style). Usability, accessibility and performance must never be sacrificed for effects.
- **Mobile is the primary canvas.** Most cafe customers will see these sites from an Instagram bio link on a phone.

## 3. Problem statement

Independent cafes in India mostly rely on Instagram, Zomato and Swiggy listings. Their own websites, if they have one, tend to be:

- Generic website-builder themes that look like every other cafe.
- Slow, image-heavy pages with poor mobile layouts.
- Hard to keep current: a menu or price change means paying a developer.
- Missing a clear way to act: no "order on WhatsApp", no map, no opening hours.

A seller of cafe websites (us) needs a **sales asset** that:

1. Shows real visual range right away (three different directions).
2. Runs smoothly on a mid-range Android phone during a pitch.
3. Converts into a deliverable quickly (config-driven, so a new cafe takes hours, not weeks).

## 4. Target audience

| Audience | Who | What they need |
|----------|-----|----------------|
| **Primary buyer** | Cafe owners and managers, small cafe chains, cloud-kitchen brands | To see premium quality, picture their own brand in it and understand the cost and time to launch |
| **End users** (cafe customers) | 18–40, mobile-first, arriving from Instagram or Google Maps | To see the menu and prices, check if it's open, find the cafe and order on WhatsApp in under 3 taps |
| **Internal** | Developers or designers customising for a client | A clean config, documented tokens, predictable component structure |

## 5. Business objectives

| Objective | Measure of success |
|-----------|-------------------|
| Win pitches | Owner can explore all 3 templates within 2 minutes on a phone |
| Fast customisation | New cafe configured (content + brand + images) in **≤ 1 working day** with no component changes |
| Premium perception | Lighthouse Performance **≥ 85 mobile** / **≥ 95 desktop** on each template, with no jank visible during the demo |
| Low running cost | Static hosting only (Render Static Site, free tier), with no server cost |
| Reusability | ≥ 90 % of a cafe's content lives in config; templates contain no hard-coded cafe copy |

## 6. Core user journeys

### J1: Owner explores templates (pitch flow)
1. Opens the root URL and sees the selection screen with 3 large preview cards in < 2 s on 4G.
2. Taps **Preview Website** on *Luxury Cinematic*. A branded transition curtain covers the screen and the template loads behind it (lazy chunk).
3. Scrolls the full site: hero, signature dishes, menu filtering, 3D dish, story, reviews.
4. Taps the floating **Templates** switcher and picks *Creative & Colorful*. Transition, then the new site loads.
5. Goes back to the selection screen with the switcher's "All templates" action or the browser back button.

### J2: Customer checks the menu and orders
1. Lands on the hero and taps **Explore Menu**, which smooth-scrolls to the menu.
2. Swipes the category chips and taps *Coffee*. Items filter with an animation.
3. Taps an item to open a detail sheet (image, description, ingredients, veg mark, price).
4. Taps **Order on WhatsApp**. WhatsApp opens with a pre-filled message: "Hi Maison Noir! I'd like to order: Truffle Smash Burger (₹549)".

### J3: Customer plans a visit
1. Opens the navigation and taps **Visit**, which jumps to Location & Contact.
2. Sees today's hours highlighted, plus the address and an embedded map.
3. Taps **Directions** (Google Maps) or **Call** (`tel:`).

### J4: Developer onboards a new cafe
1. Copies `src/config/cafes/maison-noir.js` to `src/config/cafes/<new-cafe>.js`.
2. Edits brand, colours, copy, menu, contact and images, and registers the cafe in `src/config/index.js`.
3. Runs `npm run validate` (config checks) and `npm run build`, then deploys.

## 7. Template selection experience

### 7.1 Layout
- **Header:** product wordmark "Template Café", a one-line value proposition and a "3 templates · 11 sections · Mobile-first" meta row.
- **Three preview cards:**
  - Desktop (≥ 1024 px): 3 columns, each ~ 72 vh tall.
  - Tablet (640–1023 px): horizontal scroll-snap rail, 1.2 cards visible.
  - Mobile (< 640 px): vertical stack of full-width cards, each ~ 78 vh. The card shows a framed "phone/browser" preview of the template.
- Below the cards there is a short "What every template includes" grid (sections, 3D, configuration, performance) and a closing line.

### 7.2 Card content (each)
- A large preview: the template's real hero photo plus a typographic mock in that template's real fonts and colours, inside a browser frame.
- Template number ("01"), template name and a 1-sentence description.
- 3 tag pills, e.g. *Serif · Dark · Cinematic*.
- A **Preview Website** button (a real `<a href>` to the template route, so it works without JS and for SEO).

### 7.3 Interactions
- Hover (pointer devices): the card lifts 8 px, the preview image scales 1.00 → 1.06 over 900 ms and the preview "scrolls" to show more of the site. The button gets a fill sweep.
- Focus-visible: a 2 px outline offset 4 px around the card, plus the same lift as hover.
- Entrance: cards stagger in at 120 ms intervals (opacity plus 40 px rise, 900 ms).
- On select: a full-screen curtain in the destination template's background colour wipes in (≤ 700 ms) while the template chunk loads, then wipes out to reveal the template.

### 7.4 Persistent switcher (inside templates)
- A floating pill button fixed at the bottom-left (safe-area aware), labelled **Templates**, with an icon.
- Opens a sheet or popover listing the 3 templates (thumbnail, name, current one marked) plus **All templates** (back to `/`).
- Fully keyboard operable (Tab, Enter, Esc closes, focus returns to the trigger) with `aria-expanded` and `aria-controls`.
- Hidden when the app runs in **single-cafe mode** (see §15).

## 8. Detailed requirements for the three templates

All three templates implement every section in §9. They differ in the following ways.

### 8.1 Luxury Cinematic — *Maison Noir*
| Aspect | Specification |
|-------|---------------|
| Palette | Background `#0B0907`, surface `#15110D`, umber `#2A1D14`, gold `#C9A35B`, gold-light `#E6C98F`, text `#EFE6D8`, muted `#A89A86` |
| Type | Display: **Cormorant Garamond** (variable, italic for emphasis). Body: **Manrope** |
| Scale | Hero headline `clamp(3.25rem, 11vw, 10rem)`, line-height 0.9 |
| Layout | Full-bleed imagery, asymmetric editorial rows, gold hairline dividers, generous negative space |
| Signature motifs | Intro loader with monogram and counter, line-mask headline reveals, slow Ken Burns hero, clip-path image reveals, "dotted leader" price rows, outlined giant wordmark in the footer, cursor-following image preview on menu rows (desktop) |
| Motion | 1.0–1.6 s durations, `expo.out` / `power4.inOut`, staggers 80–120 ms |
| 3D staging | Black stage, warm key light, gold rim light, soft contact shadow |

### 8.2 Modern Minimal — *Oat & Linen*
| Aspect | Specification |
|-------|---------------|
| Palette | Background `#F6F1EA`, surface `#FFFDF9`, beige `#E9DFD1`, line `#D9CDBD`, brown `#6B4F3A`, ink `#2B211A`, muted `#7A6656` |
| Type | Display: **Instrument Serif**. Body: **Inter** |
| Layout | 12-column grid, wide margins, hairline rules, arched image masks, sticky category index on desktop |
| Signature motifs | Split hero with arched image, numbered editorial cards, rank-list bestsellers, stat counters, clean caption-led gallery |
| Motion | 0.5–0.8 s, `power2.out`, fade plus 16–24 px rise, image scale 1.00 → 1.04 on hover |
| 3D staging | Bright cream studio, soft ambient light, gentle float |

### 8.3 Creative & Colorful — *The Funky Fork*
| Aspect | Specification |
|-------|---------------|
| Palette | Background `#FFF6E9`, ink `#1B1035`, pink `#FF4F8B`, orange `#FF8A3D`, yellow `#FFD23F`, teal `#14B8A6`, violet `#7B5CFF` |
| Type | **Bricolage Grotesque** (variable, 400–800) for display and body |
| Layout | Chunky 2 px ink borders with offset "sticker" shadows, tilted cards, colour-blocked sections, polaroid collage gallery |
| Signature motifs | Letter-by-letter bouncing headline, spinning circular badge, floating food cut-outs with pointer parallax, marquee ticker, wobble on hover, stacked swipeable review cards |
| Motion | Springs (stiffness 260–400, damping 18–24), `back.out(1.7)`, short 0.4–0.7 s |
| 3D staging | Gradient pop background, bright key light, bouncy float, sprinkles |

**Differentiation rule:** no section component is shared between templates. Only headless logic (hooks, data, accessibility primitives) is shared.

## 9. Complete website section requirements

Every template ships all 11 sections in this order. Each section has an `id` for anchor navigation (`#home`, `#signature`, `#menu`, `#showcase`, `#bestsellers`, `#story`, `#gallery`, `#reviews`, `#visit`).

| # | Section | Required content | Required behaviour |
|---|---------|-----------------|-------------------|
| 1 | **Hero** | Eyebrow, 1–3 line headline, ≤ 160-char description, hero image (optional video), **Explore Menu** CTA, optional **Order on WhatsApp** CTA | ≥ 88 svh on mobile / 100 svh on desktop. Animated headline reveal finishes ≤ 1.8 s after first paint. LCP image preloaded with `fetchpriority="high"` |
| 2 | **Signature Dishes** | 3 dishes from config `signatureIds`: image, name, description, price, optional chef's note | Image reveal animation on enter (clip-path or mask). Large, image-led layout |
| 3 | **Food Categories** | 8 categories: Burgers, Pizza, Pasta, Desserts, Coffee, Shakes, Beverages, Signature Specials, plus "All" | Horizontally scrollable on touch (scroll-snap). Active state animated. Keyboard arrows move between tabs (`role="tablist"`) |
| 4 | **Interactive Menu** | Per item: image, name, description, price (₹), category, veg/non-veg mark, optional Bestseller badge | Filtering animates (exit/enter + layout) ≤ 450 ms. Tapping an item opens a detail dialog. Item count shown per category |
| 5 | **3D Showcase** | 3 procedural 3D dishes (burger, latte, donut), each with 3–5 ingredient labels | Drag/arrow rotate, dish switcher, scroll-linked entrance, fallback image (§11) |
| 6 | **Bestsellers** | 4 items from `bestsellerIds`, with a badge and a short "why people love it" line | Animated reveal, swipeable rail on mobile |
| 7 | **Our Story** | Story heading and paragraphs, founder/chef name, role, quote and photo, 3 ingredient/preparation highlights, optional stats | Scroll-based reveals and parallax (desktop) |
| 8 | **Gallery** | 8 images tagged *interior, food, drinks, kitchen* | Responsive grid. Opens a lightbox with keyboard (←/→/Esc) and swipe navigation |
| 9 | **Customer Reviews** | 6 predefined testimonials: name, locality, rating 1–5, text, source label (Google/Zomato) | Swiper carousel, touch swipe, autoplay paused on hover/focus and under reduced motion. Star ratings with an accessible label ("Rated 5 out of 5") |
| 10 | **Location & Contact** | Address, 7-day opening hours with today highlighted, map, WhatsApp, phone, email, Instagram and other socials | Map embed lazy-loaded (`loading="lazy"`). "Directions" opens Google Maps. `tel:`, `mailto:` and `wa.me` links |
| 11 | **Footer** | Logo/wordmark, nav links, socials, contact, copyright, closing visual | "Back to top" control. Credit line for photography |

**There is no reservation section, booking form or "Book a table" CTA anywhere in the product.**

### 9.1 Navigation (per template)
- Header with logo and anchor links: Menu, Signature, Story, Gallery, Visit. Plus a WhatsApp CTA on desktop.
- Mobile (< 1024 px): a hamburger button (≥ 44 × 44 px) opens a full-screen/sheet menu with focus trap, Esc to close and body scroll lock.
- The header changes state after 40 px of scroll (background/blur) and hides on scroll-down / shows on scroll-up (luxury and minimal).
- Anchor clicks smooth-scroll with a header offset. `scroll-margin-top` is set on sections.

## 10. Food menu and category behaviour

- **Data:** 32+ items across 8 categories (≥ 4 per category). Each item has `id, name, description, price, category, veg, bestseller?, spicy?, image, ingredients[], tags[]`.
- **Default view:** "All", grouped by category order. It shows a sampler of each category to keep phones scrollable, with a "See all" action that switches to that category:
  - Luxury: 4 dishes per category.
  - Minimal: 3 dishes per category.
  - Colorful: 2 dishes per category.
  
  Selecting a category shows every dish in it.
- **Filtering:** client-side and instant. The animation must not block input. Rapid taps on different chips always settle on the last-selected category.
- **URL state:** none in v1 (filter state stays local), to keep the anchors clean.
- **Detail dialog:**
  - Mobile: bottom sheet that slides up, drag-handle styling, closes on backdrop tap or Esc.
  - Desktop: centred modal.
  - Contains a large image, name, veg mark, price, description, ingredients, tags and an **Order on WhatsApp** button (pre-filled text) plus Close.
  - Accessibility: `role="dialog"`, `aria-modal`, labelled by the item name, focus trapped, focus restored on close.
- **Veg indicator:** the Indian standard: a green square with a dot (veg) or a brown/red square with a triangle (non-veg), plus a text label for screen readers.
- **Bestseller badge:** shown on menu cards and in the dialog. Items flagged in config.
- **Prices:** formatted with `Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 })`, giving ₹549.

## 11. 3D food showcase requirements

- **Engine:** Three.js through React Three Fiber, with Drei helpers.
- **Models:** **procedurally generated in code**, so there are no external downloads and the models are licence-safe and tiny:
  1. *Burger*: sesame bun (instanced seeds), patty, melted cheese, wavy lettuce, tomato.
  2. *Latte*: ceramic cup and saucer with procedurally painted latte art (canvas texture).
  3. *Donut*: torus dough, glossy icing, instanced sprinkles.
- **Interactions:**
  - Drag horizontally to rotate. On touch this uses `touch-action: pan-y`, so vertical page scrolling is never blocked.
  - Keyboard: ← / → rotate, buttons for "Rotate left/right".
  - A dish switcher (3 buttons). The camera moves smoothly to each dish (≈ 900 ms ease).
  - Ingredient labels (DOM overlays projected beside the model) can be toggled on/off. On phones they show as chips under the canvas so they never clip.
  - A scroll-triggered entrance: the model rises and spins in as the section enters the viewport.
  - Idle float and slow auto-rotate (disabled under reduced motion).
- **Scope:** 3D is used for **3 signature dishes only**. Menu items stay photographic.
- **Loading:**
  - The 3D code (three, fiber, drei) loads in a **separate lazy chunk** that is fetched only when the section is within 1 viewport of entering.
  - Initial template JS must not include three.js.
- **Fallbacks:**
  - No WebGL, a runtime error (error boundary), `saveData`, or `deviceMemory ≤ 2`: show the dish photo plus a "View in 3D" opt-in button (hidden if there is no WebGL).
  - The fallback looks intentional and keeps the labels.
- **Performance on mobile:**
  - DPR is capped at 1.5 (mobile) / 2 (desktop). Rendering pauses when off-screen (`frameloop` toggled).
  - Total 3D geometry under 60k triangles.
  - ≥ 50 fps on a mid-range phone (e.g. Pixel 6a / iPhone 12).

## 12. Customer review requirements

- 6 static testimonials per cafe in config. No fetching and no API.
- Fields: `name`, `locality`, `rating` (1–5, supports .5), `text` (≤ 260 chars), `source` (e.g. "Google"), `date`.
- Display: star rating, quote, name, locality, source label, and initials avatar (no stock faces, to avoid fake-person imagery).
- Carousel: Swiper with touch swipe, keyboard control, a11y module, and pagination/navigation.
  - Luxury: crossfade.
  - Minimal: 1/2/3 slides per view.
  - Colorful: stacked "cards" effect.
- Autoplay at 6 s intervals. It pauses on hover and focus, and is disabled under `prefers-reduced-motion`.
- An aggregate rating summary ("4.8 · 1,200+ reviews") is shown from config.

## 13. Responsive and mobile-first requirements

- Styles are authored mobile-first. Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- Must look intentional at **360 × 740, 390 × 844, 768 × 1024, 1280 × 800, 1440 × 900 and 1920 × 1080**.
- **No horizontal overflow** at any width ≥ 320 px (`overflow-x: clip` on the root plus layout discipline).
- Touch targets ≥ 44 × 44 px. Chips and buttons have ≥ 8 px spacing.
- Body text 16 px minimum on mobile, line length 45–75 characters on desktop.
- Uses `svh`/`dvh` units for hero heights so mobile browser toolbars don't cause jumps.
- Safe-area insets are respected for fixed UI (switcher, mobile nav).
- Smooth scrolling (Lenis) is **desktop pointer devices only**. Touch devices use native scrolling.
- Heavy effects (parallax, cursor image preview, pointer parallax) are desktop-only.

## 14. Animation requirements

| Animation | Luxury | Minimal | Colorful |
|-----------|--------|---------|----------|
| Page intro | Monogram loader, ≤ 2.2 s, shown once per session | 400 ms fade | Colour-block wipe, 700 ms |
| Hero text | Line mask slide-up, stagger 120 ms | Fade-up words, stagger 60 ms | Letter bounce (`back.out`), stagger 30 ms |
| Image reveal | `clip-path: inset()` bottom-to-top, 1.4 s | Opacity plus scale 1.06 → 1, 0.8 s | Scale/rotate pop with spring |
| Cards | Stagger 100 ms, rise 60 px | Stagger 60 ms, rise 24 px | Stagger 50 ms, rotate ±3°, spring |
| Parallax | Hero and story images (desktop) | Very subtle (≤ 40 px) | Floating cut-outs follow the pointer |
| Category change | Gold underline glides (`layoutId`) | Underline slides | Pill blob morphs (`layoutId`) |
| Hover | Slow zoom plus gold reveal | Scale 1.04 | Wobble/tilt |
| Template switch | Branded curtain wipe ≤ 700 ms in and out | ← same | ← same |

**Global rules**
- `prefers-reduced-motion: reduce` disables:
  - Loaders, parallax, auto-rotation, autoplay, letter animations and smooth scrolling.
  - Reveals become instant (opacity only, ≤ 150 ms).
- No scroll hijacking: no pinned sections longer than 1 viewport on mobile, and no wheel interception except Lenis smoothing on desktop.
- Animations only use `transform`, `opacity` and `clip-path`, never layout properties.
- Every GSAP animation is created inside `gsap.context()` / `useGSAP` and reverted on unmount. No leaked ScrollTriggers after a template switch.

## 15. Reusable configuration architecture requirements

- A cafe is described by **one JS config object** (`defineCafe({...})`) in `src/config/cafes/<cafe>.js`.
- Configurable fields:

| Field | What it covers |
|-------|----------------|
| identity | cafe name, short name, tagline, logo (text and/or image path, monogram) |
| theme | brand colours (mapped to CSS custom properties) and font families |
| seo | title, description, OG image |
| hero | eyebrow, headline lines, description, image, optional video, CTA labels |
| menu | categories (id, label, icon), items (all fields in §10) |
| curation | `signatureIds`, `bestsellerIds`, 3D `showcase` entries (model key, dish id, labels, fallback image, optional `modelUrl` for future glTF) |
| content | `testimonials`, `rating` summary, `gallery`, `story` (copy, founder, highlights, stats) |
| contact | address, map query/embed URL, phone, WhatsApp number and default message, email, opening hours, social links |
| locale | `currency`, `locale`, `timezone` |

- **Shared data:** the master menu lives in `src/data/menu.js`. Cafe configs may reuse it entirely, select from it, or override prices/names.
- **Template binding:** each cafe config declares `template: 'luxury' | 'minimal' | 'colorful'`.
- **App modes** (`src/config/app.config.js`):
  - `showcase`: selection screen plus all templates. Used for pitching.
  - `single`: `/` renders one configured cafe directly, with no switcher. Used for client delivery.
- **Validation:** `npm run validate` checks that ids are unique, every curated id exists, images resolve, categories exist and hours are well-formed. It fails the build in CI.
- **Images:** referenced by slug (`'burger-noir'`). The image component resolves `/images/<slug>-{480,960,1600}.webp` plus blur placeholders from a generated manifest. Remote URLs are also accepted.

## 16. Functional requirements

| ID | Requirement |
|----|------------|
| FR-1 | `/` shows the template selection screen (showcase mode) |
| FR-2 | `/luxury`, `/minimal`, `/colorful` render the corresponding cafe site. Unknown routes show a branded 404 with a link home |
| FR-3 | Template routes are lazy-loaded, with a transition curtain shown while loading |
| FR-4 | A persistent switcher appears on every template route (showcase mode) |
| FR-5 | All 11 sections render from config, with no hard-coded cafe copy inside template components |
| FR-6 | Menu category filtering and item detail dialogs work by mouse, touch and keyboard |
| FR-7 | The WhatsApp CTA builds `https://wa.me/<number>?text=<encoded message>` (hero, dialog, contact) |
| FR-8 | Opening hours highlight today using the cafe's configured timezone and show an "Open now / Closed" status |
| FR-9 | The 3D showcase lazy-loads, is interactive, and falls back gracefully |
| FR-10 | The gallery lightbox supports keyboard, swipe, and close on backdrop/Esc |
| FR-11 | The review carousel supports swipe, buttons and pagination |
| FR-12 | Browser back/forward works across the selection screen and templates. Scroll position resets to the top on template change |
| FR-13 | Per-route document `<title>`, meta description and theme-color update on navigation |

## 17. Non-functional requirements

- **Stack:** React 19, Vite 8, JavaScript (no TypeScript), Tailwind CSS v4, GSAP 3, Motion, Three.js / R3F / Drei, Lenis, Swiper, Lucide.
- **Browser support:** the last 2 versions of Chrome, Safari (iOS 16+), Firefox and Edge, plus Samsung Internet.
- **Maintainability:** ESLint clean, with consistent file naming. Each template is self-contained in `src/templates/<name>/`.
- **Resilience:**
  - A missing image shows a styled placeholder rather than a broken icon.
  - A 3D failure shows the photo fallback.
  - A map failure shows the address and a Directions link.
- **Privacy:** no analytics, cookies or trackers in v1. The only third-party request is the Google Maps iframe (lazy).
- **Hosting:** fully static output, no server runtime.

## 18. Performance requirements

| Metric (Lighthouse, mobile, simulated 4G) | Target |
|---|---|
| Performance score | ≥ 85 per template, ≥ 90 for the selection screen |
| LCP | ≤ 2.5 s |
| CLS | ≤ 0.05 |
| TBT | ≤ 200 ms |
| Initial JS (selection screen, gzip) | ≤ 160 KB |
| Template chunk (gzip, excluding 3D) | ≤ 120 KB each |
| 3D chunk (gzip) | ≤ 320 KB, never part of initial load |
| Images | WebP, 3 widths (480/960/1600), `srcset` + `sizes`, lazy below the fold, blur-up placeholder, explicit aspect ratio |
| Fonts | Self-hosted (Fontsource), latin subset, `font-display: swap`, only the active template's fonts load on its route |

## 19. Accessibility requirements (WCAG 2.2 AA)

- Semantic landmarks: `header`, `nav`, `main`, `section` with headings, `footer`. One `h1` per page.
- A skip link ("Skip to content") is the first focusable element.
- Every interactive element is reachable and operable by keyboard, with a visible `:focus-visible` style meeting 3:1 contrast.
- Text contrast ≥ 4.5:1 (≥ 3:1 for large display text). Gold on black and the colourful palettes are checked and adjusted where needed.
- Images have meaningful `alt` text from config. Decorative images use `alt=""`.
- Dialogs, the mobile nav and the lightbox trap focus, close on Esc and restore focus.
- Carousels: a11y module, pause control, slide announcements.
- 3D canvas: `role="img"` with an `aria-label` describing the dish, button alternatives to drag, and labels available as an HTML list.
- `prefers-reduced-motion` is honoured globally (§14).
- `lang="en-IN"` on `<html>`.

## 20. SEO requirements

- Unique `<title>` and `<meta name="description">` per route, from config.
- Open Graph and Twitter card tags (static defaults in `index.html`, updated per route).
- JSON-LD `CafeOrCoffeeShop` / `Restaurant` structured data per cafe: name, address, geo, opening hours, telephone, servesCuisine, priceRange and menu URL.
- Semantic headings and descriptive link text. `robots.txt` and `sitemap.xml` are included in `public/`.
- `theme-color` meta updated per template.
- Note: client-rendered SPA. Content renders without auth or interaction, and Googlebot executes JS. Pre-rendering is listed as a future enhancement.

## 21. Render deployment requirements

- **Service type:** Static Site.
- **Build command:** `npm ci && npm run build`
- **Publish directory:** `dist`
- **Rewrite rule:** `/*` → `/index.html` (Rewrite, not Redirect) so that the deep links `/luxury` etc. work.
- **Headers:** long-term caching for `/assets/*` (`Cache-Control: public, max-age=31536000, immutable`) and `/images/*` (30 days).
- **Infrastructure as code:** `render.yaml` blueprint committed in the repo root.
- **Node version:** pinned via `.nvmrc` and the `engines` field (Node ≥ 20.19).

## 22. Out-of-scope features

- ❌ Table reservations, booking forms or a "reserve" CTA (**explicitly excluded**)
- ❌ Backend, database, server APIs, authentication, admin dashboard/CMS
- ❌ Online payments, a cart or checkout (ordering goes through WhatsApp links only)
- ❌ Live review fetching (Google/Zomato APIs)
- ❌ Multi-language content, analytics, cookie banners
- ❌ User accounts and loyalty programmes
- ❌ Server-side rendering / pre-rendering (future enhancement)

## 23. Acceptance criteria

The release is accepted when **all** of the following are true:

1. `npm run build` succeeds with zero errors. `npm run lint` and `npm test` pass. `npm run validate` passes for all 3 cafes.
2. The selection screen shows 3 distinct preview cards with hover/focus animations, and works at 360 px and 1440 px.
3. Selecting a card transitions into the template (curtain plus lazy load). Back/forward works. The switcher appears on all template routes.
4. Each template renders all 11 sections in order, each visually distinct in palette, fonts, layout and motion from the other two templates.
5. Menu: 8 categories plus All. Filtering animates. ≥ 4 items per category. Each item shows image, name, description, ₹ price and veg/non-veg mark. Bestseller badges appear. The detail dialog opens and closes via touch, mouse and keyboard, and its WhatsApp link is correctly pre-filled.
6. 3D: 3 rotatable procedural dishes with labels. The 3D chunk is not requested before the section approaches. The photo fallback works when WebGL is disabled. Vertical page scroll on touch is never blocked by the canvas.
7. Reviews: 6 testimonials, swipeable carousel, stars with accessible labels.
8. Contact: address, hours with today highlighted and open/closed status, map, and working `tel:`, `wa.me`, Instagram and Directions links.
9. No horizontal scrollbar at 320–1920 px widths in any template.
10. `prefers-reduced-motion: reduce` removes loaders, parallax, autoplay and auto-rotate, and leaves the site fully usable.
11. Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on each template route.
12. A full keyboard pass shows no traps and visible focus everywhere.
13. No reservation functionality exists anywhere (searching the source for `reserv`/`booking` returns no UI).
14. Deployed on Render as a Static Site. Deep links (`/minimal`) load directly without a 404.
