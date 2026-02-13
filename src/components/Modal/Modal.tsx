import React, { forwardRef, useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'

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

    // Handle ESC key
    useEffect(() => {
      if (!open) return

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !preventClose) {
          onClose()
        }
      }

      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }, [open, onClose, preventClose])

    // Prevent body scroll
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    // Focus trap
    useEffect(() => {
      if (!open || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      firstElement?.focus()

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      document.addEventListener('keydown', handleTab)
      return () => document.removeEventListener('keydown', handleTab)
    }, [open])

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
              (ref as any).current = node
            }
            (modalRef as any).current = node
          }}
          className={cn(
            'relative z-10 w-full rounded-lg bg-background p-6 shadow-xl animate-scale-in',
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
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
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
