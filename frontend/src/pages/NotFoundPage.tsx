import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3" fontWeight={700}>
          404
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you requested was not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go to Dashboard
        </Button>
      </Stack>
    </Box>
  );
}
