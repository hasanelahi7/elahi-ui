import { useEffect, RefObject } from 'react'
import { FOCUSABLE_ELEMENTS_SELECTOR, KEYBOARD_KEYS } from '@/constants'

/**
 * Custom hook for trapping focus within a container element
 * Useful for modals, dialogs, and other overlay components
 *
 * @param containerRef - Ref to the container element
 * @param enabled - Whether focus trap is enabled
 * @param autoFocus - Whether to auto-focus first element on mount
 *
 * @example
 * const modalRef = useRef<HTMLDivElement>(null)
 * useFocusTrap(modalRef, isOpen, true)
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  enabled: boolean = true,
  autoFocus: boolean = true
): void {
  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      FOCUSABLE_ELEMENTS_SELECTOR
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Auto-focus first element
    if (autoFocus) {
      firstElement?.focus()
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== KEYBOARD_KEYS.TAB) return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [containerRef, enabled, autoFocus])
}
