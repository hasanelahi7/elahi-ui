import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label for the checkbox */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  error?: string
}

/**
 * Modern checkbox component styled with Tailwind CSS
 *
 * @example
 * <Checkbox label="Accept terms" />
 * <Checkbox checked onChange={(e) => console.log(e.target.checked)} />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              // Base styles
              'peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded border-2 border-primary/60',
              'transition-all duration-200',
              // Focus styles
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
              // Hover styles
              'hover:border-primary',
              // Checked state
              'checked:border-primary checked:bg-primary',
              // Checkmark via background SVG
              'checked:bg-[url("data:image/svg+xml,%3csvg%20viewBox=%270%200%2016%2016%27%20fill=%27white%27%20xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath%20d=%27M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%27/%3e%3c/svg%3e")]',
              'checked:bg-center checked:bg-no-repeat checked:bg-[length:80%]',
              // Disabled state
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Error state
              error && 'border-destructive checked:border-destructive checked:bg-destructive',
              className
            )}
            {...props}
          />

          {label && (
            <label
              htmlFor={checkboxId}
              className="cursor-pointer text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>

        {error && (
          <p className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
