import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/common/PageHeader';

const visitorData = [
  { name: 'Mon', unique: 2400, returning: 1200 }, { name: 'Tue', unique: 3200, returning: 1800 },
  { name: 'Wed', unique: 2800, returning: 1600 }, { name: 'Thu', unique: 3800, returning: 2200 },
  { name: 'Fri', unique: 4200, returning: 2800 }, { name: 'Sat', unique: 3100, returning: 1900 },
  { name: 'Sun', unique: 2600, returning: 1400 },
];

const deviceData = [
  { name: 'Desktop', value: 58 }, { name: 'Mobile', value: 32 }, { name: 'Tablet', value: 10 },
];

const sourceData = [
  { name: 'Organic', value: 4200 }, { name: 'Direct', value: 3100 }, { name: 'Referral', value: 2400 },
  { name: 'Social', value: 1800 }, { name: 'Email', value: 900 },
];

const COLORS = ['#6366f1', '#0ea5e9', '#22c55e', '#f59e0b', '#ec4899'];

const stats = [
  { label: 'Unique Visitors', value: '24.7K', change: '+12%', color: '#22c55e' },
  { label: 'Total Pageviews', value: '89.2K', change: '+8%', color: '#22c55e' },
  { label: 'Bounce Rate', value: '34.2%', change: '-3%', color: '#22c55e' },
  { label: 'Visit Duration', value: '4m 32s', change: '+18%', color: '#22c55e' },
];

export default function Analytics() {
  return (
    <Box>
      <PageHeader title="Analytics" subtitle="Website traffic and engagement insights." breadcrumbs={[{ label: 'Dashboard' }, { label: 'Analytics' }]} />

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((s) => (
          <Grid key={s.label} size={{ xs: 6, lg: 3 }}>
            <Card>
              <CardContent>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>{s.label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>{s.value}</Typography>
                  <Typography variant="caption" sx={{ color: s.color, fontWeight: 600 }}>{s.change}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Visitors Overview</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorData}>
                    <defs>
                      <linearGradient id="uniqueG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} /><stop offset="100%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 13 }} />
                    <Area type="monotone" dataKey="unique" stroke="#6366f1" strokeWidth={2} fill="url(#uniqueG)" name="Unique" />
                    <Area type="monotone" dataKey="returning" stroke="#0ea5e9" strokeWidth={2} fill="transparent" strokeDasharray="4 4" name="Returning" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>By Device</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart><Pie data={deviceData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" strokeWidth={0}>
                    {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie></PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                {deviceData.map((d, i) => (
                  <Box key={d.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS[i] }} />
                      <Typography variant="body2">{d.name}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{d.value}%</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Traffic Sources</Typography>
          <Box sx={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} width={70} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 13 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={24}>
                  {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
