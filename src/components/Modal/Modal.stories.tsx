import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from './Modal'
import { Button } from '../Button'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: function DefaultStory() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
          <p className="text-muted-foreground">
            This is a simple modal dialog. Click the X button, press ESC, or click
            outside to close.
          </p>
        </Modal>
      </>
    )
  },
  args: {},
}

export const WithCompoundComponents: Story = {
  render: function WithCompoundComponentsStory() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader>
            <ModalTitle>Delete Account</ModalTitle>
            <ModalDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>
              Delete Account
            </Button>
          </ModalFooter>
        </Modal>
      </>
    )
  },
  args: {},
}

export const SmallSize: Story = {
  render: function SmallSizeStory() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <ModalHeader>
            <ModalTitle>Small Modal</ModalTitle>
          </ModalHeader>
          <p>This is a small modal.</p>
        </Modal>
      </>
    )
  },
  args: {},
}

export const LargeSize: Story = {
  render: function LargeSizeStory() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <ModalHeader>
            <ModalTitle>Large Modal</ModalTitle>
          </ModalHeader>
          <p>
            This is a large modal with more content. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
        </Modal>
      </>
    )
  },
  args: {},
}

export const NoCloseButton: Story = {
  render: function NoCloseButtonStory() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} showClose={false}>
          <ModalHeader>
            <ModalTitle>No Close Button</ModalTitle>
          </ModalHeader>
          <p className="mb-4">This modal has no close button in the corner.</p>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  },
  args: {},
}

export const PreventClose: Story = {
  render: function PreventCloseStory() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} preventClose>
          <ModalHeader>
            <ModalTitle>Cannot Close Outside</ModalTitle>
            <ModalDescription>
              This modal cannot be closed by clicking outside or pressing ESC.
              You must use the button.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  },
  args: {},
}

export const WithForm: Story = {
  render: function WithFormStory() {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader>
            <ModalTitle>Create New Project</ModalTitle>
            <ModalDescription>
              Enter the details for your new project below.
            </ModalDescription>
          </ModalHeader>
          <div className="space-y-4 my-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-input px-3 py-2"
                placeholder="My Project"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full rounded-md border border-input px-3 py-2"
                rows={3}
                placeholder="Project description..."
              />
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Create Project</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  },
  args: {},
}
