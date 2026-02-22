import { Box, Card, Tab, Tabs } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';

const tabs = [
  { label: 'Account', path: '/settings/account' },
  { label: 'Notifications', path: '/settings/notifications' },
  { label: 'Apps', path: '/settings/apps' },
  { label: 'Plans', path: '/settings/plans' },
  { label: 'Billing', path: '/settings/billing' },
  { label: 'Feedback', path: '/settings/feedback' },
];

export default function SettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = tabs.findIndex((t) => t.path === location.pathname);

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Manage your account settings and preferences." />
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={currentTab === -1 ? 0 : currentTab}
          onChange={(_, v) => navigate(tabs[v].path)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, borderBottom: 1, borderColor: 'divider' }}
        >
          {tabs.map((t) => <Tab key={t.path} label={t.label} />)}
        </Tabs>
      </Card>
      <Outlet />
    </Box>
  );
}
