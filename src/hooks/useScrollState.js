import { useEffect, useState } from 'react'

/** Header helper: whether the page is scrolled past `offset`, and whether the user is scrolling down. */
export function useScrollState(offset = 40) {
  const [state, setState] = useState({ scrolled: false, hidden: false })
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      const scrolled = y > offset
      const goingDown = y > lastY + 4
      const goingUp = y < lastY - 4
      setState((s) => {
        const hidden = goingDown && y > 400 ? true : goingUp || y < 400 ? false : s.hidden
        return s.scrolled === scrolled && s.hidden === hidden ? s : { scrolled, hidden }
      })
      lastY = y
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return state
}
