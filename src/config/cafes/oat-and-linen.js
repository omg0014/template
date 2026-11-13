import { defineCafe } from '../defineCafe.js'
import { MENU } from '../../data/menu.js'

/**
 * DEMO CAFE — Oat & Linen (Modern Minimal template)
 * All names, numbers and addresses are fictional placeholders. Replace before going live.
 */
export default defineCafe({
  id: 'oat-and-linen',
  template: 'minimal',

  identity: {
    name: 'Oat & Linen',
    shortName: 'Oat & Linen',
    monogram: 'O&L',
    tagline: 'Slow coffee, honest food',
    logo: null,
    established: 2021,
  },

  theme: {
    colors: {
      bg: '#F6F1EA',
      surface: '#FFFDF9',
      beige: '#E9DFD1',
      line: '#D9CDBD',
      ink: '#2B211A',
      muted: '#6F5C4D',
      accent: '#6B4F3A',
      accentSoft: '#B89B7F',
    },
    fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter Variable', system-ui, sans-serif" },
  },

  seo: {
    title: 'Oat & Linen — Specialty coffee & all-day kitchen, Indiranagar',
    description: 'A sunlit Indiranagar cafe for single-origin coffee, fresh pasta and all-day breakfast bowls. Slow mornings welcome.',
    ogImage: '/images/coffee-pour-1600.webp',
    themeColor: '#F6F1EA',
  },

  hero: {
    eyebrow: 'Specialty coffee · All-day kitchen',
    headline: ['Slow coffee,', 'honest food.'],
    description: 'A sunlit corner of Indiranagar for single-origin pours, fresh pasta and unhurried mornings.',
    image: 'coffee-pour',
    video: null,
    primaryCta: { label: 'Explore Menu', href: '#menu' },
    whatsappCta: { label: 'Order on WhatsApp' },
  },

  menu: MENU,
  signatureIds: ['filter-kaapi-latte', 'truffle-tagliatelle', 'avocado-egg-bowl'],
  signatureNotes: {
    'filter-kaapi-latte': 'Brewed the Bengaluru way, steamed the Melbourne way.',
    'truffle-tagliatelle': 'Pasta rolled by hand every morning at 7.',
    'avocado-egg-bowl': 'Our quiet bestseller since day one.',
  },
  bestsellerIds: ['flat-white', 'tiramisu', 'farfalle-pesto', 'burrata-salad'],
  bestsellerReasons: {
    'flat-white': 'Most ordered coffee',
    tiramisu: 'Sold out by 6 pm, most days',
    'farfalle-pesto': 'The lunch regular',
    'burrata-salad': 'Light, bright, generous',
  },

  showcase: [
    { model: 'latte', dishId: 'flat-white', labels: { foam: 'Velvet micro-foam', cup: 'Stoneware cup', saucer: 'Ristretto base' } },
    { model: 'burger', dishId: 'garden-crunch', labels: { bun: 'Sourdough bun', cheese: 'Smoked gouda', patty: 'Quinoa & veg', lettuce: 'Romaine', tomato: 'Vine tomato' } },
    { model: 'donut', dishId: 'glazed-donuts', labels: { icing: 'Cocoa glaze', sprinkles: 'Freeze-dried berries', dough: 'Brioche dough' } },
  ],

  story: {
    eyebrow: 'About us',
    heading: 'A neighbourhood table, made slowly.',
    paragraphs: [
      'Oat & Linen started with two friends, one La Marzocco and a belief that the best cafes feel like an extension of your living room.',
      'We source beans from three estates in Karnataka, bake every morning, and keep the menu short enough that everything on it is excellent.',
    ],
    founder: {
      name: 'Meera & Rohan',
      role: 'Co-founders',
      quote: 'We wanted a place where you could stay for one cup or for the whole afternoon — and feel equally welcome.',
      image: 'kitchen-team',
    },
    highlights: [
      { title: 'Three Karnataka estates', text: 'Direct-trade beans, roasted light to medium every Tuesday.' },
      { title: 'Baked at 6 am', text: 'Croissants, sourdough and cakes made in-house, daily.' },
      { title: 'Low-waste kitchen', text: 'Compostable packaging and a menu designed around the season.' },
    ],
    stats: [
      { value: 3, suffix: '', label: 'Partner estates' },
      { value: 6, suffix: ' am', label: 'Daily bake' },
      { value: 92, suffix: '%', label: 'Waste diverted' },
    ],
    image: 'interior-window',
  },

  gallery: [
    { image: 'interior-window', alt: 'Window seat with a French press and morning light', tag: 'interior' },
    { image: 'coffee-espresso', alt: 'Espresso portafilters with fresh coffee grounds', tag: 'drinks' },
    { image: 'bakery-croissant', alt: 'Golden croissants on a dark surface', tag: 'food' },
    { image: 'interior-bright', alt: 'Bright cafe floor with plants and wooden chairs', tag: 'interior' },
    { image: 'pasta-pesto', alt: 'Farfalle pesto with tomatoes on a white plate', tag: 'food' },
    { image: 'kitchen-team', alt: 'Two founders laughing in the open kitchen', tag: 'kitchen' },
    { image: 'coffee-cheers', alt: 'Two lattes being clinked together', tag: 'drinks' },
    { image: 'bakery-bread', alt: 'Seeded sourdough loaves with wheat stalks', tag: 'kitchen' },
  ],

  testimonials: [
    { name: 'Aditi Rao', locality: 'Indiranagar', rating: 5, source: 'Google', date: '2026-10', text: 'My favourite work-from-cafe spot. The flat white is consistently perfect and nobody rushes you out.' },
    { name: 'Varun Nair', locality: 'Koramangala', rating: 5, source: 'Google', date: '2026-09', text: 'Truffle tagliatelle on a rainy afternoon is my idea of happiness. Calm music, beautiful light.' },
    { name: 'Priya Menon', locality: 'Domlur', rating: 4.5, source: 'Zomato', date: '2026-08', text: 'Simple menu, every single thing is good. The tiramisu sells out — come before six.' },
    { name: 'Siddharth Jain', locality: 'HSR Layout', rating: 5, source: 'Google', date: '2026-07', text: 'The filter kaapi latte is genius. Tastes like my grandmother’s coffee, if she owned an espresso machine.' },
    { name: 'Neha Kulkarni', locality: 'Whitefield', rating: 4.5, source: 'Google', date: '2026-10', text: 'Worth the drive. Lovely staff who actually know their coffee origins.' },
    { name: 'Arjun Pillai', locality: 'Jayanagar', rating: 5, source: 'Zomato', date: '2026-06', text: 'Ordered the avocado bowl and croissants for a team breakfast on WhatsApp — on time and beautifully packed.' },
  ],
  rating: { value: 4.7, count: '860+', source: 'Google & Zomato' },

  contact: {
    address: { line1: '221, 12th Main Road, HAL 2nd Stage', line2: 'Indiranagar, Bengaluru 560038', city: 'Bengaluru', region: 'Karnataka', postalCode: '560038', country: 'IN' },
    geo: { lat: 12.9719, lng: 77.6412 },
    mapQuery: 'Indiranagar, Bengaluru, Karnataka',
    phone: '+91 98765 43210',
    whatsapp: { number: '+91 98765 43210', message: 'Hi Oat & Linen! I would like to place an order.' },
    email: 'hello@oatandlinen.example',
    hours: [
      { day: 0, open: '08:00', close: '21:00' },
      { day: 1, closed: true },
      { day: 2, open: '07:30', close: '21:00' },
      { day: 3, open: '07:30', close: '21:00' },
      { day: 4, open: '07:30', close: '21:00' },
      { day: 5, open: '07:30', close: '22:00' },
      { day: 6, open: '08:00', close: '22:00' },
    ],
    socials: {
      instagram: { handle: '@oatandlinen.demo', url: 'https://www.instagram.com/oatandlinen.demo' },
      facebook: { handle: 'Oat & Linen', url: 'https://www.facebook.com/' },
      zomato: { handle: 'Zomato', url: 'https://www.zomato.com/' },
    },
  },
  cuisine: ['Cafe', 'Italian', 'Healthy'],
  priceRange: '₹₹',
})
