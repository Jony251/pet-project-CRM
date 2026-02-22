import { Box, Button, Card, CardContent, Chip, Grid, Switch, Typography } from '@mui/material';

const apps = [
  { name: 'Slack', description: 'Get notifications in your Slack workspace.', connected: true, color: '#4A154B' },
  { name: 'GitHub', description: 'Sync your repositories and pull requests.', connected: true, color: '#24292e' },
  { name: 'Google Analytics', description: 'Connect your analytics data.', connected: false, color: '#E37400' },
  { name: 'Stripe', description: 'Process payments and manage subscriptions.', connected: true, color: '#6366f1' },
  { name: 'Zapier', description: 'Automate workflows across apps.', connected: false, color: '#FF4A00' },
  { name: 'Jira', description: 'Sync tasks and project management.', connected: false, color: '#0052CC' },
];

export default function Apps() {
  return (
    <Grid container spacing={3}>
      {apps.map((app) => (
        <Grid key={app.name} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 1.5, bgcolor: app.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>{app.name.charAt(0)}</Typography>
                </Box>
                <Switch defaultChecked={app.connected} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{app.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{app.description}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip label={app.connected ? 'Connected' : 'Not connected'} size="small" color={app.connected ? 'success' : 'default'} variant="outlined" />
                <Button size="small" variant="outlined">{app.connected ? 'Configure' : 'Connect'}</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
