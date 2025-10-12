import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiGet } from "@/lib/api";
import { Website, WebsiteResponse, WebsiteState } from "@/types/website";

// Initial state
const initialState: WebsiteState = {
  website: null,
  loading: false,
  error: null,
};

// Async thunk for fetching website data
export const fetchWebsite = createAsyncThunk(
  "website/fetchWebsite",
  async (_, { rejectWithValue }) => {
    try {
      const response: WebsiteResponse = await apiGet("/public/website");

      if (!response.error) {
        return response.results;
      } else {
        return rejectWithValue(
          response.message || "Failed to fetch website data"
        );
      }
    } catch (error) {
      console.error("Error fetching website data:", error);
      return rejectWithValue("An error occurred while fetching website data");
    }
  }
);

// Website slice
const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    clearWebsite: (state) => {
      state.website = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch website data
      .addCase(fetchWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWebsite.fulfilled,
        (state, action: PayloadAction<Website>) => {
          state.loading = false;
          state.website = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("Website fetch rejected:", action.payload);
      });
  },
});

// Export actions
export const { clearWebsite, clearError } = websiteSlice.actions;

// Export reducer
export default websiteSlice.reducer;
