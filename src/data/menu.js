/**
 * MASTER MENU — shared by all demo cafes.
 * A cafe config may use this as-is, pick a subset, or override names/prices.
 *
 * Item schema:
 * { id, name, description, price, category, veg, bestseller?, spicy?, image, focus?, ingredients[], tags[] }
 *  - focus: optional CSS object-position focal point for tight crops, e.g. '50% 80%'
 *  - price: number in the cafe currency (₹)
 *  - veg: true = vegetarian (green mark), false = non-vegetarian (brown mark)
 *  - image: slug from src/data/images.js (or an absolute URL)
 */

export const CATEGORIES = [
  { id: 'burgers', label: 'Burgers', icon: 'Sandwich', blurb: 'Smashed, stacked, toasted brioche.' },
  { id: 'pizza', label: 'Pizza', icon: 'Pizza', blurb: '48-hour dough, wood-fired at 450°C.' },
  { id: 'pasta', label: 'Pasta', icon: 'CookingPot', blurb: 'Bronze-cut, sauced to order.' },
  { id: 'desserts', label: 'Desserts', icon: 'CakeSlice', blurb: 'Baked fresh every morning.' },
  { id: 'coffee', label: 'Coffee', icon: 'Coffee', blurb: 'Single-estate Chikmagalur beans.' },
  { id: 'shakes', label: 'Shakes', icon: 'CupSoda', blurb: 'Thick, cold, unapologetic.' },
  { id: 'beverages', label: 'Beverages', icon: 'GlassWater', blurb: 'Coolers, teas and fresh juice.' },
  { id: 'specials', label: 'Signature Specials', icon: 'Sparkles', blurb: "The chef's table, every day." },
]

