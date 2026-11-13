import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'
import { cn } from '../lib/cn.js'

const DEFAULT_PANEL = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

/**
 * Accessible modal shell (unstyled). Focus trap, Escape to close, scroll lock,
 * backdrop click to close, focus restoration. Templates supply all visuals.
 */
export function Dialog({ open, onClose, title, children, className, overlayClassName, panelClassName, panel = DEFAULT_PANEL, describedBy, initialFocus }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <DialogInner {...{ onClose, title, className, overlayClassName, panelClassName, panel, describedBy, initialFocus }}>
          {children}
        </DialogInner>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function DialogInner({ onClose, title, children, className, overlayClassName, panelClassName, panel, describedBy, initialFocus }) {
  const ref = useRef(null)
  const titleId = useId()
  useLockBodyScroll(true)
  useFocusTrap(ref, true, { onEscape: onClose, initialFocus })

  return (
    <div className={cn('fixed inset-0 z-[100] flex', className)} data-lenis-prevent>
      <motion.div
        aria-hidden="true"
        className={cn('absolute inset-0 bg-black/60 backdrop-blur-sm', overlayClassName)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={cn('relative outline-none', panelClassName)}
        {...panel}
      >
        {title && <h2 id={titleId} className="sr-only">{title}</h2>}
        {children}
      </motion.div>
    </div>
  )
}
