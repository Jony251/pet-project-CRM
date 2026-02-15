import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/ui/themeSlice";
import clientsReducer from "../features/clients/clientsSlice";
import dealsReducer from "../features/deals/dealsSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    clients: clientsReducer,
    deals: dealsReducer,
    tasks: tasksReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
