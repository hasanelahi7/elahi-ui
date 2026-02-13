import React from 'react'

/**
 * Utility types for creating polymorphic components
 * Allows components to be rendered as different HTML elements via the 'as' prop
 *
 * @example
 * const Button = <C extends React.ElementType = 'button'>({
 *   as,
 *   ...props
 * }: PolymorphicComponentProps<C>) => {
 *   const Component = as || 'button'
 *   return <Component {...props} />
 * }
 *
 * <Button>Regular button</Button>
 * <Button as="a" href="/link">Link styled as button</Button>
 */

export type AsProp<C extends React.ElementType> = {
  as?: C
}

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = object
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }
