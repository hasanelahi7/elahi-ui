import React, { forwardRef, useState } from 'react'
import { cn } from '@/utils/cn'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label for the switch */
  label?: string
  /** Helper text */
  helperText?: string
  /** Label position */
  labelPosition?: 'left' | 'right'
  /** Controlled checked state */
  checked?: boolean
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void
}

/**
 * Modern toggle switch styled with Tailwind CSS
 *
 * @example
 * <Switch label="Enable notifications" />
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      helperText,
      labelPosition = 'right',
      checked: controlledChecked,
      onCheckedChange,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(false)
    const isControlled = controlledChecked !== undefined
    const checked = isControlled ? controlledChecked : internalChecked

    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked

      if (!isControlled) {
        setInternalChecked(newChecked)
      }

      onCheckedChange?.(newChecked)
      onChange?.(e)
    }

    const switchElement = (
      <div className="relative inline-block">
        <input
          ref={ref}
          type="checkbox"
          id={switchId}
          checked={checked}
          onChange={handleChange}
          role="switch"
          aria-checked={checked}
          className={cn('peer sr-only', className)}
          {...props}
        />
        <label
          htmlFor={switchId}
          className={cn(
            // Switch track
            'flex h-6 w-11 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2',
            // Unchecked state
            'bg-input',
            // Checked state (peer-checked = when checkbox is checked)
            'peer-checked:bg-primary',
            // Hover
            'hover:bg-input/80 peer-checked:hover:bg-primary/90',
            // Disabled state
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
          )}
        >
          {/* Switch thumb */}
          <span
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg transition-transform duration-200',
              // Unchecked position
              'translate-x-0',
              // Checked position
              checked && 'translate-x-5'
            )}
          />
        </label>
      </div>
    )

    if (!label) {
      return switchElement
    }

    return (
      <div className="flex flex-col gap-1">
        <div
          className={cn(
            'flex items-center gap-3',
            labelPosition === 'left' && 'flex-row-reverse justify-end'
          )}
        >
          {switchElement}
          <label
            htmlFor={switchId}
            className="cursor-pointer text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        </div>
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
