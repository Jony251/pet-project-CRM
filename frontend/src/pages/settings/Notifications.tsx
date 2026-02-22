import { Box, Card, CardContent, Divider, Switch, Typography } from '@mui/material';

const groups = [
  {
    title: 'Email Notifications',
    items: [
      { label: 'Product updates', description: 'Get notified about new features and updates.', defaultChecked: true },
      { label: 'Security alerts', description: 'Receive alerts about unusual account activity.', defaultChecked: true },
      { label: 'Marketing emails', description: 'Promotional offers and newsletters.', defaultChecked: false },
    ],
  },
  {
    title: 'Push Notifications',
    items: [
      { label: 'New messages', description: 'Get notified when you receive a new message.', defaultChecked: true },
      { label: 'Task assignments', description: 'Get notified when a task is assigned to you.', defaultChecked: true },
      { label: 'Mentions', description: 'Get notified when someone mentions you.', defaultChecked: true },
    ],
  },
];

export default function NotificationsSettings() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {groups.map((group) => (
        <Card key={group.title}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>{group.title}</Typography>
            {group.items.map((item, idx) => (
              <Box key={item.label}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.label}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                  </Box>
                  <Switch defaultChecked={item.defaultChecked} />
                </Box>
                {idx < group.items.length - 1 && <Divider />}
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
