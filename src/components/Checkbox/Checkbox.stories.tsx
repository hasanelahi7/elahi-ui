import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
  args: {},
}

export const MultipleOptions: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" defaultChecked />
        <label htmlFor="option1" className="text-sm font-medium">
          Email notifications
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" />
        <label htmlFor="option2" className="text-sm font-medium">
          SMS notifications
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" />
        <label htmlFor="option3" className="text-sm font-medium">
          Push notifications
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option4" disabled />
        <label htmlFor="option4" className="text-sm font-medium text-muted-foreground">
          Desktop notifications (unavailable)
        </label>
      </div>
    </div>
  ),
  args: {},
}

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-[300px]">
      <div>
        <h3 className="mb-3 text-sm font-medium">Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox id="marketing" />
            <div className="grid gap-1">
              <label htmlFor="marketing" className="text-sm font-medium">
                Marketing emails
              </label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products and features.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="security" defaultChecked />
            <div className="grid gap-1">
              <label htmlFor="security" className="text-sm font-medium">
                Security emails
              </label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account security.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="updates" defaultChecked />
            <div className="grid gap-1">
              <label htmlFor="updates" className="text-sm font-medium">
                Product updates
              </label>
              <p className="text-sm text-muted-foreground">
                Receive emails about updates and new features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  ),
  args: {},
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox className="h-4 w-4" />
      <Checkbox className="h-5 w-5" />
      <Checkbox className="h-6 w-6" />
    </div>
  ),
  args: {},
}
