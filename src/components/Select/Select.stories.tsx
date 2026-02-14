import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
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
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
]

export const Default: Story = {
  render: function DefaultStory() {
    const [value, setValue] = useState('')
    return (
      <Select
        options={countries}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
      />
    )
  },
  args: {},
}

export const WithLabel: Story = {
  render: function WithLabelStory() {
    const [value, setValue] = useState('')
    return (
      <Select
        label="Country"
        options={countries}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
      />
    )
  },
  args: {},
}

export const Searchable: Story = {
  render: function SearchableStory() {
    const [value, setValue] = useState('')
    return (
      <Select
        label="Country"
        options={countries}
        value={value}
        onChange={setValue}
        placeholder="Search countries..."
        searchable
      />
    )
  },
  args: {},
}

export const WithHelperText: Story = {
  render: function WithHelperTextStory() {
    const [value, setValue] = useState('')
    return (
      <Select
        label="Country"
        options={countries}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
        helperText="Choose your country of residence"
      />
    )
  },
  args: {},
}

export const WithError: Story = {
  render: function WithErrorStory() {
    const [value, setValue] = useState('')
    return (
      <Select
        label="Country"
        options={countries}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
        error="Country is required"
      />
    )
  },
  args: {},
}

export const Disabled: Story = {
  render: () => (
    <Select
      label="Country"
      options={countries}
      placeholder="Select a country"
      disabled
    />
  ),
  args: {},
}

export const PreSelected: Story = {
  render: function PreSelectedStory() {
    const [value, setValue] = useState('us')
    return (
      <Select
        label="Country"
        options={countries}
        value={value}
        onChange={setValue}
      />
    )
  },
  args: {},
}

export const WithDisabledOptions: Story = {
  render: function WithDisabledOptionsStory() {
    const [value, setValue] = useState('')
    const optionsWithDisabled = [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom', disabled: true },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia', disabled: true },
      { value: 'de', label: 'Germany' },
    ]
    return (
      <Select
        label="Country"
        options={optionsWithDisabled}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
      />
    )
  },
  args: {},
}
