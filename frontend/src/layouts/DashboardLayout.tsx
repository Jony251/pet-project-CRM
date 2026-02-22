import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar, { SIDEBAR_WIDTH } from './Sidebar';
import Header from './Header';
import { useSidebarStore } from '../stores/sidebarStore';

export default function DashboardLayout() {
  const { open, setOpen } = useSidebarStore();
  const muiTheme = useTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          ...(isDesktop && { maxWidth: `calc(100% - ${SIDEBAR_WIDTH}px)` }),
        }}
      >
        <Header onMenuClick={() => setOpen(true)} />

        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 2, sm: 3 },
            maxWidth: 1440,
            width: '100%',
            mx: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