export const MENU_ITEMS = [
  // ── Burgers ───────────────────────────────────────────────
  {
    id: 'truffle-smash', name: 'Truffle Smash Burger', category: 'burgers', price: 549, veg: false, bestseller: true,
    description: 'Double-smashed chicken patties, black truffle aioli, aged cheddar and caramelised onion on toasted brioche.',
    image: 'burger-noir', ingredients: ['Brioche bun', 'Chicken patty ×2', 'Aged cheddar', 'Truffle aioli', 'Caramelised onion'], tags: ['Chef pick'],
  },
  {
    id: 'classic-crispy', name: 'Classic Crispy Chicken', category: 'burgers', price: 399, veg: false,
    description: 'Buttermilk-brined fried chicken, house slaw, pickles and smoked-chilli mayo.',
    image: 'burger-classic', ingredients: ['Fried chicken', 'House slaw', 'Pickles', 'Chilli mayo'], tags: [],
  },
  {
    id: 'paneer-tikka-burger', name: 'Paneer Tikka Burger', category: 'burgers', price: 349, veg: true, spicy: true,
    description: 'Charred tandoori paneer, mint chutney mayo, pickled onions and crunchy lettuce.',
    image: 'burger-cheese', ingredients: ['Tandoori paneer', 'Mint mayo', 'Pickled onion', 'Lettuce'], tags: ['Spicy'],
  },
  {
    id: 'double-lamb', name: 'Double Stack Lamb', category: 'burgers', price: 499, veg: false,
    description: 'Two seared lamb patties, smoked bacon jam, double cheese and a sticky glaze.',
    image: 'burger-double', ingredients: ['Lamb patty ×2', 'Bacon jam', 'Cheddar', 'Brioche'], tags: [],
  },
  {
    id: 'bbq-sliders', name: 'BBQ Chicken Sliders', category: 'burgers', price: 449, veg: false,
    description: 'A pair of smoky pulled-chicken sliders with bourbon-free BBQ glaze and pickles.',
    image: 'burger-duo', ingredients: ['Pulled chicken', 'BBQ glaze', 'Pickles', 'Mini buns'], tags: ['Sharing'],
  },
  {
    id: 'garden-crunch', name: 'Garden Crunch Burger', category: 'burgers', price: 329, veg: true,
    description: 'Crispy veg-and-quinoa patty, tomato, lettuce, burger sauce — served with skin-on fries.',
    image: 'burger-fries', ingredients: ['Veg & quinoa patty', 'Tomato', 'Lettuce', 'Fries'], tags: ['With fries'],
  },

  // ── Pizza ─────────────────────────────────────────────────
  {
    id: 'margherita', name: 'Margherita Napoletana', category: 'pizza', price: 449, veg: true, bestseller: true,
    description: 'San Marzano tomato, fior di latte, fresh basil and a leopard-spotted crust.',
    image: 'pizza-margherita', ingredients: ['San Marzano tomato', 'Fior di latte', 'Basil', 'Olive oil'], tags: ['Classic'],
  },
  {
    id: 'bbq-chicken-pizza', name: 'Smoky BBQ Chicken', category: 'pizza', price: 599, veg: false,
    description: 'Tandoor-smoked chicken, red onion, peppers and mozzarella on a BBQ base.',
    image: 'pizza-bbq', ingredients: ['Smoked chicken', 'Red onion', 'Peppers', 'Mozzarella'], tags: [],
  },
  {
    id: 'spinach-ricotta', name: 'Spinach & Ricotta Bianca', category: 'pizza', price: 529, veg: true,
    description: 'Garlic cream base, wilted spinach, whipped ricotta, chilli flakes and lemon zest.',
    image: 'pizza-spinach', ingredients: ['Garlic cream', 'Spinach', 'Ricotta', 'Lemon'], tags: ['White pizza'],
  },
  {
    id: 'four-cheese', name: 'Four Cheese & Cherry Tomato', category: 'pizza', price: 549, veg: true,
    description: 'Mozzarella, gorgonzola, parmesan and smoked scamorza with blistered cherry tomatoes.',
    image: 'pizza-rustic', ingredients: ['Four cheeses', 'Cherry tomato', 'Oregano'], tags: [],
  },
  {
    id: 'bufala-basil', name: 'Bufala & Basil', category: 'pizza', price: 649, veg: true,
    description: 'Imported buffalo mozzarella torn over slow-cooked tomato, finished with basil oil.',
    image: 'pizza-neapolitan', ingredients: ['Buffalo mozzarella', 'Tomato', 'Basil oil'], tags: ['Premium'],
  },

  // ── Pasta ─────────────────────────────────────────────────
  {
    id: 'chilli-prawn', name: 'Bombay Chilli Prawn Spaghetti', category: 'pasta', price: 549, veg: false, spicy: true, bestseller: true,
    description: 'Tiger prawns, Kashmiri chilli butter, cherry tomato and curry leaf crumb.',
    image: 'pasta-prawn', ingredients: ['Tiger prawns', 'Chilli butter', 'Cherry tomato', 'Curry leaf crumb'], tags: ['Signature'],
  },
  {
    id: 'penne-arrabbiata', name: 'Penne Arrabbiata', category: 'pasta', price: 399, veg: true, spicy: true,
    description: 'Fiery tomato sauce, roasted garlic, parsley and parmesan.',
    image: 'pasta-penne', ingredients: ['Penne', 'Tomato', 'Garlic', 'Parmesan'], tags: ['Spicy'],
  },
  {
    id: 'truffle-tagliatelle', name: 'Truffle Mushroom Tagliatelle', category: 'pasta', price: 499, veg: true,
    description: 'Hand-cut ribbons, wild mushrooms, truffle cream and aged parmesan.',
    image: 'pasta-tagliatelle', ingredients: ['Fresh tagliatelle', 'Wild mushrooms', 'Truffle cream', 'Parmesan'], tags: [],
  },
  {
    id: 'farfalle-pesto', name: 'Farfalle Basil Pesto', category: 'pasta', price: 449, veg: true,
    description: 'Nut-free basil pesto, sun-dried tomatoes, rocket and pecorino.',
    image: 'pasta-pesto', ingredients: ['Farfalle', 'Basil pesto', 'Sun-dried tomato', 'Pecorino'], tags: ['Nut-free'],
  },
  {
    id: 'carbonara', name: 'Spaghetti Carbonara', category: 'pasta', price: 499, veg: false,
    description: 'Crisp chicken rashers, egg yolk, pecorino and cracked black pepper — no cream.',
    image: 'pasta-carbonara', ingredients: ['Spaghetti', 'Egg yolk', 'Pecorino', 'Chicken rashers'], tags: [],
  },

  // ── Desserts ──────────────────────────────────────────────
  {
    id: 'chocolate-fudge', name: 'Triple Chocolate Fudge Cake', category: 'desserts', price: 299, veg: true, bestseller: true,
    description: '70% dark chocolate sponge, ganache and whipped chocolate frosting.',
    image: 'dessert-chocolate-cake', ingredients: ['Dark chocolate', 'Ganache', 'Cocoa sponge'], tags: [],
  },
  {
    id: 'tiramisu', name: 'Classic Tiramisu', category: 'desserts', price: 349, veg: true,
    description: 'Espresso-soaked savoiardi, mascarpone cream and cocoa dust.',
    image: 'dessert-tiramisu', ingredients: ['Mascarpone', 'Espresso', 'Savoiardi', 'Cocoa'], tags: [],
  },
  {
    id: 'raspberry-rose', name: 'Raspberry Rose Cake', category: 'desserts', price: 329, veg: true,
    description: 'Vanilla chiffon, raspberry compote and rose-scented cream.',
    image: 'dessert-raspberry-cake', ingredients: ['Raspberry', 'Rose cream', 'Vanilla chiffon'], tags: [],
  },
  {
    id: 'panna-cotta', name: 'Strawberry Panna Cotta', category: 'desserts', price: 279, veg: true,
    description: 'Silky vanilla-bean panna cotta with macerated Mahabaleshwar strawberries.',
    image: 'dessert-pannacotta', ingredients: ['Vanilla bean', 'Cream', 'Strawberries'], tags: ['Seasonal'],
  },
  {
    id: 'glazed-donuts', name: 'Sprinkle Party Donuts', category: 'desserts', price: 249, veg: true, bestseller: true,
    description: 'Brioche donuts dipped in chocolate glaze and showered with rainbow sprinkles.',
    image: 'dessert-donuts', ingredients: ['Brioche dough', 'Chocolate glaze', 'Sprinkles'], tags: ['Kids love it'],
  },
  {
    id: 'cupcake-trio', name: 'Cupcake Trio', category: 'desserts', price: 229, veg: true,
    description: 'Strawberry, vanilla and red velvet with cream-cheese frosting.',
    image: 'dessert-cupcakes', ingredients: ['Cupcakes ×3', 'Cream-cheese frosting'], tags: [],
  },

  // ── Coffee ────────────────────────────────────────────────
  {
    id: 'signature-latte', name: 'House Signature Latte', category: 'coffee', price: 229, veg: true, bestseller: true,
    description: 'Double ristretto of our Chikmagalur blend with silky micro-foam and latte art.',
    image: 'coffee-latte-art', ingredients: ['Double ristretto', 'Steamed milk'], tags: ['Hot'],
  },
  {
    id: 'cappuccino', name: 'Cappuccino', category: 'coffee', price: 199, veg: true,
    description: 'Equal parts espresso, steamed milk and dense foam.',
    image: 'coffee-cappuccino', ingredients: ['Espresso', 'Milk foam'], tags: ['Hot'],
  },
  {
    id: 'iced-spanish-latte', name: 'Iced Spanish Latte', category: 'coffee', price: 259, veg: true,
    description: 'Espresso over condensed-milk-sweetened cold milk and ice.',
    image: 'coffee-iced', ingredients: ['Espresso', 'Condensed milk', 'Ice'], tags: ['Iced'],
  },
  {
    id: 'single-origin-espresso', name: 'Single-Origin Espresso', category: 'coffee', price: 179, veg: true,
    description: 'Rotating micro-lot from Baba Budangiri — ask your barista for tasting notes.',
    image: 'coffee-espresso', ingredients: ['Single-origin espresso'], tags: ['Hot'],
  },
  {
    id: 'flat-white', name: 'Flat White', category: 'coffee', price: 219, veg: true,
    description: 'A ristretto-forward, velvet-textured classic. Oat milk available.',
    image: 'coffee-pour', ingredients: ['Ristretto', 'Micro-foam'], tags: ['Oat milk option'],
  },
  {
    id: 'filter-kaapi-latte', name: 'Filter Kaapi Latte', category: 'coffee', price: 199, veg: true,
    description: 'South Indian chicory decoction meets a modern latte. Comforting and bold.',
    image: 'coffee-latte-table', ingredients: ['Kaapi decoction', 'Steamed milk', 'Jaggery'], tags: ['Local favourite'],
  },

  // ── Shakes ────────────────────────────────────────────────
  {
    id: 'oreo-shake', name: 'Oreo Cookie Crunch', category: 'shakes', price: 299, veg: true, bestseller: true,
    description: 'Vanilla ice cream blended with Oreos, chocolate drizzle and whipped cream.',
    image: 'shake-oreo', ingredients: ['Vanilla ice cream', 'Oreo', 'Chocolate sauce'], tags: [],
  },
  {
    id: 'strawberry-shake', name: 'Strawberries & Cream', category: 'shakes', price: 279, veg: true,
    description: 'Fresh strawberries, vanilla bean and cold milk — light and pink.',
    image: 'shake-strawberry', ingredients: ['Strawberries', 'Vanilla bean', 'Milk'], tags: ['Seasonal'],
  },
  {
    id: 'nutella-freakshake', name: 'Nutella Freakshake', category: 'shakes', price: 349, veg: true,
    description: 'Over-the-top hazelnut shake crowned with brownie, cream and a chocolate bar.',
    image: 'shake-freakshake', ingredients: ['Nutella', 'Brownie', 'Whipped cream'], tags: ['Instagram favourite'],
  },
  {
    id: 'belgian-chocolate', name: 'Belgian Chocolate', category: 'shakes', price: 299, veg: true,
    description: 'Callebaut chocolate, cocoa nibs and a striped straw for good measure.',
    image: 'shake-chocolate', ingredients: ['Belgian chocolate', 'Cocoa nibs', 'Milk'], tags: [],
  },

  // ── Beverages ─────────────────────────────────────────────
  {
    id: 'mint-mojito', name: 'Virgin Mint Mojito', category: 'beverages', price: 219, veg: true,
    description: 'Muddled mint and lime, cane sugar and soda over crushed ice.',
    image: 'bev-mojito', ingredients: ['Mint', 'Lime', 'Soda'], tags: ['Non-alcoholic'],
  },
  {
    id: 'strawberry-cooler', name: 'Strawberry Basil Cooler', category: 'beverages', price: 239, veg: true, bestseller: true,
    description: 'Crushed strawberries, Thai basil, lime and sparkling water.',
    image: 'bev-strawberry-cooler', ingredients: ['Strawberries', 'Basil', 'Lime', 'Sparkling water'], tags: ['Non-alcoholic'],
  },
  {
    id: 'lemon-iced-tea', name: 'Lemon Iced Tea', category: 'beverages', price: 189, veg: true,
    description: 'Cold-brewed Assam tea, lemon and a touch of honey.',
    image: 'bev-iced-tea', ingredients: ['Assam tea', 'Lemon', 'Honey'], tags: [],
  },
  {
    id: 'fresh-orange', name: 'Fresh Orange Juice', category: 'beverages', price: 199, veg: true,
    description: 'Nagpur oranges, pressed to order. Nothing else.',
    image: 'bev-orange', ingredients: ['Nagpur oranges'], tags: ['Fresh'],
  },
  {
    id: 'mocktail-trio', name: 'Sunset Mocktail Trio', category: 'beverages', price: 349, veg: true,
    description: 'Three mini mocktails — passion fruit, kokum and green apple. Made for sharing.',
    image: 'bev-mocktails', ingredients: ['Passion fruit', 'Kokum', 'Green apple'], tags: ['Sharing', 'Non-alcoholic'],
  },

  // ── Signature Specials ───────────────────────────────────
  {
    id: 'kerala-salmon', name: 'Kerala-Spiced Salmon', category: 'specials', price: 849, veg: false,
    description: 'Pan-seared Norwegian salmon, moilee beurre blanc, charred greens and herb oil.',
    image: 'special-salmon', focus: '30% 85%', ingredients: ['Norwegian salmon', 'Coconut moilee', 'Seasonal greens'], tags: ['Signature'],
  },
  {
    id: 'lamb-platter', name: "Chef's Smoked Lamb Platter", category: 'specials', price: 899, veg: false, bestseller: true,
    description: 'Hickory-smoked lamb, chimichurri, pickled chillies and grilled sourdough.',
    image: 'special-steak', ingredients: ['Smoked lamb', 'Chimichurri', 'Sourdough'], tags: ['For two'],
  },
  {
    id: 'burrata-salad', name: 'Burrata & Heirloom Salad', category: 'specials', price: 529, veg: true,
    description: 'Creamy burrata, heirloom tomatoes, peach, rocket and aged balsamic.',
    image: 'special-salad', ingredients: ['Burrata', 'Heirloom tomato', 'Peach', 'Balsamic'], tags: [],
  },
  {
    id: 'avocado-egg-bowl', name: 'Avocado & Soft Egg Bowl', category: 'specials', price: 449, veg: false,
    description: 'Smashed avocado, jammy eggs, spinach, toasted seeds and chilli crisp.',
    image: 'special-avocado-bowl', ingredients: ['Avocado', 'Soft-boiled eggs', 'Spinach', 'Chilli crisp'], tags: ['All-day breakfast'],
  },
  {
    id: 'charcoal-grill', name: 'Charcoal Grill Platter', category: 'specials', price: 799, veg: false,
    description: 'Peri-peri chicken, grilled vegetables, garlic toum and warm flatbread.',
    image: 'special-grill', ingredients: ['Peri-peri chicken', 'Grilled veg', 'Toum', 'Flatbread'], tags: ['Sharing'],
  },
  {
    id: 'teriyaki-bowl', name: 'Teriyaki Chicken Rice Bowl', category: 'specials', price: 499, veg: false,
    description: 'Glazed chicken thigh, sushi rice, edamame, pickled veg and sesame.',
    image: 'special-poke', ingredients: ['Chicken thigh', 'Sushi rice', 'Edamame', 'Sesame'], tags: [],
  },
  {
    id: 'tandoor-mixed-grill', name: 'Tandoor Mixed Grill', category: 'specials', price: 949, veg: false, spicy: true,
    description: 'Malai tikka, seekh kebab and tandoori prawns with smoky charred vegetables.',
    image: 'special-bbq', ingredients: ['Malai tikka', 'Seekh kebab', 'Tandoori prawns'], tags: ['For two'],
  },
  {
    id: 'croissant-basket', name: 'Butter Croissant Basket', category: 'specials', price: 349, veg: true,
    description: 'Three laminated all-butter croissants with house jam and cultured butter.',
    image: 'bakery-croissant', ingredients: ['All-butter croissants', 'House jam', 'Cultured butter'], tags: ['Morning only'],
  },
]

export const MENU = { categories: CATEGORIES, items: MENU_ITEMS }
