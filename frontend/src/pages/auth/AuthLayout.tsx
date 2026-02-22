import { Box, Typography } from '@mui/material';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '45%',
          background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            background: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 40%)',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 400 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1.5,
              bgcolor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 4,
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>M</Typography>
          </Box>
          <Typography sx={{ color: '#fff', fontSize: '1.75rem', fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
            Build your dashboard with Mosaic
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            A powerful admin template that provides a clean and scalable foundation for building modern dashboards and web applications.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 6 },
          py: 6,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
