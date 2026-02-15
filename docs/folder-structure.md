# Folder Structure

```text
.
├── backend
│   ├── prisma
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── config
│   │   ├── docs
│   │   ├── middlewares
│   │   ├── modules
│   │   │   ├── activity
│   │   │   ├── analytics
│   │   │   ├── auth
│   │   │   ├── clients
│   │   │   ├── deals
│   │   │   ├── tasks
│   │   │   └── users
│   │   ├── routes
│   │   ├── types
│   │   ├── utils
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── app
│   │   ├── components
│   │   ├── features
│   │   │   ├── analytics
│   │   │   ├── auth
│   │   │   ├── clients
│   │   │   ├── deals
│   │   │   ├── tasks
│   │   │   └── ui
│   │   ├── hooks
│   │   ├── layout
│   │   ├── pages
│   │   └── types
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docs
│   ├── architecture.md
│   ├── api-endpoints.md
│   ├── deployment-guide.md
│   ├── er-diagram.md
│   └── folder-structure.md
├── docker-compose.yml
└── README.md
```
