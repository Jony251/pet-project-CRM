declare namespace Express {
  export interface User {
    id: string;
    role: "ADMIN" | "MANAGER" | "VIEWER";
    email: string;
  }

  export interface Request {
    user?: User;
  }
}
