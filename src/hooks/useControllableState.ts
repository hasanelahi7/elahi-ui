import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Hook for managing controlled and uncontrolled state
 * Allows components to work in both controlled and uncontrolled modes
 *
 * @example
 * function Input({ value: valueProp, onChange }) {
 *   const [value, setValue] = useControllableState({
 *     prop: valueProp,
 *     onChange,
 *     defaultProp: ''
 *   })
 *   return <input value={value} onChange={e => setValue(e.target.value)} />
 * }
 */
export interface UseControllableStateProps<T> {
  prop?: T
  defaultProp?: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateProps<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useState<T | undefined>(
    defaultProp
  )
  const isControlled = prop !== undefined
  const value = isControlled ? prop : uncontrolledProp
  const previousValueRef = useRef(value)

  useEffect(() => {
    if (!isControlled && value !== previousValueRef.current) {
      onChange(value as T)
      previousValueRef.current = value
    }
  }, [value, isControlled, onChange])

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      if (isControlled) {
        const setter = nextValue as (prev: T) => T
        const value =
          typeof nextValue === 'function' ? setter(prop as T) : nextValue
        if (value !== prop) onChange(value as T)
      } else {
        setUncontrolledProp(nextValue as T | undefined)
      }
    },
    [isControlled, prop, onChange]
  )

  return [value, setValue] as const
}
