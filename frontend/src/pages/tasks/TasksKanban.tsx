import { useState } from 'react';
import { Avatar, Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import { tasks as initialTasks } from '../../api/mock/data';
import { getInitials } from '../../utils/format';
import type { Task } from '../../types';

const columns: { id: Task['status']; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: '#94a3b8' },
  { id: 'in_progress', label: 'In Progress', color: '#6366f1' },
  { id: 'review', label: 'In Review', color: '#f59e0b' },
  { id: 'done', label: 'Done', color: '#22c55e' },
];

const priorityColors: Record<string, string> = { low: '#94a3b8', medium: '#0ea5e9', high: '#f59e0b', urgent: '#ef4444' };

export default function TasksKanban() {
  const [tasks] = useState(initialTasks);

  return (
    <Box>
      <PageHeader title="Tasks – Kanban" subtitle="Drag and drop to organize tasks." breadcrumbs={[{ label: 'Tasks' }, { label: 'Kanban' }]} />
      <Grid container spacing={2.5} sx={{ overflowX: 'auto' }}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <Grid key={col.id} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Box sx={{ bgcolor: 'background.default', borderRadius: 2, p: 1.5, minHeight: 400 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, px: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: col.color }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{col.label}</Typography>
                  <Chip label={colTasks.length} size="small" sx={{ height: 20, fontSize: '0.6875rem', bgcolor: 'grey.200', color: 'text.secondary' }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {colTasks.map((task) => (
                    <Card key={task.id} sx={{ cursor: 'grab', transition: 'all 0.15s', '&:hover': { boxShadow: 3, transform: 'translateY(-1px)' } }}>
                      <CardContent sx={{ py: 2, px: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                          {task.tags?.map((tag) => (
                            <Chip key={tag} label={tag} size="small" sx={{ height: 20, fontSize: '0.625rem', bgcolor: 'primary.main', color: '#fff' }} />
                          ))}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>{task.title}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip label={task.priority} size="small" sx={{ height: 20, fontSize: '0.625rem', bgcolor: `${priorityColors[task.priority]}20`, color: priorityColors[task.priority], fontWeight: 600 }} />
                          {task.assignee && <Avatar sx={{ width: 24, height: 24, fontSize: '0.625rem', bgcolor: '#6366f1' }}>{getInitials(task.assignee)}</Avatar>}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
