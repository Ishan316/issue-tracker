---
name: add-e2e-tests
description: Add Playwright end-to-end tests for the Issue Tracker with Page Object Model, smoke specs, mobile viewport checks, and dev-server auto-start. Use when the user invokes /add-e2e-tests or asks to add Playwright, E2E, or browser tests.
disable-model-invocation: true
---

# Add E2E Tests (Playwright)

Browser-level tests for user flows. Complements Vitest unit tests — do not duplicate unit-test coverage here.

## Before You Start

**Do not assume project scope.** Confirm which flows to cover in this run.

Prerequisites:
- `/bootstrap-issue-tracker` (frontend)
- `/bootstrap-issue-tracker-api` (API health endpoint)

Optional (extend specs when available):
- `/add-issue-crud-api` + `/wire-fe-to-issue-api` → issue create/list flows

## Testing Pyramid

| Layer | Tool | Folder |
|-------|------|--------|
| Static | ESLint / tsc | — |
| Unit / API | Vitest | `src/**/*.test.ts` |
| E2E | Playwright | `e2e/specs/*.spec.ts` |

Playwright tests **user journeys**. Vitest tests **functions and handlers**.

## Default Scope

Unless the user approves more, implement:

- [ ] Playwright installed and configured
- [ ] `e2e/` folder with Page Object Model
- [ ] `data-testid` on key UI elements (minimal, stable selectors)
- [ ] Smoke spec: home page loads + API health card
- [ ] API spec: `GET /api/health` via Playwright `request` fixture
- [ ] Mobile viewport smoke (375px) for home page
- [ ] npm scripts: `test:e2e`, `test:e2e:ui`, `test:e2e:headed`
- [ ] README section for E2E

Do **not** add issue CRUD E2E unless CRUD UI exists or user requests it.

## Folder Structure

```
e2e/
├── fixtures/
│   └── test-base.ts          # optional shared fixtures
├── pages/
│   ├── home.page.ts          # Page Object — home + health
│   └── issues.page.ts        # (when CRUD UI exists)
├── specs/
│   ├── smoke.spec.ts         # home + health UI
│   ├── api.spec.ts           # /api/health via request
│   └── mobile.spec.ts        # 375px viewport checks
playwright.config.ts
```

## Bootstrap Steps

### 1. Install Playwright

```bash
npm init playwright@latest -- --quiet --lang=ts --browser=chromium
```

If interactive install fails, install manually:

```bash
npm install -D @playwright/test
npx playwright install chromium
```

### 2. Playwright config

Create `playwright.config.ts` at project root:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

Rules:
- **No `.env` files** — base URL is hardcoded or read from `src/config/app.ts` pattern in config only.
- `reuseExistingServer: true` locally avoids port conflicts when dev is already running.

### 3. Add npm scripts

```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui",
"test:e2e:headed": "playwright test --headed",
"test:e2e:report": "playwright show-report"
```

### 4. Add `data-testid` to components

Add stable selectors (minimal diff):

| Component | testid |
|-----------|--------|
| `HomeHero` | `home-hero` |
| `ApiHealthStatus` | `api-health-status` |
| `AppHeader` | `app-header` |

Example:

```tsx
<section data-testid="api-health-status" className="...">
```

Prefer `getByTestId`, `getByRole`, and `getByText` over CSS classes.

### 5. Page Object Model

`e2e/pages/home.page.ts`:

```ts
import type { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  hero = () => this.page.getByTestId("home-hero");
  healthStatus = () => this.page.getByTestId("api-health-status");
  healthConnected = () => this.page.getByText("API connected");
}
```

### 6. Smoke spec

`e2e/specs/smoke.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test("home page loads with hero and API health", async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();

  await expect(home.hero()).toBeVisible();
  await expect(home.healthConnected()).toBeVisible({ timeout: 10_000 });
});
```

### 7. API spec (via Playwright request)

`e2e/specs/api.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("GET /api/health returns ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();

  const body = await res.json();
  expect(body).toEqual({
    success: true,
    data: { status: "ok", service: "issue-tracker-api" },
  });
});
```

### 8. Mobile spec

`e2e/specs/mobile.spec.ts` — run with `mobile` project or inline viewport:

```ts
test.use({ viewport: { width: 375, height: 667 } });

test("home page is usable on mobile", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("home-hero")).toBeVisible();
  await expect(page.getByTestId("app-header")).toBeVisible();
});
```

## E2E Test Planning Template

Before writing new specs, confirm scope with the user:

```
Feature: [e.g. Create Issue]

User story: As a user, I can create an issue and see it in the list.

Steps:
1. Open /
2. Fill title
3. Submit
4. See issue in list

Selectors: data-testid="create-issue-form", "issue-list"
Assertions: [ ] card visible  [ ] API returns issue
Out of scope: edit, delete, auth
```

## When CRUD UI Exists

Add `e2e/pages/issues.page.ts` and `e2e/specs/issues.spec.ts`:

- Create issue → appears in list
- Empty title → validation error shown
- API + UI both assert the same data

## Integration with `/test-agent`

After this command is run, `/test-agent` may optionally include:

```bash
npm run test:e2e
```

Log E2E pass/fail in `qa/test-agent-log.md` under a new **E2E** section. E2E is optional in test-agent unless the user explicitly requests it each run (slower than unit tests).

## Scope Confirmation Template

```
Proposed scope for this run:
1. [e.g., Playwright setup + smoke + api + mobile specs]
2. [Not included: issue CRUD E2E, CI pipeline, cross-browser matrix]

Does this match what you want? Adjust before I proceed.
```

## Verification Checklist

- [ ] `npm run test:e2e` passes (all projects)
- [ ] Dev server auto-starts via `webServer` config
- [ ] Smoke test waits for async API health card
- [ ] Mobile viewport spec passes
- [ ] `data-testid` added only where needed
- [ ] No `.env` files introduced
- [ ] README documents E2E commands
- [ ] `playwright-report/` and `test-results/` in `.gitignore`

## Out of Scope (Unless User Requests)

- Cypress or other E2E frameworks
- Visual regression / screenshot diff
- Full cross-browser matrix (Firefox, WebKit) — chromium + mobile is default
- CI/CD pipeline wiring (GitHub Actions)
- Authentication / login flows
- Performance or load testing
- `.env` files
