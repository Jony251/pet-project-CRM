import { Box, Card, CardContent, Typography } from '@mui/material';
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
  { date: '01 Jan', current: 1200, previous: 800 },
  { date: '02 Jan', current: 1400, previous: 1100 },
  { date: '03 Jan', current: 1100, previous: 900 },
  { date: '04 Jan', current: 1800, previous: 1200 },
  { date: '05 Jan', current: 2200, previous: 1400 },
  { date: '06 Jan', current: 1900, previous: 1600 },
  { date: '07 Jan', current: 2400, previous: 1300 },
  { date: '08 Jan', current: 2100, previous: 1700 },
  { date: '09 Jan', current: 2800, previous: 1500 },
  { date: '10 Jan', current: 3200, previous: 1800 },
  { date: '11 Jan', current: 2900, previous: 2000 },
  { date: '12 Jan', current: 3400, previous: 2200 },
];

export default function SalesOverTime() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Sales Over Time
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
              Current period vs previous
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#6366f1' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Current</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#94a3b8' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Previous</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
              <defs>
                <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="previousGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="date"
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
                dataKey="previous"
                stroke="#94a3b8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="url(#previousGrad)"
                dot={false}
                name="Previous"
              />
              <Area
                type="monotone"
                dataKey="current"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#currentGrad)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
                name="Current"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
