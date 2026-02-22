import { Box, Card, CardContent, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  chartColor: string;
  chartData: { value: number }[];
}

export default function MetricCard({ title, value, change, chartColor, chartData }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'box-shadow 0.2s, transform 0.2s',
        '&:hover': {
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.08)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography
              variant="overline"
              sx={{ color: 'text.secondary', fontSize: '0.6875rem', letterSpacing: '0.04em' }}
            >
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mt: 0.25 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 9999,
              bgcolor: isPositive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              color: isPositive ? 'success.main' : 'error.main',
            }}
          >
            {isPositive ? (
              <TrendingUpIcon sx={{ fontSize: 14 }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 14 }} />
            )}
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
              {isPositive ? '+' : ''}
              {change}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ height: 48, mx: -1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${chartColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#gradient-${chartColor.replace('#', '')})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
