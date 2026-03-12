# Huridocs Challenge

This repository is a Bun-powered monorepo for a small content browser built with TanStack Start, React, and shared workspace packages.

The app renders posts, users, and comments through domain-level server functions, shared UI components, and a public mock API.

## What is in this repo

- `apps/web`: the web application.
- `packages/domains`: business logic, schemas, server adapters, and domain UI.
- `packages/ds`: shared design-system components and hooks.
- `public`: static assets served by the web app.
- `scripts`: shared test setup and Vitest configuration helpers.

## Tech stack

- Bun workspaces
- React 19
- TanStack Start
- TanStack Router
- TanStack Query
- Vite
- Vitest
- Biome
- Tailwind CSS 4
- Zod

## Prerequisites

- Bun `1.3.10` or newer

Check your version:

```bash
bun --version
```

## Install dependencies

From the repository root:

```bash
bun install
```

## Run the app locally

Start the development server from the repository root:

```bash
bun run dev
```

The web app runs on:

```text
http://localhost:3000
```

## Development commands

Run these from the repository root unless noted otherwise.

### Main workflow

```bash
bun run dev
bun run build
bun run typecheck
bun run verify
```

## How the app is organized

### `apps/web`

This is the application shell. It provides:

- file-based routes through TanStack Router
- the main layout, header, footer, and devtools shell
- route loaders that call domain-level server functions

Important routes:

- `/`: homepage with a searchable post listing UI
- `/posts`: post listing page
- `/posts/:id`: post detail page with related posts and comments
- `/users/:id`: user detail page

### `packages/domains`

This package contains the application logic grouped by domain:

- `app`: shared environment config, metadata, pagination schema, middleware
- `posts`: post schemas, server adapters, hooks, and UI
- `users`: user schemas, server adapters, functions, and UI
- `comments`: comment schemas, server adapters, functions, and UI

Patterns used here:

- schemas are validated with Zod
- server actions are exposed through TanStack Start `createServerFn`
- fetch adapters call a public mock API and normalize the result

### `packages/ds`

This is the design system package. It provides:

- reusable UI primitives such as buttons, inputs, avatars, and pagination
- shared hooks and utility helpers
- DOM-focused component tests

## Quick command reference

```bash
# install
bun install

# app dev server
bun run dev

# production build
bun run build

# lint/format checks
bun run verify

# types
bun run typecheck

# tests in watch mode
bun run test

# tests once
bunx vitest run --config vitest.config.ts

# storybook
bun run storybook
```