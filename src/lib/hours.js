import { formatTime } from './format.js'

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Current weekday (0=Sun) and minutes-since-midnight in a given IANA timezone. */
export function zonedNow(timezone, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const get = (t) => parts.find((p) => p.type === t)?.value
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

/** Human label for one day's hours. */
export function hoursLabel(entry) {
  if (!entry || entry.closed) return 'Closed'
  return `${formatTime(entry.open)} – ${formatTime(entry.close)}`
}

/**
 * Opening status, supporting closing times after midnight (close < open).
 * @returns {{ isOpen: boolean, today: number, label: string }}
 */
export function getOpeningStatus(hours, timezone = 'Asia/Kolkata', now = new Date()) {
  const { day, minutes } = zonedNow(timezone, now)
  const byDay = (d) => hours.find((h) => h.day === d)

  // Still inside yesterday's after-midnight window?
  const yesterday = byDay((day + 6) % 7)
  if (yesterday && !yesterday.closed && toMin(yesterday.close) < toMin(yesterday.open) && minutes < toMin(yesterday.close)) {
    return { isOpen: true, today: day, label: `Open now · closes ${formatTime(yesterday.close)}` }
  }

  const today = byDay(day)
  if (today && !today.closed) {
    const open = toMin(today.open)
    let close = toMin(today.close)
    if (close <= open) close += 24 * 60
    if (minutes >= open && minutes < close) {
      return { isOpen: true, today: day, label: `Open now · closes ${formatTime(today.close)}` }
    }
    if (minutes < open) return { isOpen: false, today: day, label: `Closed · opens ${formatTime(today.open)}` }
  }

  // Find the next opening day.
  for (let i = 1; i <= 7; i++) {
    const next = byDay((day + i) % 7)
    if (next && !next.closed) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[(day + i) % 7]
      return { isOpen: false, today: day, label: `Closed · opens ${when} ${formatTime(next.open)}` }
    }
  }
  return { isOpen: false, today: day, label: 'Closed' }
}

/** Hours ordered Monday→Sunday for display. */
export const weekOrder = (hours) => [1, 2, 3, 4, 5, 6, 0].map((d) => hours.find((h) => h.day === d) ?? { day: d, closed: true })
