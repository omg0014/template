import { CAFE_BY_TEMPLATE, cafeById } from '../config/index.js'

/** Resolve the cafe for a template chunk: explicit id (single mode) or the template's demo cafe. */
export const resolveCafe = (templateKey, cafeId) => (cafeId && cafeById(cafeId)) || CAFE_BY_TEMPLATE[templateKey]
