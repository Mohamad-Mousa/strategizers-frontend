import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import websiteReducer from "./slices/websiteSlice";
import { appliedJobsReducer } from "./slices/appliedJobsSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    website: websiteReducer,
    appliedJobs: appliedJobsReducer,
    // Add other reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
