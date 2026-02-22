import { Box, Card, CardContent, Chip, Grid, LinearProgress, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

const items = [
  { title: 'Advanced Analytics', description: 'AI-powered insights and predictive analytics.', status: 'in_progress', progress: 65, quarter: 'Q1 2026' },
  { title: 'Team Collaboration', description: 'Real-time editing and commenting on shared documents.', status: 'planned', progress: 20, quarter: 'Q1 2026' },
  { title: 'Mobile App', description: 'Native iOS and Android applications.', status: 'planned', progress: 10, quarter: 'Q2 2026' },
  { title: 'Plugin Marketplace', description: 'Third-party integrations marketplace.', status: 'planned', progress: 5, quarter: 'Q2 2026' },
  { title: 'Multi-language Support', description: 'i18n with 12+ language packs.', status: 'in_progress', progress: 45, quarter: 'Q1 2026' },
  { title: 'Audit Logs', description: 'Comprehensive activity logging and compliance tools.', status: 'completed', progress: 100, quarter: 'Q4 2025' },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  completed: { color: '#22c55e', label: 'Completed' },
  in_progress: { color: '#6366f1', label: 'In Progress' },
  planned: { color: '#94a3b8', label: 'Planned' },
};

export default function Roadmap() {
  return (
    <Box>
      <PageHeader title="Roadmap" subtitle="What we're working on and what's coming next." breadcrumbs={[{ label: 'Utility' }, { label: 'Roadmap' }]} />
      <Grid container spacing={3}>
        {items.map((item) => {
          const cfg = statusConfig[item.status];
          return (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Chip label={cfg.label} size="small" sx={{ bgcolor: `${cfg.color}15`, color: cfg.color, fontWeight: 600 }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.quarter}</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{item.description}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Progress</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>{item.progress}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={item.progress} sx={{ height: 4, borderRadius: 2, bgcolor: 'grey.100', '& .MuiLinearProgress-bar': { bgcolor: cfg.color } }} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
