import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  ),
  args: {},
}

export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-20">
      <Tooltip content="Tooltip on top" position="top">
        <Button>Top</Button>
      </Tooltip>
      <div className="flex gap-20">
        <Tooltip content="Tooltip on left" position="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" position="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
  args: {},
}

export const OnText: Story = {
  render: () => (
    <p className="max-w-md">
      You can add tooltips to{' '}
      <Tooltip content="This word has a tooltip">
        <span className="underline decoration-dotted cursor-help">any text</span>
      </Tooltip>{' '}
      in your content. Hover over the underlined word to see it.
    </p>
  ),
  args: {},
}

export const OnIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Information">
        <button className="rounded-full p-2 hover:bg-accent">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Settings">
        <button className="rounded-full p-2 hover:bg-accent">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l-4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m-6 0l-4.2 4.2" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete">
        <button className="rounded-full p-2 hover:bg-accent">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
  args: {},
}

export const CustomDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="No delay" delay={0}>
        <Button variant="outline">Instant (0ms)</Button>
      </Tooltip>
      <Tooltip content="Default delay" delay={200}>
        <Button variant="outline">Default (200ms)</Button>
      </Tooltip>
      <Tooltip content="Long delay" delay={1000}>
        <Button variant="outline">Slow (1000ms)</Button>
      </Tooltip>
    </div>
  ),
  args: {},
}

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip message that explains something in more detail. It can wrap to multiple lines if needed.">
      <Button>Hover for long tooltip</Button>
    </Tooltip>
  ),
  args: {},
}

export const OnDisabledElement: Story = {
  render: () => (
    <Tooltip content="This button is disabled">
      <span className="inline-block">
        <Button disabled>Disabled Button</Button>
      </span>
    </Tooltip>
  ),
  args: {},
}
