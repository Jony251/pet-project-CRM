import { Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchAll } from '../../api/client';
import { formatNumber, formatDate } from '../../utils/format';
import type { Campaign } from '../../types';

export default function Campaigns() {
  const { data: campaigns, loading } = useFetch(() => fetchAll<Campaign>('/campaigns'), []);
  if (loading) return <LoadingState fullPage />;

  return (
    <Box>
      <PageHeader title="Campaigns" subtitle="Manage marketing campaigns." primaryAction={{ label: 'New Campaign', onClick: () => {}, icon: <AddIcon /> }} />
      <Grid container spacing={3}>
        {(campaigns ?? []).map((c) => {
          const openRate = c.sent > 0 ? (c.opened / c.sent) * 100 : 0;
          return (
            <Grid key={c.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card sx={{ height: '100%', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}><Typography variant="h6" sx={{ fontWeight: 700 }}>{c.name}</Typography><StatusBadge status={c.status} /></Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}><Typography variant="caption" sx={{ color: 'text.secondary' }}>{c.type}</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>· Started {formatDate(c.startDate)}</Typography></Box>
                  <Grid container spacing={1.5} sx={{ mb: 2 }}>
                    <Grid size={6}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Sent</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{formatNumber(c.sent)}</Typography></Grid>
                    <Grid size={6}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Opened</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{formatNumber(c.opened)}</Typography></Grid>
                    <Grid size={6}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Clicked</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{formatNumber(c.clicked)}</Typography></Grid>
                    <Grid size={6}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Conversion</Typography><Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>{c.conversion}%</Typography></Grid>
                  </Grid>
                  <Box><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}><Typography variant="caption" sx={{ color: 'text.secondary' }}>Open rate</Typography><Typography variant="caption" sx={{ fontWeight: 600 }}>{openRate.toFixed(1)}%</Typography></Box>
                    <LinearProgress variant="determinate" value={openRate} sx={{ height: 4, borderRadius: 2, bgcolor: 'grey.100', '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' } }} /></Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
