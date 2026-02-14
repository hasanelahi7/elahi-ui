import { useState, useEffect } from 'react'

/**
 * Hook to detect if a media query matches
 * Useful for responsive behavior in components
 * SSR-safe: Returns false during server-side rendering
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    // SSR safety: check if window exists
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    // SSR safety
    if (typeof window === 'undefined') return

    const media = window.matchMedia(query)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Initial check and set
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]) // matches excluded intentionally to prevent infinite loops

  return matches
}
