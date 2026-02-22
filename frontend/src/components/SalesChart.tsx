import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', direct: 4200, indirect: 2800 },
  { month: 'Feb', direct: 3800, indirect: 3200 },
  { month: 'Mar', direct: 5100, indirect: 2900 },
  { month: 'Apr', direct: 4600, indirect: 3600 },
  { month: 'May', direct: 5800, indirect: 3100 },
  { month: 'Jun', direct: 6200, indirect: 4200 },
  { month: 'Jul', direct: 5400, indirect: 3800 },
  { month: 'Aug', direct: 6800, indirect: 4600 },
  { month: 'Sep', direct: 7200, indirect: 4100 },
  { month: 'Oct', direct: 6400, indirect: 4800 },
  { month: 'Nov', direct: 7800, indirect: 5200 },
  { month: 'Dec', direct: 8200, indirect: 5600 },
];

export default function SalesChart() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Direct vs Indirect
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
              Sales channel performance
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label="Direct" size="small" sx={{ bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1' }} />
            <Chip label="Indirect" size="small" sx={{ bgcolor: 'rgba(14,165,233,0.1)', color: '#0ea5e9' }} />
          </Stack>
        </Box>

        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
              <defs>
                <linearGradient id="directGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="indirectGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              />
              <Area
                type="monotone"
                dataKey="direct"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#directGrad)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                name="Direct"
              />
              <Area
                type="monotone"
                dataKey="indirect"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#indirectGrad)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                name="Indirect"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
