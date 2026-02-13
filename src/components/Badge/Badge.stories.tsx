import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  args: {},
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  args: {},
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Verified
      </Badge>
      <Badge variant="warning">
        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Warning
      </Badge>
      <Badge variant="destructive">
        <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        Error
      </Badge>
    </div>
  ),
  args: {},
}

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
        Active
      </Badge>
      <Badge variant="warning">
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
        Pending
      </Badge>
      <Badge variant="destructive">
        <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
        Inactive
      </Badge>
    </div>
  ),
  args: {},
}

export const Numbers: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative inline-block">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Messages
        </button>
        <Badge className="absolute -top-2 -right-2" variant="destructive">
          3
        </Badge>
      </div>
      <div className="relative inline-block">
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Notifications
        </button>
        <Badge className="absolute -top-2 -right-2" variant="destructive">
          99+
        </Badge>
      </div>
    </div>
  ),
  args: {},
}

export const InText: Story = {
  render: () => (
    <p className="text-sm">
      This feature is{' '}
      <Badge variant="success" size="sm">
        New
      </Badge>{' '}
      and available in the{' '}
      <Badge variant="default" size="sm">
        Pro
      </Badge>{' '}
      plan.
    </p>
  ),
  args: {},
}
