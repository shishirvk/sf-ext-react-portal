# Customer Portal UI Bundle

The React app for the customer portal. It includes authentication, global search, and a modular structure. Built with React, Vite, TypeScript, and Tailwind/shadcn.

- **Install and deploy:** see the [project README](../../../../../../README.md).
- **Add a feature:** see [Module architecture](MODULES.md).
- **Apply corporate styling:** see the [custom styling guide](../../../../../../docs/custom-styling.md).

## Prerequisites

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Starts the Vite dev server (default: http://localhost:5173).

## Build

```bash
npm run build
```

Writes the production bundle to `dist/` inside the UI Bundle folder.

## Test

```bash
npm test
```

Runs the unit test suite (Vitest), including the checks on module boundaries and duplicate routes. Use `npx vitest run` for a single run.
