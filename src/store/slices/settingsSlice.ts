import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet } from "@/lib/api";
import { Settings, SettingsResponse, SettingsState } from "@/types/settings";

// Initial state
const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
};

// Async thunk for fetching settings
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response: SettingsResponse = await apiGet("/public/setting");

      if (!response.error) {
        return response.results.settings;
      } else {
        return rejectWithValue(response.message || "Failed to fetch settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      return rejectWithValue("An error occurred while fetching settings");
    }
  }
);

// Settings slice
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettings: (state) => {
      state.settings = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSettings.fulfilled,
        (state, action: PayloadAction<Settings>) => {
          state.loading = false;
          state.settings = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Settings fetch rejected:", action.payload);
      });
  },
});

// Export actions
export const { clearSettings, clearError } = settingsSlice.actions;

// Export reducer
export default settingsSlice.reducer;
