---
name: test-agent
description: Run post-development quality checks — static analysis, code coverage, bug fixes, and a tracked QA log. Use when the user invokes /test-agent or asks for post-dev testing, static analysis, coverage reports, or bug-fix verification.
disable-model-invocation: true
---

# Test Agent

Post-development quality workflow. Run after feature work (FE or BE) before considering a task done.

## Before You Start

Identify what changed in the current session (or ask the user). Scope checks to affected areas when possible, but always run project-wide static analysis.

## Workflow

Copy this checklist and track progress:

```
Test Agent Progress:
- [ ] Step 1: Static code analysis
- [ ] Step 2: Type checking
- [ ] Step 3: Tests + coverage report
- [ ] Step 4: Fix bugs found
- [ ] Step 5: Update QA log
- [ ] Step 6: Re-run failed checks until clean
```

---

## Step 1: Static Code Analysis

Run ESLint across the project:

```bash
npm run lint
```

If lint fails:
- Fix auto-fixable issues: `npx eslint . --fix` (only when safe)
- Manually fix remaining errors and warnings that indicate real bugs

Also scan changed files with the IDE linter (`ReadLints`) for TypeScript/ESLint diagnostics.

---

## Step 2: Type Checking

Verify types compile:

```bash
npx tsc --noEmit
```

If `tsc --noEmit` is not configured, fall back to:

```bash
npm run build
```

Fix all type errors before proceeding.

---

## Step 3: Code Coverage Report

### If Vitest is already set up (`/add-api-tests` was run)

```bash
npm test -- --coverage
```

Ensure `package.json` has:

```json
"test": "vitest run",
"test:coverage": "vitest run --coverage"
```

If `--coverage` fails, install coverage provider:

```bash
npm install -D @vitest/coverage-v8
```

### If no test runner exists yet

1. Install Vitest: `npm install -D vitest @vitest/coverage-v8`
2. Add minimal `vitest.config.ts` (see `/add-api-tests` skill)
3. Write at least smoke tests for changed modules
4. Run: `npm run test:coverage`

### Coverage output

- Save or note the summary (statements / branches / functions / lines %)
- Include the coverage summary in the QA log (Step 5)
- Do not drop coverage on files touched in this session

---

## Step 4: Fix Potential Bugs

For each issue found in Steps 1–3:

1. **Reproduce** — confirm it is a real bug, not a false positive
2. **Fix** — minimal, focused diff; match existing project conventions
3. **Verify** — re-run the check that caught it
4. **Log** — record in QA log (Step 5)

Common targets in this project:
- Unhandled API errors in route handlers
- Missing `"use client"` on hooks/components
- Server-only imports in client components
- Unvalidated request bodies (use Zod)
- Type mismatches between `src/types/` and services

Do **not** introduce `.env` files. Do **not** refactor unrelated code.

---

## Step 5: QA Log

Append every run to `qa/test-agent-log.md`. Create the file and `qa/` directory if missing.

Use this entry template:

```markdown
## YYYY-MM-DD HH:MM — Test Agent Run

**Scope:** [files or feature area checked]

### Static analysis
- ESLint: PASS | FAIL
- Notes: …

### Type check
- tsc / build: PASS | FAIL
- Notes: …

### Coverage
- Command: `npm run test:coverage`
- Statements: X% | Branches: X% | Functions: X% | Lines: X%
- Notes: …

### Bugs found & fixed
| # | Severity | File | Issue | Fix |
|---|----------|------|-------|-----|
| 1 | critical/suggestion | path | description | what was changed |

### Remaining issues
- [ ] … (if any could not be fixed, explain why)

### Final status
PASS — all checks green | FAIL — see remaining issues
```

Always **append**; never overwrite prior entries.

---

## Step 6: Re-run Until Clean

After fixes, re-run Steps 1–3. Repeat until:

- [ ] ESLint passes
- [ ] Type check / build passes
- [ ] Tests pass with coverage report generated
- [ ] QA log updated

Report a short summary to the user: what was checked, coverage %, bugs fixed, and log file path.

---

## Project Commands Reference

| Check | Command |
|-------|---------|
| Lint | `npm run lint` |
| Build (includes TS) | `npm run build` |
| Type check only | `npx tsc --noEmit` |
| Tests | `npm test` |
| Coverage | `npm run test:coverage` |

---

## Out of Scope (Unless User Requests)

- E2E / browser tests (Playwright, Cypress)
- Performance profiling
- Security penetration testing
- Deploying or pushing to remote
