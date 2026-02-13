# Getting Started with elahi-ui Development

Welcome to **elahi-ui** - a modern, accessible React component library built with TypeScript and Tailwind CSS!

## What's Been Built

### Project Structure

```
elahi-ui/
├── src/
│   ├── components/
│   │   ├── Button/          ✅ Complete with ripple effects
│   │   ├── Input/           ✅ Floating labels, validation
│   │   ├── Textarea/        ✅ Auto-resize, character count
│   │   ├── Typography/      ✅ Heading, Text, Label, Code
│   │   ├── Layout/          ✅ Container, Grid, Flex, Stack, Spacer
│   │   ├── Checkbox/        ✅ Accessible with Radix UI
│   │   ├── Switch/          ✅ Toggle with animations
│   │   ├── Card/            ✅ Compound component pattern
│   │   ├── Badge/           ✅ Status indicators
│   │   └── Avatar/          ✅ With status indicators
│   ├── hooks/               ✅ 4 custom hooks
│   ├── utils/               ✅ cn(), polymorphic types
│   ├── styles/              ✅ Global CSS with design tokens
│   └── index.ts             ✅ Main exports
├── .storybook/              ✅ Configured and ready
├── Configuration files      ✅ All set up
└── README.md                ✅ Comprehensive docs
```

### Components Implemented (20+)

#### Foundational (3)
- **Button** - 8 variants, 6 sizes, loading states, ripple effects, polymorphic
- **Input** - 3 variants, floating labels, prefix/suffix icons, validation states
- **Textarea** - Auto-resize, character counter

#### Typography (4)
- **Heading** - Responsive sizes, gradient text option, polymorphic (h1-h6)
- **Text** - Multiple sizes, colors, truncation, line clamping
- **Label** - Form labels with required indicator
- **Code** - Inline code snippets with variants

#### Layout (5)
- **Container** - Responsive max-width containers
- **Grid** - CSS Grid with responsive columns
- **Flex** - Flexbox with full control
- **Stack** - Vertical/horizontal stacking with dividers
- **Spacer** - Flexible spacing component

#### Form Components (3)
- **Checkbox** - Radix UI based, accessible
- **Switch** - Toggle with smooth animations
- **Textarea** - Already listed above

#### Data Display (3)
- **Card** - Compound components (Header, Title, Content, Footer)
- **Badge** - Status indicators with dot variant
- **Avatar** - Images with fallback and status indicators

### Hooks Implemented (4)

- **useMediaQuery** - Responsive behavior
- **useClickOutside** - Click detection outside elements
- **useDisclosure** - Open/close state management
- **useControllableState** - Controlled/uncontrolled component pattern

### Utilities

- **cn()** - Class name merger with Tailwind conflict resolution
- **Polymorphic types** - For creating flexible components

## Quick Start Commands

### 1. View Components in Storybook

```bash
npm run storybook
```

This will open Storybook at `http://localhost:6006` where you can:
- See all components with interactive controls
- Test different variants and states
- View accessibility features
- Copy code examples

### 2. Run Development Server

```bash
npm run dev
```

Opens a dev preview at `http://localhost:5173`

### 3. Build the Library

```bash
npm run build
```

Creates production-ready builds:
- ESM modules in `dist/`
- CommonJS in `dist/`
- TypeScript definitions in `dist/types/`

### 4. Type Check

```bash
npm run type-check
```

Validates all TypeScript types (currently passing!)

### 5. Lint & Format

```bash
npm run lint
npm run format
```

## Next Steps - Expand the Library

### Phase 1: More Form Components (Recommended Next)

Create these components to have a complete form library:

1. **Radio** - Radio button groups
2. **Select** - Dropdown select (use Radix UI Select)
3. **Slider** - Range slider (use Radix UI Slider)
4. **DatePicker** - Date selection (use react-day-picker)
5. **ColorPicker** - Color selection
6. **FileUpload** - Drag-and-drop file uploads

### Phase 2: Feedback Components

1. **Toast** - Notifications (use Radix UI Toast)
2. **Modal/Dialog** - Dialogs (use Radix UI Dialog)
3. **Alert** - Alert messages (use Radix UI Alert Dialog)
4. **Progress** - Progress bars (use Radix UI Progress)
5. **Skeleton** - Loading skeletons
6. **Spinner** - Loading spinners

### Phase 3: Navigation

1. **Tabs** - Tabbed interfaces (use Radix UI Tabs)
2. **Accordion** - Collapsible sections (use Radix UI Accordion)
3. **Dropdown Menu** - Dropdown menus (use Radix UI Dropdown)
4. **Breadcrumb** - Navigation breadcrumbs
5. **Pagination** - Page navigation
6. **Navbar** - Navigation bar
7. **Sidebar** - Collapsible sidebar

### Phase 4: Data Display

1. **Table** - Data tables with sorting, pagination
2. **Tooltip** - Tooltips (use Radix UI Tooltip)
3. **Popover** - Popovers (use Radix UI Popover)

### Phase 5: Innovative Components

1. **CommandPalette** - Cmd+K menu (use cmdk)
2. **Timeline** - Event timelines
3. **CodeEditor** - Syntax highlighted editor
4. **TreeView** - Hierarchical trees
5. **VirtualList** - Virtualized lists
6. **Confetti** - Celebration effects

## Development Tips

### Creating a New Component

1. Create folder: `src/components/ComponentName/`
2. Create files:
   - `ComponentName.tsx` - Main component
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.ts` - Exports

3. Use this template:

```tsx
import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const componentVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'classes',
    },
    size: {
      sm: 'classes',
      md: 'classes',
      lg: 'classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Custom props
}

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Component.displayName = 'Component'
```

4. Add Storybook story:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Component } from './Component'

const meta = {
  title: 'Components/Component',
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Component content',
  },
}
```

5. Export in `src/index.ts`

### Using Radix UI

Most interactive components are built on Radix UI for accessibility:

```tsx
import * as Dialog from '@radix-ui/react-dialog'

// Wrap with your styles
export const Modal = ({ children, ...props }) => (
  <Dialog.Root {...props}>
    <Dialog.Portal>
      <Dialog.Overlay className="..." />
      <Dialog.Content className="...">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
```

### Design Tokens

All colors use CSS variables defined in `src/styles/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --success: 142 71% 45%;
  /* etc */
}
```

Use in Tailwind: `bg-primary`, `text-success`, etc.

## Testing

The library includes Vitest for testing:

```bash
npm test          # Run tests
npm run test:ui   # Visual test UI
npm run test:coverage  # Coverage report
```

Example test:

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

## Publishing to NPM

When ready to publish:

1. Update version in `package.json`
2. Build: `npm run build`
3. Test locally: `npm link`
4. Publish: `npm publish`

## Storybook Deployment

Deploy to Vercel/Netlify:

```bash
npm run build-storybook
# Upload storybook-static/ folder
```

## What Makes This Library Special

✅ **Full TypeScript** - Strict mode, complete type safety
✅ **Accessible** - Built on Radix UI primitives
✅ **Polymorphic** - Render components as any HTML element
✅ **Tree-shakeable** - Only import what you need
✅ **Dark mode** - Built-in with CSS variables
✅ **Responsive** - Mobile-first design
✅ **Animations** - Smooth transitions with Framer Motion
✅ **Well documented** - Storybook + JSDoc comments
✅ **Production ready** - Proper build setup for npm

## Resources

- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [class-variance-authority](https://cva.style/docs)

Happy coding! Build amazing components! 🚀
