/**
 * Centralized constants for the elahi-ui library
 * Helps maintain consistency and makes updates easier
 */

// Animation durations
export const ANIMATION_DURATION = {
  RIPPLE: 600,
  TOAST_DEFAULT: 5000,
} as const

// Focusable element selector for accessibility
export const FOCUSABLE_ELEMENTS_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Key codes for keyboard navigation
export const KEYBOARD_KEYS = {
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_DOWN: 'ArrowDown',
  ENTER: 'Enter',
  SPACE: ' ',
} as const
