# Nimbus Cannabis OS CMS

A multi-tenant, cannabis-focused CMS with Sanity at its core. Provides brand/store scoping, legal versioned content, analytics hooks, and Admin SPA for theming and asset management.

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Sanity Studio  │────▶│   Sanity Cloud  │◀────│   CMS API       │
│  (Vercel)       │     │   (Headless)    │     │   (Railway)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                          │
                        ┌─────────────────────────────────┼─────────────┐
                        │                                 │             │
                  ┌─────▼──────┐                   ┌──────▼─────┐  ┌───▼────┐
                  │ Admin SPA  │                   │ Mobile App │  │  Web   │
                  │ (Vercel)   │                   │            │  │        │
                  └────────────┘                   └────────────┘  └────────┘
```

## Monorepo Structure (pnpm workspaces)

```
nimbus-cms/
├── pnpm-workspace.yaml          # Workspace configuration
├── package.json                 # Root scripts (workspace-aware)
├── ENV_VARIABLES.md            # Environment variable reference
├── apps/
│   ├── admin/                  # Admin SPA (React + Vite)
│   │   ├── package.json        # name: "admin"
│   │   ├── vite.config.js
│   │   ├── .env.production
│   │   └── src/
│   └── studio/                 # Sanity Studio
│       ├── package.json        # name: "studio"
│       ├── sanity.config.ts
│       └── vercel.json
├── server/                     # Express API server
│   ├── package.json            # name: "server"
│   ├── tsconfig.json
│   └── src/
└── docs/                       # Documentation
```

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)
- Sanity project ID: `ygbu28p2`

### Installation

````bash
# Clone repository
git clone https://github.com/SDawson777/nimbus-cms.git
cd nimbus-cms
## Monorepo & Deployments

### API (Railway)
- Source: `server/`
- Build (local): `npm --prefix server run build` (TypeScript → `server/dist`)
- Start (local): `npm --prefix server run start`
- Docker: Uses multi-stage `server/Dockerfile` (builds admin + server)
- Env (Railway):
      - `JWT_SECRET` (>=24 chars, non-placeholder)
      - `CORS_ORIGINS` (comma-separated, e.g. `https://nimbus-cms-admin.vercel.app,https://nimbus-cms.vercel.app`)
      - Optional: `JSON_BODY_LIMIT`, `ENABLE_COMPLIANCE_SCHEDULER`

### Admin UI (Vercel + Vite)
- Preferred: Set Root Directory to `apps/admin`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Env: `VITE_NIMBUS_API_URL` → Railway API base (e.g. `https://<railway-app>.up.railway.app`)
- Fallback (if root deploy forced):
      - Build Command: `npm run vercel-build-admin`
      - Output Directory: `dist`

### CMS Studio (Vercel + Sanity)
- Preferred: Root Directory `apps/studio`
- Install Command: `npm ci`
- Build Command: `npm run build` (`sanity build --no-auto-update`)
- Output Directory: `dist`
- Env:
      - `SANITY_STUDIO_PROJECT_ID` → `ygbu28p2`
      - `SANITY_STUDIO_DATASET` → `production`
- Fallback (root deploy):
      - Build Command: `npm run vercel-build-studio`
      - Output Directory: `dist`

## Project Mapping

- `server/` → Railway service (API)
- `apps/admin/` → Vercel project (Admin UI)
- `apps/studio/` → Vercel project (Sanity Studio)

## Quickstart (pnpm)

### Railway (API Server)
2. Install dependencies:
**Repository:** github.com/SDawson777/nimbus-cms
**Root Directory:** `server/`
```bash
npm install -g pnpm
pnpm install
````

**Start Command:**

```bash
3. Run locally:
```

```bash
pnpm --filter server dev
pnpm --filter admin dev
pnpm --filter studio dev
```

### Vercel (Admin UI)

4. Build projects:

```bash
pnpm --filter server build
pnpm --filter admin build
pnpm --filter studio build
```

pnpm install && pnpm --filter admin build

````

**Output Directory:** `apps/admin/dist`

**Environment Variables:**
- `VITE_NIMBUS_API_URL=https://nimbus-cms-production.up.railway.app/api/v1/nimbus`
- `VITE_APP_ENV=production`

---

### Vercel (Sanity Studio)
**Project:** nimbus-cms
**Root Directory:** `apps/studio`

**Build Command:**
```bash
pnpm install && pnpm --filter studio build
````

**Output Directory:** `apps/studio/dist`

**Environment Variables:**

- `SANITY_STUDIO_PROJECT_ID=ygbu28p2`
- `SANITY_STUDIO_DATASET=production`

---

## API Endpoints

**Base URL (Production):** `https://nimbus-cms-production.up.railway.app`

- `GET /` - Friendly API landing page
- `GET /status` - Health check
- `GET /api/v1/status` - Legacy health check
- `GET /api/v1/content` - Public content API
- `POST /api/admin/*` - Admin endpoints (auth required)
- `GET /personalization/:tenantId` - Personalization engine
- `POST /analytics` - Analytics ingest

## CORS Configuration

Set `CORS_ORIGINS` on Railway to include deployed frontend URLs:

```
CORS_ORIGINS=https://nimbus-cms-admin.vercel.app,https://nimbus-cms.vercel.app
```

## Multi-Tenant Architecture

- **Workspace Selector:** Admin UI includes tenant context (Global, Tenant A, B, C)
- **Tenant Scoping:** All API requests include `tenantId` query parameter
- **LocalStorage Persistence:** Active tenant stored in `nimbus.activeTenant`

## Tech Stack

### Admin SPA

- React 18 + TypeScript
- Vite 5.4 (build tool)
- React Router v6
- Recharts 2.10 (dashboards)
- Axios (API client)

### API Server

- Express 5 + TypeScript
- Helmet (security)
- CORS + JWT auth
- Sanity Client SDK

### CMS Studio

- Sanity v4
- Desk Tool + Vision

## Documentation

- [ENV_VARIABLES.md](./ENV_VARIABLES.md) - Environment variable reference
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Technical architecture
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Deployment guide
- [API_REFERENCE_ADMIN.md](./docs/API_REFERENCE_ADMIN.md) - API documentation

## Key Features

✅ Multi-tenant content scoping  
✅ Recharts-powered dashboards (Line, Bar, Area charts)  
✅ Design system with 7 reusable components  
✅ Settings management (Theme, API Keys, Workspace)  
✅ Centralized API client with automatic tenant injection  
✅ JWT authentication and CSRF protection  
✅ Compliance and scheduling system  
✅ Analytics ingest and reporting

## License

UNLICENSED - Proprietary software
