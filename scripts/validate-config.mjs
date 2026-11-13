#!/usr/bin/env node
/**
 * npm run validate — checks every registered cafe config for broken references,
 * missing images, malformed hours, etc. Exits non-zero on any error (fails the build).
 */
import { CAFES } from '../src/config/index.js'
import { validateCafe } from '../src/data/validate.js'

let failed = 0
for (const cafe of CAFES) {
  const errors = validateCafe(cafe)
  if (errors.length) {
    failed++
    console.error(`✗ ${cafe.id}`)
    errors.forEach((e) => console.error(`   ${e}`))
  } else {
    console.log(`✓ ${cafe.id} (${cafe.template}) — ${cafe.menu.items.length} items, ${cafe.menu.categories.length} categories`)
  }
}
if (failed) {
  console.error(`\n${failed} cafe config(s) failed validation.`)
  process.exit(1)
}
