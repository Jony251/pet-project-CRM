import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';

interface ActivityItem {
  id: number;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  type: 'purchase' | 'signup' | 'upgrade' | 'comment';
}

const activities: ActivityItem[] = [
  {
    id: 1,
    user: 'Alex Johnson',
    avatar: 'AJ',
    action: 'purchased',
    target: 'Pro Plan',
    time: '2 min ago',
    type: 'purchase',
  },
  {
    id: 2,
    user: 'Sarah Miller',
    avatar: 'SM',
    action: 'signed up for',
    target: 'Newsletter',
    time: '5 min ago',
    type: 'signup',
  },
  {
    id: 3,
    user: 'James Wilson',
    avatar: 'JW',
    action: 'upgraded to',
    target: 'Enterprise',
    time: '12 min ago',
    type: 'upgrade',
  },
  {
    id: 4,
    user: 'Emily Davis',
    avatar: 'ED',
    action: 'commented on',
    target: 'Feature Request #42',
    time: '24 min ago',
    type: 'comment',
  },
  {
    id: 5,
    user: 'Michael Brown',
    avatar: 'MB',
    action: 'purchased',
    target: 'Starter Plan',
    time: '31 min ago',
    type: 'purchase',
  },
  {
    id: 6,
    user: 'Lisa Chen',
    avatar: 'LC',
    action: 'signed up for',
    target: 'Free Trial',
    time: '45 min ago',
    type: 'signup',
  },
];

const typeColors: Record<ActivityItem['type'], string> = {
  purchase: '#6366f1',
  signup: '#22c55e',
  upgrade: '#0ea5e9',
  comment: '#f59e0b',
};

export default function ActivityFeed() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Recent Activity
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
              Latest user interactions
            </Typography>
          </Box>
          <Chip
            label="View All"
            size="small"
            clickable
            sx={{
              bgcolor: 'grey.100',
              color: 'text.secondary',
              fontWeight: 500,
              '&:hover': { bgcolor: 'grey.200' },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {activities.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                p: 1.5,
                borderRadius: 1.5,
                transition: 'background-color 0.15s',
                '&:hover': { bgcolor: 'grey.50' },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: typeColors[item.type],
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {item.avatar}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5 }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>{item.user}</Box>
                  {' '}{item.action}{' '}
                  <Box component="span" sx={{ fontWeight: 600 }}>{item.target}</Box>
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {item.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
