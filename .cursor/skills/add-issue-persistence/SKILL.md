---
name: add-issue-persistence
description: Add durable issue storage to the Issue Tracker using SQLite and Drizzle ORM with typed config and no .env files. Use when the user invokes /add-issue-persistence or asks to add a database to the issue tracker backend.
disable-model-invocation: true
---

# Add Issue Persistence

## Before You Start

**Do not assume project scope.** Confirm storage choice and migration strategy before proceeding.

Prerequisites:
- `/bootstrap-issue-tracker-api`
- `/add-issue-crud-api` (repository interface should exist to swap)

## Storage Options

Ask the user if not specified:

| Option | When to use |
|--------|-------------|
| **SQLite + Drizzle** (recommended) | Local file DB, simple setup, no cloud |
| **JSON file store** | Zero dependencies, class/demo only |
| **Prisma + SQLite** | If user prefers Prisma migrations |

Default: **SQLite + Drizzle**.

## Tech Stack

| Requirement | Choice |
|-------------|--------|
| Database | SQLite (file-based) |
| ORM | Drizzle ORM |
| Config | `src/config/database.ts` — **no `.env`** |
| DB file | `data/issues.db` (gitignore it) |

## Config (No .env)

Update `src/config/database.ts`:

```ts
export const databaseConfig = {
  provider: "sqlite" as const,
  filePath: "data/issues.db",
} as const;
```

Add `data/` to `.gitignore`.

## Folder Structure

```
src/
├── server/db/
│   ├── schema.ts             # Drizzle table definitions
│   ├── client.ts             # DB connection singleton
│   └── migrate.ts            # Migration runner script
├── server/issues/
│   └── issue.repository.ts   # Replace in-memory with DB queries
drizzle.config.ts             # Points to schema + SQLite file
data/                         # SQLite file (gitignored)
```

## Bootstrap Steps

### 1. Install dependencies

```bash
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3
```

### 2. Define schema

`src/server/db/schema.ts` — `issues` table matching `Issue` type:

```ts
// id (text, PK), title (text), status (text), createdAt, updatedAt
```

### 3. Wire repository

Replace in-memory methods in `issue.repository.ts` with Drizzle queries. Keep the same public interface so services and routes do not change.

### 4. Add npm scripts

In `package.json`:

```json
"db:generate": "drizzle-kit generate",
"db:migrate": "tsx src/server/db/migrate.ts",
"db:seed": "tsx src/server/db/seed.ts"
```

Install `tsx` as dev dependency for running migration/seed scripts.

### 5. Seed data

Create `src/server/db/seed.ts` with 2–3 sample issues.

## Scope Confirmation Template

```
Proposed scope for this run:
1. [e.g., SQLite + Drizzle with issues table]
2. [e.g., Swap in-memory repo for DB repo]
3. [Not included: auth, cloud DB, .env files]

Does this match what you want? Adjust before I proceed.
```

## Verification Checklist

- [ ] `npm run db:migrate` creates/applies schema
- [ ] `npm run db:seed` inserts sample data
- [ ] CRUD endpoints read/write from SQLite
- [ ] `data/issues.db` is in `.gitignore`
- [ ] No `.env` files exist
- [ ] `npm run build` succeeds
- [ ] README updated with DB setup instructions

## Out of Scope (Unless User Requests)

- Cloud databases (Postgres, Supabase, PlanetScale)
- `.env` / environment variable files
- Auth
- Connection pooling / production deployment config
