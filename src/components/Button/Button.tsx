import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { useRipple } from '@/hooks'
import { SpinnerIcon } from '@/components/Icons'
import type {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '@/utils/polymorphic'

/**
 * Button variants using class-variance-authority
 * Provides a type-safe way to manage button styles and variants
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-600 active:bg-primary-700',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        danger:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-9 px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        xl: 'h-12 px-10 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md',
    },
  }
)

export interface ButtonBaseProps extends VariantProps<typeof buttonVariants> {
  /** Whether button is in loading state */
  loading?: boolean
  /** Icon to display before text */
  leftIcon?: React.ReactNode
  /** Icon to display after text */
  rightIcon?: React.ReactNode
  /** Enable ripple effect on click */
  enableRipple?: boolean
}

export type ButtonProps<C extends React.ElementType = 'button'> =
  PolymorphicComponentPropsWithRef<C, ButtonBaseProps>

/**
 * Versatile Button component with multiple variants, sizes, and features
 *
 * Features:
 * - Multiple variants: primary, secondary, outline, ghost, danger, success, warning, link
 * - 6 size options from xs to xl
 * - Loading state with spinner
 * - Left/right icon support
 * - Ripple effect animation
 * - Polymorphic (can render as any element via 'as' prop)
 * - Full TypeScript support
 * - Accessible by default
 *
 * @example
 * <Button>Click me</Button>
 * <Button variant="outline" size="sm" leftIcon={<Icon />}>With Icon</Button>
 * <Button loading>Loading...</Button>
 * <Button as="a" href="/link">Link Button</Button>
 */
export const Button = (forwardRef as any)(
  <C extends React.ElementType = 'button'>(
    {
      as,
      variant,
      size,
      fullWidth,
      rounded,
      loading = false,
      leftIcon,
      rightIcon,
      enableRipple = true,
      className,
      children,
      disabled,
      onClick,
      ...props
    }: ButtonProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || 'button'
    const { ripples, createRipple } = useRipple()

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (enableRipple && !disabled && !loading) {
        createRipple(e as React.MouseEvent<HTMLElement>)
      }

      onClick?.(e as React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>)
    }

    return (
      <Component
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth, rounded }),
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple effect */}
        {enableRipple &&
          ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute animate-ripple rounded-full bg-white/30"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

        {/* Loading spinner */}
        {loading && <SpinnerIcon className="h-4 w-4 animate-spin" />}

        {/* Left icon */}
        {!loading && leftIcon && <span>{leftIcon}</span>}

        {/* Button text */}
        {children}

        {/* Right icon */}
        {!loading && rightIcon && <span>{rightIcon}</span>}
      </Component>
    )
  }
) as (<C extends React.ElementType = 'button'>(
  props: ButtonProps<C> & { ref?: PolymorphicRef<C> }
) => React.ReactElement | null) & { displayName?: string }

Button.displayName = 'Button'

export { buttonVariants }
