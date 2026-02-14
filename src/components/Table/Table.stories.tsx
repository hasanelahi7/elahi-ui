import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'
import { Badge } from '../Badge'
import { Button } from '../Button'

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof Table>

// Sample data
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinedDate: string
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinedDate: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinedDate: '2024-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinedDate: '2024-03-10' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'pending', joinedDate: '2024-04-05' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'active', joinedDate: '2024-05-12' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'active', joinedDate: '2024-06-18' },
  { id: 7, name: 'Eve Davis', email: 'eve@example.com', role: 'User', status: 'inactive', joinedDate: '2024-07-22' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'active', joinedDate: '2024-08-30' },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', role: 'Admin', status: 'pending', joinedDate: '2024-09-14' },
  { id: 10, name: 'Henry Wilson', email: 'henry@example.com', role: 'Editor', status: 'active', joinedDate: '2024-10-08' },
  { id: 11, name: 'Ivy Chen', email: 'ivy@example.com', role: 'User', status: 'active', joinedDate: '2024-11-03' },
  { id: 12, name: 'Jack Taylor', email: 'jack@example.com', role: 'User', status: 'inactive', joinedDate: '2024-12-01' },
]

const statusColors = {
  active: 'success',
  inactive: 'default',
  pending: 'warning',
} as const

const basicColumns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    accessor: (row: User) => (
      <Badge variant={statusColors[row.status]}>
        {row.status}
      </Badge>
    ),
  },
]

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers.slice(0, 5),
  },
}

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers.slice(0, 5),
    striped: true,
  },
}

export const SmallSize: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers.slice(0, 5),
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers.slice(0, 5),
    size: 'lg',
  },
}

export const Sortable: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      {
        key: 'status',
        header: 'Status',
        sortable: false,
        accessor: (row: User) => (
          <Badge variant={statusColors[row.status]}>
            {row.status}
          </Badge>
        ),
      },
    ],
    data: sampleUsers.slice(0, 8),
    sortable: true,
    defaultSortKey: 'name',
    defaultSortDirection: 'asc',
  },
}

export const WithPagination: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    pagination: true,
    pageSize: 5,
  },
}

export const SortableWithPagination: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      { key: 'joinedDate', header: 'Joined Date', sortable: true },
      {
        key: 'status',
        header: 'Status',
        sortable: false,
        accessor: (row: User) => (
          <Badge variant={statusColors[row.status]}>
            {row.status}
          </Badge>
        ),
      },
    ],
    data: sampleUsers,
    sortable: true,
    pagination: true,
    pageSize: 5,
    defaultSortKey: 'name',
  },
}

export const ExpandableRows: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    data: sampleUsers.slice(0, 5),
    expandable: true,
    renderExpanded: (row: User) => (
      <div className="space-y-2 p-4 bg-background rounded">
        <h4 className="font-semibold">Additional Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">User ID:</span> {row.id}
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>{' '}
            <Badge variant={statusColors[row.status]}>{row.status}</Badge>
          </div>
          <div>
            <span className="text-muted-foreground">Joined Date:</span> {row.joinedDate}
          </div>
          <div>
            <span className="text-muted-foreground">Role:</span> {row.role}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline">Edit</Button>
          <Button size="sm" variant="outline">Delete</Button>
        </div>
      </div>
    ),
  },
}

export const AllFeaturesCombined: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      {
        key: 'status',
        header: 'Status',
        sortable: false,
        accessor: (row: User) => (
          <Badge variant={statusColors[row.status]}>
            {row.status}
          </Badge>
        ),
      },
      { key: 'joinedDate', header: 'Joined', sortable: true },
    ],
    data: sampleUsers,
    sortable: true,
    pagination: true,
    pageSize: 5,
    expandable: true,
    striped: true,
    defaultSortKey: 'name',
    renderExpanded: (row: User) => (
      <div className="space-y-2 p-4 bg-background rounded">
        <h4 className="font-semibold">User Details for {row.name}</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">User ID:</span> {row.id}
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span> {row.email}
          </div>
          <div>
            <span className="text-muted-foreground">Role:</span> {row.role}
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>{' '}
            <Badge variant={statusColors[row.status]}>{row.status}</Badge>
          </div>
          <div>
            <span className="text-muted-foreground">Joined:</span> {row.joinedDate}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="primary">Edit User</Button>
          <Button size="sm" variant="outline">View Profile</Button>
          <Button size="sm" variant="danger">Delete</Button>
        </div>
      </div>
    ),
  },
}

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyMessage: 'No users found. Try adjusting your filters.',
  },
}

export const CustomColumnAlignment: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name', align: 'left' },
      { key: 'email', header: 'Email', align: 'left' },
      { key: 'role', header: 'Role', align: 'center' },
      {
        key: 'status',
        header: 'Status',
        align: 'center',
        accessor: (row: User) => (
          <Badge variant={statusColors[row.status]}>
            {row.status}
          </Badge>
        ),
      },
    ],
    data: sampleUsers.slice(0, 5),
  },
}

export const WithActions: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      {
        key: 'status',
        header: 'Status',
        accessor: (row: User) => (
          <Badge variant={statusColors[row.status]}>
            {row.status}
          </Badge>
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        align: 'right',
        accessor: () => (
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="ghost">Edit</Button>
            <Button size="sm" variant="ghost">Delete</Button>
          </div>
        ),
      },
    ],
    data: sampleUsers.slice(0, 5),
  },
}
