# Architecture

## Modules
- **Admin SPA (`apps/admin`)**: React 18 + Vite 7, secured routes, dataset/workspace selectors, analytics (2D by default, 3D/4D when `VITE_ENABLE_3D_ANALYTICS=true`), AI concierge, accessibility controls, and global error boundary.
- **Sanity Studio (`apps/studio`)**: Sanity v4 config (`sanity.config.ts`), authors content/legal/personalization rules.
- **API Server (`server`)**: Express 5 + TypeScript. Middleware stack: Helmet, rate limiting, compression, cookie-parser, CORS allowlist, CSRF protection for admin routes, structured logging.

## Data flow
1. **Content authoring**: Editors use Studio to manage schemas and documents (articles, FAQs, legal, personalization rules, themes).
2. **Serving content**: API exposes `/content` and `/api/v1/content` for public consumers; Admin uses `/api/admin/**` behind auth/CSRF.
3. **Analytics**: Frontends post to `/analytics/event` with HMAC + API key. Aggregates stored in Sanity metrics docs.
4. **Personalization**: Admin configures rules in Studio; API surfaces `/personalization` endpoints consumed by Admin simulator and clients.
5. **AI concierge**: Admin chat posts to `/api/v1/nimbus/ai/chat`; backend currently returns deterministic responses unless an AI provider is configured via `OPENAI_API_KEY` (placeholder).

## Auth & security
- **Admin auth**: `/admin/login` issues JWT cookie + CSRF cookie. Protected routes use `requireAdmin` + `requireCsrfToken`.
- **RBAC**: `requireRoleV2` enforces role scopes on AI and admin APIs.
- **CORS**: Configurable via `CORS_ORIGINS` (comma-separated). Wildcard is rejected in production.
- **Rate limits**: Global limiter plus endpoint-specific limits for login and analytics ingest.
- **Helmet**: Baseline security headers; HSTS enabled in production.

## Build & deploy
- **Admin**: `pnpm admin:build` → `apps/admin/dist` (Vercel target).
- **Studio**: `pnpm studio:build` → `apps/studio/dist` and copied to repo `dist/` for Netlify previews.
- **API**: `pnpm server:build` → `server/dist`; Dockerfile available for containerized deploys.

## Integrations
- **Sanity**: `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_TOKEN` required for content/analytics writes.
- **Mapbox (optional)**: `VITE_MAPBOX_TOKEN` enables 3D map visualization; without it the map component renders a placeholder.
- **AI provider (optional)**: `OPENAI_API_KEY` can back `/api/v1/nimbus/ai/chat` when implemented.
