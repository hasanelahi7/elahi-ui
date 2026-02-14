# elahi-ui

A modern, accessible React component library built with TypeScript and Tailwind CSS.

[![NPM Version](https://img.shields.io/npm/v/elahi-ui.svg)](https://www.npmjs.com/package/elahi-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **15 Production-Ready Components** - Modern, clean UI components
- **Full TypeScript Support** - Complete type safety and IntelliSense
- **Accessibility First** - WCAG compliant with proper ARIA attributes
- **Dark Mode Built-in** - Seamless theme switching
- **Tree-Shakeable** - Only import what you need
- **Custom Hooks** - Reusable hooks for common patterns
- **Tailwind Preset Included** - Easy setup with pre-configured theme

## Requirements

- React 18+
- Tailwind CSS 3.4+

## Installation

```bash
npm install elahi-ui
```

You'll also need Tailwind CSS (if you don't have it already):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Quick Start

### 1. Configure Tailwind CSS

**Option A: Using Preset (Recommended)**

Import the elahi-ui Tailwind preset in your `tailwind.config.js` and ensure Tailwind scans the library's files for classes:

```js
import elahiPreset from 'elahi-ui/tailwind'

export default {
  presets: [elahiPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/elahi-ui/dist/**/*.{js,mjs}', // Make sure to include elahi-ui
  ],
  // Your custom config here
}
```

**Option B: Manual Configuration**

Add elahi-ui to your content array and extend your theme:

```js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/elahi-ui/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... see tailwind.preset.js for full config
      },
    },
  },
}
```

### 2. Import Styles

Add the CSS variables to your app:

```tsx
// In your main.tsx or App.tsx
import 'elahi-ui/styles'
```

Ensure Tailwind directives are in your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Use Components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'elahi-ui'

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to elahi-ui</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Components

### Core Components
- **Button** - Variants, sizes, loading states, ripple effects
- **Input** - Floating labels, prefix/suffix icons, validation
- **Textarea** - Auto-resize, character count
- **Checkbox** - Accessible with labels
- **Switch** - Toggle switches
- **Select** - Dropdown with search

### Data Display
- **Card** - Flexible card with compound pattern
- **Badge** - Status indicators
- **Avatar** - User avatars with status
- **Table** - Sorting, pagination, expandable rows
- **Tabs** - Tabbed interfaces

### Feedback
- **Toast** - Toast notifications
- **Modal** - Dialogs and modals
- **Tooltip** - Hover tooltips

## Custom Hooks

```tsx
import {
  useMediaQuery,
  useClickOutside,
  useDisclosure,
  useRipple,
  useFocusTrap,
} from 'elahi-ui'

const isMobile = useMediaQuery('(max-width: 768px)')
const { isOpen, open, close, toggle } = useDisclosure()
```

## Theming

### Dark Mode

```tsx
<html className="dark">
  <body>{/* Your app */}</body>
</html>
```

### Customize Colors

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

## Development

```bash
npm install
npm run storybook  # View components at localhost:6006
npm run build      # Build library
```

## License

MIT © Hasan Elahi

---

Made with ❤️ by Hasan Elahi