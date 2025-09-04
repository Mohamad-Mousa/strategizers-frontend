import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching website data
export const fetchWebsiteData = createAsyncThunk(
  "website/fetchWebsiteData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/website`
      );
      const data = await response.json();

      if (data.code === 200) {
        return data.results;
      } else {
        return rejectWithValue(data.message || "Failed to fetch website data");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk for updating website data
export const updateWebsiteData = createAsyncThunk(
  "website/updateWebsiteData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/admin/website`,
        {
          method: "PUT",
          body: formData, // FormData for file uploads
        }
      );

      const data = await response.json();

      if (data.code === 200) {
        return data.results;
      } else {
        return rejectWithValue(data.message || "Failed to update website data");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    clearWebsiteError: (state) => {
      state.error = null;
      state.updateError = null;
    },
    resetWebsiteState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.updateLoading = false;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch website data
      .addCase(fetchWebsiteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsiteData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWebsiteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update website data
      .addCase(updateWebsiteData.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateWebsiteData.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.data = action.payload;
        state.updateError = null;
      })
      .addCase(updateWebsiteData.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearWebsiteError, resetWebsiteState } = websiteSlice.actions;
export default websiteSlice.reducer;
