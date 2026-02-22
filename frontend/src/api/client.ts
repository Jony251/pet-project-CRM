import type { PaginatedResponse, SortDirection } from '../types';

interface FetchOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  filter?: Record<string, string>;
}

function simulateDelay(ms = 300): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchPaginated<T extends Record<string, unknown>>(
  allData: T[],
  options: FetchOptions = {},
): Promise<PaginatedResponse<T>> {
  await simulateDelay(Math.random() * 300 + 100);

  const { page = 1, pageSize = 10, search, sortBy, sortDir = 'asc', filter } = options;
  let filtered = [...allData];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((item) =>
      Object.values(item).some((v) => String(v).toLowerCase().includes(q)),
    );
  }

  if (filter) {
    for (const [key, value] of Object.entries(filter)) {
      if (value && value !== 'all') {
        filtered = filtered.filter((item) => String(item[key]).toLowerCase() === value.toLowerCase());
      }
    }
  }

  if (sortBy) {
    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return { data, total, page, pageSize, totalPages };
}

export async function fetchAll<T>(allData: T[]): Promise<T[]> {
  await simulateDelay(Math.random() * 200 + 50);
  return [...allData];
}

export async function fetchById<T extends { id: string }>(
  allData: T[],
  id: string,
): Promise<T | null> {
  await simulateDelay(Math.random() * 150 + 50);
  return allData.find((item) => item.id === id) ?? null;
}
