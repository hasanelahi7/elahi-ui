import React, { forwardRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-muted font-medium text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source */
  src?: string
  /** Alt text for image */
  alt?: string
  /** Fallback text (usually initials) */
  fallback?: string
  /** Show status indicator */
  status?: 'online' | 'offline' | 'away' | 'busy'
}

/**
 * Modern avatar component styled with Tailwind CSS
 *
 * @example
 * <Avatar src="/avatar.jpg" alt="John Doe" />
 * <Avatar fallback="JD" status="online" />
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, src, alt, fallback, status, ...props }, ref) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const statusColors = {
      online: 'bg-success',
      offline: 'bg-muted-foreground',
      away: 'bg-warning',
      busy: 'bg-destructive',
    }

    const shouldShowImage = src && !imageError
    const shouldShowFallback = !shouldShowImage || !imageLoaded

    // Generate initials from alt or fallback
    const initials =
      fallback ||
      alt
        ?.split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) ||
      '?'

    return (
      <div className="relative inline-block">
        <div
          ref={ref}
          className={cn(avatarVariants({ size, shape }), className)}
          {...props}
        >
          {/* Image */}
          {shouldShowImage && (
            <img
              src={src}
              alt={alt}
              onError={() => setImageError(true)}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                'aspect-square h-full w-full object-cover',
                !imageLoaded && 'hidden'
              )}
            />
          )}

          {/* Fallback initials */}
          {shouldShowFallback && <span>{initials}</span>}
        </div>

        {/* Status indicator */}
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-full border-2 border-background',
              statusColors[status],
              size === 'sm' && 'h-2 w-2',
              size === 'md' && 'h-2.5 w-2.5',
              size === 'lg' && 'h-3 w-3',
              size === 'xl' && 'h-4 w-4',
              size === '2xl' && 'h-5 w-5'
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { avatarVariants }
