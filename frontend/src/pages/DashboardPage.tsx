import { Box, Grid } from '@mui/material';
import WelcomeBanner from '../components/WelcomeBanner';
import MetricCard from '../components/MetricCard';
import SalesChart from '../components/SalesChart';
import RealtimeChart from '../components/RealtimeChart';
import SalesRefundsChart from '../components/SalesRefundsChart';
import TopChannels from '../components/TopChannels';
import ActivityFeed from '../components/ActivityFeed';
import IncomeExpense from '../components/IncomeExpense';
import CustomersTable from '../components/CustomersTable';
import SalesOverTime from '../components/SalesOverTime';
import RefundsReasons from '../components/RefundsReasons';

const metricCards = [
  {
    title: 'Total Revenue',
    value: '$24,780',
    change: 49,
    chartColor: '#6366f1',
    chartData: [
      { value: 18 }, { value: 22 }, { value: 19 }, { value: 28 },
      { value: 25 }, { value: 32 }, { value: 30 }, { value: 38 },
      { value: 35 }, { value: 42 }, { value: 40 }, { value: 48 },
    ],
  },
  {
    title: 'Total Orders',
    value: '$17,489',
    change: -14,
    chartColor: '#0ea5e9',
    chartData: [
      { value: 32 }, { value: 28 }, { value: 35 }, { value: 25 },
      { value: 30 }, { value: 22 }, { value: 28 }, { value: 20 },
      { value: 24 }, { value: 18 }, { value: 22 }, { value: 15 },
    ],
  },
  {
    title: 'Active Users',
    value: '$9,962',
    change: 29,
    chartColor: '#22c55e',
    chartData: [
      { value: 12 }, { value: 18 }, { value: 15 }, { value: 22 },
      { value: 20 }, { value: 28 }, { value: 25 }, { value: 32 },
      { value: 30 }, { value: 35 }, { value: 33 }, { value: 38 },
    ],
  },
  {
    title: 'Avg. Revenue',
    value: '$2,341',
    change: 7,
    chartColor: '#f59e0b',
    chartData: [
      { value: 20 }, { value: 22 }, { value: 24 }, { value: 23 },
      { value: 25 }, { value: 24 }, { value: 26 }, { value: 28 },
      { value: 27 }, { value: 29 }, { value: 30 }, { value: 32 },
    ],
  },
  {
    title: 'Conversion',
    value: '12.3%',
    change: 3.2,
    chartColor: '#ec4899',
    chartData: [
      { value: 10 }, { value: 12 }, { value: 11 }, { value: 14 },
      { value: 13 }, { value: 16 }, { value: 15 }, { value: 18 },
      { value: 17 }, { value: 20 }, { value: 19 }, { value: 22 },
    ],
  },
];

export default function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <WelcomeBanner />

      <Grid container spacing={3}>
        {metricCards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 2.4 }}>
            <MetricCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SalesChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RealtimeChart />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SalesRefundsChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RefundsReasons />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SalesOverTime />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <IncomeExpense />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <TopChannels />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ActivityFeed />
        </Grid>
      </Grid>

      <CustomersTable />
    </Box>
  );
}
