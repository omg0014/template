import { defineCafe } from '../defineCafe.js'
import { MENU } from '../../data/menu.js'

/**
 * DEMO CAFE — Maison Noir (Luxury Cinematic template)
 * All names, numbers and addresses are fictional placeholders. Replace before going live.
 */
export default defineCafe({
  id: 'maison-noir',
  template: 'luxury',
  // Cinematic monogram intro (first visit per session). Set false to favour mobile LCP (~+15 Lighthouse points).
  introLoader: true,

  identity: {
    name: 'Maison Noir',
    shortName: 'Noir',
    monogram: 'MN',
    tagline: 'Fire, smoke & slow coffee',
    logo: null, // optional: '/brand/logo.svg'
    established: 2019,
  },

  theme: {
    colors: {
      bg: '#0B0907',
      surface: '#15110D',
      elevated: '#1E1812',
      umber: '#2A1D14',
      ink: '#EFE6D8',
      muted: '#A89A86',
      accent: '#C9A35B',
      accentSoft: '#E6C98F',
      line: 'rgba(201, 163, 91, 0.22)',
    },
    fonts: { display: "'Cormorant Garamond Variable', 'Times New Roman', serif", body: "'Manrope Variable', system-ui, sans-serif" },
  },

  seo: {
    title: 'Maison Noir — Fire-led kitchen & coffee bar, Colaba',
    description: 'A candle-lit Colaba kitchen of wood-fired pizza, truffle smash burgers and single-estate coffee. Open late, every night.',
    ogImage: '/images/burger-noir-1600.webp',
    themeColor: '#0B0907',
  },

  hero: {
    eyebrow: 'Colaba, Mumbai · Est. 2019',
    headline: ['An ode to', 'slow fire'],
    description: 'Wood-fired plates, truffle-smashed burgers and single-estate coffee — served by candlelight, late into the Bombay night.',
    image: 'burger-noir',
    video: null, // optional: '/media/hero.mp4' (muted, loops, uses image as poster)
    primaryCta: { label: 'Explore the Menu', href: '#menu' },
    whatsappCta: { label: 'Order on WhatsApp' },
  },

  menu: MENU,
  signatureIds: ['truffle-smash', 'chilli-prawn', 'kerala-salmon'],
  signatureNotes: {
    'truffle-smash': 'Smashed on a 300°C plancha for the deepest crust.',
    'chilli-prawn': 'Our love letter to Bombay — butter, chilli and the sea.',
    'kerala-salmon': 'Moilee from my grandmother’s Kochi kitchen, reimagined.',
  },
  bestsellerIds: ['margherita', 'chocolate-fudge', 'signature-latte', 'lamb-platter'],
  bestsellerReasons: {
    margherita: 'Ordered at 9 of 10 tables',
    'chocolate-fudge': 'The one everyone “shares”',
    'signature-latte': 'Our most-photographed cup',
    'lamb-platter': 'Twelve hours of smoke',
  },

  showcase: [
    { model: 'burger', dishId: 'truffle-smash', labels: { bun: 'Toasted brioche', cheese: 'Aged cheddar', patty: 'Smashed chicken', lettuce: 'Butter lettuce', tomato: 'Heirloom tomato' } },
    { model: 'latte', dishId: 'signature-latte', labels: { foam: 'Rosetta micro-foam', cup: 'Hand-thrown ceramic', saucer: 'Single-estate beans' } },
    { model: 'donut', dishId: 'glazed-donuts', labels: { icing: 'Dark chocolate glaze', sprinkles: 'Gold & cocoa sprinkles', dough: '24-hour brioche' } },
  ],

  story: {
    eyebrow: 'Our Story',
    heading: 'Born of fire, finished by hand.',
    paragraphs: [
      'Maison Noir began as a single wood-fired oven in a Colaba lane and a stubborn idea: that comfort food deserves the same reverence as fine dining.',
      'Today our kitchen still runs on fire and patience — dough rested for 48 hours, coffee roasted in small batches, sauces reduced until they are glossy and deep.',
    ],
    founder: {
      name: 'Chef Arjun Mehra',
      role: 'Founder & Executive Chef',
      quote: 'Fire is honest. It rewards patience and punishes shortcuts — so we take none.',
      image: 'chef-plating',
    },
    highlights: [
      { title: 'Wood-fired at 450°C', text: 'Mango and oak wood give our crusts their leopard spotting and gentle smoke.' },
      { title: '48-hour dough', text: 'Slow cold fermentation for a light, digestible, blistered crust.' },
      { title: 'Single-estate coffee', text: 'Roasted weekly from a family estate in Chikmagalur.' },
    ],
    stats: [
      { value: 48, suffix: 'h', label: 'Dough fermentation' },
      { value: 450, suffix: '°C', label: 'Oven temperature' },
      { value: 12, suffix: 'h', label: 'Lamb smoke time' },
    ],
    image: 'interior-evening',
  },

  gallery: [
    { image: 'interior-evening', alt: 'Candle-lit dining room with dark timber tables', tag: 'interior' },
    { image: 'plate-fine', alt: 'A plated dish beside wine glasses at dusk', tag: 'food' },
    { image: 'chef-plating', alt: 'Chef finishing a plate under copper pendant lamps', tag: 'kitchen' },
    { image: 'coffee-latte-art', alt: 'Rosetta latte art seen from above', tag: 'drinks' },
    { image: 'dessert-tiramisu', alt: 'A slice of tiramisu dusted with cocoa', tag: 'food' },
    { image: 'kitchen-fire', alt: 'Flames rising from a wok in the open kitchen', tag: 'kitchen' },
    { image: 'bev-iced-tea', alt: 'Iced tea with lime on a dark wooden board', tag: 'drinks' },
    { image: 'interior-counter', alt: 'Espresso bar lined with glass jars and pendant bulbs', tag: 'interior' },
  ],

  testimonials: [
    { name: 'Riya Kapoor', locality: 'Bandra West', rating: 5, source: 'Google', date: '2026-09', text: 'The truffle smash burger is the best thing I have eaten in Mumbai this year. Moody lighting, incredible service — felt like a proper night out.' },
    { name: 'Kabir Shah', locality: 'Lower Parel', rating: 5, source: 'Zomato', date: '2026-08', text: 'Came for the coffee, stayed for the prawn spaghetti. That chilli butter is dangerous. Already planning the next visit.' },
    { name: 'Ananya Iyer', locality: 'Colaba', rating: 4.5, source: 'Google', date: '2026-10', text: 'Elegant without being stuffy. The Kerala salmon tasted like home, but dressed for a gala.' },
    { name: 'Dev Malhotra', locality: 'Juhu', rating: 5, source: 'Google', date: '2026-07', text: 'Their margherita rivals anything I had in Naples. The crust has that perfect char and chew.' },
    { name: 'Sara Fernandes', locality: 'Mahim', rating: 5, source: 'Zomato', date: '2026-09', text: 'Ordered on WhatsApp for a house party — everything arrived hot and beautifully packed. Fudge cake vanished in minutes.' },
    { name: 'Nikhil Rao', locality: 'Worli', rating: 4.5, source: 'Google', date: '2026-06', text: 'Late-night espresso and the lamb platter after a long week. Warm staff, wonderful playlist.' },
  ],
  rating: { value: 4.8, count: '1,240+', source: 'Google & Zomato' },

  contact: {
    address: { line1: '12 Merewether Road, Apollo Bunder', line2: 'Colaba, Mumbai 400001', city: 'Mumbai', region: 'Maharashtra', postalCode: '400001', country: 'IN' },
    geo: { lat: 18.9217, lng: 72.8331 },
    mapQuery: 'Colaba, Mumbai, Maharashtra',
    phone: '+91 98765 43210',
    whatsapp: { number: '+91 98765 43210', message: 'Hi Maison Noir! I would like to place an order.' },
    email: 'hello@maisonnoir.example',
    hours: [
      { day: 0, open: '12:00', close: '00:30' },
      { day: 1, open: '18:00', close: '00:30' },
      { day: 2, open: '12:00', close: '00:30' },
      { day: 3, open: '12:00', close: '00:30' },
      { day: 4, open: '12:00', close: '00:30' },
      { day: 5, open: '12:00', close: '01:30' },
      { day: 6, open: '12:00', close: '01:30' },
    ],
    socials: {
      instagram: { handle: '@maisonnoir.demo', url: 'https://www.instagram.com/maisonnoir.demo' },
      facebook: { handle: 'Maison Noir', url: 'https://www.facebook.com/' },
      zomato: { handle: 'Zomato', url: 'https://www.zomato.com/' },
    },
  },
  cuisine: ['Continental', 'Italian', 'Cafe'],
  priceRange: '₹₹₹',
})
