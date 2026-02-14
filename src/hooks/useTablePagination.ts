import { useState, useMemo, useCallback } from 'react'

export interface UseTablePaginationProps<T> {
  data: T[]
  pageSize?: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

export interface UseTablePaginationReturn<T> {
  paginatedData: T[]
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
  canGoNext: boolean
  canGoPrevious: boolean
}

/**
 * Hook for managing table pagination logic
 * Extracted from Table component for reusability
 */
export function useTablePagination<T>({
  data,
  pageSize = 10,
  currentPage: controlledPage,
  onPageChange,
}: UseTablePaginationProps<T>): UseTablePaginationReturn<T> {
  const [internalPage, setInternalPage] = useState(1)
  const currentPage = controlledPage !== undefined ? controlledPage : internalPage

  const totalPages = Math.ceil(data.length / pageSize)

  const handlePageChange = useCallback(
    (page: number) => {
      if (controlledPage === undefined) {
        setInternalPage(page)
      }
      onPageChange?.(page)
    },
    [controlledPage, onPageChange]
  )

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return data.slice(startIndex, startIndex + pageSize)
  }, [data, currentPage, pageSize])

  return {
    paginatedData,
    currentPage,
    totalPages,
    handlePageChange,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
  }
}
