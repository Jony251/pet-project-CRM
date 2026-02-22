import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const plans = [
  {
    name: 'Starter', price: 29, period: '/mo', description: 'For individuals and small teams.',
    features: ['Up to 5 users', '10 GB storage', 'Basic analytics', 'Email support'],
    current: false, color: '#94a3b8',
  },
  {
    name: 'Professional', price: 79, period: '/mo', description: 'For growing businesses.',
    features: ['Up to 25 users', '100 GB storage', 'Advanced analytics', 'Priority support', 'Custom integrations', 'API access'],
    current: true, color: '#6366f1',
  },
  {
    name: 'Enterprise', price: 199, period: '/mo', description: 'For large organizations.',
    features: ['Unlimited users', '1 TB storage', 'Custom analytics', '24/7 dedicated support', 'SSO & SAML', 'Custom SLA', 'On-premise option'],
    current: false, color: '#0ea5e9',
  },
];

export default function Plans() {
  return (
    <Grid container spacing={3}>
      {plans.map((plan) => (
        <Grid key={plan.name} size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', border: plan.current ? '2px solid' : '1px solid', borderColor: plan.current ? 'primary.main' : 'divider', position: 'relative' }}>
            {plan.current && (
              <Chip label="Current Plan" size="small" color="primary" sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 600 }} />
            )}
            <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>{plan.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{plan.description}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: plan.color }}>${plan.price}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 0.5 }}>{plan.period}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1, mb: 3 }}>
                {plan.features.map((f) => (
                  <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckIcon sx={{ fontSize: 16, color: plan.color }} />
                    <Typography variant="body2">{f}</Typography>
                  </Box>
                ))}
              </Box>
              <Button variant={plan.current ? 'outlined' : 'contained'} fullWidth disabled={plan.current}>
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
