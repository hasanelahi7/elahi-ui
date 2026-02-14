import React, { useState, useCallback } from 'react'
import { ANIMATION_DURATION } from '@/constants'

interface Ripple {
  x: number
  y: number
  id: string
}

/**
 * Custom hook for managing ripple effect animations
 * Extracted from Button component for reusability
 *
 * @example
 * const { ripples, createRipple } = useRipple()
 * <button onClick={createRipple}>Click me</button>
 */
export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const createRipple = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`

      setRipples((prev) => [...prev, { x, y, id }])

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, ANIMATION_DURATION.RIPPLE)
    },
    []
  )

  const clearRipples = useCallback(() => {
    setRipples([])
  }, [])

  return { ripples, createRipple, clearRipples }
}
