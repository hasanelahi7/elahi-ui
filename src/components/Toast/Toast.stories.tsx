import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './Toast'
import { Button } from '../Button'

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta

const ToastDemo = () => {
  const { addToast } = useToast()

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          addToast({
            title: 'Success!',
            description: 'Your changes have been saved.',
            variant: 'success',
          })
        }
      >
        Show Success Toast
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          addToast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'error',
          })
        }
      >
        Show Error Toast
      </Button>
      <Button
        variant="warning"
        onClick={() =>
          addToast({
            title: 'Warning',
            description: 'This action requires confirmation.',
            variant: 'warning',
          })
        }
      >
        Show Warning Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          addToast({
            title: 'Info',
            description: 'New updates are available.',
            variant: 'info',
          })
        }
      >
        Show Info Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          addToast({
            title: 'Notification',
            description: 'This is a default notification.',
            variant: 'default',
          })
        }
      >
        Show Default Toast
      </Button>
    </div>
  )
}

export const AllVariants: StoryObj = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {},
}

const TitleOnlyDemo = () => {
  const { addToast } = useToast()

  return (
    <Button
      onClick={() =>
        addToast({
          title: 'Saved!',
          variant: 'success',
        })
      }
    >
      Show Title Only
    </Button>
  )
}

export const TitleOnly: StoryObj = {
  render: () => (
    <ToastProvider>
      <TitleOnlyDemo />
    </ToastProvider>
  ),
  args: {},
}

const CustomDurationDemo = () => {
  const { addToast } = useToast()

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          addToast({
            title: '2 second toast',
            description: 'This will disappear in 2 seconds',
            variant: 'info',
            duration: 2000,
          })
        }
      >
        2 Seconds
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: '10 second toast',
            description: 'This will stay for 10 seconds',
            variant: 'success',
            duration: 10000,
          })
        }
      >
        10 Seconds
      </Button>
      <Button
        onClick={() =>
          addToast({
            title: 'Permanent toast',
            description: 'This will not auto-dismiss',
            variant: 'warning',
            duration: 0,
          })
        }
      >
        No Auto-Dismiss
      </Button>
    </div>
  )
}

export const CustomDuration: StoryObj = {
  render: () => (
    <ToastProvider>
      <CustomDurationDemo />
    </ToastProvider>
  ),
  args: {},
}

const MultipleToastsDemo = () => {
  const { addToast } = useToast()

  const showMultiple = () => {
    addToast({
      title: 'First toast',
      description: 'This is the first notification',
      variant: 'success',
    })
    setTimeout(() => {
      addToast({
        title: 'Second toast',
        description: 'This is the second notification',
        variant: 'info',
      })
    }, 500)
    setTimeout(() => {
      addToast({
        title: 'Third toast',
        description: 'This is the third notification',
        variant: 'warning',
      })
    }, 1000)
  }

  return <Button onClick={showMultiple}>Show Multiple Toasts</Button>
}

export const MultipleToasts: StoryObj = {
  render: () => (
    <ToastProvider>
      <MultipleToastsDemo />
    </ToastProvider>
  ),
  args: {},
}
