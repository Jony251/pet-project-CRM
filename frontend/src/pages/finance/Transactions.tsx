import { useState } from 'react';
import { Box, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PageHeader from '../../components/common/PageHeader';
import SearchFilter from '../../components/common/SearchFilter';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchPaginated } from '../../api/client';
import { formatCurrency, formatDate } from '../../utils/format';
import type { Transaction } from '../../types';

export default function Transactions() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { data: result, loading } = useFetch(
    () => fetchPaginated<Transaction>('/transactions', { page: page + 1, pageSize: 10, search }),
    [page, search],
  );
  const data = result?.data ?? [];
  const total = result?.total ?? 0;

  return (
    <Box>
      <PageHeader title="Transactions" subtitle="View all financial transactions." breadcrumbs={[{ label: 'Finance', href: '/finance/transactions' }, { label: 'Transactions' }]} />
      <Card>
        <CardContent sx={{ pb: 0 }}><SearchFilter searchValue={search} onSearchChange={(v) => { setSearch(v); setPage(0); }} searchPlaceholder="Search transactions…" /></CardContent>
        {loading ? <LoadingState /> : (
          <>
            <TableContainer><Table aria-label="transactions table"><TableHead><TableRow><TableCell>Description</TableCell><TableCell>Category</TableCell><TableCell>Date</TableCell><TableCell align="right">Amount</TableCell><TableCell align="center">Status</TableCell></TableRow></TableHead>
              <TableBody>{data.map((tx) => (
                <TableRow key={tx.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Box sx={{ width: 32, height: 32, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: tx.type === 'CREDIT' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}>{tx.type === 'CREDIT' ? <ArrowDownwardIcon sx={{ fontSize: 16, color: 'success.main' }} /> : <ArrowUpwardIcon sx={{ fontSize: 16, color: 'error.main' }} />}</Box><Typography variant="body2" sx={{ fontWeight: 600 }}>{tx.description}</Typography></Box></TableCell>
                  <TableCell><Chip label={tx.category} size="small" variant="outlined" /></TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatDate(tx.date)}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" sx={{ fontWeight: 600, color: tx.type === 'CREDIT' ? 'success.main' : 'error.main' }}>{tx.type === 'CREDIT' ? '+' : '-'}{formatCurrency(tx.amount)}</Typography></TableCell>
                  <TableCell align="center"><StatusBadge status={tx.status} /></TableCell>
                </TableRow>
              ))}</TableBody>
            </Table></TableContainer>
            <TablePagination component="div" count={total} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={10} onRowsPerPageChange={() => {}} />
          </>
        )}
      </Card>
    </Box>
  );
}
