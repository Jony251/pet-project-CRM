import {
  Avatar, Box, Button, Card, CardContent, Divider, Grid, TextField, Typography,
} from '@mui/material';
import { useAuthStore } from '../../stores/authStore';

export default function Account() {
  const user = useAuthStore((s) => s.user);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Profile</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#6366f1', fontSize: '1.75rem', fontWeight: 700 }}>
              {user?.name?.charAt(0) ?? 'A'}
            </Avatar>
            <Box>
              <Button variant="contained" size="small" sx={{ mr: 1 }}>Change Photo</Button>
              <Button variant="outlined" size="small" sx={{ color: 'text.secondary', borderColor: 'divider' }}>Remove</Button>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Full Name" defaultValue={user?.name ?? 'Acme Inc.'} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email" defaultValue={user?.email ?? 'admin@acme.com'} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Location" defaultValue={user?.location ?? 'New York, USA'} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Role" defaultValue="Administrator" fullWidth disabled />
            </Grid>
            <Grid size={12}>
              <TextField label="Bio" defaultValue={user?.bio ?? ''} fullWidth multiline rows={3} />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained">Save Changes</Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Password</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>Update your password to keep your account secure.</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}><TextField label="Current Password" type="password" fullWidth /></Grid>
            <Grid size={{ xs: 12, sm: 4 }}><TextField label="New Password" type="password" fullWidth /></Grid>
            <Grid size={{ xs: 12, sm: 4 }}><TextField label="Confirm Password" type="password" fullWidth /></Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained">Update Password</Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'error.main', mb: 1 }}>Danger Zone</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Permanently delete your account and all associated data.</Typography>
          <Divider sx={{ mb: 2 }} />
          <Button variant="outlined" color="error">Delete Account</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
