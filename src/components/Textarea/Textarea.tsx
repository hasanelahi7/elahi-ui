import React, { forwardRef, useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'
import { inputVariants } from '../Input/Input'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  error?: string
  /** Auto-resize based on content */
  autoResize?: boolean
  /** Show character count */
  showCount?: boolean
  /** Wrapper className */
  wrapperClassName?: string
}

/**
 * Textarea component with auto-resize and character count
 *
 * @example
 * <Textarea label="Description" rows={4} />
 * <Textarea autoResize maxLength={500} showCount />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      wrapperClassName,
      label,
      helperText,
      error,
      autoResize = false,
      showCount = false,
      maxLength,
      value,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

    const charCount = value ? String(value).length : 0

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [value, autoResize])

    const handleRef = (node: HTMLTextAreaElement) => {
      textareaRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}

        <textarea
          ref={handleRef}
          id={textareaId}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={cn(
            inputVariants({
              variant: 'outlined',
              inputSize: 'md',
              state: error ? 'error' : 'default',
            }),
            'min-h-[80px] resize-none',
            !autoResize && 'resize-y',
            className
          )}
          {...props}
        />

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

Textarea.displayName = 'Textarea'
