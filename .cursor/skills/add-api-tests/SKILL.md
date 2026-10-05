---
name: add-api-tests
description: Add API tests for the Issue Tracker using Vitest, covering route handlers, services, and validation. Use when the user invokes /add-api-tests or asks to add backend or API tests.
disable-model-invocation: true
---

# Add API Tests

## Before You Start

**Do not assume project scope.** Confirm which layers to test in this run.

Prerequisites:
- `/bootstrap-issue-tracker-api`
- `/add-issue-crud-api` (endpoints to test)

## Default Scope

Unless the user approves more, implement:

- [ ] Vitest + test config
- [ ] Unit tests for `issue.service.ts` (create, update, validation errors)
- [ ] Unit tests for Zod schemas (valid/invalid payloads)
- [ ] Integration-style tests for route handlers (mock NextRequest/NextResponse)
- [ ] `npm test` script in `package.json`

Do **not** add E2E browser tests or frontend component tests unless requested.

## Tech Stack

| Requirement | Choice |
|-------------|--------|
| Test runner | Vitest |
| Assertions | Vitest built-in (`expect`) |
| HTTP mocking | Manual NextRequest construction |
| Config | No `.env` — use test fixtures in code |

## Folder Structure

```
src/
├── server/issues/
│   ├── issue.service.ts
│   ├── issue.service.test.ts
│   ├── issue.schema.ts
│   └── issue.schema.test.ts
├── app/api/issues/
│   ├── route.test.ts
│   └── [id]/route.test.ts
vitest.config.ts
```

## Bootstrap Steps

### 1. Install dependencies

```bash
npm install -D vitest
```

### 2. Add npm script

```json
"test": "vitest run",
"test:watch": "vitest"
```

### 3. Vitest config

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

### 4. Service tests

Test `issue.service.ts`:
- Creates issue with valid payload
- Rejects empty title (400)
- Returns 404 for missing ID
- Updates status correctly
- Deletes issue

Reset in-memory repository between tests (export a `resetStore()` for test use).

### 5. Schema tests

Test `issue.schema.ts`:
- Valid create payload passes
- Empty title fails
- Invalid status enum fails
- Partial update payload passes

### 6. Route handler tests

Construct `NextRequest` manually and call exported route handlers:

```ts
import { GET, POST } from "./route";
import { NextRequest } from "next/server";

const req = new NextRequest("http://localhost/api/issues", {
  method: "POST",
  body: JSON.stringify({ title: "Test issue" }),
});
const res = await POST(req);
expect(res.status).toBe(201);
```

## Scope Confirmation Template

```
Proposed scope for this run:
1. [e.g., Vitest + service tests + schema tests + route tests]
2. [Not included: E2E, frontend tests, coverage thresholds]

Does this match what you want? Adjust before I proceed.
```

## Verification Checklist

- [ ] `npm test` passes with zero failures
- [ ] Service layer covered for happy path + error cases
- [ ] Zod schemas tested for valid/invalid input
- [ ] At least one route handler integration test per endpoint group
- [ ] No `.env` files exist
- [ ] README updated with test instructions

## Out of Scope (Unless User Requests)

- Playwright / Cypress E2E tests
- Frontend component tests (React Testing Library)
- Coverage thresholds / CI pipeline
- Database integration tests against real SQLite (can add later)
- `.env` files
