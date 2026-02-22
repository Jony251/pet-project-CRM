import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const channels = [
  { source: 'Google Search', visitors: '4,295', revenue: '$12,489', sales: 189, conversion: 4.4 },
  { source: 'facebook.com', visitors: '3,188', revenue: '$8,240', sales: 142, conversion: 4.5 },
  { source: 'twitter.com', visitors: '2,104', revenue: '$6,382', sales: 98, conversion: 4.7 },
  { source: 'github.com', visitors: '1,876', revenue: '$4,120', sales: 76, conversion: 4.1 },
  { source: 'youtube.com', visitors: '1,094', revenue: '$3,248', sales: 54, conversion: 4.9 },
];

export default function TopChannels() {
  const maxVisitors = 4295;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ px: 0, pb: '16px !important' }}>
        <Box sx={{ px: 3, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Top Channels
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
            Traffic sources overview
          </Typography>
        </Box>

        <TableContainer>
          <Table size="small" aria-label="top channels table">
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell align="right">Visitors</TableCell>
                <TableCell align="right">Revenue</TableCell>
                <TableCell align="right">Sales</TableCell>
                <TableCell align="right">Conv.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {channels.map((row) => {
                const numericVisitors = parseInt(row.visitors.replace(/,/g, ''), 10);
                const progress = (numericVisitors / maxVisitors) * 100;

                return (
                  <TableRow
                    key={row.source}
                    sx={{
                      '&:hover': { bgcolor: 'grey.50' },
                      transition: 'background-color 0.15s',
                      '&:last-child td': { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {row.source}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            mt: 0.75,
                            height: 4,
                            borderRadius: 2,
                            bgcolor: 'grey.100',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#6366f1',
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{row.visitors}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.revenue}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">{row.sales}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: 'success.main' }}
                      >
                        {row.conversion}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
