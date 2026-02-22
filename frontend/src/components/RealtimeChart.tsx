import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Direct', value: 60 },
  { name: 'Referral', value: 25 },
  { name: 'Organic', value: 15 },
];

const COLORS = ['#6366f1', '#0ea5e9', '#22c55e'];

export default function RealtimeChart() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
          Real-Time Value
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          Live traffic breakdown
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
              $3.7K
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Total value
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
          {data.map((entry, index) => (
            <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: COLORS[index],
                }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                {entry.name} ({entry.value}%)
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
