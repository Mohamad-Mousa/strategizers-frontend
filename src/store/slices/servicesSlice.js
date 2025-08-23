import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching services with pagination and filters
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (
    {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortDirection = "desc",
      term = "",
      service = "",
      tags = "",
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
        service,
        tags,
      });

      const response = await fetch(
        `http://localhost:4000/api/v1/public/service?${queryParams}`
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
        return rejectWithValue(data.message || "Failed to fetch services");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk for fetching a single service by slug
export const fetchServiceBySlug = createAsyncThunk(
  "services/fetchServiceBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/public/service/${slug}`
      );
      const data = await response.json();

      if (data.code === 200) {
        return data.results.service;
      } else {
        return rejectWithValue(data.message || "Failed to fetch service");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  services: [],
  currentService: null,
  loading: false,
  singleLoading: false,
  error: null,
  singleError: null,
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
    service: "",
    tags: "",
  },
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearServicesError: (state) => {
      state.error = null;
      state.singleError = null;
    },
    resetServicesState: (state) => {
      state.services = [];
      state.currentService = null;
      state.loading = false;
      state.singleLoading = false;
      state.error = null;
      state.singleError = null;
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
        service: "",
        tags: "",
      };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentService: (state) => {
      state.currentService = null;
      state.singleError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalCount: action.payload.totalCount,
          limit: state.pagination.limit,
        };
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single service
      .addCase(fetchServiceBySlug.pending, (state) => {
        state.singleLoading = true;
        state.singleError = null;
      })
      .addCase(fetchServiceBySlug.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.currentService = action.payload;
        state.singleError = null;
      })
      .addCase(fetchServiceBySlug.rejected, (state, action) => {
        state.singleLoading = false;
        state.singleError = action.payload;
      });
  },
});

export const {
  clearServicesError,
  resetServicesState,
  setFilters,
  clearCurrentService,
} = servicesSlice.actions;

export default servicesSlice.reducer;
