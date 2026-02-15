# Deployment Guide

## Prerequisites

- Docker + Docker Compose
- Or local runtime:
  - Node.js 22+
  - PostgreSQL 15+

## 1) Local development (without Docker)

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run dev
```

Backend starts on `http://localhost:4000`.

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend starts on `http://localhost:5173`.

## 2) Docker deployment

At repository root:

```bash
cp .env.example .env
docker compose up --build -d
```

Services:

- Frontend: `http://localhost:${FRONTEND_PORT}` (default `5173`)
- Backend: `http://localhost:${BACKEND_PORT}` (default `4000`)
- Swagger: `http://localhost:${BACKEND_PORT}/docs`
- PostgreSQL: `localhost:${POSTGRES_PORT}` (default `5432`)

## 3) Suggested production setup

- Host frontend behind CDN/reverse proxy.
- Backend behind Nginx/API Gateway with HTTPS.
- Managed PostgreSQL (AWS RDS, DigitalOcean Managed DB, etc.).
- Use strong `JWT_SECRET`.
- Apply environment-specific CORS origins.
- Add centralized logs and metrics (ELK/Datadog/Grafana).
- Add CI/CD pipeline:
  - lint + build
  - container build
  - image scan
  - deploy (blue/green or rolling)
