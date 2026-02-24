<img width="1669" height="897" alt="image" src="https://github.com/user-attachments/assets/74915549-c17c-4391-8713-50eb23da5719" />
<img width="1655" height="900" alt="image" src="https://github.com/user-attachments/assets/f984bed2-01c5-4c33-9078-6d8b2b2dd1f1" />
<img width="1655" height="901" alt="image" src="https://github.com/user-attachments/assets/dfe12271-46dd-4430-a16b-d83cd4b5f954" />
<img width="1650" height="901" alt="image" src="https://github.com/user-attachments/assets/5db9a83d-d7a6-4fde-bcdb-b0ba94c9d825" />
<img width="1667" height="900" alt="image" src="https://github.com/user-attachments/assets/4421accf-a85d-4409-88b3-2643437bc890" />


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
