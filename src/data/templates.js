/**
 * Metadata for the template selection screen and switcher.
 * Array order = display order: Creative & Colorful, Luxury Cinematic, Modern Minimal.
 */
export const TEMPLATES = [
  {
    key: 'colorful',
    path: '/colorful',
    number: '01',
    name: 'Creative & Colorful',
    cafe: 'The Funky Fork',
    description: 'Loud, joyful and full of personality — vivid colour blocks, expressive type and bouncy, playful interactions.',
    tags: ['Vibrant', 'Playful', 'Expressive'],
    image: 'dessert-donut-stack',
    heroSizes: '(min-width: 1024px) 420px, 76vw',
    secondary: 'shake-freakshake',
    colors: { bg: '#FF4F8B', fg: '#1B1035', accent: '#FFD23F' },
    font: "'Bricolage Grotesque Variable', sans-serif",
    headline: 'Flippin’ good food!',
  },
  {
    key: 'luxury',
    path: '/luxury',
    number: '02',
    name: 'Luxury Cinematic',
    cafe: 'Maison Noir',
    description: 'A candle-lit, cinematic experience — deep blacks, burnished gold, elegant serif type and slow, dramatic reveals.',
    tags: ['Dark & gold', 'Serif', 'Cinematic'],
    image: 'burger-noir',
    heroSizes: '100vw', // must match the hero <Img sizes> so the preload is reused
    secondary: 'chef-plating',
    colors: { bg: '#0B0907', fg: '#EFE6D8', accent: '#C9A35B' },
    font: "'Cormorant Garamond Variable', serif",
    headline: 'An ode to slow fire',
  },
  {
    key: 'minimal',
    path: '/minimal',
    number: '03',
    name: 'Modern Minimal',
    cafe: 'Oat & Linen',
    description: 'Calm, editorial and airy — cream and linen tones, refined typography and quiet, precise motion.',
    tags: ['Cream & linen', 'Editorial', 'Spacious'],
    image: 'coffee-pour',
    heroSizes: '(min-width: 1024px) 40vw, 100vw',
    secondary: 'interior-window',
    colors: { bg: '#F6F1EA', fg: '#2B211A', accent: '#6B4F3A' },
    font: "'Instrument Serif', serif",
    headline: 'Slow coffee, honest food.',
  },
]

export const templateByKey = (key) => TEMPLATES.find((t) => t.key === key)
