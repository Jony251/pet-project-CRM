import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { http, TOKEN_KEY } from "../../api/http";
import type { User } from "../../types/models";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

type AuthResponse = {
  user: User;
  token: string;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  loading: false,
  error: null,
  initialized: !localStorage.getItem(TOKEN_KEY),
};

function getErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? "Unexpected error";
}

export const loginThunk = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (payload, thunkApi) => {
  try {
    const response = await http.post<AuthResponse>("/auth/login", payload);
    localStorage.setItem(TOKEN_KEY, response.data.token);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const registerThunk = createAsyncThunk<
  AuthResponse,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async (payload, thunkApi) => {
  try {
    const response = await http.post<AuthResponse>("/auth/register", payload);
    localStorage.setItem(TOKEN_KEY, response.data.token);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchMeThunk = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchMe",
  async (_, thunkApi) => {
    try {
      const response = await http.get<User>("/auth/me");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.initialized = true;
      localStorage.removeItem(TOKEN_KEY);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.initialized = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
        state.initialized = true;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.initialized = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
        state.initialized = true;
      })
      .addCase(fetchMeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(fetchMeThunk.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = action.payload ?? null;
        state.initialized = true;
        localStorage.removeItem(TOKEN_KEY);
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
