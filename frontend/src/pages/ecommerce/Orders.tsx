import { useState } from 'react';
import {
  Box, Card, CardContent, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, TableSortLabel, Typography,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import SearchFilter from '../../components/common/SearchFilter';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchPaginated } from '../../api/client';
import { orders as allOrders } from '../../api/mock/data';
import { formatCurrency, formatDate } from '../../utils/format';
import type { SortDirection } from '../../types';

export default function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  const { data: result, loading } = useFetch(
    () => fetchPaginated(allOrders, { page: page + 1, pageSize: rowsPerPage, search, sortBy, sortDir, filter: { status: statusFilter } }),
    [page, rowsPerPage, search, statusFilter, sortBy, sortDir],
  );

  const data = result?.data ?? [];
  const total = result?.total ?? 0;

  const handleSort = (field: string) => {
    setSortDir(sortBy === field && sortDir === 'asc' ? 'desc' : 'asc');
    setSortBy(field);
  };

  return (
    <Box>
      <PageHeader title="Orders" subtitle="Track and manage all orders." breadcrumbs={[{ label: 'E-Commerce', href: '/ecommerce/orders' }, { label: 'Orders' }]} />
      <Card>
        <CardContent sx={{ pb: 0 }}>
          <SearchFilter
            searchValue={search} onSearchChange={(v) => { setSearch(v); setPage(0); }}
            searchPlaceholder="Search orders…"
            filters={[{ id: 'status', label: 'Status', value: statusFilter, options: [{ label: 'Completed', value: 'completed' }, { label: 'Processing', value: 'processing' }, { label: 'Pending', value: 'pending' }, { label: 'Cancelled', value: 'cancelled' }, { label: 'Refunded', value: 'refunded' }] }]}
            onFilterChange={(_, v) => { setStatusFilter(v); setPage(0); }}
          />
        </CardContent>
        {loading ? <LoadingState /> : (
          <>
            <TableContainer>
              <Table aria-label="orders table">
                <TableHead>
                  <TableRow>
                    {[{ id: 'id', label: 'Order' }, { id: 'date', label: 'Date' }, { id: 'customer', label: 'Customer' }, { id: 'total', label: 'Total', align: 'right' as const }, { id: 'status', label: 'Status', align: 'center' as const }, { id: 'paymentMethod', label: 'Payment' }].map((col) => (
                      <TableCell key={col.id} align={col.align}><TableSortLabel active={sortBy === col.id} direction={sortBy === col.id ? sortDir : 'asc'} onClick={() => handleSort(col.id)}>{col.label}</TableSortLabel></TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((order) => (
                    <TableRow key={order.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell><Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>{order.id}</Typography></TableCell>
                      <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatDate(order.date)}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{order.customer}</Typography></TableCell>
                      <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(order.total)}</Typography></TableCell>
                      <TableCell align="center"><StatusBadge status={order.status} /></TableCell>
                      <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{order.paymentMethod}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination component="div" count={total} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} rowsPerPageOptions={[5, 10, 25]} />
          </>
        )}
      </Card>
    </Box>
  );
}
