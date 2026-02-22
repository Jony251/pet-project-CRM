import { Box, Button, Card, CardContent, Chip, Grid, LinearProgress, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchAll } from '../../api/client';
import { formatDate } from '../../utils/format';
import type { Meetup } from '../../types';

const tagColors = ['#6366f1', '#0ea5e9', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'];

export default function Meetups() {
  const { data: meetups, loading } = useFetch(() => fetchAll<Meetup>('/community/meetups'), []);
  if (loading) return <LoadingState fullPage />;

  return (
    <Box>
      <PageHeader title="Meetups" subtitle="Discover upcoming events." breadcrumbs={[{ label: 'Community', href: '/community/meetups' }, { label: 'Meetups' }]} />
      <Grid container spacing={3}>
        {(meetups ?? []).map((meetup, idx) => {
          const pct = (meetup.attendees / meetup.maxAttendees) * 100;
          return (
            <Grid key={meetup.id} size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 } }}>
                <Box sx={{ height: 100, background: `linear-gradient(135deg, ${tagColors[idx % tagColors.length]}, ${tagColors[(idx + 1) % tagColors.length]})`, borderRadius: '12px 12px 0 0' }} />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{meetup.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{meetup.description}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" sx={{ color: 'text.secondary' }}>{formatDate(meetup.date)}</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" sx={{ color: 'text.secondary' }}>{meetup.location}</Typography></Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><PeopleOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" sx={{ color: 'text.secondary' }}>{meetup.attendees} / {meetup.maxAttendees} attendees</Typography></Box>
                  </Box>
                  <LinearProgress variant="determinate" value={pct} sx={{ mb: 2, height: 4, borderRadius: 2, bgcolor: 'grey.100', '& .MuiLinearProgress-bar': { bgcolor: pct > 80 ? 'warning.main' : 'primary.main' } }} />
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>{meetup.tags.map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />)}</Box>
                  <Button variant="contained" fullWidth disabled={pct >= 100}>{pct >= 100 ? 'Sold Out' : 'Attend'}</Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
