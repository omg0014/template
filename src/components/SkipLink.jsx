export function SkipLink({ className = '' }) {
  return (
    <a
      href="#main"
      className={`sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black focus:shadow-xl ${className}`}
    >
      Skip to content
    </a>
  )
}
