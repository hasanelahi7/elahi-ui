import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { generateId } from '@/utils/id'
import { ANIMATION_DURATION } from '@/constants'
import { CheckIcon, AlertCircleIcon, AlertTriangleIcon, InfoIcon, CloseIcon } from '@/components/Icons'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = generateId('toast')
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    const duration = toast.duration ?? ANIMATION_DURATION.TOAST_DEFAULT
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [removeToast])

  // Listen for custom toast events (for imperative toast API)
  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent
      addToast(customEvent.detail)
    }

    window.addEventListener('toast', handleToastEvent)
    return () => window.removeEventListener('toast', handleToastEvent)
  }, [addToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose }) => {
  const variantStyles: Record<Toast['variant'] & string, string> = {
    default: 'bg-popover border-border backdrop-blur-sm shadow-xl',
    success: 'bg-popover border-green-300 dark:border-green-700 backdrop-blur-sm shadow-xl',
    error: 'bg-popover border-red-300 dark:border-red-700 backdrop-blur-sm shadow-xl',
    warning: 'bg-popover border-amber-300 dark:border-amber-700 backdrop-blur-sm shadow-xl',
    info: 'bg-popover border-blue-300 dark:border-blue-700 backdrop-blur-sm shadow-xl',
  }

  const iconContainerStyles: Record<string, string> = {
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  }

  const variantIcons: Record<string, React.ReactNode> = {
    success: <CheckIcon className="h-4 w-4" />,
    error: <AlertCircleIcon className="h-4 w-4" />,
    warning: <AlertTriangleIcon className="h-4 w-4" />,
    info: <InfoIcon className="h-4 w-4" />,
  }

  const variant = toast.variant || 'default'

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg shadow-black/5 animate-slide-in-from-bottom',
        variantStyles[variant]
      )}
    >
      {variant !== 'default' && iconContainerStyles[variant] && (
        <div className={cn(
          'shrink-0 rounded-lg p-1.5',
          iconContainerStyles[variant]
        )}>
          {variantIcons[variant]}
        </div>
      )}

      <div className="flex-1 pt-0.5">
        {toast.title && (
          <div className="font-medium text-sm text-foreground leading-none">
            {toast.title}
          </div>
        )}
        {toast.description && (
          <div className="mt-1.5 text-sm text-muted-foreground leading-snug">
            {toast.description}
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="shrink-0 rounded-md p-1 text-foreground/40 transition-colors hover:text-foreground/60 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
        aria-label="Close notification"
      >
        <CloseIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

// Helper function for quick toast (imperative API)
export const toast = {
  success: (title: string, description?: string) => {
    const event = new CustomEvent('toast', {
      detail: { title, description, variant: 'success' },
    })
    window.dispatchEvent(event)
  },
  error: (title: string, description?: string) => {
    const event = new CustomEvent('toast', {
      detail: { title, description, variant: 'error' },
    })
    window.dispatchEvent(event)
  },
  warning: (title: string, description?: string) => {
    const event = new CustomEvent('toast', {
      detail: { title, description, variant: 'warning' },
    })
    window.dispatchEvent(event)
  },
  info: (title: string, description?: string) => {
    const event = new CustomEvent('toast', {
      detail: { title, description, variant: 'info' },
    })
    window.dispatchEvent(event)
  },
  message: (title: string, description?: string) => {
    const event = new CustomEvent('toast', {
      detail: { title, description, variant: 'default' },
    })
    window.dispatchEvent(event)
  },
}
