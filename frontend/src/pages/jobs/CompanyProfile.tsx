import { Avatar, Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PageHeader from '../../components/common/PageHeader';

export default function CompanyProfile() {
  return (
    <Box>
      <PageHeader title="Company Profile" breadcrumbs={[{ label: 'Jobs', href: '/jobs/listing' }, { label: 'Company Profile' }]} />
      <Card sx={{ mb: 3 }}>
        <Box sx={{ height: 120, background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', borderRadius: '12px 12px 0 0' }} />
        <CardContent sx={{ pt: 0, mt: -5 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#fff', border: '4px solid', borderColor: 'background.paper', color: '#6366f1', fontSize: '2rem', fontWeight: 800 }}>A</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3">Acme Corp</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Technology · SaaS · Enterprise Software</Typography>
            </Box>
            <Button variant="contained">Follow</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" sx={{ color: 'text.secondary' }}>New York, US</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PeopleOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" sx={{ color: 'text.secondary' }}>501-1000 employees</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><LanguageOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} /><Typography variant="body2" sx={{ color: 'primary.main' }}>acmecorp.com</Typography></Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>About</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                Acme Corp is a leading technology company building next-generation SaaS solutions for enterprise businesses. Founded in 2018, we've grown to serve over 10,000 customers across 50 countries. Our mission is to simplify complex business processes through intuitive software.
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Tech Stack</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Kubernetes', 'GraphQL', 'Redis'].map((t) => (
                  <Chip key={t} label={t} sx={{ bgcolor: 'primary.main', color: '#fff' }} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Quick Facts</Typography>
              {[
                { label: 'Founded', value: '2018' },
                { label: 'Headquarters', value: 'New York, US' },
                { label: 'Team Size', value: '500+' },
                { label: 'Funding', value: 'Series C ($120M)' },
                { label: 'Revenue', value: '$50M ARR' },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
