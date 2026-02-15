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
import { clearAuthError, loginThunk } from "../features/auth/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
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
              Login to CRM
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Demo seed users: admin@crm.local / ChangeMe123!
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
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
                const result = await dispatch(loginThunk(form));
                if (loginThunk.fulfilled.match(result)) {
                  navigate("/");
                }
              }}
            >
              Sign in
            </Button>
            <Typography variant="body2">
              No account? <Link to="/register">Register</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
