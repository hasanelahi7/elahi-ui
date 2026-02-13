import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'

// Demo App
function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-5xl font-bold text-transparent">
            elahi-ui
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            A modern, accessible React component library
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Getting Started</h2>
          <p className="mb-4 text-muted-foreground">
            This is a development preview. Run Storybook to see all components:
          </p>
          <code className="block rounded bg-muted p-4 font-mono text-sm">
            npm run storybook
          </code>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'TypeScript', emoji: '📘' },
            { title: 'Accessible', emoji: '♿' },
            { title: 'Dark Mode', emoji: '🌙' },
            { title: 'Tree-shakeable', emoji: '🌲' },
            { title: 'Customizable', emoji: '🎨' },
            { title: 'Well Tested', emoji: '✅' },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="text-3xl">{feature.emoji}</div>
              <h3 className="mt-2 font-semibold">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
