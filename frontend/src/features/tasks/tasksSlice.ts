import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { http } from "../../api/http";
import type { PaginationMeta, Task, TaskStatus } from "../../types/models";

type ListResponse = {
  items: Task[];
  meta: PaginationMeta;
};

type TasksState = {
  items: Task[];
  meta: PaginationMeta;
  loading: boolean;
  error: string | null;
};

const initialState: TasksState = {
  items: [],
  meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
  loading: false,
  error: null,
};

function getErrorMessage(error: unknown) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message ?? "Unexpected error";
}

type TaskPayload = {
  title: string;
  description?: string;
  deadline?: string;
  status?: TaskStatus;
  assignedUserId: string;
};

export const fetchTasksThunk = createAsyncThunk<
  ListResponse,
  { page?: number; limit?: number; status?: TaskStatus; assignedUserId?: string; search?: string },
  { rejectValue: string }
>("tasks/fetchAll", async (params, thunkApi) => {
  try {
    const response = await http.get<ListResponse>("/tasks", { params });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const createTaskThunk = createAsyncThunk<Task, TaskPayload, { rejectValue: string }>(
  "tasks/create",
  async (payload, thunkApi) => {
    try {
      const response = await http.post<Task>("/tasks", payload);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateTaskThunk = createAsyncThunk<
  Task,
  { id: string; payload: Partial<TaskPayload> },
  { rejectValue: string }
>("tasks/update", async ({ id, payload }, thunkApi) => {
  try {
    const response = await http.patch<Task>(`/tasks/${id}`, payload);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const updateTaskStatusThunk = createAsyncThunk<
  Task,
  { id: string; status: TaskStatus },
  { rejectValue: string }
>("tasks/updateStatus", async ({ id, status }, thunkApi) => {
  try {
    const response = await http.patch<Task>(`/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteTaskThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  "tasks/delete",
  async (id, thunkApi) => {
    try {
      await http.delete(`/tasks/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasksError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.meta = action.payload.meta;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch tasks";
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.meta.total += 1;
      })
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to create task";
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update task";
      })
      .addCase(updateTaskStatusThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      })
      .addCase(updateTaskStatusThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to update task status";
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.meta.total = Math.max(0, state.meta.total - 1);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.error = action.payload ?? "Failed to delete task";
      });
  },
});

export const { clearTasksError } = tasksSlice.actions;
export default tasksSlice.reducer;
