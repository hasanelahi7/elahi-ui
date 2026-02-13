import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'danger',
        'success',
        'warning',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button leftIcon={<span>👈</span>}>Left Icon</Button>
      <Button rightIcon={<span>👉</span>}>Right Icon</Button>
      <Button leftIcon={<span>🚀</span>} rightIcon={<span>✨</span>}>
        Both Icons
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button loading>Loading</Button>
      <Button loading variant="outline">
        Processing
      </Button>
      <Button loading variant="danger">
        Deleting
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled variant="danger">
        Disabled Danger
      </Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline">
        Full Width Outline
      </Button>
    </div>
  ),
}

export const RoundedVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button rounded="none">No Radius</Button>
      <Button rounded="sm">Small</Button>
      <Button rounded="md">Medium</Button>
      <Button rounded="lg">Large</Button>
      <Button rounded="xl">Extra Large</Button>
      <Button rounded="full">Full Rounded</Button>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button as="a" href="https://example.com" target="_blank">
        External Link
      </Button>
      <Button as="a" href="/about" variant="outline">
        Internal Link
      </Button>
    </div>
  ),
}
