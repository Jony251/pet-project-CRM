import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const billingHistory = [
  { date: 'Dec 1, 2025', amount: '$79.00', status: 'Paid' },
  { date: 'Nov 1, 2025', amount: '$79.00', status: 'Paid' },
  { date: 'Oct 1, 2025', amount: '$79.00', status: 'Paid' },
  { date: 'Sep 1, 2025', amount: '$79.00', status: 'Paid' },
];

export default function Billing() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Payment Method</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 2 }}>
                <CreditCardIcon sx={{ color: 'primary.main' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Visa ending in 4242</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Expires 12/2027</Typography>
                </Box>
                <Chip label="Default" size="small" color="primary" variant="outlined" />
              </Box>
              <Button variant="outlined" size="small">Change Payment Method</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Current Plan</Typography>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'primary.main', borderRadius: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>Professional</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>$79/mo</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Next billing date: Jan 1, 2026</Typography>
              </Box>
              <Button variant="outlined" size="small">Change Plan</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Billing History</Typography>
          {billingHistory.map((item, idx) => (
            <Box key={idx}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                <Typography variant="body2">{item.date}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.amount}</Typography>
                  <Chip label={item.status} size="small" color="success" variant="outlined" />
                  <Button size="small" variant="text">Download</Button>
                </Box>
              </Box>
              {idx < billingHistory.length - 1 && <Divider />}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
