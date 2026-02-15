# CRM System (SPA + REST API)

A full-featured CRM platform for small and medium-sized businesses to manage:

- Authentication & RBAC (`ADMIN`, `MANAGER`, `VIEWER`)
- Customers (CRUD + interaction history)
- Deals (CRUD + comments + pipeline stages)
- Sales pipeline (Kanban drag-and-drop in UI)
- Tasks (assignment, deadlines, status)
- Analytics dashboard (conversion, revenue, manager performance)
- Activity log / audit trail

## Tech Stack

- **Frontend**: React + TypeScript, Redux Toolkit, Material UI, Axios, React Router, dnd-kit, Recharts
- **Backend**: Node.js + Express + TypeScript, JWT, Zod validation, rate limiting, Swagger
- **Database**: PostgreSQL + Prisma ORM
- **DevOps**: Docker + Docker Compose, environment-based configuration

## Quick Start

### With Docker (recommended)

```bash
cp .env.example .env
docker compose up --build -d
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api/v1
- Swagger docs: http://localhost:4000/docs

### Local

See `docs/deployment-guide.md`.

## Seeded Demo Accounts

After backend seed:

- `admin@crm.local` / `ChangeMe123!`
- `manager@crm.local` / `ChangeMe123!`
- `viewer@crm.local` / `ChangeMe123!`

## Documentation Deliverables

- System architecture: `docs/architecture.md`
- ER diagram: `docs/er-diagram.md`
- Folder structure: `docs/folder-structure.md`
- API endpoints: `docs/api-endpoints.md`
- Key module snippets: `docs/key-modules.md`
- Deployment guide: `docs/deployment-guide.md`
