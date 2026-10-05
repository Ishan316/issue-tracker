---
name: add-issue-crud-api
description: Add Issue CRUD REST endpoints to the Issue Tracker API with Zod validation and modular server code. Use when the user invokes /add-issue-crud-api or asks to add issue create, read, update, delete API routes.
disable-model-invocation: true
---

# Add Issue CRUD API

## Before You Start

**Do not assume project scope.** Confirm which endpoints and storage to use in this run.

Prerequisites:
- `/bootstrap-issue-tracker` (frontend)
- `/bootstrap-issue-tracker-api` (API foundation)

## Default Scope

Unless the user approves more, implement:

| Method | Route | Action |
|--------|-------|--------|
| `GET` | `/api/issues` | List all issues |
| `POST` | `/api/issues` | Create issue |
| `GET` | `/api/issues/[id]` | Get one issue |
| `PATCH` | `/api/issues/[id]` | Update issue |
| `DELETE` | `/api/issues/[id]` | Delete issue |

Storage: **in-memory array** in `src/server/issues/issue.repository.ts` unless `/add-issue-persistence` was already run.

## Folder Structure

```
src/
├── app/api/issues/
│   ├── route.ts              # GET, POST
│   └── [id]/
│       └── route.ts          # GET, PATCH, DELETE
├── server/issues/
│   ├── issue.schema.ts       # Zod schemas (create, update)
│   ├── issue.repository.ts   # Data access (in-memory or DB)
│   └── issue.service.ts      # Business logic
└── types/issue.ts            # Shared Issue type (extend if needed)
```

## Implementation Rules

- Validate request bodies with Zod in the service layer.
- Return consistent JSON: `{ success: true, data }` or `{ success: false, error }`.
- Use response helpers from `src/server/lib/response.ts`.
- Route files stay thin — one-liner delegation to service methods.
- Reuse `Issue` and `IssueStatus` from `src/types/issue.ts`.
- Never create `.env` files.

## Zod Schemas

`issue.schema.ts` minimum:

```ts
import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1).max(200),
  status: z.enum(["open", "in-progress", "closed"]).optional(),
});

export const updateIssueSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  status: z.enum(["open", "in-progress", "closed"]).optional(),
});
```

## In-Memory Repository Pattern

```ts
// issue.repository.ts — swap for DB repository after /add-issue-persistence
const store: Issue[] = [];

export const issueRepository = {
  findAll: () => [...store],
  findById: (id: string) => store.find((i) => i.id === id),
  create: (issue: Issue) => { store.push(issue); return issue; },
  update: (id: string, patch: Partial<Issue>) => { /* ... */ },
  delete: (id: string) => { /* ... */ },
};
```

Seed 2–3 sample issues in the repository for demo purposes.

## Scope Confirmation Template

```
Proposed scope for this run:
1. [e.g., Full CRUD on /api/issues with in-memory store]
2. [Not included: DB persistence, auth, pagination]

Does this match what you want? Adjust before I proceed.
```

## Verification Checklist

- [ ] `npm run build` succeeds
- [ ] All five endpoints respond correctly (manual or scripted check)
- [ ] Invalid payloads return 400 with error message
- [ ] Missing issue ID returns 404
- [ ] No `.env` files exist
- [ ] README updated with endpoint documentation

## Out of Scope (Unless User Requests)

- Database persistence (use `/add-issue-persistence`)
- Frontend integration (use `/wire-fe-to-issue-api`)
- Pagination, filtering, search
- Authentication / authorization
- `.env` files
