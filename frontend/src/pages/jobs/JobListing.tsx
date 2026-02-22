import { useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PageHeader from '../../components/common/PageHeader';
import SearchFilter from '../../components/common/SearchFilter';
import LoadingState from '../../components/common/LoadingState';
import { useFetch } from '../../hooks/useFetch';
import { fetchAll } from '../../api/client';
import { formatRelativeTime } from '../../utils/format';
import type { Job } from '../../types';

export default function JobListing() {
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const { data: jobs, loading } = useFetch(() => fetchAll<Job>('/jobs'), []);

  if (loading) return <LoadingState fullPage />;
  const filtered = (jobs ?? []).filter((j) => !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box>
      <PageHeader title="Job Board" subtitle="Find your next opportunity." breadcrumbs={[{ label: 'Jobs' }, { label: 'Listing' }]} />
      <SearchFilter searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search jobs…" />
      <Grid container spacing={3}>
        {filtered.map((job) => (
          <Grid key={job.id} size={{ xs: 12, sm: 6 }}>
            <Card sx={{ height: '100%', ...(job.featured && { border: '2px solid', borderColor: 'primary.main' }), transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1.5, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>{job.company.charAt(0)}</Typography></Box>
                  <Button size="small" sx={{ minWidth: 0, p: 0.5 }} onClick={() => setSaved((p) => p.includes(job.id) ? p.filter((s) => s !== job.id) : [...p, job.id])}>{saved.includes(job.id) ? <BookmarkIcon sx={{ color: 'primary.main' }} /> : <BookmarkBorderIcon sx={{ color: 'text.secondary' }} />}</Button>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{job.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>{job.company}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}><LocationOnOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} /><Typography variant="body2" sx={{ color: 'text.secondary' }}>{job.location}</Typography></Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>{job.tags.map((t) => <Chip key={t} label={t} size="small" variant="outlined" />)}</Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>{job.salary}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{formatRelativeTime(job.posted + (job.posted.includes('T') ? '' : 'T12:00:00Z'))}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
