import { useState } from 'react';
import { Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import SearchFilter from '../../components/common/SearchFilter';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchPaginated } from '../../api/client';
import { formatCurrency, formatDate } from '../../utils/format';
import type { Invoice } from '../../types';

export default function Invoices() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: result, loading } = useFetch(
    () => fetchPaginated<Invoice>('/invoices', { page: page + 1, pageSize: 10, search, filter: { status: statusFilter } }),
    [page, search, statusFilter],
  );
  const data = result?.data ?? [];
  const total = result?.total ?? 0;

  return (
    <Box>
      <PageHeader title="Invoices" subtitle="Manage billing and invoices." breadcrumbs={[{ label: 'E-Commerce', href: '/ecommerce/invoices' }, { label: 'Invoices' }]} />
      <Card>
        <CardContent sx={{ pb: 0 }}>
          <SearchFilter searchValue={search} onSearchChange={(v) => { setSearch(v); setPage(0); }}
            filters={[{ id: 'status', label: 'Status', value: statusFilter, options: [{ label: 'Paid', value: 'paid' }, { label: 'Due', value: 'due' }, { label: 'Overdue', value: 'overdue' }, { label: 'Draft', value: 'draft' }] }]}
            onFilterChange={(_, v) => { setStatusFilter(v); setPage(0); }} />
        </CardContent>
        {loading ? <LoadingState /> : (
          <>
            <TableContainer>
              <Table aria-label="invoices table"><TableHead><TableRow><TableCell>Invoice</TableCell><TableCell>Customer</TableCell><TableCell>Date</TableCell><TableCell>Due Date</TableCell><TableCell align="right">Amount</TableCell><TableCell align="center">Status</TableCell></TableRow></TableHead>
                <TableBody>{data.map((inv) => (
                  <TableRow key={inv.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                    <TableCell><Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>{inv.number}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{inv.customer}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatDate(inv.date)}</Typography></TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatDate(inv.dueDate)}</Typography></TableCell>
                    <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(inv.amount)}</Typography></TableCell>
                    <TableCell align="center"><StatusBadge status={inv.status} /></TableCell>
                  </TableRow>
                ))}</TableBody>
              </Table>
            </TableContainer>
            <TablePagination component="div" count={total} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={10} onRowsPerPageChange={() => {}} />
          </>
        )}
      </Card>
    </Box>
  );
}
