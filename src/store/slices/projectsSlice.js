import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching projects with pagination and filters
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (
    {
      page = 1,
      limit = 9,
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
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/project?${queryParams}`
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
        return rejectWithValue(data.message || "Failed to fetch projects");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk for fetching a single project by slug
export const fetchProjectBySlug = createAsyncThunk(
  "projects/fetchProjectBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/project/${slug}`
      );
      const data = await response.json();

      if (data.code === 200) {
        return data.results.project;
      } else {
        return rejectWithValue(data.message || "Failed to fetch project");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  singleLoading: false,
  error: null,
  singleError: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 9,
  },
  filters: {
    sortBy: "createdAt",
    sortDirection: "desc",
    term: "",
    service: "",
    tags: "",
  },
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearProjectsError: (state) => {
      state.error = null;
      state.singleError = null;
    },
    resetProjectsState: (state) => {
      state.projects = [];
      state.currentProject = null;
      state.loading = false;
      state.singleLoading = false;
      state.error = null;
      state.singleError = null;
      state.pagination = {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 9,
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
    clearCurrentProject: (state) => {
      state.currentProject = null;
      state.singleError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalCount: action.payload.totalCount,
          limit: state.pagination.limit,
        };
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single project
      .addCase(fetchProjectBySlug.pending, (state) => {
        state.singleLoading = true;
        state.singleError = null;
      })
      .addCase(fetchProjectBySlug.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.currentProject = action.payload;
        state.singleError = null;
      })
      .addCase(fetchProjectBySlug.rejected, (state, action) => {
        state.singleLoading = false;
        state.singleError = action.payload;
      });
  },
});

export const {
  clearProjectsError,
  resetProjectsState,
  setFilters,
  clearCurrentProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
