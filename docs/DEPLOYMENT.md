# Deployment and Local Runbook

This document describes how to run the API and Studio locally and how to build a Docker image for the server.

## Run locally

1. Copy the example env file:

```bash
cp .env.example .env
# fill in SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN, SANITY_PREVIEW_TOKEN
```

2. Install dependencies:

```bash
npm install
```

3. Start both Studio and API in development (parallel):

```bash
npm run dev
```

4. Or start API only in dev mode (watch + ts-node):

```bash
npm run dev:api
```

5. Build and start the production API locally:

```bash
npm run build:api
npm run start:api
```

## Docker build (server)

From repo root, build the server image:

```bash
# builds image tagged jars-cms-server:latest
docker build -f server/Dockerfile -t jars-cms-server:latest .

# run the container, mapping port 4010
docker run -p 4010:4010 --env-file .env jars-cms-server:latest
```

The container will run the compiled server at port 4010. Ensure your `.env` contains the necessary Sanity credentials.

## Mobile integration notes

- The mobile app's `EXPO_PUBLIC_CMS_API_URL` should point to the API base URL (for example `https://cms.example.com`). The mobile client will call `/content/*` and `/api/admin/products` relative to that base.
- For previewing draft content from the mobile client or preview tools, set the HTTP header `X-Preview: true` on requests.
