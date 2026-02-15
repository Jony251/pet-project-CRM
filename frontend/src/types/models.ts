export type Role = "ADMIN" | "MANAGER" | "VIEWER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  source?: string | null;
  assignedManagerId?: string | null;
  assignedManager?: User;
  _count?: {
    deals: number;
    interactions: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type DealStatus = "NEW" | "CONTACTED" | "PROPOSAL" | "WON" | "LOST";

export interface Deal {
  id: string;
  title: string;
  amount: number;
  status: DealStatus;
  notes?: string | null;
  clientId: string;
  managerId: string;
  client?: { id: string; name: string; company?: string | null };
  manager?: User;
  _count?: {
    comments: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "BLOCKED";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  deadline?: string | null;
  status: TaskStatus;
  assignedUserId: string;
  assignedUser?: User;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardTotals {
  totalLeads: number;
  totalDeals: number;
  wonDeals: number;
  lostDeals: number;
  conversionRate: number;
  revenueWon: number;
}

export interface DashboardResponse {
  totals: DashboardTotals;
  pipeline: Array<{
    status: DealStatus;
    dealsCount: number;
    amount: number;
  }>;
  dealsPerManager: Array<{
    managerId: string;
    managerName: string;
    managerEmail: string;
    dealsCount: number;
    amount: number;
  }>;
}

export interface RevenuePoint {
  label: string;
  revenue: number;
}
