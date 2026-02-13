import { useState, useEffect } from 'react'

/**
 * Hook to detect if a media query matches
 * Useful for responsive behavior in components
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Use addEventListener for modern browsers
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}
