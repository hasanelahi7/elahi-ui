import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message here',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    helperText: 'Brief description for your profile (max 200 characters)',
  },
}

export const WithError: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Add a comment',
    error: 'Comment is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'This textarea is disabled',
  },
}

export const WithRows: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Textarea label="Small (2 rows)" rows={2} placeholder="Short textarea" />
      <Textarea label="Medium (4 rows)" rows={4} placeholder="Medium textarea" />
      <Textarea label="Large (8 rows)" rows={8} placeholder="Large textarea" />
    </div>
  ),
  args: {},
}

export const MaxLength: Story = {
  render: function MaxLengthStory() {
    const maxLength = 150
    const [value, setValue] = useState('')

    return (
      <div className="w-[400px]">
        <Textarea
          label="Tweet"
          placeholder="What's happening?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          helperText={`${value.length}/${maxLength} characters`}
        />
      </div>
    )
  },
  args: {},
}

export const FormExample: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <h3 className="text-lg font-semibold">Contact Form</h3>
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          className="w-full rounded-md border border-input px-3 py-2 text-sm"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full rounded-md border border-input px-3 py-2 text-sm"
          placeholder="your@email.com"
        />
      </div>
      <Textarea
        label="Message"
        placeholder="How can we help you?"
        rows={5}
        helperText="Please provide as much detail as possible"
      />
      <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        Send Message
      </button>
    </div>
  ),
  args: {},
}

export const Resizable: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Textarea
        label="Vertical Resize"
        placeholder="Can be resized vertically"
        className="resize-y"
        rows={3}
      />
      <Textarea
        label="Horizontal Resize"
        placeholder="Can be resized horizontally"
        className="resize-x"
        rows={3}
      />
      <Textarea
        label="Both Directions"
        placeholder="Can be resized in both directions"
        className="resize"
        rows={3}
      />
      <Textarea
        label="No Resize (default)"
        placeholder="Cannot be resized"
        rows={3}
      />
    </div>
  ),
  args: {},
}

export const AutoGrow: Story = {
  render: function AutoGrowStory() {
    const [value, setValue] = useState('')

    return (
      <div className="w-[400px]">
        <Textarea
          label="Auto-growing Textarea"
          placeholder="Start typing and watch it grow..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = e.target.scrollHeight + 'px'
          }}
          helperText="This textarea grows as you type"
          className="min-h-[80px]"
        />
      </div>
    )
  },
  args: {},
}
