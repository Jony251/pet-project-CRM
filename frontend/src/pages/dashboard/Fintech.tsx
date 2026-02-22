import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PageHeader from '../../components/common/PageHeader';

const portfolioData = [
  { month: 'Jan', value: 42000 }, { month: 'Feb', value: 44200 }, { month: 'Mar', value: 41800 },
  { month: 'Apr', value: 47500 }, { month: 'May', value: 51200 }, { month: 'Jun', value: 49800 },
  { month: 'Jul', value: 54600 }, { month: 'Aug', value: 58200 }, { month: 'Sep', value: 55400 },
  { month: 'Oct', value: 62100 }, { month: 'Nov', value: 65800 }, { month: 'Dec', value: 68200 },
];

const cashflowData = [
  { month: 'Jan', inflow: 12000, outflow: 8000 }, { month: 'Feb', inflow: 14000, outflow: 9500 },
  { month: 'Mar', inflow: 11000, outflow: 10200 }, { month: 'Apr', inflow: 16000, outflow: 8800 },
  { month: 'May', inflow: 18200, outflow: 11000 }, { month: 'Jun', inflow: 15400, outflow: 9200 },
];

const metrics = [
  { label: 'Portfolio Value', value: '$68,200', change: 12.4, icon: <TrendingUpIcon /> },
  { label: 'Total Income', value: '$86,600', change: 8.2, icon: <TrendingUpIcon /> },
  { label: 'Total Expenses', value: '$56,700', change: -3.1, icon: <TrendingDownIcon /> },
  { label: 'Net Savings', value: '$29,900', change: 24.6, icon: <TrendingUpIcon /> },
];

export default function Fintech() {
  return (
    <Box>
      <PageHeader title="Fintech" subtitle="Financial overview and portfolio tracking." breadcrumbs={[{ label: 'Dashboard' }, { label: 'Fintech' }]} />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metrics.map((m) => (
          <Grid key={m.label} size={{ xs: 6, lg: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>{m.label}</Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5 }}>{m.value}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1, color: m.change >= 0 ? 'success.main' : 'error.main' }}>
                  {m.icon}
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{m.change >= 0 ? '+' : ''}{m.change}%</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Portfolio Value</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={portfolioData}>
                    <defs><linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8, color: '#f1f5f9' }} formatter={(v) => [`$${Number(v).toLocaleString()}`, undefined]} />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#portGrad)" dot={false} activeDot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Cash Flow</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cashflowData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8, color: '#f1f5f9' }} formatter={(v) => [`$${Number(v).toLocaleString()}`, undefined]} />
                    <Line type="monotone" dataKey="inflow" stroke="#22c55e" strokeWidth={2} dot={false} name="Inflow" />
                    <Line type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} dot={false} name="Outflow" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
