import React from 'react'
import { cn } from '@/utils/cn'

export interface TablePaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  canGoNext: boolean
  canGoPrevious: boolean
}

/**
 * Table pagination component
 * Separated for better maintainability
 */
export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  canGoNext,
  canGoPrevious,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} results
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className={cn(
            'rounded-md border border-border px-3 py-1 text-sm transition-colors',
            !canGoPrevious ? 'cursor-not-allowed opacity-50' : 'hover:bg-muted'
          )}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={cn(
            'rounded-md border border-border px-3 py-1 text-sm transition-colors',
            !canGoNext ? 'cursor-not-allowed opacity-50' : 'hover:bg-muted'
          )}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  )
}
