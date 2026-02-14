import React, { forwardRef, useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'
import { useFocusTrap, useLockBodyScroll } from '@/hooks'
import { CloseIcon } from '@/components/Icons'
import { KEYBOARD_KEYS } from '@/constants'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether modal is open */
  open: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Show close button */
  showClose?: boolean
  /** Prevent closing on overlay click */
  preventClose?: boolean
}

/**
 * Modal/Dialog component with overlay and focus trap
 *
 * @example
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <h2>Modal Title</h2>
 *   <p>Modal content</p>
 * </Modal>
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = 'md',
      showClose = true,
      preventClose = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)

    // Lock body scroll when modal is open
    useLockBodyScroll(open)

    // Trap focus within modal
    useFocusTrap(modalRef, open, true)

    // Handle ESC key
    useEffect(() => {
      if (!open) return

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === KEYBOARD_KEYS.ESCAPE && !preventClose) {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }, [open, onClose, preventClose])

    if (!open) return null

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    }

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 animate-fade-in"
          onClick={() => !preventClose && onClose()}
        />

        {/* Modal content */}
        <div
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
            // Update internal ref
            if (modalRef.current !== node) {
              (modalRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            }
          }}
          className={cn(
            'relative z-10 w-full rounded-lg bg-popover border border-border p-6 shadow-xl animate-scale-in',
            sizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {/* Close button */}
          {showClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close modal"
            >
              <CloseIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}

          {children}
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'

// Compound components for better structure
export const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4 space-y-2', className)} {...props} />
))
ModalHeader.displayName = 'ModalHeader'

export const ModalTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-xl font-semibold text-foreground leading-none', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground leading-relaxed', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

export const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-6 flex items-center justify-end gap-3', className)}
    {...props}
  />
))
ModalFooter.displayName = 'ModalFooter'
