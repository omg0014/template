import { useEffect, useState } from 'react'
import { getOpeningStatus } from '../lib/hours.js'

/** Live open/closed status, refreshed every minute. */
export function useOpeningStatus(hours, timezone) {
  const [status, setStatus] = useState(() => getOpeningStatus(hours, timezone))
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpeningStatus(hours, timezone)), 60_000)
    return () => clearInterval(id)
  }, [hours, timezone])
  return status
}
