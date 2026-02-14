import React, { useState, useMemo, useCallback } from 'react'

export interface UseTableSortProps<T> {
  data: T[]
  columns: Array<{ key: string; accessor?: (row: T) => React.ReactNode }>
  defaultSortKey?: string
  defaultSortDirection?: 'asc' | 'desc'
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void
}

export interface UseTableSortReturn<T> {
  sortedData: T[]
  sortKey: string | null
  sortDirection: 'asc' | 'desc'
  handleSort: (key: string) => void
}

/**
 * Hook for managing table sorting logic
 * Extracted from Table component for reusability
 */
export function useTableSort<T>({
  data,
  columns,
  defaultSortKey,
  defaultSortDirection = 'asc',
  onSortChange,
}: UseTableSortProps<T>): UseTableSortReturn<T> {
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey || null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection)

  const handleSort = useCallback(
    (key: string) => {
      const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'
      setSortKey(key)
      setSortDirection(newDirection)
      onSortChange?.(key, newDirection)
    },
    [sortKey, sortDirection, onSortChange]
  )

  const sortedData = useMemo(() => {
    if (!sortKey) return data

    return [...data].sort((a, b) => {
      const column = columns.find((col) => col.key === sortKey)
      if (!column) return 0

      const aValue = column.accessor ? column.accessor(a) : (a as Record<string, unknown>)[sortKey]
      const bValue = column.accessor ? column.accessor(b) : (b as Record<string, unknown>)[sortKey]

      if (aValue === bValue) return 0

      const comparison = (aValue as any) > (bValue as any) ? 1 : -1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [data, sortKey, sortDirection, columns])

  return { sortedData, sortKey, sortDirection, handleSort }
}
