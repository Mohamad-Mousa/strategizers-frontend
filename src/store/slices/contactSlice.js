import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.code === 200) {
        return data.results;
      } else {
        return rejectWithValue(data.message || "Failed to submit contact form");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
  submittedData: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactError: (state) => {
      state.error = null;
    },
    clearContactSuccess: (state) => {
      state.success = false;
      state.submittedData = null;
    },
    resetContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.submittedData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit contact form
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.submittedData = action.payload;
        state.error = null;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearContactError, clearContactSuccess, resetContactState } =
  contactSlice.actions;

export default contactSlice.reducer;
