/** Minimal brand glyphs (Lucide no longer ships brand logos). */
export function WhatsAppIcon({ className = 'size-5', ...p }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" {...p}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1 14.65-11.6 9.36 9.36 0 0 1 2.76 6.67 9.44 9.44 0 0 1-9.42 9.35zm8.02-17.37A11.27 11.27 0 0 0 12.05.8C5.8.8.7 5.89.7 12.13c0 2 .52 3.95 1.52 5.66L.6 23.67l6.02-1.58a11.3 11.3 0 0 0 5.42 1.38h.01c6.24 0 11.33-5.09 11.34-11.34 0-3.03-1.18-5.87-3.32-8z" />
    </svg>
  )
}

export function InstagramIcon({ className = 'size-5', ...p }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon({ className = 'size-5', ...p }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" {...p}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.25-1.45 1.5-1.45h1.55V4.47A20.6 20.6 0 0 0 14.3 4.3c-2.2 0-3.7 1.34-3.7 3.8v2.4H8.1v3h2.5V21z" />
    </svg>
  )
}

export function ZomatoIcon({ className = 'size-5', ...p }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 9h7l-7 6h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const SOCIAL_ICONS = { instagram: InstagramIcon, facebook: FacebookIcon, zomato: ZomatoIcon, whatsapp: WhatsAppIcon }
