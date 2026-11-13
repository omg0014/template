import { CakeSlice, Coffee, CookingPot, CupSoda, GlassWater, LayoutGrid, Pizza, Sandwich, Sparkles } from 'lucide-react'

/** Explicit map (keeps lucide tree-shakeable). Category configs reference icons by these names. */
const ICONS = { Sandwich, Pizza, CookingPot, CakeSlice, Coffee, CupSoda, GlassWater, Sparkles, LayoutGrid }

export function CategoryIcon({ name, ...props }) {
  const Icon = ICONS[name] ?? LayoutGrid
  return <Icon aria-hidden="true" {...props} />
}
