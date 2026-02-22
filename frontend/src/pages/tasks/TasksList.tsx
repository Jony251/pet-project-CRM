import {
  Avatar, Box, Card, Checkbox, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { tasks } from '../../api/mock/data';
import { formatDate, getInitials } from '../../utils/format';

const priorityColors: Record<string, string> = { low: '#94a3b8', medium: '#0ea5e9', high: '#f59e0b', urgent: '#ef4444' };

export default function TasksList() {
  return (
    <Box>
      <PageHeader title="Tasks – List" subtitle="View all tasks in a list." breadcrumbs={[{ label: 'Tasks' }, { label: 'List' }]} />
      <Card>
        <TableContainer>
          <Table aria-label="tasks table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
                <TableCell>Task</TableCell><TableCell>Status</TableCell><TableCell>Priority</TableCell>
                <TableCell>Assignee</TableCell><TableCell>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} hover sx={{ '&:last-child td': { border: 0 } }}>
                  <TableCell padding="checkbox"><Checkbox size="small" defaultChecked={task.status === 'done'} /></TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>{task.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                        {task.tags?.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ height: 18, fontSize: '0.5625rem' }} />)}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell><StatusBadge status={task.status} /></TableCell>
                  <TableCell>
                    <Chip label={task.priority} size="small" sx={{ bgcolor: `${priorityColors[task.priority]}20`, color: priorityColors[task.priority], fontWeight: 600, fontSize: '0.6875rem' }} />
                  </TableCell>
                  <TableCell>
                    {task.assignee && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.625rem', bgcolor: '#6366f1' }}>{getInitials(task.assignee)}</Avatar>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{task.assignee}</Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell><Typography variant="body2" sx={{ color: 'text.secondary' }}>{task.dueDate ? formatDate(task.dueDate) : '—'}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
