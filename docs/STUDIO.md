# Sanity Studio (apps/studio)

This project includes a Sanity Studio at `apps/studio/`. The Studio is the content editing UI editors will use. This document explains how the Studio is wired to the server and how to run it locally.

## Where schemas live

The Studio schemas and configuration live inside `apps/studio/`.

Key locations:

- `apps/studio/sanity.config.ts` - Studio configuration (projectId, dataset, plugins).
- `apps/studio/schemas` (or `apps/studio/schema` depending on project structure) - document and object schemas.
- `apps/studio/config/preview.ts` - preview token environment key used by the Studio.

## Environment variables

The Studio reads the Sanity project and dataset from environment variables so it uses the same project as the API server.

- `SANITY_PROJECT_ID` - Sanity project id used by the server and studio.
- `SANITY_DATASET` - Sanity dataset (e.g. `staging` or `production`).

The studio code also supports `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` for frameworks that expect `NEXT_PUBLIC_*` prefixes; these are used as fallbacks.

Make sure to copy `.env.example` to `.env` and fill in the required variables.

## Running the Studio

From the repository root:

1. Install dependencies:

```bash
npm install
```

2. Start the Studio in development mode (runs in `apps/studio` cwd):

```bash
npm run dev:studio
```

This runs the Sanity dev server with `apps/studio` as the current working directory.

If you prefer to run CLI commands directly (for example `sanity deploy`), pass the working directory:

```bash
npx sanity build --cwd apps/studio
npx sanity deploy --cwd apps/studio
```

## How Studio content is served by the API

The server API (in `server/`) uses the same `SANITY_PROJECT_ID` and `SANITY_DATASET` to query content from Sanity. The API exposes content at endpoints such as `/content/articles`, `/content/fa_q`, `/content/filters`, and `/api/admin/products`. Changes made in Studio (published documents) become available to the API per Sanity's publishing model.

For preview/draft content, the API supports preview mode if requests include the header `X-Preview: true` or the query parameter `?preview=true`. The server will use `SANITY_PREVIEW_TOKEN` when preview mode is enabled.

## Notes

- Do NOT commit your `.env` file. Use `.env.example` as a template.
- If you need the Studio to automatically target a different dataset for local development, set the environment variables accordingly.
