import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        bgcolor: 'background.default',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '6rem', sm: '8rem' },
          fontWeight: 800,
          background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mb: 4 }}>
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/')}>
        Back to Dashboard
      </Button>
    </Box>
  );
}
