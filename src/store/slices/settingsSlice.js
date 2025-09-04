import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching settings
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/setting`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.code === 200) {
        return data.results.settings;
      } else {
        return rejectWithValue(data.message || "Failed to fetch settings");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  settings: null,
  contact: null,
  social: null,
  legal: null,
  contactTeam: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    clearSettingsError: (state) => {
      state.error = null;
    },
    resetSettingsState: (state) => {
      state.loading = false;
      state.error = null;
      state.settings = null;
      state.contact = null;
      state.social = null;
      state.legal = null;
      state.contactTeam = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.contact = action.payload.contact;
        state.social = action.payload.social;
        state.legal = action.payload.legal;
        state.contactTeam = action.payload.contactTeam || [];
        state.error = null;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSettingsError, resetSettingsState } = settingsSlice.actions;

export default settingsSlice.reducer;
