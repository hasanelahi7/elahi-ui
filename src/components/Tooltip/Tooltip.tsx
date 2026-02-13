import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { cn } from '@/utils/cn'

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Content to show in tooltip */
  content: React.ReactNode
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Delay before showing (ms) */
  delay?: number
}

/**
 * Tooltip component that shows on hover
 *
 * @example
 * <Tooltip content="This is a tooltip">
 *   <button>Hover me</button>
 * </Tooltip>
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, position = 'top', delay = 200, className, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const timeoutRef = useRef<NodeJS.Timeout>()
    const triggerRef = useRef<HTMLDivElement>(null)

    const showTooltip = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
        updatePosition()
      }, delay)
    }

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(false)
    }

    const updatePosition = () => {
      if (!triggerRef.current) return

      const rect = triggerRef.current.getBoundingClientRect()
      const offset = 8

      const positions = {
        top: {
          x: rect.left + rect.width / 2,
          y: rect.top - offset,
        },
        bottom: {
          x: rect.left + rect.width / 2,
          y: rect.bottom + offset,
        },
        left: {
          x: rect.left - offset,
          y: rect.top + rect.height / 2,
        },
        right: {
          x: rect.right + offset,
          y: rect.top + rect.height / 2,
        },
      }

      setCoords(positions[position])
    }

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [])

    const positionClasses = {
      top: '-translate-x-1/2 -translate-y-full',
      bottom: '-translate-x-1/2',
      left: '-translate-x-full -translate-y-1/2',
      right: '-translate-y-1/2',
    }

    return (
      <>
        <div
          ref={triggerRef}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onFocus={showTooltip}
          onBlur={hideTooltip}
          className="inline-block"
        >
          {children}
        </div>

        {isVisible && (
          <div
            ref={ref}
            role="tooltip"
            style={{
              position: 'fixed',
              left: `${coords.x}px`,
              top: `${coords.y}px`,
            }}
            className={cn(
              'z-50 rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
              'pointer-events-none animate-fade-in',
              positionClasses[position],
              className
            )}
            {...props}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                'absolute h-2 w-2 rotate-45 bg-popover',
                position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
                position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
                position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
                position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
              )}
            />
          </div>
        )}
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'
