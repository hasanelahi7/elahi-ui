import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    alt: 'John Doe',
  },
}

export const WithFallback: Story = {
  args: {
    alt: 'John Doe',
    fallback: 'JD',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar
        size="sm"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Small"
      />
      <Avatar
        size="md"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Medium"
      />
      <Avatar
        size="lg"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Large"
      />
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Extra Large"
      />
      <Avatar
        size="2xl"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="2X Large"
      />
    </div>
  ),
  args: {},
}

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        shape="circle"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Circle"
      />
      <Avatar
        shape="square"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Square"
      />
    </div>
  ),
  args: {},
}

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="Online"
        status="online"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        alt="Away"
        status="away"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        alt="Busy"
        status="busy"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
        alt="Offline"
        status="offline"
      />
    </div>
  ),
  args: {},
}

export const FallbackInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar alt="John Doe" />
      <Avatar alt="Jane Smith" />
      <Avatar alt="Robert Brown" />
      <Avatar fallback="AB" />
    </div>
  ),
  args: {},
}

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
        alt="User 1"
        className="ring-2 ring-background"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
        alt="User 2"
        className="ring-2 ring-background"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
        alt="User 3"
        className="ring-2 ring-background"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
        alt="User 4"
        className="ring-2 ring-background"
      />
      <Avatar
        fallback="+5"
        className="ring-2 ring-background"
      />
    </div>
  ),
  args: {},
}
