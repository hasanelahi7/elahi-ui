import { useEffect } from 'react'

/**
 * Custom hook to lock/unlock body scroll
 * Useful for modals and overlays to prevent background scrolling
 *
 * @param lock - Whether to lock the body scroll
 *
 * @example
 * useLockBodyScroll(isModalOpen)
 */
export function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (lock) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalOverflow
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [lock])
}
