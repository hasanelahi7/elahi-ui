import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        success: 'border-transparent bg-success text-success-foreground',
        warning: 'border-transparent bg-warning text-warning-foreground',
        outline: 'border-border text-foreground',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
      dot: {
        true: 'gap-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Show a dot indicator */
  showDot?: boolean
}

/**
 * Badge component for labels and status indicators
 *
 * @example
 * <Badge>New</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge showDot>Live</Badge>
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, showDot, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot: showDot }), className)}
        {...props}
      >
        {showDot && (
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
        )}
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { badgeVariants }
