import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export default function LoadingState({ message = 'Loading…', fullPage }: LoadingStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: fullPage ? 0 : 8,
        ...(fullPage && { minHeight: '60vh' }),
      }}
    >
      <CircularProgress size={36} sx={{ color: 'primary.main', mb: 2 }} />
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {message}
      </Typography>
    </Box>
  );
}
