// Foundational Components
export { Button, buttonVariants } from './components/Button'
export type { ButtonProps } from './components/Button'

export { Input, inputVariants } from './components/Input'
export type { InputProps } from './components/Input'

export { Textarea } from './components/Textarea'
export type { TextareaProps } from './components/Textarea'

// Form Components
export { Checkbox } from './components/Checkbox'
export type { CheckboxProps } from './components/Checkbox'

export { Switch } from './components/Switch'
export type { SwitchProps } from './components/Switch'

export { Select } from './components/Select'
export type { SelectProps, SelectOption } from './components/Select'

// Interactive Components
export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from './components/Modal'
export type { ModalProps } from './components/Modal'

export { ToastProvider, useToast, toast } from './components/Toast'
export type { Toast } from './components/Toast'

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
export type { TabsProps, TabsTriggerProps, TabsContentProps } from './components/Tabs'

export { Tooltip } from './components/Tooltip'
export type { TooltipProps } from './components/Tooltip'

// Data Display
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from './components/Card'
export type { CardProps } from './components/Card'

export { Badge, badgeVariants } from './components/Badge'
export type { BadgeProps } from './components/Badge'

export { Avatar, avatarVariants } from './components/Avatar'
export type { AvatarProps } from './components/Avatar'

// Utilities
export { cn } from './utils/cn'
export type {
  PolymorphicComponentProps,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from './utils/polymorphic'

// Hooks
export {
  useMediaQuery,
  useClickOutside,
  useDisclosure,
  useControllableState,
} from './hooks'
export type {
  UseDisclosureReturn,
  UseControllableStateProps,
} from './hooks'
