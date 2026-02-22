import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../stores/authStore';
import AuthLayout from './AuthLayout';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    clearError();
    await login(data.email, data.password);
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <AuthLayout>
      <Box sx={{ maxWidth: 440, mx: 'auto', width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ color: 'text.primary', mb: 0.5 }}>
            Welcome back! ✨
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Sign in to your account to continue.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'hide password' : 'show password'}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5, mb: 2.5 }}>
            <FormControlLabel
              control={<Checkbox size="small" defaultChecked />}
              label={<Typography variant="body2">Remember me</Typography>}
            />
            <Link component={RouterLink} to="/reset-password" variant="body2" sx={{ fontWeight: 500 }}>
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ py: 1.25 }}
          >
            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', px: 1 }}>
              Or continue with
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="outlined" fullWidth sx={{ py: 1, color: 'text.secondary', borderColor: 'divider' }}>
              Google
            </Button>
            <Button variant="outlined" fullWidth sx={{ py: 1, color: 'text.secondary', borderColor: 'divider' }}>
              GitHub
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}>
            Don&apos;t have an account?{' '}
            <Link component={RouterLink} to="/signup" sx={{ fontWeight: 600 }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
}
