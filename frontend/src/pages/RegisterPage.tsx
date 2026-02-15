import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { clearAuthError, registerThunk } from "../features/auth/authSlice";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Card sx={{ width: 420, maxWidth: "100%" }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={700}>
              Create account
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Full name"
              value={form.name}
              onChange={(event) => {
                dispatch(clearAuthError());
                setForm((prev) => ({ ...prev, name: event.target.value }));
              }}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => {
                dispatch(clearAuthError());
                setForm((prev) => ({ ...prev, email: event.target.value }));
              }}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              helperText="Minimum 8 chars, with upper/lowercase and number."
              value={form.password}
              onChange={(event) => {
                dispatch(clearAuthError());
                setForm((prev) => ({ ...prev, password: event.target.value }));
              }}
              fullWidth
            />
            <Button
              variant="contained"
              disabled={loading}
              onClick={async () => {
                const result = await dispatch(registerThunk(form));
                if (registerThunk.fulfilled.match(result)) {
                  navigate("/");
                }
              }}
            >
              Register
            </Button>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
