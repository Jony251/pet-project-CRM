import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  mode: "light" | "dark";
};

const initialMode = (localStorage.getItem("crm_theme_mode") as "light" | "dark" | null) ?? "light";

const initialState: ThemeState = {
  mode: initialMode,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("crm_theme_mode", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
