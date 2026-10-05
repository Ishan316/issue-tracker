---
name: bootstrap-issue-tracker-api
description: Bootstrap the Issue Tracker API layer with Next.js Route Handlers, modular server code, Zod validation, and no .env files. Use when the user invokes /bootstrap-issue-tracker-api or asks to scaffold the backend API foundation.
disable-model-invocation: true
---

# Bootstrap Issue Tracker API

## Before You Start

**Do not assume project scope.** Confirm what to build in this run. Default: API scaffold + `GET /api/health` only — no CRUD, no database, no auth.

Prerequisite: Frontend bootstrap should exist (`/bootstrap-issue-tracker`).

## Tech Stack (Required)

| Requirement | Choice |
|-------------|--------|
| Runtime | Next.js Route Handlers (`src/app/api/`) |
| Language | TypeScript |
| Validation | Zod |
| Config | **No `.env` files** — typed config in `src/config/` |
| Architecture | Modular — thin routes, logic in `src/server/` |
| Storage | None in default scope (in-memory or DB added by other commands) |

## Folder Structure

Add under `src/`:

```
src/
├── app/api/
│   └── health/
│       └── route.ts          # GET /api/health
├── server/
│   ├── lib/
│   │   ├── response.ts       # ok(), badRequest(), notFound(), serverError()
│   │   └── errors.ts         # AppError, handleApiError()
│   └── health/
│       └── health.service.ts
└── config/
    └── database.ts           # Placeholder config (no secrets, no .env)
```

Rules:
- Route files export HTTP method handlers only; delegate to `src/server/`.
- Reuse types from `src/types/` — do not duplicate.
- Never create `.env`, `.env.local`, or `.env.example`.

## Bootstrap Steps

### 1. Install validation dependency

```bash
npm install zod
```

### 2. Create response helpers

`src/server/lib/response.ts` — typed JSON helpers:

```ts
import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function badRequest(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 400 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ success: false, error: message }, { status: 404 });
}

export function serverError(message = "Internal server error") {
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}
```

### 3. Create error handling

`src/server/lib/errors.ts` — `AppError` class + `handleApiError()` that maps to response helpers.

### 4. Database config placeholder

`src/config/database.ts`:

```ts
export const databaseConfig = {
  provider: "none" as const,
  // When persistence is added via /add-issue-persistence, update here — never use .env
} as const;
```

### 5. Health check endpoint

`GET /api/health` returns:

```json
{ "success": true, "data": { "status": "ok", "service": "issue-tracker-api" } }
```

### 6. Default scope (unless user approves more)

- [ ] Zod installed
- [ ] `src/server/lib/` response + error helpers
- [ ] `src/config/database.ts` placeholder
- [ ] `GET /api/health` working
- [ ] README updated with API section

Do **not** add issue CRUD, database, or auth unless explicitly requested.

## Scope Confirmation Template

```
Proposed scope for this run:
1. [e.g., API scaffold + health endpoint]
2. [Not included: CRUD, persistence, auth]

Does this match what you want? Adjust before I proceed.
```

## Verification Checklist

- [ ] `npm run build` succeeds
- [ ] `GET /api/health` returns 200 with expected JSON
- [ ] No `.env` files exist
- [ ] Route handlers are thin; logic lives in `src/server/`
- [ ] README documents the health endpoint

## Out of Scope (Unless User Requests)

- Issue CRUD endpoints (use `/add-issue-crud-api`)
- Database / persistence (use `/add-issue-persistence`)
- Frontend wiring (use `/wire-fe-to-issue-api`)
- Authentication
- `.env` files
