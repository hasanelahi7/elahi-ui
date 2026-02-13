import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
}

export const FloatingLabel: Story = {
  args: {
    label: 'Username',
    floatingLabel: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Input variant="outlined" label="Outlined" placeholder="Outlined input" />
      <Input variant="filled" label="Filled" placeholder="Filled input" />
      <Input
        variant="underlined"
        label="Underlined"
        placeholder="Underlined input"
      />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input" />
      <Input inputSize="lg" placeholder="Large input" />
    </div>
  ),
}

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="space-y-4">
      <Input prefix={<span>🔍</span>} placeholder="Search..." />
      <Input suffix={<span>@</span>} placeholder="Username" />
      <Input
        prefix={<span>$</span>}
        suffix={<span>.00</span>}
        placeholder="0"
        type="number"
      />
    </div>
  ),
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
}

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    maxLength: 100,
    showCount: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit this',
    disabled: true,
    value: 'Disabled value',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Default" placeholder="Default state" />
      <Input
        label="Error"
        error="This field is required"
        value="invalid"
      />
      <Input
        label="Success"
        state="success"
        value="valid@example.com"
      />
      <Input
        label="Disabled"
        disabled
        value="Cannot edit"
      />
    </div>
  ),
}
