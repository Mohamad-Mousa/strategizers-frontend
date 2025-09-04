import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching partners with pagination and filters
export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
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
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/partner?${queryParams}`
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
        return rejectWithValue(data.message || "Failed to fetch partners");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  partners: [],
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

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    clearPartnersError: (state) => {
      state.error = null;
    },
    resetPartnersState: (state) => {
      state.partners = [];
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
      // Fetch partners
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalCount: action.payload.totalCount,
          limit: state.pagination.limit,
        };
        state.error = null;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPartnersError, resetPartnersState, setFilters } =
  partnersSlice.actions;

export default partnersSlice.reducer;
