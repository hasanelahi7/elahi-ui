/**
 * Generate a unique ID for component instances
 * Uses crypto.randomUUID() if available (modern browsers), falls back to timestamp-based ID
 */
export function generateId(prefix = 'id'): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  // Fallback for older browsers or SSR
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}
