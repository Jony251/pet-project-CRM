import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../stores/authStore';
import AuthLayout from './AuthLayout';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

export default function ResetPassword() {
  const { resetPassword, isLoading } = useAuthStore();
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await resetPassword(data.email);
    setSent(true);
  };

  return (
    <AuthLayout>
      <Box sx={{ maxWidth: 440, mx: 'auto', width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ color: 'text.primary', mb: 0.5 }}>
            Reset your password ✨
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Enter your email address and we&apos;ll send you a link to reset your password.
          </Typography>
        </Box>

        {sent && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Check your email for a password reset link.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ py: 1.25, mt: 3 }}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Send Reset Link'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
          <Link component={RouterLink} to="/signin" sx={{ fontWeight: 600 }}>
            Back to Sign In
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
