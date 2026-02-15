# ER Diagram

```mermaid
erDiagram
    User ||--o{ Client : "assignedManager"
    User ||--o{ Deal : "manages"
    User ||--o{ Task : "assigned"
    User ||--o{ Task : "createdBy"
    User ||--o{ ActivityLog : "creates"
    User ||--o{ Interaction : "records"
    User ||--o{ DealComment : "writes"

    Client ||--o{ Deal : "has"
    Client ||--o{ Interaction : "has"

    Deal ||--o{ DealComment : "has"

    User {
      string id PK
      string name
      string email UK
      string password
      enum role
      datetime createdAt
      datetime updatedAt
    }

    Client {
      string id PK
      string name
      string email
      string phone
      string company
      string source
      string assignedManagerId FK
      datetime createdAt
      datetime updatedAt
    }

    Interaction {
      string id PK
      string clientId FK
      string userId FK
      string type
      string note
      datetime createdAt
    }

    Deal {
      string id PK
      string title
      float amount
      enum status
      string notes
      string clientId FK
      string managerId FK
      datetime createdAt
      datetime updatedAt
    }

    DealComment {
      string id PK
      string dealId FK
      string userId FK
      string comment
      datetime createdAt
    }

    Task {
      string id PK
      string title
      string description
      datetime deadline
      enum status
      string assignedUserId FK
      string createdById FK
      datetime createdAt
      datetime updatedAt
    }

    ActivityLog {
      string id PK
      string userId FK
      string action
      string entityType
      string entityId
      json metadata
      datetime timestamp
    }
```

## Indexing highlights

- `Client(name, company)`, `Client(email)`, `Client(source)`, `Client(assignedManagerId)`
- `Deal(status)`, `Deal(managerId, status)`, `Deal(clientId)`
- `Task(status, deadline)`, `Task(assignedUserId)`
- `ActivityLog(entityType, entityId)`, `ActivityLog(userId, timestamp)`
