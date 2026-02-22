import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

const entries = [
  { version: 'v2.4.0', date: 'Dec 20, 2025', type: 'feature', title: 'Dark mode support', description: 'Full dark mode theme with persistent user preference. Includes automatic system preference detection.' },
  { version: 'v2.3.0', date: 'Dec 15, 2025', type: 'feature', title: 'Real-time notifications', description: 'In-app notification system with mark as read, dismiss, and notification preferences.' },
  { version: 'v2.2.1', date: 'Dec 10, 2025', type: 'fix', title: 'Chart rendering fix', description: 'Fixed an issue where charts would not resize properly on window resize.' },
  { version: 'v2.2.0', date: 'Dec 5, 2025', type: 'feature', title: 'Kanban board', description: 'New drag-and-drop Kanban board for task management with column customization.' },
  { version: 'v2.1.0', date: 'Nov 28, 2025', type: 'improvement', title: 'Performance optimization', description: 'Reduced initial bundle size by 40% with code splitting and lazy loading.' },
  { version: 'v2.0.0', date: 'Nov 15, 2025', type: 'feature', title: 'Mosaic 2.0 launch', description: 'Complete redesign with new component library, improved navigation, and comprehensive dashboard widgets.' },
];

const typeColors: Record<string, string> = { feature: '#6366f1', fix: '#ef4444', improvement: '#22c55e' };

export default function Changelog() {
  return (
    <Box>
      <PageHeader title="Changelog" subtitle="Latest updates and improvements." breadcrumbs={[{ label: 'Utility' }, { label: 'Changelog' }]} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {entries.map((entry) => (
          <Card key={entry.version}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Chip label={entry.version} size="small" sx={{ fontWeight: 700, bgcolor: 'primary.main', color: '#fff' }} />
                <Chip label={entry.type} size="small" sx={{ bgcolor: `${typeColors[entry.type]}15`, color: typeColors[entry.type], fontWeight: 600 }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{entry.date}</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{entry.title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{entry.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
