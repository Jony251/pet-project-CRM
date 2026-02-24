export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "pet_CRM API",
    version: "2.0.0",
    description:
      "Full REST API powering pet_CRM. Covers authentication, e-commerce (customers/orders/invoices/products), finance (transactions), tasks, messaging, community (users/feed/forum/meetups), job board, calendar events, campaigns, and notifications.\n\n" +
      "## Authentication\n" +
      "All protected endpoints require a `Bearer <token>` header. Obtain a token via `POST /auth/login`.\n\n" +
      "## Pagination\n" +
      "List endpoints accept `?page=1&limit=20`. Responses include `{ data, total, page, pageSize, totalPages }`.\n\n" +
      "## Filtering & Search\n" +
      "Most list endpoints support `?search=term` and entity-specific filters like `?status=active`.",
  },
  servers: [{ url: "/api/v1", description: "API v1" }],
  tags: [
    { name: "Auth", description: "Register, login, profile" },
    { name: "Customers", description: "Customer management (CRUD)" },
    { name: "Orders", description: "Order tracking" },
    { name: "Invoices", description: "Invoice management" },
    { name: "Products", description: "Product catalog" },
    { name: "Transactions", description: "Financial transactions" },
    { name: "Tasks", description: "Task management (Kanban/List)" },
    { name: "Conversations", description: "Messaging and chat" },
    { name: "Community", description: "Community users, feed, forum, meetups" },
    { name: "Jobs", description: "Job board listings" },
    { name: "Calendar", description: "Calendar events" },
    { name: "Campaigns", description: "Marketing campaigns" },
    { name: "Notifications", description: "User notifications" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      PaginatedResponse: {
        type: "object",
        properties: {
          data: { type: "array", items: {} },
          total: { type: "integer" },
          page: { type: "integer" },
          pageSize: { type: "integer" },
          totalPages: { type: "integer" },
        },
      },
      Customer: {
        type: "object",
        properties: {
          id: { type: "string" }, name: { type: "string" }, email: { type: "string" },
          location: { type: "string" }, orders: { type: "integer" }, spent: { type: "number" },
          status: { type: "string", enum: ["active", "inactive", "pending"] },
        },
      },
      Order: {
        type: "object",
        properties: {
          id: { type: "string" }, customer: { type: "string" }, date: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["COMPLETED", "PROCESSING", "PENDING", "CANCELLED", "REFUNDED"] },
          items: { type: "integer" }, total: { type: "number" }, paymentMethod: { type: "string" },
        },
      },
      Invoice: {
        type: "object",
        properties: {
          id: { type: "string" }, number: { type: "string" }, customer: { type: "string" },
          date: { type: "string", format: "date-time" }, dueDate: { type: "string", format: "date-time" },
          status: { type: "string", enum: ["PAID", "DUE", "OVERDUE", "DRAFT"] }, amount: { type: "number" },
        },
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "string" }, name: { type: "string" }, category: { type: "string" },
          price: { type: "number" }, stock: { type: "integer" }, rating: { type: "number" },
          status: { type: "string", enum: ["ACTIVE", "DRAFT", "ARCHIVED"] }, description: { type: "string" },
        },
      },
      Transaction: {
        type: "object",
        properties: {
          id: { type: "string" }, description: { type: "string" }, date: { type: "string", format: "date-time" },
          amount: { type: "number" }, type: { type: "string", enum: ["CREDIT", "DEBIT"] },
          status: { type: "string", enum: ["COMPLETED", "PENDING", "CANCELLED"] }, category: { type: "string" },
        },
      },
      Task: {
        type: "object",
        properties: {
          id: { type: "string" }, title: { type: "string" }, description: { type: "string" },
          status: { type: "string", enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] },
          priority: { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "URGENT"] },
          dueDate: { type: "string", format: "date-time" }, tags: { type: "array", items: { type: "string" } },
        },
      },
      Campaign: {
        type: "object",
        properties: {
          id: { type: "string" }, name: { type: "string" },
          status: { type: "string", enum: ["ACTIVE", "DRAFT", "COMPLETED", "PAUSED"] },
          type: { type: "string" }, sent: { type: "integer" }, opened: { type: "integer" },
          clicked: { type: "integer" }, conversion: { type: "number" },
        },
      },
    },
  },
  paths: {
    "/health": { get: { summary: "Health check", responses: { 200: { description: "OK" } } } },

    "/auth/register": { post: { tags: ["Auth"], summary: "Register new user", requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name", "email", "password"], properties: { name: { type: "string" }, email: { type: "string" }, password: { type: "string" } } } } } }, responses: { 201: { description: "User created with token" } } } },
    "/auth/login": { post: { tags: ["Auth"], summary: "Login", requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["email", "password"], properties: { email: { type: "string" }, password: { type: "string" } } } } } }, responses: { 200: { description: "JWT token" } } } },
    "/auth/me": { get: { tags: ["Auth"], summary: "Current user profile", security: [{ bearerAuth: [] }], responses: { 200: { description: "User object" } } } },

    "/customers": {
      get: { tags: ["Customers"], summary: "List customers", security: [{ bearerAuth: [] }], parameters: [{ name: "page", in: "query", schema: { type: "integer" } }, { name: "limit", in: "query", schema: { type: "integer" } }, { name: "search", in: "query", schema: { type: "string" } }, { name: "status", in: "query", schema: { type: "string" } }], responses: { 200: { description: "Paginated customers" } } },
      post: { tags: ["Customers"], summary: "Create customer", security: [{ bearerAuth: [] }], responses: { 201: { description: "Created" } } },
    },
    "/customers/{id}": {
      get: { tags: ["Customers"], summary: "Get customer", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Customer" } } },
      patch: { tags: ["Customers"], summary: "Update customer", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Updated" } } },
      delete: { tags: ["Customers"], summary: "Delete customer", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 204: { description: "Deleted" } } },
    },

    "/orders": { get: { tags: ["Orders"], summary: "List orders (paginated, filterable by status)", security: [{ bearerAuth: [] }], parameters: [{ name: "page", in: "query", schema: { type: "integer" } }, { name: "status", in: "query", schema: { type: "string" } }, { name: "search", in: "query", schema: { type: "string" } }], responses: { 200: { description: "Paginated orders" } } }, post: { tags: ["Orders"], summary: "Create order", security: [{ bearerAuth: [] }], responses: { 201: { description: "Created" } } } },
    "/invoices": { get: { tags: ["Invoices"], summary: "List invoices (paginated, filterable by status)", security: [{ bearerAuth: [] }], responses: { 200: { description: "Paginated invoices" } } } },
    "/products": { get: { tags: ["Products"], summary: "List products (searchable)", security: [{ bearerAuth: [] }], parameters: [{ name: "search", in: "query", schema: { type: "string" } }], responses: { 200: { description: "Product array" } } } },
    "/transactions": { get: { tags: ["Transactions"], summary: "List transactions (paginated, searchable)", security: [{ bearerAuth: [] }], responses: { 200: { description: "Paginated transactions" } } } },

    "/tasks": { get: { tags: ["Tasks"], summary: "List tasks (paginated)", security: [{ bearerAuth: [] }], responses: { 200: { description: "Paginated tasks" } } }, post: { tags: ["Tasks"], summary: "Create task", security: [{ bearerAuth: [] }], responses: { 201: { description: "Created" } } } },
    "/tasks/all": { get: { tags: ["Tasks"], summary: "Get all tasks (for Kanban board)", security: [{ bearerAuth: [] }], responses: { 200: { description: "All tasks" } } } },
    "/tasks/{id}": { patch: { tags: ["Tasks"], summary: "Update task", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Updated" } } }, delete: { tags: ["Tasks"], summary: "Delete task", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 204: { description: "Deleted" } } } },

    "/conversations": { get: { tags: ["Conversations"], summary: "List conversations", security: [{ bearerAuth: [] }], responses: { 200: { description: "Conversation array" } } } },
    "/conversations/{id}/messages": { get: { tags: ["Conversations"], summary: "Get messages for conversation", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Message array" } } }, post: { tags: ["Conversations"], summary: "Send message", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 201: { description: "Message sent" } } } },

    "/community/users": { get: { tags: ["Community"], summary: "List community members", security: [{ bearerAuth: [] }], responses: { 200: { description: "Community user array" } } } },
    "/community/feed": { get: { tags: ["Community"], summary: "Get feed posts", security: [{ bearerAuth: [] }], responses: { 200: { description: "Feed post array" } } } },
    "/community/feed/{id}/like": { post: { tags: ["Community"], summary: "Like a feed post", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Updated post" } } } },
    "/community/forum": { get: { tags: ["Community"], summary: "List forum topics", security: [{ bearerAuth: [] }], responses: { 200: { description: "Forum post array" } } } },
    "/community/meetups": { get: { tags: ["Community"], summary: "List meetups", security: [{ bearerAuth: [] }], responses: { 200: { description: "Meetup array" } } } },

    "/jobs": { get: { tags: ["Jobs"], summary: "List job postings (searchable)", security: [{ bearerAuth: [] }], parameters: [{ name: "search", in: "query", schema: { type: "string" } }], responses: { 200: { description: "Job array" } } } },
    "/calendar": { get: { tags: ["Calendar"], summary: "List calendar events", security: [{ bearerAuth: [] }], responses: { 200: { description: "Event array" } } }, post: { tags: ["Calendar"], summary: "Create event", security: [{ bearerAuth: [] }], responses: { 201: { description: "Created" } } } },
    "/campaigns": { get: { tags: ["Campaigns"], summary: "List campaigns", security: [{ bearerAuth: [] }], responses: { 200: { description: "Campaign array" } } } },
    "/notifications": { get: { tags: ["Notifications"], summary: "List user notifications", security: [{ bearerAuth: [] }], responses: { 200: { description: "Notification array" } } } },
    "/notifications/count": { get: { tags: ["Notifications"], summary: "Unread notification count", security: [{ bearerAuth: [] }], responses: { 200: { description: "{ count: number }" } } } },
    "/notifications/{id}/read": { patch: { tags: ["Notifications"], summary: "Mark notification as read", security: [{ bearerAuth: [] }], parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Updated" } } } },
    "/notifications/read-all": { post: { tags: ["Notifications"], summary: "Mark all notifications as read", security: [{ bearerAuth: [] }], responses: { 200: { description: "OK" } } } },
  },
} as const;
