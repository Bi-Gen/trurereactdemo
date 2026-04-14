# AGENTS.md

## Commands

- **Dev server**: Never start manually; continuous deployment is assumed
- **Build**: `npm run build` (production) or `npm run build:dev` (development mode)
- **Lint**: `npm run lint`

## Architecture

**Frontend**: React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui

**Routing**: HashRouter (for serverless compatibility) - routes defined in `src/App.tsx`

**State**: React Query for server state, React hooks for local state

**Path aliases**: Use `@/` for imports from `src/`

## Project Structure

```
src/
├── components/ui/      # shadcn/ui wrapped components (Radix UI + Tailwind)
├── pages/              # Page components (routed in App.tsx)
├── hooks/              # Custom React hooks
├── lib/utils.ts        # Utility functions (cn() for classnames)
├── App.tsx             # Root component with providers and routing
└── main.tsx            # Entry point
```

## Backend (Python serverless)

- **Location**: `packages/<package>/<action>/`
- **Public endpoints**: `/api/my/<package>/<action>`
- **Private endpoints**: Use `action-new` with `public: false`, invoke via `action-invoke`
- **Never create** `__main__.py` manually; always use `action-new`
- **Never edit** `__main__.py` directly; edit the action module file instead

### Backend services (always use provided tools):
- **PostgreSQL**: `action-add-postgresql` → `ctx.POSTGRESQL` (psycopg)
- **Redis**: `action-add-redis` → `ctx.REDIS`, `ctx.REDIS_PREFIX`
- **S3**: `action-add-s3` → `ctx.S3_CLIENT`, `ctx.S3_DATA`, `ctx.S3_WEB`, `ctx.S3_PUBLIC`
- **Milvus**: `action-add-milvus` → `ctx.MILVUS`
- **Requirements**: `action-requirements` (never edit `requirements.txt` directly)

### Init actions (for DB schemas, cache setup, etc.)
- **Location**: `packages/init/`
- **Always**: incremental, idempotent, non-destructive
  - Use `CREATE TABLE IF NOT EXISTS`
  - Use `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`

## Conventions

- TypeScript relaxed settings: `noImplicitAny: false`, `strictNullChecks: false`
- Styling: TailwindCSS with CSS variables (defined in `index.css`)
- Routes added in `App.tsx` above the `*` catch-all
- shadcn/ui components installed via `npx shadcn-ui@latest add <component>`
