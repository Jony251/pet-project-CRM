import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from 'recharts';

const data = [
  { month: 'Jan', income: 4200, expense: 2800 },
  { month: 'Feb', income: 3800, expense: 3200 },
  { month: 'Mar', income: 5100, expense: 2900 },
  { month: 'Apr', income: 4600, expense: 3600 },
  { month: 'May', income: 5800, expense: 3100 },
  { month: 'Jun', income: 6200, expense: 4200 },
];

export default function IncomeExpense() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Income / Expense
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
            Last 6 months
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                Income
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
              $35,700
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                Expense
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
              $19,800
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={2}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
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
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={20} name="Income" />
              <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={20} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
