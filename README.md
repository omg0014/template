# Template Café

A website showcase for cafes, with three complete templates. It runs entirely in the browser, with no backend.

| Route | Template | Demo cafe |
|------|----------|-----------|
| `/` | Template selection screen | — |
| `/luxury` | **Luxury Cinematic**: dark, gold, serif, slow cinematic motion | Maison Noir, Mumbai |
| `/minimal` | **Modern Minimal**: cream, editorial, quiet motion | Oat & Linen, Bengaluru |
| `/colorful` | **Creative & Colorful**: vibrant, playful, bouncy | The Funky Fork, Goa |

Every template includes these 11 sections:

- Hero
- Signature dishes
- Food categories
- Interactive menu with dish dialogs and WhatsApp ordering
- 3D food showcase
- Bestsellers
- Story
- Gallery with lightbox
- Reviews carousel
- Location & contact (live open/closed status and a map)
- Footer

The product requirements are in [PRD.md](PRD.md) and the architecture and roadmap are in [PLAN.md](PLAN.md).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Validates the cafe configs, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm test` | Runs the Vitest unit and component tests |
| `npm run lint` | Runs ESLint |
| `npm run validate` | Checks every cafe config for broken references, missing images, bad hours and similar problems |

Requires Node 20.19 or newer. `.nvmrc` pins Node 22.

## Stack

- React 19, Vite 8 and Tailwind CSS 4, in JavaScript.
- **GSAP + ScrollTrigger** for scroll reveals, timelines and parallax.
- **Motion** for mount/unmount, layout, springs and the page-transition curtain.
- **Lenis** for smooth scrolling. It is on for desktop mouse and trackpad only; touch devices keep native scrolling.
- **Three.js + React Three Fiber + Drei** for the 3D showcase. It is a separate lazy chunk, only loaded near its section.
- **Swiper** for the review carousels, plus **Lucide** icons and **Fontsource** fonts (self-hosted).

---

## Customise for a new cafe

All cafe content lives in **one config file**. Templates contain no cafe-specific copy.

1. **Copy a config:** `src/config/cafes/maison-noir.js` → `src/config/cafes/my-cafe.js`.
2. **Edit the fields:**

   | Field | What it controls |
   |-------|------------------|
   | `identity` | Name, short name, monogram, tagline, year established |
   | `template` | `'luxury'`, `'minimal'` or `'colorful'` |
   | `theme.colors` | Brand colours. Each key becomes a CSS variable, e.g. `accent` → `--c-accent` |
   | `theme.fonts` | Font families (see *Fonts* below) |
   | `seo` | Page title, description, OG image, theme colour |
   | `hero` | Eyebrow, headline lines, description, image (optional `video`), CTA labels |
   | `menu` | Categories and dishes. Reuse `MENU` from `src/data/menu.js`, or pass your own `{ categories, items }` |
   | Curated lists | `signatureIds`, `signatureNotes`, `bestsellerIds`, `bestsellerReasons` |
   | `showcase` | Up to three 3D dishes: `{ model: 'burger' \| 'latte' \| 'donut', dishId, labels }` |
   | Content | `story`, `gallery`, `testimonials`, `rating` |
   | `contact` | Address, `mapQuery`, phone, WhatsApp number and default message, email, `hours` (all 7 days, `HH:mm`, closing after midnight supported), `socials` |
   | `locale` | `{ locale: 'en-IN', currency: 'INR', timezone: 'Asia/Kolkata' }` |

3. **Register the cafe** in `src/config/index.js`. For showcase mode, also map it in `CAFE_BY_TEMPLATE`.
4. **Run `npm run validate`.** It names any broken reference precisely, e.g. `signatureIds references unknown item "x"`.

### Single-cafe mode (client delivery)

To ship a site for one client, set this in `src/config/app.config.js`:

```js
export const APP_CONFIG = { mode: 'single', singleCafe: 'my-cafe', singleTemplate: 'minimal' }
```

`/` then renders that cafe directly, and the template selection screen and switcher are hidden.

### Menu items

```js
{ id: 'truffle-smash', name: 'Truffle Smash Burger', category: 'burgers', price: 549, veg: false,
  bestseller: true, spicy: false, image: 'burger-noir', focus: '50% 60%',
  description: '…', ingredients: ['Brioche bun', '…'], tags: ['Chef pick'] }
