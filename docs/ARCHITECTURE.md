# Project Architecture and Canonical Locations

This document clarifies which folders are canonical and which are legacy/archived copies. It is intended for buyers and maintainers to avoid confusion.

Canonical (current)

- `server/` — The canonical TypeScript Express CMS API. This is the production API used by the mobile app and should be considered the source of truth for API routes, preview handling, and content responses.
- `apps/studio/` — The canonical Sanity Studio for editors. This is the admin UI that talks to the same Sanity project/dataset as the `server/` API.
- `docs/` — Documentation for architecture, studio setup, and migration notes.

Other services

- `core-api/` — An optional separate product/store API that uses Prisma. It's not required to run the CMS; treat it as a separate service.

Legacy / Archived folders

The following folders are kept for historical reference and examples only. They are not used by the current `server/` or `apps/studio/` systems and should not be treated as the canonical implementation.

- `jars-cms/` — Older combined Express + Sanity implementation. Kept for reference.
- `jars-cms-api/` — Legacy API implementation (archived). Do not use for new development.
- `jars-mobile-app/` — An older mobile app repository used as a reference implementation; the production mobile app is maintained separately.

If you're a buyer or new maintainer: focus on `server/` and `apps/studio/`.

Preview and tokens

- The API supports preview mode via the `X-Preview: true` header or `?preview=true` query parameter. When preview is enabled the API uses `SANITY_PREVIEW_TOKEN` (or falls back to `SANITY_API_TOKEN` if set).
- Environment variables used by the server and studio are listed in `.env.example` and include `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`, `SANITY_PREVIEW_TOKEN`.

Governance and handoff notes

- Do NOT delete the legacy folders; they are intentionally preserved as archives.
- Label any future archived code with a top-of-file README banner pointing to `docs/ARCHITECTURE.md` so buyers can find canonical sources.
