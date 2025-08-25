# Sunnify Web App: Railway Deployment Guide

This monorepo contains two services for Railway:

- Backend (Flask): `web-app/sunnify-backend/`
- Frontend (Next.js): `web-app/sunnify-webclient/`

Deploy them as two separate Railway services, each with its own root directory.

## 1) Backend Service (Flask)

Path: `web-app/sunnify-backend/`

Start command (Procfile already included):

```
web: gunicorn app:app -b 0.0.0.0:$PORT -w 2 -k gthread --threads 4
```

Environment variables:

- `DOWNLOAD_DIR` (optional): Directory to store downloads. Default `/tmp/sunnify`. On Railway, the filesystem is ephemeral.

Install/build:

- Python is auto-detected via `requirements.txt`. No extra steps needed.
- Alternatively, use the provided `Dockerfile` to containerize.

## 2) Frontend Service (Next.js)

Path: `web-app/sunnify-webclient/`

Scripts:

- Build: `npm install && npm run build`
- Start: `npm start` (binds to `$PORT` via `package.json`)

Environment variables (optional):

- `NEXT_PUBLIC_API_BASE_URL` or `API_URL` to point the frontend to the backend base URL.
  - Example: `https://<your-backend>.up.railway.app`
  - If not set, you can configure a Railway domain rewrite, or run both behind a single proxy.

## 3) How the Frontend Talks to the Backend

- The frontend uses Server-Sent Events (SSE) via `GET /api/scrape-playlist/stream?playlistUrl=<URL>`.
- Next.js rewrites are configured in `web-app/sunnify-webclient/next.config.mjs` to forward `/api/*` to the backend when `NEXT_PUBLIC_API_BASE_URL` or `API_URL` is set.

## 4) Testing After Deploy

- Open the frontend service URL.
- Enter a Spotify playlist URL and start the process.
- Watch live progress (SSE) and then download the files using the links returned.

## 5) Security Notes

- File downloads are served only from the configured `DOWNLOAD_DIR` and are protected against directory traversal.
- CORS is enabled for cross-origin access between frontend and backend.

## 6) Local Development

- Backend: `cd web-app/sunnify-backend && pip install -r requirements.txt && python app.py`
- Frontend: `cd web-app/sunnify-webclient && npm install && npm run dev`

