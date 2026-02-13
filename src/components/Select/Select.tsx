import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { useClickOutside } from '@/hooks'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Options to display */
  options: SelectOption[]
  /** Selected value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Label for the select */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  error?: string
  /** Disabled state */
  disabled?: boolean
  /** Enable search/filter */
  searchable?: boolean
}

/**
 * Modern select dropdown with search functionality
 *
 * @example
 * <Select
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' }
 *   ]}
 *   value={country}
 *   onChange={setCountry}
 * />
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select...',
      label,
      helperText,
      error,
      disabled = false,
      searchable = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    useClickOutside(containerRef, () => setIsOpen(false))

    const selectedOption = options.find((opt) => opt.value === value)

    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue)
      setIsOpen(false)
      setSearchQuery('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      } else if (e.key === 'ArrowDown' && !isOpen) {
        setIsOpen(true)
      }
    }

    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {label && (
          <label className="mb-2 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div ref={containerRef} className="relative">
          {/* Select trigger */}
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
              'ring-offset-background transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive',
              isOpen && 'ring-2 ring-ring ring-offset-2'
            )}
          >
            <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
              {selectedOption?.label || placeholder}
            </span>
            <svg
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-180'
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-50 mt-1 w-full rounded-md border border-input bg-popover shadow-lg animate-scale-in">
              {searchable && (
                <div className="border-b border-border p-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}

              <div className="max-h-60 overflow-y-auto p-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                      className={cn(
                        'flex w-full items-center rounded-sm px-3 py-2 text-left text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus-visible:bg-accent focus-visible:outline-none',
                        'disabled:pointer-events-none disabled:opacity-50',
                        option.value === value && 'bg-accent font-medium'
                      )}
                    >
                      {option.label}
                      {option.value === value && (
                        <svg
                          className="ml-auto h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
