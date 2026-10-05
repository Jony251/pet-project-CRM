<div align="center">

# pet_CRM

**A full-stack business dashboard and CRM: typed React SPA, modular Express REST API, PostgreSQL via Prisma, one-command Docker setup.**

[Portfolio: bluecat.cc](https://bluecat.cc) ·
[LinkedIn](https://www.linkedin.com/in/evgeny-nemchenko) ·
[nevgeny90@gmail.com](mailto:nevgeny90@gmail.com)

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![MUI 7](https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=white)
![Express 5](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Prisma 7](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)

</div>

<p align="center">
  <img src="https://github.com/user-attachments/assets/f984bed2-01c5-4c33-9078-6d8b2b2dd1f1" alt="Main dashboard: KPI cards with sparklines, sales channel chart and a real-time value donut" width="88%">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/dfe12271-46dd-4430-a16b-d83cd4b5f954" alt="Analytics page: visitor KPIs, visitors overview chart and traffic by device" width="44%">
  &nbsp;
  <img src="https://github.com/user-attachments/assets/74915549-c17c-4391-8713-50eb23da5719" alt="Sign-up screen with a split layout" width="44%">
</p>

## What it is

An admin workspace for a small business: customers, orders, invoices, products, finance transactions, tasks (Kanban and list), messages, calendar, marketing campaigns, a job board and a community section, plus analytics dashboards. Every page reads from the project's own REST API backed by PostgreSQL. The UI layout follows the Mosaic admin dashboard style and is built from scratch with React and MUI.

## Highlights

- **Typed end to end.** React 19 + TypeScript on the frontend, Express 5 + TypeScript on the backend, and an 18-model Prisma schema (users with roles, customers, orders, invoices, products, transactions, tasks, conversations, calendar events, campaigns, notifications, activity log, …).
- **Modular API.** 13 modules under `/api/v1` (auth + 12 domain modules), each split into `routes → controller → service → Prisma`. List endpoints are paginated and searchable, and all domain routes require a JWT.
- **Security basics done properly.** bcrypt password hashing, JWT auth, Helmet, a CORS allow-list, rate limiting, request validation with Zod, and environment validation at boot (the server refuses to start with a missing or too-short `JWT_SECRET`).
- **Documented API.** An OpenAPI 3 spec served with Swagger UI at `/docs`.
- **Frontend architecture.** MUI 7 with a custom theme and a persisted light/dark mode, Zustand stores (auth, theme, sidebar, notifications), protected routes, React Hook Form + Zod on the auth forms, Recharts dashboards, and Vite manual chunks that split vendor, MUI and chart bundles.
- **One-command environment.** Docker Compose starts PostgreSQL 16 (with a health check), the API (syncs the schema and seeds demo data on start) and the frontend as a static build behind Nginx.

## Tech stack

**Frontend:** React 19 · TypeScript · Vite 7 · MUI 7 (Emotion) · React Router 7 · Zustand · React Hook Form · Zod · Recharts · date-fns
**Backend:** Node.js 22 · Express 5 · TypeScript · Prisma 7 (`@prisma/adapter-pg`) · JWT · bcryptjs · Zod · Helmet · express-rate-limit · Morgan · Swagger UI
**Database:** PostgreSQL 16
**DevOps:** Docker · Docker Compose · Nginx (frontend container)

## Architecture

```
Browser (React SPA, MUI)
   │  fetch + Bearer JWT
   ▼
Express API  /api/v1
   ├─ middlewares: helmet · cors · rate limit · authenticate · validate (Zod) · error handler
   ├─ modules/<name>/  routes → controller → service
   └─ /docs  Swagger UI (OpenAPI 3)
   │
   ▼
Prisma 7 ──► PostgreSQL 16
```

```
pet-project-CRM/
  backend/
    prisma/            schema.prisma (18 models), seed.ts
    src/
      config/          env (Zod-validated), logger
      middlewares/     auth, rbac, validate, rateLimiter, error
      modules/         auth, customers, orders, invoices, products, transactions,
                       tasks, conversations, community, jobs, calendar,
                       campaigns, notifications
      docs/openapi.ts  OpenAPI spec for Swagger UI
  frontend/
    src/
      api/             fetch client with JWT header
      stores/          Zustand: auth, theme, sidebar, notifications
      layouts/         DashboardLayout, Header, Sidebar
      pages/           dashboard, ecommerce, finance, tasks, community, jobs,
                       messages, calendar, campaigns, settings, auth, utility
      theme/           MUI palette and typography
  docker-compose.yml   postgres + backend + frontend
```

## Getting started

### With Docker (recommended)

```bash
cp .env.example .env
docker compose up --build -d
```

- Frontend: http://localhost:5173
- API: http://localhost:4000/api/v1 (health check: `/api/v1/health`)
- Swagger UI: http://localhost:4000/docs

Set a strong `JWT_SECRET` in `.env` (at least 16 characters) before running anywhere other than your own machine.

### Local (without Docker)

Requires Node.js 22+ and a running PostgreSQL.

```bash
# backend
cd backend
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run dev            # http://localhost:4000

# frontend (second terminal)
cd frontend
cp .env.example .env
npm install
npm run dev            # http://localhost:5173
```

**Environment variables.** Backend: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`, `PORT`, `NODE_ENV`, `SEED_PASSWORD`. Frontend: `VITE_API_URL`. Docker Compose (root `.env`): `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`, `BACKEND_PORT`, `FRONTEND_PORT`, `JWT_SECRET`.

### Demo accounts

The seed creates three users, one per role: `admin@acme.com` (ADMIN), `manager@acme.com` (MANAGER) and `viewer@acme.com` (VIEWER). Their password is the value of `SEED_PASSWORD` (see `backend/prisma/seed.ts` for the local default).

## Roadmap

- Apply the existing `authorize()` RBAC middleware to write routes, so MANAGER and VIEWER permissions are enforced per endpoint (roles are already in the schema and in the JWT).
- Extend Zod validation from the auth routes to every module.
- Replace `prisma db push` with versioned Prisma migrations.
- Add API and component tests.

More detail on running and deploying: [`docs/deployment-guide.md`](docs/deployment-guide.md).

## Author

**Evgeny Levitan**, full-stack developer (web and Android), Israel. Open to full-stack and frontend roles and to freelance projects.

[bluecat.cc](https://bluecat.cc) · [LinkedIn](https://www.linkedin.com/in/evgeny-nemchenko) · [nevgeny90@gmail.com](mailto:nevgeny90@gmail.com) · [GitHub @Jony251](https://github.com/Jony251)
