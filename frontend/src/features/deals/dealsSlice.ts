import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { http } from "../../api/http";
import type { Deal, DealStatus, PaginationMeta } from "../../types/models";

type ListResponse = {
  items: Deal[];
  meta: PaginationMeta;
};

type PipelineColumn = {
  status: DealStatus;
  totalAmount: number;
  deals: Deal[];
};

type DealsState = {
  items: Deal[];
  meta: PaginationMeta;
  pipeline: PipelineColumn[];
  loading: boolean;
  pipelineLoading: boolean;
  error: string | null;
};

const initialState: DealsState = {
  items: [],
  meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
  pipeline: [],
  loading: false,
  pipelineLoading: false,
  error: null,
};

function getErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? "Unexpected error";
}

type DealPayload = {
  title: string;
  amount: number;
  status?: DealStatus;
  clientId: string;
  managerId: string;
  notes?: string;
};

export const fetchDealsThunk = createAsyncThunk<
  ListResponse,
  { page?: number; limit?: number; search?: string; status?: DealStatus; managerId?: string },
  { rejectValue: string }
>("deals/fetchAll", async (params, thunkApi) => {
  try {
    const response = await http.get<ListResponse>("/deals", { params });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const fetchPipelineThunk = createAsyncThunk<PipelineColumn[], { managerId?: string }, { rejectValue: string }>(
  "deals/fetchPipeline",
  async (params, thunkApi) => {
    try {
      const response = await http.get<PipelineColumn[]>("/deals/pipeline", { params });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createDealThunk = createAsyncThunk<Deal, DealPayload, { rejectValue: string }>(
  "deals/create",
  async (payload, thunkApi) => {
    try {
      const response = await http.post<Deal>("/deals", payload);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateDealThunk = createAsyncThunk<
  Deal,
  { id: string; payload: Partial<DealPayload> },
  { rejectValue: string }
>("deals/update", async ({ id, payload }, thunkApi) => {
  try {
    const response = await http.patch<Deal>(`/deals/${id}`, payload);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const moveDealThunk = createAsyncThunk<
  Deal,
  { id: string; status: DealStatus },
  { rejectValue: string }
>("deals/move", async ({ id, status }, thunkApi) => {
  try {
    const response = await http.patch<Deal>(`/deals/${id}/status`, { status });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteDealThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  "deals/delete",
  async (id, thunkApi) => {
    try {
      await http.delete(`/deals/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    clearDealsError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDealsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDealsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.meta = action.payload.meta;
      })
      .addCase(fetchDealsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch deals";
      })
      .addCase(fetchPipelineThunk.pending, (state) => {
        state.pipelineLoading = true;
        state.error = null;
      })
      .addCase(fetchPipelineThunk.fulfilled, (state, action) => {
        state.pipelineLoading = false;
        state.pipeline = action.payload;
      })
      .addCase(fetchPipelineThunk.rejected, (state, action) => {
        state.pipelineLoading = false;
        state.error = action.payload ?? "Failed to fetch pipeline";
      })
      .addCase(createDealThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.meta.total += 1;
      })
      .addCase(createDealThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create deal";
      })
      .addCase(updateDealThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      })
      .addCase(updateDealThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update deal";
      })
      .addCase(moveDealThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
        state.pipeline = state.pipeline.map((column) => ({
          ...column,
          deals: column.deals.filter((deal) => deal.id !== action.payload.id),
        }));
        const target = state.pipeline.find((column) => column.status === action.payload.status);
        if (target) {
          target.deals.unshift(action.payload);
          target.totalAmount = target.deals.reduce((sum, deal) => sum + deal.amount, 0);
        }
      })
      .addCase(moveDealThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to move deal";
      })
      .addCase(deleteDealThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.pipeline = state.pipeline.map((column) => ({
          ...column,
          deals: column.deals.filter((deal) => deal.id !== action.payload),
        }));
        state.meta.total = Math.max(0, state.meta.total - 1);
      })
      .addCase(deleteDealThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete deal";
      });
  },
});

export const { clearDealsError } = dealsSlice.actions;
export default dealsSlice.reducer;
