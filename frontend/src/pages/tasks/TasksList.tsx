import { Avatar, Box, Card, Checkbox, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchAll } from '../../api/client';
import { formatDate, getInitials } from '../../utils/format';
import type { Task } from '../../types';

const priorityColors: Record<string, string> = { LOW: '#94a3b8', MEDIUM: '#0ea5e9', HIGH: '#f59e0b', URGENT: '#ef4444' };

export default function TasksList() {
  const { data: tasks, loading } = useFetch(() => fetchAll<Task>('/tasks/all'), []);
  if (loading) return <LoadingState fullPage />;

  return (
    <Box>
      <PageHeader title="Tasks – List" subtitle="View all tasks in a list." breadcrumbs={[{ label: 'Tasks' }, { label: 'List' }]} />
      <Card><TableContainer><Table aria-label="tasks table"><TableHead><TableRow><TableCell padding="checkbox"><Checkbox size="small" /></TableCell><TableCell>Task</TableCell><TableCell>Status</TableCell><TableCell>Priority</TableCell><TableCell>Assignee</TableCell><TableCell>Due Date</TableCell></TableRow></TableHead>
        <TableBody>{(tasks ?? []).map((task) => {
          const assigneeName = (task as unknown as Record<string, { name?: string }>).assignedUser?.name ?? task.assignee ?? '';
          return (
            <TableRow key={task.id} hover sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell padding="checkbox"><Checkbox size="small" defaultChecked={task.status === 'DONE'} /></TableCell>
              <TableCell><Box><Typography variant="body2" sx={{ fontWeight: 600, textDecoration: task.status === 'DONE' ? 'line-through' : 'none' }}>{task.title}</Typography><Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>{task.tags?.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ height: 18, fontSize: '0.5625rem' }} />)}</Box></Box></TableCell>
              <TableCell><StatusBadge status={task.status} /></TableCell>
              <TableCell><Chip label={task.priority} size="small" sx={{ bgcolor: `${priorityColors[task.priority] ?? '#94a3b8'}20`, color: priorityColors[task.priority] ?? '#94a3b8', fontWeight: 600, fontSize: '0.6875rem' }} /></TableCell>
              <TableCell>{assigneeName && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Avatar sx={{ width: 24, height: 24, fontSize: '0.625rem', bgcolor: '#6366f1' }}>{getInitials(assigneeName)}</Avatar><Typography variant="body2" sx={{ color: 'text.secondary' }}>{assigneeName}</Typography></Box>}</TableCell>
              <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{task.dueDate ? formatDate(task.dueDate) : '—'}</Typography></TableCell>
            </TableRow>
          );
        })}</TableBody></Table></TableContainer></Card>
    </Box>
  );
}
