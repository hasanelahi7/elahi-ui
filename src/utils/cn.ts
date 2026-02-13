import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500')
 * cn('px-2', 'px-4') // Returns 'px-4' (tailwind-merge resolves conflicts)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
