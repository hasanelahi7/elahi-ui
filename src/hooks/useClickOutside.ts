import { useEffect, RefObject } from 'react'

/**
 * Hook to detect clicks outside a ref element
 * Useful for closing dropdowns, modals, popovers, etc.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * useClickOutside(ref, () => setIsOpen(false))
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current
      if (!el || el.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, enabled])
}
