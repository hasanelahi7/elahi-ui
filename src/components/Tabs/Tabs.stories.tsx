import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md mt-2">
          <h3 className="font-semibold mb-2">Account Information</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account details and preferences here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md mt-2">
          <h3 className="font-semibold mb-2">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Update your password and security settings.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md mt-2">
          <h3 className="font-semibold mb-2">General Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure your application preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {},
}

export const WithForm: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-input px-3 py-2"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-input px-3 py-2"
              placeholder="your@email.com"
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-input px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-input px-3 py-2"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {},
}

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
        <TabsTrigger value="tab4">Settings</TabsTrigger>
        <TabsTrigger value="tab5">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md mt-2">Overview content</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md mt-2">Analytics content</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md mt-2">Reports content</div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="p-4 border rounded-md mt-2">Settings content</div>
      </TabsContent>
      <TabsContent value="tab5">
        <div className="p-4 border rounded-md mt-2">Security content</div>
      </TabsContent>
    </Tabs>
  ),
  args: {},
}

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Another Active</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md mt-2">
          This tab is active and clickable.
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md mt-2">
          This content won't show because the tab is disabled.
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md mt-2">
          This tab is also active and clickable.
        </div>
      </TabsContent>
    </Tabs>
  ),
  args: {},
}