```

- `veg` controls the standard Indian veg / non-veg mark.
- `focus` is an optional focal point (CSS object-position) for tight crops.
- The `category` must match a category `id`. Each category needs at least 4 items, which the validator enforces.

### Images

- Images are referenced by **slug**. The image component serves `/images/<slug>-{480,960,1600}.webp` with `srcset`, lazy loading and a blur-up placeholder.
- **Your own photos:**
  1. Export each one at 480, 960 and 1600 px wide as WebP, named `<slug>-480.webp` and so on.
  2. Put them in `public/images/`.
  3. Add an entry to `src/data/images.js` with `w`, `h`, and `lqip` (a tiny base64 preview, optional).
- **Absolute URLs work too.** You lose the responsive sizes, but the image still displays.
- **Regenerating the demo photos:** run `python3 scripts/fetch-images.py` (needs Pillow).

The demo photography comes from [Unsplash](https://unsplash.com/license), which allows free commercial use. Replace it with the cafe's own photos for production.

### Intro animation (Luxury)

The monogram intro plays once per browser session on direct visits. To skip it, set `introLoader: false` in the cafe config. That favours speed on slow phones.

### Fonts

Each template imports its fonts at the top of `src/templates/<name>/index.jsx` (Fontsource). To change a font:

1. Install it: `npm i @fontsource-variable/<font>`.
2. Import it in that template's `index.jsx`.
3. Set `theme.fonts.display` and `theme.fonts.body` in the config.

### 3D models

The burger, latte and donut are **built in code** (`src/three/models/`), so there are no downloads and no licensing questions.

- Colours and lighting per template are in `src/three/stages.js`.
- Label anchor heights are in the same file, under `LABEL_ANCHORS`.
- The 3D section degrades gracefully:
  - On data-saver or low-memory devices it shows a photo with a "View in 3D" button.
  - With no WebGL it shows a photo only.
  - If the 3D code errors at runtime, it falls back to the photo.

---

## Project structure

```
src/
├─ app/          shell: selector page, template route (lazy), switcher, transition curtain, 404
├─ config/       app mode + one config file per cafe (the only place cafe content lives)
├─ data/         master menu, image manifest, template metadata, config validator
├─ lib/          pure helpers: price formatting, WhatsApp/maps links, opening hours, device checks
├─ hooks/        useCafe, useMenuFilter, useOpeningStatus, useFocusTrap, useScrollState, …
├─ components/   shared accessible primitives: Img, Dialog, Lightbox, Stars, VegMark, MapEmbed, Showcase3D gate
├─ animation/    GSAP setup, reveal helpers, motion presets per template, Lenis provider, text splitting
├─ three/        3D canvas + procedural models (only loaded via dynamic import)
└─ templates/
   ├─ luxury/    index.jsx · luxury.css · ui.jsx · sections/*
   ├─ minimal/   …
   └─ colorful/  …
```

Templates never import from each other. They share only data, logic and the accessibility primitives.

---

## Deploy to Vercel

`vercel.json` sets everything up: the Vite build, `dist` as the output folder, a rewrite so deep links like `/luxury` load directly, and cache headers.

**From the dashboard:** go to vercel.com → **Add New → Project**, import the GitHub repo and click **Deploy**. No settings need changing.

**From the terminal:**

```bash
npm i -g vercel
vercel login
vercel          # preview deploy (the first run links the project)
vercel --prod   # production deploy
```

## Deploy to Render (Static Site)

`render.yaml` sets everything up. In Render, choose **New → Blueprint** and point it at the repo. To configure it by hand instead:

| Setting | Value |
|---------|-------|
| Service type | Static Site |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Rewrite rule | Source `/*` → Destination `/index.html` → Action **Rewrite** (makes `/luxury` and other deep links work) |
| Headers | `/assets/*` → `Cache-Control: public, max-age=31536000, immutable` |
| Environment | `NODE_VERSION=22` |

After the first deploy:

- Replace `https://example.com` in `public/sitemap.xml` with the real domain.
- Check that `/luxury`, `/minimal`, `/colorful` and an unknown URL (which should show the 404 page) all load directly.

---

## Notes

- **Demo data is fictional.** All cafe names, addresses, phone numbers (`+91 98765 43210`), emails (`*.example`) and Instagram handles are placeholders. Replace them before going live.
- **No reservations.** There is deliberately no table-booking feature. Ordering goes through WhatsApp deep links only.
- **Accessibility:**
  - Skip link, landmarks and a single `h1` per page.
  - Focus-trapped dialogs and menus, keyboard-operable tabs, carousels and 3D controls.
  - `prefers-reduced-motion` is honoured: no intro loader, parallax, autoplay or smooth scroll.
