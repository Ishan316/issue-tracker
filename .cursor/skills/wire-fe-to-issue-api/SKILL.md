---
name: wire-fe-to-issue-api
description: Connect the Issue Tracker frontend to the backend API with typed fetch services, React hooks, and mobile-responsive issue list UI. Use when the user invokes /wire-fe-to-issue-api or asks to wire the frontend to the issue API.
disable-model-invocation: true
---

# Wire Frontend to Issue API

## Before You Start

**Do not assume project scope.** Confirm which UI features to connect in this run.

Prerequisites:
- `/bootstrap-issue-tracker` (frontend scaffold)
- `/add-issue-crud-api` (API endpoints exist)

Persistence optional — works with in-memory or DB-backed API.

## Default Scope

Unless the user approves more, implement:

- [ ] `src/services/issue.api.ts` — typed fetch wrappers for all CRUD endpoints
- [ ] `src/hooks/useIssues.ts` — list, create, loading, error states
- [ ] `src/components/issue-tracker/IssueList.tsx` — mobile-responsive issue list
- [ ] `src/components/issue-tracker/CreateIssueForm.tsx` — simple create form
- [ ] Update home page to show live issue list instead of placeholder hero

Do **not** add edit/delete UI, kanban board, or auth unless explicitly requested.

## Folder Structure

```
src/
├── services/
│   └── issue.api.ts          # fetch wrappers using appConfig.apiBaseUrl
├── hooks/
│   └── useIssues.ts          # Client-side data hook
├── components/issue-tracker/
│   ├── IssueList.tsx
│   ├── IssueCard.tsx
│   └── CreateIssueForm.tsx
└── components/ui/
    └── Input.tsx             # Add if missing
```

## Implementation Rules

- Use `appConfig.apiBaseUrl` from `src/config/app.ts` — never hardcode URLs.
- Reuse `Issue` type from `src/types/issue.ts`.
- Handle loading, empty, and error states in UI.
- Mobile-first: stack cards vertically, full-width form inputs, touch targets ≥ 44px.
- Navy + yellow theme consistent with existing components.
- Client components only where needed (`"use client"` on hooks/forms/list).
- Never create `.env` files.

## API Service Pattern

```ts
// src/services/issue.api.ts
import { appConfig } from "@/config/app";
import type { Issue } from "@/types/issue";

const base = `${appConfig.apiBaseUrl}/issues`;

export async function fetchIssues(): Promise<Issue[]> {
  const res = await fetch(base);
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// createIssue, updateIssue, deleteIssue — same pattern
```

## Hook Pattern

`useIssues` should expose:

```ts
{ issues, isLoading, error, createIssue, refetch }
```

Use `useState` + `useEffect` or `useCallback` — no external data library unless user requests.

## UI Requirements

- **IssueList**: renders cards with title, status badge (reuse `Badge`), empty state message.
- **CreateIssueForm**: title input + submit button (reuse `Button`, add `Input` if needed).
- **IssueCard**: compact card, readable on 375px viewport.
- Status colors: use existing navy/accent theme tokens.

## Scope Confirmation Template

```
Proposed scope for this run:
1. [e.g., Issue list + create form wired to API]
2. [Not included: edit/delete UI, kanban, auth]

Does this match what you want? Adjust before I proceed.
```

## Verification Checklist

- [ ] Home page shows issues from `GET /api/issues`
- [ ] Creating an issue via form calls `POST /api/issues` and refreshes list
- [ ] Loading and error states display correctly
- [ ] Layout works on mobile (~375px)
- [ ] Navy + yellow theme applied
- [ ] No `.env` files exist
- [ ] `npm run build` succeeds

## Out of Scope (Unless User Requests)

- Edit / delete UI
- Kanban board or drag-and-drop
- Optimistic updates
- React Query / SWR (unless requested)
- Authentication
- `.env` files
