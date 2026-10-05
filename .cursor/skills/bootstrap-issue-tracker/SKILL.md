---
name: bootstrap-issue-tracker
description: Bootstrap a new Issue Tracker project with Next.js, TypeScript, Tailwind CSS, navy/yellow theme, modular architecture, and no .env files. Use when the user invokes /bootstrap-issue-tracker or asks to scaffold, bootstrap, or start a new Issue Tracker project.
disable-model-invocation: true
---

# Bootstrap Issue Tracker Project

## Before You Start

**Do not assume project scope.** Before writing feature code, confirm with the user what should be built in the current run. Present a short proposed scope (e.g., project scaffold only, or scaffold + specific features) and wait for approval.

## Tech Stack (Required)

| Requirement | Choice |
|-------------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Theme | Navy blue + yellow |
| Config | **No `.env` files** — use typed config modules instead |
| Architecture | Modular |
| UI | Mobile responsive |

## Bootstrap Steps

### 1. Scaffold the project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

If the directory is not empty, scaffold into a subfolder or ask the user how to proceed.

### 2. Modular folder structure

Use this layout under `src/`:

```
src/
├── app/                  # Routes, layouts, page shells only
├── components/
│   ├── ui/               # Reusable primitives (Button, Badge, Input, …)
│   └── issue-tracker/    # Feature-specific components
├── lib/                  # Shared utilities, constants, helpers
├── config/               # App config (replaces .env — see below)
├── types/                # Shared TypeScript types
├── hooks/                # Custom React hooks
└── services/             # Data access / API client logic
```

Rules:
- Pages stay thin; move logic into hooks, services, or components.
- Co-locate feature types in `types/` or next to the feature when small.
- Do not create `.env`, `.env.local`, or `.env.example`.

### 3. Theme — navy blue and yellow

Define tokens in `src/config/theme.ts` and extend Tailwind in `tailwind.config.ts`:

```ts
// src/config/theme.ts
export const theme = {
  colors: {
    navy: {
      DEFAULT: "#1e3a5f",
      light: "#2d5a8e",
      dark: "#0f2744",
    },
    accent: {
      DEFAULT: "#f5c518", // yellow
      light: "#fde047",
      dark: "#ca8a04",
    },
  },
} as const;
```

Apply in `globals.css` with CSS variables if helpful, and use Tailwind classes (`bg-navy`, `text-accent`, etc.) consistently.

### 4. Configuration without `.env`

Use `src/config/app.ts` for non-secret defaults:

```ts
export const appConfig = {
  appName: "Issue Tracker",
  apiBaseUrl: "/api",
} as const;
```

For values that would normally live in env vars, use typed config files or runtime-safe defaults. Never add `.env` files.

### 5. Responsive baseline

- Mobile-first Tailwind breakpoints (`sm:`, `md:`, `lg:`).
- Test layouts at ~375px width.
- Navigation, lists, and forms must work on small screens (stack vertically, touch-friendly targets ≥ 44px).

### 6. Issue Tracker foundation (scaffold only unless scope says otherwise)

Unless the user approves more, limit the first run to:

- [ ] Next.js + TypeScript + Tailwind wired up
- [ ] Theme tokens (navy + yellow) applied globally
- [ ] Modular folder structure in place
- [ ] Root layout with app shell (header, main, responsive container)
- [ ] Placeholder home page for Issue Tracker
- [ ] README with run instructions (`npm run dev`)

Do **not** add auth, database, CRUD, or issue workflows unless explicitly requested in the confirmed scope.

## Scope Confirmation Template

Before building features, ask the user using this template:

```
Proposed scope for this run:
1. [e.g., Project scaffold + theme + layout]
2. [e.g., Issue list page with mock data]
3. [Not included unless requested: auth, persistence, …]

Does this match what you want? Adjust before I proceed.
```

## Verification Checklist

After bootstrap:

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` succeeds
- [ ] No `.env` files exist
- [ ] Theme uses navy + yellow
- [ ] Structure matches modular layout above
- [ ] UI is readable on mobile viewport

## Out of Scope (Unless User Requests)

- `.env` / environment variable files
- Database setup
- Authentication
- Deployment configuration
- Feature assumptions beyond confirmed scope
