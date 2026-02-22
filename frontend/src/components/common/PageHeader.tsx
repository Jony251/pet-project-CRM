import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  primaryAction?: { label: string; onClick: () => void; icon?: React.ReactNode };
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  primaryAction,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 3 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{ fontSize: 14 }} />}
          sx={{ mb: 1 }}
          aria-label="breadcrumb"
        >
          {breadcrumbs.map((crumb, idx) =>
            crumb.href && idx < breadcrumbs.length - 1 ? (
              <Link
                key={idx}
                underline="hover"
                color="text.secondary"
                sx={{ fontSize: '0.8125rem', cursor: 'pointer' }}
                onClick={() => navigate(crumb.href!)}
              >
                {crumb.label}
              </Link>
            ) : (
              <Typography key={idx} color="text.primary" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                {crumb.label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h2" sx={{ color: 'text.primary' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
          {actions}
          {primaryAction && (
            <Button
              variant="contained"
              startIcon={primaryAction.icon}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
