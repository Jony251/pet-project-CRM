import type { ReactElement } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import type { Role } from "../types/models";

type Props = {
  children: ReactElement;
  roles?: Role[];
};

export default function ProtectedRoute({ children, roles }: Props) {
  const { token, user, initialized, loading } = useAppSelector((state) => state.auth);

  if (!initialized || loading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        You do not have permission to access this page.
      </Alert>
    );
  }

  return children;
}
