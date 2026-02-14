import React, { forwardRef, useState, useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { generateId } from '@/utils/id'

const inputVariants = cva(
  'flex w-full rounded-md border bg-background text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        outlined:
          'border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        filled: 'border-transparent bg-muted focus-visible:bg-background',
        underlined:
          'rounded-none border-x-0 border-t-0 border-b-2 px-0 focus-visible:border-primary',
      },
      inputSize: {
        sm: 'h-8 px-3 py-1 text-xs',
        md: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-success focus-visible:ring-success',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      inputSize: 'md',
      state: 'default',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputVariants> {
  /** Label text for the input */
  label?: string
  /** Helper text displayed below input */
  helperText?: string
  /** Error message (sets error state automatically) */
  error?: string
  /** Icon or element to show before input */
  prefix?: React.ReactNode
  /** Icon or element to show after input */
  suffix?: React.ReactNode
  /** Enable floating label animation */
  floatingLabel?: boolean
  /** Show character count (requires maxLength) */
  showCount?: boolean
  /** Wrapper className */
  wrapperClassName?: string
}

/**
 * Flexible Input component with multiple variants and features
 *
 * Features:
 * - Three variants: outlined, filled, underlined
 * - Three sizes: sm, md, lg
 * - Label with floating animation option
 * - Prefix/suffix icons
 * - Error and success states
 * - Helper text and error messages
 * - Character counter
 * - Fully accessible
 *
 * @example
 * <Input label="Email" type="email" />
 * <Input floatingLabel label="Username" />
 * <Input prefix={<Icon />} placeholder="Search..." />
 * <Input error="This field is required" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      variant,
      inputSize,
      state,
      label,
      helperText,
      error,
      prefix,
      suffix,
      floatingLabel = false,
      showCount = false,
      maxLength,
      value,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [charCount, setCharCount] = useState(
      value ? String(value).length : 0
    )

    // Memoize ID to prevent regeneration on every render
    const inputId = useMemo(() => id || generateId('input'), [id])
    const hasValue = value !== undefined && value !== ''
    const showFloatingLabel = floatingLabel && (isFocused || hasValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length)
      onChange?.(e)
    }

    const finalState = error ? 'error' : state

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {/* Label */}
        {label && !floatingLabel && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Floating label */}
          {floatingLabel && label && (
            <label
              htmlFor={inputId}
              className={cn(
                'pointer-events-none absolute left-3 transition-all duration-200',
                showFloatingLabel
                  ? 'top-0 -translate-y-1/2 bg-background px-1 text-xs font-medium text-primary'
                  : 'top-1/2 -translate-y-1/2 text-sm text-muted-foreground'
              )}
            >
              {label}
            </label>
          )}

          {/* Prefix */}
          {prefix && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {prefix}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            className={cn(
              inputVariants({ variant, inputSize, state: finalState }),
              prefix && 'pl-10',
              suffix && 'pr-10',
              floatingLabel && 'pt-3',
              className
            )}
            {...props}
          />

          {/* Suffix */}
          {suffix && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {suffix}
            </div>
          )}
        </div>

        {/* Helper text, error, or character count */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex-1">
            {error && (
              <p className="text-xs text-destructive" role="alert">
                {error}
              </p>
            )}
            {!error && helperText && (
              <p className="text-xs text-muted-foreground">{helperText}</p>
            )}
          </div>
          {showCount && maxLength && (
            <p className="text-xs text-muted-foreground">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export { inputVariants }
