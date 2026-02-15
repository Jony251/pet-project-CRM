import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { http } from "../../api/http";
import type { Client, PaginationMeta } from "../../types/models";

type ListResponse = {
  items: Client[];
  meta: PaginationMeta;
};

type ClientsState = {
  items: Client[];
  meta: PaginationMeta;
  loading: boolean;
  error: string | null;
};

const initialState: ClientsState = {
  items: [],
  meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
  loading: false,
  error: null,
};

function getErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? "Unexpected error";
}

type ClientPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  assignedManagerId?: string;
};

export const fetchClientsThunk = createAsyncThunk<
  ListResponse,
  { page?: number; limit?: number; search?: string; source?: string; assignedManagerId?: string },
  { rejectValue: string }
>("clients/fetchAll", async (params, thunkApi) => {
  try {
    const response = await http.get<ListResponse>("/clients", { params });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const createClientThunk = createAsyncThunk<Client, ClientPayload, { rejectValue: string }>(
  "clients/create",
  async (payload, thunkApi) => {
    try {
      const response = await http.post<Client>("/clients", payload);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateClientThunk = createAsyncThunk<
  Client,
  { id: string; payload: Partial<ClientPayload> },
  { rejectValue: string }
>("clients/update", async ({ id, payload }, thunkApi) => {
  try {
    const response = await http.patch<Client>(`/clients/${id}`, payload);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteClientThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  "clients/delete",
  async (id, thunkApi) => {
    try {
      await http.delete(`/clients/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    clearClientsError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.meta = action.payload.meta;
      })
      .addCase(fetchClientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch clients";
      })
      .addCase(createClientThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.meta.total += 1;
      })
      .addCase(createClientThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create client";
      })
      .addCase(updateClientThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      })
      .addCase(updateClientThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update client";
      })
      .addCase(deleteClientThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.meta.total = Math.max(0, state.meta.total - 1);
      })
      .addCase(deleteClientThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete client";
      });
  },
});

export const { clearClientsError } = clientsSlice.actions;
export default clientsSlice.reducer;
