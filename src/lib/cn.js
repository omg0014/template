/** Join truthy class names. Tiny replacement for clsx. */
export const cn = (...parts) => parts.flat().filter(Boolean).join(' ')
