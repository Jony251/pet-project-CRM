import { useState } from 'react';
import {
  Avatar, Box, Card, CardContent, Checkbox, Chip, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip, Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';
import SearchFilter from '../../components/common/SearchFilter';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchPaginated } from '../../api/client';
import { customers as allCustomers } from '../../api/mock/data';
import { formatCurrency, getInitials } from '../../utils/format';
import type { SortDirection } from '../../types';

const avatarColors = ['#6366f1', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];

export default function Customers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [selected, setSelected] = useState<string[]>([]);

  const { data: result, loading } = useFetch(
    () => fetchPaginated(allCustomers, { page: page + 1, pageSize: rowsPerPage, search, sortBy, sortDir, filter: { status: statusFilter } }),
    [page, rowsPerPage, search, statusFilter, sortBy, sortDir],
  );

  const data = result?.data ?? [];
  const total = result?.total ?? 0;

  const handleSort = (field: string) => {
    if (sortBy === field) { setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }
    else { setSortBy(field); setSortDir('asc'); }
  };

  const handleSelectAll = (checked: boolean) => setSelected(checked ? data.map((c) => c.id) : []);
  const handleSelect = (id: string) => setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  return (
    <Box>
      <PageHeader
        title="Customers" subtitle="Manage your customer relationships."
        breadcrumbs={[{ label: 'E-Commerce', href: '/ecommerce/customers' }, { label: 'Customers' }]}
        primaryAction={{ label: 'Add Customer', onClick: () => {}, icon: <AddIcon /> }}
      />
      <Card>
        <CardContent sx={{ pb: 0 }}>
          {selected.length > 0 && <Chip label={`${selected.length} selected`} size="small" onDelete={() => setSelected([])} sx={{ mb: 1 }} />}
          <SearchFilter
            searchValue={search} onSearchChange={(v) => { setSearch(v); setPage(0); }}
            searchPlaceholder="Search customers…"
            filters={[{ id: 'status', label: 'Status', value: statusFilter, options: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Pending', value: 'pending' }] }]}
            onFilterChange={(_, v) => { setStatusFilter(v); setPage(0); }}
          />
        </CardContent>
        {loading ? <LoadingState /> : (
          <>
            <TableContainer>
              <Table aria-label="customers table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"><Checkbox size="small" indeterminate={selected.length > 0 && selected.length < data.length} checked={data.length > 0 && selected.length === data.length} onChange={(_, c) => handleSelectAll(c)} /></TableCell>
                    {(['name', 'email', 'location', 'orders', 'spent', 'status'] as const).map((col) => (
                      <TableCell key={col} align={col === 'orders' || col === 'spent' ? 'right' : col === 'status' ? 'center' : 'left'}>
                        <TableSortLabel active={sortBy === col} direction={sortBy === col ? sortDir : 'asc'} onClick={() => handleSort(col)}>{col.charAt(0).toUpperCase() + col.slice(1)}</TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell sx={{ width: 48 }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((customer, idx) => (
                    <TableRow key={customer.id} hover selected={selected.includes(customer.id)} sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell padding="checkbox"><Checkbox size="small" checked={selected.includes(customer.id)} onChange={() => handleSelect(customer.id)} /></TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: avatarColors[idx % avatarColors.length], fontSize: '0.75rem' }}>{getInitials(customer.name)}</Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{customer.email}</Typography></TableCell>
                      <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{customer.location}</Typography></TableCell>
                      <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{customer.orders}</Typography></TableCell>
                      <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCurrency(customer.spent)}</Typography></TableCell>
                      <TableCell align="center"><StatusBadge status={customer.status} /></TableCell>
                      <TableCell align="right"><Tooltip title="Actions"><IconButton size="small" aria-label={`actions for ${customer.name}`}><MoreHorizIcon sx={{ fontSize: 18 }} /></IconButton></Tooltip></TableCell>
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
