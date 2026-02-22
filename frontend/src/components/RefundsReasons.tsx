import { Box, Card, CardContent, LinearProgress, Typography } from '@mui/material';

const reasons = [
  { label: 'Product not as expected', value: 38, color: '#6366f1' },
  { label: 'Delivery issues', value: 24, color: '#0ea5e9' },
  { label: 'Changed mind', value: 18, color: '#f59e0b' },
  { label: 'Duplicate order', value: 12, color: '#22c55e' },
  { label: 'Other', value: 8, color: '#94a3b8' },
];

export default function RefundsReasons() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Reasons for Refunds
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
            Top refund categories
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {reasons.map((reason) => (
            <Box key={reason.label}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {reason.label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {reason.value}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={reason.value}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'grey.100',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: reason.color,
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
