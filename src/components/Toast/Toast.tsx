import React, { createContext, useContext, useState, useCallback } from 'react'
import { cn } from '@/utils/cn'

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

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

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
  const variantStyles = {
    default: 'bg-background/95 border-border backdrop-blur-sm',
    success: 'bg-background/95 border-green-300 dark:border-green-800/70 backdrop-blur-sm',
    error: 'bg-background/95 border-red-300 dark:border-red-800/70 backdrop-blur-sm',
    warning: 'bg-background/95 border-amber-300 dark:border-amber-800/70 backdrop-blur-sm',
    info: 'bg-background/95 border-blue-300 dark:border-blue-800/70 backdrop-blur-sm',
  }

  const iconContainerStyles = {
    success: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  }

  const variantIcons = {
    success: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    error: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    warning: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    info: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    default: null,
  }

  return (
    <div
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg shadow-black/5 animate-slide-in-from-bottom',
        variantStyles[toast.variant || 'default']
      )}
    >
      {toast.variant && toast.variant !== 'default' && (
        <div className={cn(
          'shrink-0 rounded-lg p-1.5',
          iconContainerStyles[toast.variant]
        )}>
          {variantIcons[toast.variant]}
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
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

// Helper function for quick toast
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
