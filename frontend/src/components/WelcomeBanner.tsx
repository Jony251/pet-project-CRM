import { Box, Button, Typography } from '@mui/material';

export default function WelcomeBanner() {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)',
        p: { xs: 3, sm: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          opacity: 0.1,
          background:
            'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          sx={{
            color: '#ffffff',
            fontWeight: 700,
            mb: 0.5,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Good afternoon, Acme Inc. 👋
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            maxWidth: 520,
          }}
        >
          Here is what's happening with your projects today:
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
            backdropFilter: 'blur(4px)',
            fontWeight: 600,
            px: 3,
          }}
        >
          View Report
        </Button>
      </Box>
    </Box>
  );
}
