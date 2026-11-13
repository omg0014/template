import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useCafe } from '../hooks/useCafe.js'
import { weekOrder } from '../lib/hours.js'

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** Per-cafe document meta + JSON-LD structured data (CafeOrCoffeeShop). */
export function CafeSEO() {
  const cafe = useCafe()
  const { seo, identity, contact } = cafe
  useDocumentMeta({ title: seo.title, description: seo.description, image: seo.ogImage, themeColor: seo.themeColor })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: identity.name,
    description: seo.description,
    image: typeof window !== 'undefined' ? new URL(seo.ogImage, window.location.origin).href : seo.ogImage,
    telephone: contact.phone,
    email: contact.email,
    priceRange: cafe.priceRange,
    servesCuisine: cafe.cuisine,
    hasMenu: '#menu',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.line1,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: contact.geo ? { '@type': 'GeoCoordinates', latitude: contact.geo.lat, longitude: contact.geo.lng } : undefined,
    openingHoursSpecification: weekOrder(contact.hours)
      .filter((h) => !h.closed)
      .map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: DOW[h.day], opens: h.open, closes: h.close })),
    aggregateRating: cafe.rating ? { '@type': 'AggregateRating', ratingValue: cafe.rating.value, reviewCount: parseInt(String(cafe.rating.count).replace(/\D/g, ''), 10) } : undefined,
    sameAs: Object.values(contact.socials ?? {}).map((s) => s.url),
  }
  return <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
}
