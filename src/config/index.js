import maisonNoir from './cafes/maison-noir.js'
import oatAndLinen from './cafes/oat-and-linen.js'
import funkyFork from './cafes/funky-fork.js'

/** Registry of all configured cafes. Add a new cafe here after creating its config file. */
export const CAFES = [maisonNoir, oatAndLinen, funkyFork]

export const cafeById = (id) => CAFES.find((c) => c.id === id)

/** The demo cafe shown for each template route in showcase mode. */
export const CAFE_BY_TEMPLATE = {
  luxury: maisonNoir,
  minimal: oatAndLinen,
  colorful: funkyFork,
}
