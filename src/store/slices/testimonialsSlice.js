import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching testimonials with pagination and filters
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (
    {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortDirection = "desc",
      term = "",
    },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortDirection,
        term,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/testimonial?${queryParams}`
      );
      const data = await response.json();

      if (data.code === 200) {
        return {
          data: data.results.data || [],
          totalCount: data.results.totalCount || 0,
          currentPage: page,
          totalPages: Math.ceil((data.results.totalCount || 0) / limit),
        };
      } else {
        return rejectWithValue(data.message || "Failed to fetch testimonials");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  testimonials: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
  },
  filters: {
    sortBy: "createdAt",
    sortDirection: "desc",
    term: "",
  },
};

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    clearTestimonialsError: (state) => {
      state.error = null;
    },
    resetTestimonialsState: (state) => {
      state.testimonials = [];
      state.loading = false;
      state.error = null;
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
      };
      state.filters = {
        sortBy: "createdAt",
        sortDirection: "desc",
        term: "",
      };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalCount: action.payload.totalCount,
          limit: state.pagination.limit,
        };
        state.error = null;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTestimonialsError, resetTestimonialsState, setFilters } =
  testimonialsSlice.actions;

export default testimonialsSlice.reducer;
