# Environment variables

## Admin (Vercel / local Vite)
- `VITE_NIMBUS_API_URL` – Base URL for the API (e.g., `https://<railway>.up.railway.app`); required for live concierge and admin API calls.
- `VITE_APP_ENV` – `development` | `production` (optional UI hints).
- `VITE_ENABLE_3D_ANALYTICS` – `true` to enable 3D/4D dashboard mode (defaults to off in production for safety).
- `VITE_MAPBOX_TOKEN` – Mapbox access token for 3D map; component falls back gracefully when absent.

## Studio (Vercel)
- `SANITY_STUDIO_PROJECT_ID` – Sanity project ID (e.g., `ygbu28p2`).
- `SANITY_STUDIO_DATASET` – Dataset name (e.g., `production`).

## API (Railway/Docker)
- `NODE_ENV` – `production` or `development`.
- `PORT` – HTTP port (defaults to 3000 if unset by platform).
- `JWT_SECRET` – Required; 24+ chars in production.
- `CORS_ORIGINS` – Comma-separated allowlist (e.g., `https://admin.example.com,https://studio.example.com`).
- `SANITY_PROJECT_ID` / `SANITY_DATASET` / `SANITY_API_TOKEN` – Required for content + analytics writes.
- `ANALYTICS_INGEST_KEY` – Comma-separated keys for `/analytics/event` HMAC verification.
- `OPENAI_API_KEY` – Optional; enable AI concierge responses when wired up.
- `JSON_BODY_LIMIT` – Optional body size limit (default `4mb`).
- `ADMIN_LOGIN_RATE_LIMIT_MAX` / `ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS` – Optional overrides for login throttling.

## Optional services
- `REDIS_URL` – If using external rate-limit/backing store (not required by default).
- `DATABASE_URL` – If enabling relational persistence beyond Sanity.

## Platform notes
- **Vercel**: set Admin root to `apps/admin` and Studio root to `apps/studio`; `pnpm` is supported natively.
- **Railway/Docker**: supply all API variables via service settings or `.env`; never commit secrets.
