export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "CRM API",
    version: "1.0.0",
    description: "REST API for CRM platform (auth, clients, deals, tasks, analytics).",
  },
  servers: [{ url: "/api/v1", description: "Current server" }],
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Clients" },
    { name: "Deals" },
    { name: "Tasks" },
    { name: "Analytics" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
          role: { type: "string", enum: ["ADMIN", "MANAGER", "VIEWER"] },
        },
      },
      Client: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          company: { type: "string" },
          source: { type: "string" },
          assignedManagerId: { type: "string" },
        },
      },
      Deal: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          amount: { type: "number" },
          status: {
            type: "string",
            enum: ["NEW", "CONTACTED", "PROPOSAL", "WON", "LOST"],
          },
          clientId: { type: "string" },
          managerId: { type: "string" },
        },
      },
      Task: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          deadline: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["TODO", "IN_PROGRESS", "DONE", "BLOCKED"] },
          assignedUserId: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/health": {
      get: {
        summary: "Health check",
        responses: {
          200: {
            description: "Service is running",
          },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: { 201: { description: "Registered" } },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: { 200: { description: "Authenticated" } },
      },
    },
    "/clients": {
      get: {
        tags: ["Clients"],
        summary: "List clients",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Client collection" } },
      },
      post: {
        tags: ["Clients"],
        summary: "Create client",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Client created" } },
      },
    },
    "/deals": {
      get: {
        tags: ["Deals"],
        summary: "List deals",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Deal collection" } },
      },
      post: {
        tags: ["Deals"],
        summary: "Create deal",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Deal created" } },
      },
    },
    "/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "List tasks",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Task collection" } },
      },
      post: {
        tags: ["Tasks"],
        summary: "Create task",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Task created" } },
      },
    },
    "/analytics/dashboard": {
      get: {
        tags: ["Analytics"],
        summary: "Dashboard metrics",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Analytics data" } },
      },
    },
  },
} as const;
