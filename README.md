# Issue Tracker

A Next.js Issue Tracker scaffold with TypeScript, Tailwind CSS, and a navy + yellow theme.

## Tech stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **No `.env` files** — configuration lives in `src/config/`

## Project structure

```
src/
├── app/
│   └── api/              # Route Handlers (backend)
├── components/
│   ├── ui/               # Reusable UI primitives
│   └── issue-tracker/    # Feature components
├── config/               # App, theme, and database config
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
├── server/               # Backend logic (services, errors, responses)
├── services/             # Frontend API clients
└── types/                # Shared TypeScript types
```

## API

The backend runs as Next.js Route Handlers under `src/app/api/`.

| Method | Route | Description |
| ------ | ----- | ----------- |
| `GET` | `/api/health` | Health check — returns `{ success: true, data: { status, service } }` |

Example:

```bash
curl http://localhost:3000/api/health
```

Response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "issue-tracker-api"
  }
}
```

The home page calls this endpoint on load and shows **API connected** when the backend is reachable.

## Getting started

Install dependencies (if needed):

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | Run ESLint               |

## Theme

Navy and yellow tokens are defined in `src/config/theme.ts` and wired into Tailwind via `src/app/globals.css`.
