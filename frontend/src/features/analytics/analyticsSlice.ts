import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { http } from "../../api/http";
import type { DashboardResponse, RevenuePoint } from "../../types/models";

type AnalyticsState = {
  dashboard: DashboardResponse | null;
  revenue: RevenuePoint[];
  loading: boolean;
  error: string | null;
};

const initialState: AnalyticsState = {
  dashboard: null,
  revenue: [],
  loading: false,
  error: null,
};

function getErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? "Unexpected error";
}

export const fetchDashboardThunk = createAsyncThunk<DashboardResponse, void, { rejectValue: string }>(
  "analytics/fetchDashboard",
  async (_, thunkApi) => {
    try {
      const response = await http.get<DashboardResponse>("/analytics/dashboard");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchRevenueThunk = createAsyncThunk<
  RevenuePoint[],
  { period: "monthly" | "quarterly" | "yearly" },
  { rejectValue: string }
>("analytics/fetchRevenue", async ({ period }, thunkApi) => {
  try {
    const response = await http.get<RevenuePoint[]>("/analytics/revenue", {
      params: { period },
    });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDashboardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load dashboard";
      })
      .addCase(fetchRevenueThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.revenue = action.payload;
      })
      .addCase(fetchRevenueThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load revenue report";
      });
  },
});

export default analyticsSlice.reducer;
