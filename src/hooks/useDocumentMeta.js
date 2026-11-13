import { useEffect } from 'react'

function setMeta(attr, key, content) {
  if (content == null) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Update document title, description, Open Graph and theme-color for the current route. */
export function useDocumentMeta({ title, description, image, themeColor }) {
  useEffect(() => {
    if (title) document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:image', image ? new URL(image, window.location.origin).href : undefined)
    setMeta('property', 'og:url', window.location.href)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'theme-color', themeColor)
  }, [title, description, image, themeColor])
}
