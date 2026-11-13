import { defineCafe } from '../defineCafe.js'
import { MENU } from '../../data/menu.js'

/**
 * DEMO CAFE — The Funky Fork (Creative & Colorful template)
 * All names, numbers and addresses are fictional placeholders. Replace before going live.
 */
export default defineCafe({
  id: 'funky-fork',
  template: 'colorful',

  identity: {
    name: 'The Funky Fork',
    shortName: 'Funky Fork',
    monogram: 'FF',
    tagline: 'Loud flavours, happy people',
    logo: null,
    established: 2022,
  },

  theme: {
    colors: {
      bg: '#FFF6E9',
      surface: '#FFFFFF',
      ink: '#1B1035',
      muted: '#4A3F66',
      pink: '#FF4F8B',
      orange: '#FF8A3D',
      yellow: '#FFD23F',
      teal: '#14B8A6',
      violet: '#6A4BF5', // white text on violet ≥ 4.5:1
      accent: '#FF4F8B',
    },
    fonts: { display: "'Bricolage Grotesque Variable', system-ui, sans-serif", body: "'Bricolage Grotesque Variable', system-ui, sans-serif" },
  },

  seo: {
    title: 'The Funky Fork — Burgers, freakshakes & good vibes in Assagao, Goa',
    description: 'Goa’s happiest cafe: smash burgers, wood-fired pizza, freakshakes and sprinkle-loaded donuts. Come hungry, leave grinning.',
    ogImage: '/images/dessert-donut-stack-1600.webp',
    themeColor: '#FF4F8B',
  },

  hero: {
    eyebrow: 'Assagao, Goa · Open till late',
    headline: ['Flippin’', 'good', 'food!'],
    description: 'Stacked burgers, sprinkle-bombed donuts and shakes taller than your ego. Grab your crew and come hungry.',
    image: 'dessert-donut-stack',
    floating: ['shake-freakshake', 'burger-cheese', 'bev-strawberry-cooler', 'pizza-margherita'],
    video: null,
    primaryCta: { label: 'Explore Menu', href: '#menu' },
    whatsappCta: { label: 'Order on WhatsApp' },
    ticker: ['Smash burgers', 'Freakshakes', 'Wood-fired pizza', 'Sprinkle donuts', 'Iced coffee', 'Good vibes only'],
  },

  menu: MENU,
  signatureIds: ['nutella-freakshake', 'bbq-chicken-pizza', 'glazed-donuts'],
  signatureNotes: {
    'nutella-freakshake': 'Warning: requires two hands and zero shame.',
    'bbq-chicken-pizza': 'Smoked in our tandoor, finished in the pizza oven.',
    'glazed-donuts': 'Sprinkle count: absolutely ridiculous.',
  },
  bestsellerIds: ['oreo-shake', 'truffle-smash', 'strawberry-cooler', 'cupcake-trio'],
  bestsellerReasons: {
    'oreo-shake': 'Crunchy, creamy, chaotic',
    'truffle-smash': 'Our #1 since opening night',
    'strawberry-cooler': 'Goa summer in a glass',
    'cupcake-trio': 'Pretty enough for the ’gram',
  },

  showcase: [
    { model: 'donut', dishId: 'glazed-donuts', labels: { icing: 'Choco glaze', sprinkles: 'Rainbow sprinkles', dough: 'Fluffy brioche' } },
    { model: 'burger', dishId: 'truffle-smash', labels: { bun: 'Sesame brioche', cheese: 'Melty cheddar', patty: 'Smashed patty', lettuce: 'Crunchy lettuce', tomato: 'Juicy tomato' } },
    { model: 'latte', dishId: 'iced-spanish-latte', labels: { foam: 'Heart latte art', cup: 'Pastel cup', saucer: 'Goan cashew cookie' } },
  ],

  story: {
    eyebrow: 'Our Story',
    heading: 'Three friends, one food truck, zero chill.',
    paragraphs: [
      'The Funky Fork started as a lime-green food truck parked outside Anjuna flea market. The queues got so long we had to build a cafe.',
      'Now it’s a riot of colour, music and messy, joyful food — burgers stacked high, donuts dunked in glaze and shakes that need their own postcode.',
    ],
    founder: {
      name: 'Chef Leo D’Souza',
      role: 'Head Chef & Chief Fun Officer',
      quote: 'If you don’t need three napkins, we didn’t do our job.',
      image: 'chef-portrait',
    },
    highlights: [
      { title: 'Local & loud', text: 'Goan bakeries, Assagao farms and Arabica from the Western Ghats.' },
      { title: 'Made to share', text: 'Platters, sliders and trios built for crews of every size.' },
      { title: 'Kid & pet friendly', text: 'Big garden, water bowls, crayons on every table.' },
    ],
    stats: [
      { value: 50, suffix: 'k+', label: 'Donuts dunked' },
      { value: 12, suffix: '', label: 'Shake flavours' },
      { value: 1, suffix: '', label: 'Very good dog' },
    ],
    image: 'interior-bright',
  },

  gallery: [
    { image: 'dessert-donuts', alt: 'Stack of donuts with rainbow sprinkles', tag: 'food' },
    { image: 'shake-oreo', alt: 'Oreo milkshake topped with whipped cream', tag: 'drinks' },
    { image: 'interior-bright', alt: 'Bright cafe floor full of plants and chairs', tag: 'interior' },
    { image: 'burger-cheese', alt: 'Tall cheeseburger with lettuce and tomato', tag: 'food' },
    { image: 'bev-mocktails', alt: 'Three colourful mocktails on a yellow table', tag: 'drinks' },
    { image: 'chef-portrait', alt: 'Smiling chef in a white hat', tag: 'kitchen' },
    { image: 'pizza-margherita', alt: 'Margherita pizza with basil leaves', tag: 'food' },
    { image: 'exterior-street', alt: 'Cafe terrace on a sunny street', tag: 'interior' },
  ],

  testimonials: [
    { name: 'Tanya Gomes', locality: 'Panjim', rating: 5, source: 'Google', date: '2026-10', text: 'The Nutella freakshake is an EVENT. My friends filmed it for ten minutes before anyone took a sip.' },
    { name: 'Rahul Verma', locality: 'Delhi (visiting)', rating: 5, source: 'Zomato', date: '2026-09', text: 'Came on holiday, went back three times in five days. Smash burger + Oreo shake = perfect Goa lunch.' },
    { name: 'Isha Sawant', locality: 'Mapusa', rating: 4.5, source: 'Google', date: '2026-08', text: 'So colourful and happy. Staff played my birthday song with a donut tower. Iconic.' },
    { name: 'Aaron Pereira', locality: 'Assagao', rating: 5, source: 'Google', date: '2026-07', text: 'Best BBQ chicken pizza in North Goa, and they’re super sweet with our dog.' },
    { name: 'Megha Bhat', locality: 'Bengaluru (visiting)', rating: 4.5, source: 'Zomato', date: '2026-10', text: 'Every dish looks like a cartoon and tastes like a dream. The strawberry cooler is unreal.' },
    { name: 'Kunal Desai', locality: 'Calangute', rating: 5, source: 'Google', date: '2026-06', text: 'WhatsApp ordering for our villa party was so easy. 40 sliders, zero stress.' },
  ],
  rating: { value: 4.9, count: '2,100+', source: 'Google & Zomato' },

  contact: {
    address: { line1: 'House 7, Assagao–Anjuna Road', line2: 'Assagao, Goa 403507', city: 'Assagao', region: 'Goa', postalCode: '403507', country: 'IN' },
    geo: { lat: 15.5937, lng: 73.7678 },
    mapQuery: 'Assagao, Goa',
    phone: '+91 98765 43210',
    whatsapp: { number: '+91 98765 43210', message: 'Hey Funky Fork! I want to order some food 🍔' },
    email: 'hello@funkyfork.example',
    hours: [
      { day: 0, open: '10:00', close: '23:30' },
      { day: 1, open: '11:00', close: '23:00' },
      { day: 2, open: '11:00', close: '23:00' },
      { day: 3, open: '11:00', close: '23:00' },
      { day: 4, open: '11:00', close: '23:00' },
      { day: 5, open: '11:00', close: '01:00' },
      { day: 6, open: '10:00', close: '01:00' },
    ],
    socials: {
      instagram: { handle: '@funkyfork.demo', url: 'https://www.instagram.com/funkyfork.demo' },
      facebook: { handle: 'The Funky Fork', url: 'https://www.facebook.com/' },
      zomato: { handle: 'Zomato', url: 'https://www.zomato.com/' },
    },
  },
  cuisine: ['American', 'Italian', 'Desserts', 'Cafe'],
  priceRange: '₹₹',
})
