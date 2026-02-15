import { createTheme } from "@mui/material";

export function buildTheme(mode: "light" | "dark") {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#66bb6a",
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
    },
  });
}
