import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', sales: 3200, refunds: 420 },
  { month: 'Feb', sales: 4100, refunds: 380 },
  { month: 'Mar', sales: 3800, refunds: 510 },
  { month: 'Apr', sales: 5200, refunds: 340 },
  { month: 'May', sales: 4800, refunds: 460 },
  { month: 'Jun', sales: 6100, refunds: 290 },
  { month: 'Jul', sales: 5500, refunds: 370 },
  { month: 'Aug', sales: 6800, refunds: 420 },
  { month: 'Sep', sales: 7200, refunds: 310 },
  { month: 'Oct', sales: 6400, refunds: 480 },
  { month: 'Nov', sales: 7800, refunds: 350 },
  { month: 'Dec', sales: 8200, refunds: 290 },
];

export default function SalesRefundsChart() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Sales VS Refunds
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
              Monthly comparison
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label="Sales" size="small" sx={{ bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1' }} />
            <Chip label="Refunds" size="small" sx={{ bgcolor: 'rgba(239,68,68,0.1)', color: '#ef4444' }} />
          </Stack>
        </Box>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: 8,
                  color: '#f1f5f9',
                  fontSize: 13,
                }}
                itemStyle={{ color: '#f1f5f9' }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                cursor={{ fill: 'rgba(99,102,241,0.04)' }}
              />
              <Bar
                dataKey="sales"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
                name="Sales"
              />
              <Bar
                dataKey="refunds"
                fill="#f87171"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
                name="Refunds"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
