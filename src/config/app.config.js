/**
 * App mode
 *  - 'showcase': template selection screen + all three templates + switcher (sales demo)
 *  - 'single'  : "/" renders ONE cafe directly with no switcher (client delivery)
 */
export const APP_CONFIG = {
  mode: 'showcase',
  singleCafe: 'maison-noir', // used when mode === 'single'
  singleTemplate: 'luxury', // must match the template declared in that cafe's config
  productName: 'Template Café',
}
