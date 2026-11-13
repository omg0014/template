import { createContext, useContext } from 'react'

export const CafeContext = createContext(null)

/** Access the active cafe config inside a template. */
export function useCafe() {
  const cafe = useContext(CafeContext)
  if (!cafe) throw new Error('useCafe must be used inside <CafeProvider>')
  return cafe
}
