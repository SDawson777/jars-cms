# Contributing to Nimbus CMS

## Monorepo Structure

- `server/` – Express + TypeScript API (Railway)
- `apps/admin/` – React + Vite Admin SPA (Vercel)
- `apps/studio/` – Sanity Studio v4 (Vercel)

## Package Manager

Use pnpm workspaces.

```bash
npm install -g pnpm
pnpm install
```

## Development

```bash
# API
pnpm --filter server dev

# Admin
pnpm --filter admin dev

# Studio
pnpm --filter studio dev
```

## Builds

```bash
pnpm --filter server build
pnpm --filter admin build
pnpm --filter studio build
```

## Testing

If test scripts exist, run via pnpm filters per workspace.

## Code Style & Types

- TypeScript strict in `server/`.
- Prefer Zod for validation.
- Centralized error handling.
- Do not introduce `any`; use `unknown` + narrowing.

## CI Expectations

- PRs must pass CI builds for all workspaces.
