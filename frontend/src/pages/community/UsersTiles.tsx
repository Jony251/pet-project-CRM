import {
  Avatar, Box, Button, Card, CardContent, Grid, Typography,
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import PageHeader from '../../components/common/PageHeader';
import { communityUsers } from '../../api/mock/data';
import { formatNumber, getInitials } from '../../utils/format';

export default function UsersTiles() {
  return (
    <Box>
      <PageHeader title="Users" subtitle="Browse community members." breadcrumbs={[{ label: 'Community', href: '/community/users-tiles' }, { label: 'Users – Tiles' }]} />
      <Grid container spacing={3}>
        {communityUsers.map((user) => (
          <Grid key={user.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ textAlign: 'center', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 } }}>
              <Box sx={{ height: 80, bgcolor: user.bgColor, borderRadius: '12px 12px 0 0' }} />
              <CardContent sx={{ pt: 0, mt: -4 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: user.bgColor, mx: 'auto', border: '3px solid', borderColor: 'background.paper', fontSize: '1.25rem' }}>
                  {getInitials(user.name)}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1.5 }}>{user.name}</Typography>
                <Typography variant="body2" sx={{ color: 'primary.main', mb: 0.5 }}>{user.handle}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, minHeight: 40 }}>{user.bio}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2 }}>
                  <Box><Typography variant="h6" sx={{ fontWeight: 700 }}>{formatNumber(user.followers)}</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Followers</Typography></Box>
                  <Box><Typography variant="h6" sx={{ fontWeight: 700 }}>{user.following}</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Following</Typography></Box>
                  <Box><Typography variant="h6" sx={{ fontWeight: 700 }}>{user.posts}</Typography><Typography variant="caption" sx={{ color: 'text.secondary' }}>Posts</Typography></Box>
                </Box>
                <Button variant="outlined" fullWidth startIcon={<PersonAddOutlinedIcon />}>Follow</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
