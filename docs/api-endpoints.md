# API Endpoint Documentation

Base URL: `/api/v1`  
Auth: `Authorization: Bearer <JWT>`

## Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a viewer (admins can set elevated role through managed flows) |
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/me` | Authenticated | Current user profile |

## Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/users` | Admin, Manager | List users (filters: `role`, `search`, pagination) |
| POST | `/users` | Admin | Create user with role |
| PATCH | `/users/:id/role` | Admin | Update user role |

## Clients (Customers)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/clients` | All roles | List clients with search/filter/pagination |
| GET | `/clients/:id` | All roles | Get client detail (deals + interactions) |
| POST | `/clients` | Admin, Manager | Create client |
| PATCH | `/clients/:id` | Admin, Manager | Update client |
| DELETE | `/clients/:id` | Admin, Manager | Delete client |
| POST | `/clients/:id/interactions` | Admin, Manager | Add interaction history item |

## Deals

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/deals` | All roles | List deals with filtering/pagination |
| GET | `/deals/pipeline` | All roles | Kanban-ready pipeline columns |
| GET | `/deals/:id` | All roles | Deal detail with comments |
| POST | `/deals` | Admin, Manager | Create deal |
| PATCH | `/deals/:id` | Admin, Manager | Update deal |
| PATCH | `/deals/:id/status` | Admin, Manager | Move deal between stages |
| DELETE | `/deals/:id` | Admin, Manager | Delete deal |
| POST | `/deals/:id/comments` | Admin, Manager | Add deal comment/note |

## Tasks

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/tasks` | All roles | List tasks with filters/pagination |
| GET | `/tasks/:id` | All roles | Task detail |
| POST | `/tasks` | Admin, Manager | Create task |
| PATCH | `/tasks/:id` | Admin, Manager | Update task |
| PATCH | `/tasks/:id/status` | Admin, Manager | Update task status |
| DELETE | `/tasks/:id` | Admin, Manager | Delete task |

## Analytics

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/analytics/dashboard` | All roles | KPI totals, pipeline distribution, deals per manager |
| GET | `/analytics/revenue?period=monthly\|quarterly\|yearly` | All roles | Revenue trend series |

## Activity Logs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/activities` | Admin, Manager | List audit trail (`entityType`, `entityId`, `userId`, pagination) |

## OpenAPI

- Swagger UI: `/docs`
- OpenAPI source object: `backend/src/docs/openapi.ts`
