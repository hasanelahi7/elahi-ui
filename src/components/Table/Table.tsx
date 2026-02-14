import React, { forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'
import { useTableSort } from '@/hooks/useTableSort'
import { useTablePagination } from '@/hooks/useTablePagination'
import { SortAscIcon, SortDescIcon, ChevronRightIcon } from '@/components/Icons'
import { TablePagination } from './TablePagination'

// Types
export interface Column<T = unknown> {
  key: string
  header: React.ReactNode
  accessor?: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps<T = unknown> extends React.HTMLAttributes<HTMLTableElement> {
  /** Table columns configuration */
  columns: Column<T>[]
  /** Table data */
  data: T[]
  /** Enable striped rows */
  striped?: boolean
  /** Enable hover effect */
  hoverable?: boolean
  /** Table size */
  size?: 'sm' | 'md' | 'lg'
  /** Enable sorting */
  sortable?: boolean
  /** Default sort column */
  defaultSortKey?: string
  /** Default sort direction */
  defaultSortDirection?: 'asc' | 'desc'
  /** Callback when sort changes */
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void
  /** Enable expandable rows */
  expandable?: boolean
  /** Render expanded content */
  renderExpanded?: (row: T, index: number) => React.ReactNode
  /** Enable pagination */
  pagination?: boolean
  /** Items per page */
  pageSize?: number
  /** Current page (controlled) */
  currentPage?: number
  /** Callback when page changes */
  onPageChange?: (page: number) => void
  /** Loading state */
  loading?: boolean
  /** Empty state message */
  emptyMessage?: string
}

/**
 * Comprehensive Table component with sorting, pagination, and expandable rows
 * Refactored for better maintainability
 *
 * Features:
 * - Sortable columns
 * - Expandable rows
 * - Pagination
 * - Striped and hoverable rows
 * - Responsive design
 * - Loading state
 * - Empty state
 * - Size variants
 *
 * @example
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email' }
 *   ]}
 *   data={users}
 *   sortable
 *   pagination
 *   pageSize={10}
 * />
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      columns,
      data,
      striped = false,
      hoverable = true,
      size = 'md',
      sortable = false,
      defaultSortKey,
      defaultSortDirection = 'asc',
      onSortChange,
      expandable = false,
      renderExpanded,
      pagination = false,
      pageSize = 10,
      currentPage,
      onPageChange,
      loading = false,
      emptyMessage = 'No data available',
      className,
      ...props
    },
    ref
  ) => {
    // Expandable rows state
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

    // Sorting
    const { sortedData, sortKey, sortDirection, handleSort } = useTableSort({
      data,
      columns,
      defaultSortKey,
      defaultSortDirection,
      onSortChange,
    })

    // Pagination
    const {
      paginatedData,
      currentPage: page,
      totalPages,
      handlePageChange,
      canGoNext,
      canGoPrevious,
    } = useTablePagination({
      data: sortedData,
      pageSize,
      currentPage,
      onPageChange,
    })

    // Toggle row expansion
    const toggleExpanded = (index: number) => {
      const newExpanded = new Set(expandedRows)
      if (newExpanded.has(index)) {
        newExpanded.delete(index)
      } else {
        newExpanded.add(index)
      }
      setExpandedRows(newExpanded)
    }

    // Size classes
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    const cellPadding = {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    }

    const displayData = pagination ? paginatedData : sortedData

    return (
      <div className="w-full">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table
            ref={ref}
            className={cn('w-full border-collapse', sizeClasses[size], className)}
            {...props}
          >
            {/* Table Header */}
            <thead className="bg-muted/50">
              <tr>
                {expandable && <th className={cn('w-12', cellPadding[size])} />}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      cellPadding[size],
                      'text-left font-semibold text-foreground',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      sortable && column.sortable !== false && 'cursor-pointer select-none hover:bg-muted',
                      column.width && `w-[${column.width}]`
                    )}
                    onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {sortable && column.sortable !== false && (
                        <span className="text-muted-foreground">
                          {sortKey === column.key ? (
                            sortDirection === 'asc' ? (
                              <SortAscIcon className="h-4 w-4" />
                            ) : (
                              <SortDescIcon className="h-4 w-4" />
                            )
                          ) : (
                            <div className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + (expandable ? 1 : 0)}
                    className={cn(cellPadding[size], 'text-center text-muted-foreground')}
                  >
                    Loading...
                  </td>
                </tr>
              ) : displayData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (expandable ? 1 : 0)}
                    className={cn(cellPadding[size], 'text-center text-muted-foreground')}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                displayData.map((row, rowIndex) => {
                  const isExpanded = expandedRows.has(rowIndex)
                  return (
                    <React.Fragment key={rowIndex}>
                      <tr
                        className={cn(
                          'border-t border-border',
                          striped && rowIndex % 2 === 1 && 'bg-muted/30',
                          hoverable && 'hover:bg-muted/50 transition-colors',
                          expandable && 'cursor-pointer'
                        )}
                        onClick={expandable ? () => toggleExpanded(rowIndex) : undefined}
                      >
                        {expandable && (
                          <td className={cellPadding[size]}>
                            <div
                              className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                              aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                            >
                              <ChevronRightIcon
                                className={cn(
                                  'h-4 w-4 transition-transform duration-200',
                                  isExpanded && 'rotate-90'
                                )}
                              />
                            </div>
                          </td>
                        )}
                        {columns.map((column) => {
                          const value = column.accessor
                            ? column.accessor(row)
                            : (row as Record<string, unknown>)[column.key]
                          return (
                            <td
                              key={column.key}
                              className={cn(
                                cellPadding[size],
                                'text-foreground',
                                column.align === 'center' && 'text-center',
                                column.align === 'right' && 'text-right'
                              )}
                            >
                              {value as React.ReactNode}
                            </td>
                          )
                        })}
                      </tr>
                      {expandable && isExpanded && renderExpanded && (
                        <tr className="border-t border-border bg-muted/20">
                          <td colSpan={columns.length + 1} className={cellPadding[size]}>
                            {renderExpanded(row, rowIndex)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && !loading && displayData.length > 0 && (
          <TablePagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={sortedData.length}
            onPageChange={handlePageChange}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        )}
      </div>
    )
  }
)

Table.displayName = 'Table'
