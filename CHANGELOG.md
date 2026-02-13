# Changelog

## v1.0.0 - Pure Tailwind CSS (Feb 12, 2026)

### 🎉 Initial Release - 100% Tailwind CSS Component Library

**17 Production-Ready Components:**

#### Foundational (3)
- **Button** - 8 variants, 6 sizes, loading states, ripple effects
- **Input** - Floating labels, prefix/suffix icons, validation
- **Textarea** - Auto-resize, character counter

#### Typography (4)
- **Heading** - Responsive sizes, gradient text, polymorphic
- **Text** - Sizes, colors, truncation, line clamping
- **Label** - Form labels with required indicator
- **Code** - Inline code snippets

#### Layout (5)
- **Container** - Responsive max-width
- **Grid** - Responsive grid layouts
- **Flex** - Flexbox utility
- **Stack** - Vertical/horizontal stacking
- **Spacer** - Flexible spacing

#### Forms (2)
- **Checkbox** - Pure Tailwind with custom checkmark
- **Switch** - CSS toggle with smooth animations

#### Data Display (3)
- **Card** - Compound component pattern
- **Badge** - Status indicators
- **Avatar** - Image with fallback and status

#### Hooks (4)
- `useMediaQuery` - Responsive behavior
- `useClickOutside` - Outside click detection
- `useDisclosure` - Open/close state
- `useControllableState` - Controlled/uncontrolled pattern

### 📦 Bundle Size
- **ESM:** 35KB (7.8KB gzipped)
- **CJS:** 20KB (6.3KB gzipped)

### 🎨 Tech Stack
- React 18
- TypeScript (strict mode)
- Tailwind CSS
- Vite
- Storybook 8
- Vitest

### ✨ Features
- 100% Pure Tailwind CSS (no third-party UI libraries)
- Full TypeScript support
- Tree-shakeable exports
- Dark mode built-in
- Polymorphic components
- Compound component patterns
- Modern animations
- Accessible by default

### 📝 No External Dependencies
Only 3 utility packages:
- `class-variance-authority` - Type-safe variants
- `clsx` - Conditional classes
- `tailwind-merge` - Class deduplication

**Removed 85 packages** from initial setup for a lean, maintainable codebase.
