import type { PaginatedResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api/v1';

function getToken(): string | null {
  try {
    const raw = localStorage.getItem('mosaic-auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> ?? {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message ?? `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data?: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: <T>(path: string, data?: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

interface FetchOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDir?: string;
  filter?: Record<string, string>;
}

export function buildQuery(options: FetchOptions): string {
  const params = new URLSearchParams();
  if (options.page) params.set('page', String(options.page));
  if (options.pageSize) params.set('limit', String(options.pageSize));
  if (options.search) params.set('search', options.search);
  if (options.sortBy) params.set('sortBy', options.sortBy);
  if (options.sortDir) params.set('sortDir', options.sortDir);
  if (options.filter) {
    for (const [k, v] of Object.entries(options.filter)) {
      if (v && v !== 'all') params.set(k, v);
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchPaginated<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<PaginatedResponse<T>> {
  return api.get<PaginatedResponse<T>>(`${endpoint}${buildQuery(options)}`);
}

export async function fetchAll<T>(endpoint: string): Promise<T[]> {
  return api.get<T[]>(endpoint);
}
