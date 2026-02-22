import {
  Avatar, Box, Button, Card, CardContent, Chip, Divider, Grid, Tab, Tabs, Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { useAuthStore } from '../../stores/authStore';

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <PageHeader title="Profile" breadcrumbs={[{ label: 'Community', href: '/community/profile' }, { label: 'Profile' }]} />

      <Card sx={{ mb: 3 }}>
        <Box sx={{ height: 120, background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)', borderRadius: '12px 12px 0 0' }} />
        <CardContent sx={{ pt: 0, mt: -6 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-end' }, gap: 2 }}>
            <Avatar sx={{ width: 96, height: 96, bgcolor: '#6366f1', fontSize: '2rem', fontWeight: 700, border: '4px solid', borderColor: 'background.paper' }}>
              {user?.name?.charAt(0) ?? 'A'}
            </Avatar>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h3">{user?.name ?? 'Acme Inc.'}</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>{user?.bio ?? 'Building the future of SaaS.'}</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{user?.location ?? 'New York, USA'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>Joined Jan 2024</Typography>
                </Box>
              </Box>
            </Box>
            <Button variant="outlined" startIcon={<EditOutlinedIcon />}>Edit Profile</Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 4, mt: 3, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box><Typography variant="h5" sx={{ fontWeight: 700 }}>1,420</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Followers</Typography></Box>
            <Box><Typography variant="h5" sx={{ fontWeight: 700 }}>210</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Following</Typography></Box>
            <Box><Typography variant="h5" sx={{ fontWeight: 700 }}>48</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Posts</Typography></Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="General" /><Tab label="Activity" /><Tab label="Settings" />
          </Tabs>
        </Box>
        <CardContent>
          {tab === 0 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>About</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                  Passionate about building products that make a difference. Currently leading the development team at Acme Inc., focusing on creating intuitive and scalable SaaS solutions.
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1.5 }}>Skills</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Figma'].map((s) => (
                    <Chip key={s} label={s} size="small" sx={{ bgcolor: 'primary.main', color: '#fff', fontWeight: 500, '&:hover': { bgcolor: 'primary.dark' } }} />
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Details</Typography>
                {[
                  { label: 'Email', value: user?.email ?? 'admin@acme.com' },
                  { label: 'Role', value: 'Administrator' },
                  { label: 'Department', value: 'Engineering' },
                  { label: 'Timezone', value: 'EST (UTC-5)' },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, width: 120, flexShrink: 0 }}>{item.label}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.value}</Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          )}
          {tab === 1 && <Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>Activity timeline coming soon.</Typography>}
          {tab === 2 && <Typography variant="body2" sx={{ color: 'text.secondary', py: 4, textAlign: 'center' }}>Profile settings coming soon.</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
}
