import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
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
    checked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Airplane Mode
      </label>
    </div>
  ),
  args: {},
}

export const Settings: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="notifications" className="text-sm font-medium">
            Notifications
          </label>
          <p className="text-sm text-muted-foreground">
            Receive push notifications
          </p>
        </div>
        <Switch id="notifications" defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="marketing" className="text-sm font-medium">
            Marketing Emails
          </label>
          <p className="text-sm text-muted-foreground">
            Receive promotional emails
          </p>
        </div>
        <Switch id="marketing" />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="analytics" className="text-sm font-medium">
            Analytics
          </label>
          <p className="text-sm text-muted-foreground">
            Help us improve by sharing data
          </p>
        </div>
        <Switch id="analytics" defaultChecked />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="beta" className="text-sm font-medium text-muted-foreground">
            Beta Features
          </label>
          <p className="text-sm text-muted-foreground">
            Coming soon
          </p>
        </div>
        <Switch id="beta" disabled />
      </div>
    </div>
  ),
  args: {},
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input h-5 w-9" />
      <Switch />
      <Switch className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input h-7 w-12" />
    </div>
  ),
  args: {},
}

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Switch defaultChecked />
        <label className="text-sm">Primary (default)</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked
          className="data-[state=checked]:bg-success"
        />
        <label className="text-sm">Success</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked
          className="data-[state=checked]:bg-warning"
        />
        <label className="text-sm">Warning</label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          defaultChecked
          className="data-[state=checked]:bg-destructive"
        />
        <label className="text-sm">Danger</label>
      </div>
    </div>
  ),
  args: {},
}

export const FormExample: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Privacy Settings</h3>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <label htmlFor="profile" className="text-sm font-medium">
              Public Profile
            </label>
            <p className="text-xs text-muted-foreground">
              Allow others to see your profile information
            </p>
          </div>
          <Switch id="profile" defaultChecked />
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <label htmlFor="activity" className="text-sm font-medium">
              Activity Status
            </label>
            <p className="text-xs text-muted-foreground">
              Show when you're online
            </p>
          </div>
          <Switch id="activity" defaultChecked />
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-0.5">
            <label htmlFor="messages" className="text-sm font-medium">
              Direct Messages
            </label>
            <p className="text-xs text-muted-foreground">
              Allow anyone to send you messages
            </p>
          </div>
          <Switch id="messages" />
        </div>
      </div>
    </div>
  ),
  args: {},
}
