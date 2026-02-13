import { useState, useCallback } from 'react'

/**
 * Hook for managing open/close state (disclosure pattern)
 * Commonly used for modals, dropdowns, accordions, etc.
 *
 * @example
 * const { isOpen, open, close, toggle } = useDisclosure()
 * <Button onClick={toggle}>Toggle Modal</Button>
 * <Modal isOpen={isOpen} onClose={close}>...</Modal>
 */
export interface UseDisclosureReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export function useDisclosure(
  initialState: boolean = false
): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
