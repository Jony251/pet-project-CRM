import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PageHeader from '../../components/common/PageHeader';

const categories = [
  { title: 'Getting Started', description: 'Learn the basics and set up your account.', articles: 12, icon: <MenuBookOutlinedIcon />, color: '#6366f1' },
  { title: 'API Reference', description: 'Explore our REST API documentation.', articles: 24, icon: <CodeOutlinedIcon />, color: '#0ea5e9' },
  { title: 'Configuration', description: 'Customize settings and preferences.', articles: 8, icon: <SettingsOutlinedIcon />, color: '#22c55e' },
  { title: 'Security', description: 'Best practices for securing your account.', articles: 6, icon: <SecurityOutlinedIcon />, color: '#ef4444' },
  { title: 'Integrations', description: 'Connect with third-party services.', articles: 15, icon: <IntegrationInstructionsOutlinedIcon />, color: '#f59e0b' },
  { title: 'Support', description: 'Get help and contact our team.', articles: 4, icon: <SupportAgentOutlinedIcon />, color: '#ec4899' },
];

export default function KnowledgeBase() {
  return (
    <Box>
      <PageHeader title="Knowledge Base" subtitle="Find answers to common questions." breadcrumbs={[{ label: 'Utility' }, { label: 'Knowledge Base' }]} />
      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid key={cat.title} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: '100%', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 } }}>
              <CardContent>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, color: cat.color }}>
                  {cat.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{cat.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>{cat.description}</Typography>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>{cat.articles} articles →</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
