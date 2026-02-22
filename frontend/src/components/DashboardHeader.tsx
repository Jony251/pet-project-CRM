import { Box, Button, Chip, Typography } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function DashboardHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 1,
      }}
    >
      <Box>
        <Typography variant="h2" sx={{ color: 'text.primary' }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Monitor your business metrics and KPIs.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          icon={<CalendarTodayOutlinedIcon sx={{ fontSize: '14px !important' }} />}
          label="Last 7 days"
          variant="outlined"
          clickable
          sx={{
            borderColor: 'divider',
            fontWeight: 500,
            '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(99,102,241,0.04)' },
          }}
        />
        <Button
          variant="contained"
          size="small"
          startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{ px: 2 }}
        >
          Export
        </Button>
      </Box>
    </Box>
  );
}
