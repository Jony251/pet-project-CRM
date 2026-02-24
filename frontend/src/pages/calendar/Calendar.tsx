import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchAll } from '../../api/client';
import type { CalendarEvent } from '../../types';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

export default function CalendarPage() {
  const { data: events, loading } = useFetch(() => fetchAll<CalendarEvent>('/calendar'), []);
  if (loading) return <LoadingState fullPage />;
  const allEvents = events ?? [];

  function getEventsForDay(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter((e) => e.start.startsWith(dateStr));
  }

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Box>
      <PageHeader title="Calendar" subtitle={monthName} />
      <Card><CardContent>
        <Grid container>
          {daysOfWeek.map((d) => <Grid key={d} size={{ xs: 12 / 7 }}><Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', textAlign: 'center', py: 1 }}>{d}</Typography></Grid>)}
          {blanks.map((b) => <Grid key={`blank-${b}`} size={{ xs: 12 / 7 }}><Box sx={{ minHeight: 80 }} /></Grid>)}
          {days.map((day) => {
            const ev = getEventsForDay(day);
            const isToday = day === today.getDate();
            return (
              <Grid key={day} size={{ xs: 12 / 7 }}>
                <Box sx={{ minHeight: 80, p: 0.5, border: '1px solid', borderColor: 'divider', cursor: 'pointer', transition: 'all 0.15s', '&:hover': { bgcolor: 'action.hover' } }}>
                  <Typography variant="caption" sx={{ fontWeight: isToday ? 700 : 400, color: isToday ? '#fff' : 'text.primary', ...(isToday && { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', bgcolor: 'primary.main' }) }}>{day}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, mt: 0.25 }}>
                    {ev.map((e) => <Chip key={e.id} label={e.title} size="small" sx={{ height: 18, fontSize: '0.5625rem', bgcolor: e.color, color: '#fff', justifyContent: 'flex-start', '& .MuiChip-label': { px: 0.5 } }} />)}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CardContent></Card>
    </Box>
  );
}
