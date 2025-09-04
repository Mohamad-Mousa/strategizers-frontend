import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching blogs with pagination and filters
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
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
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/blog?${queryParams}`
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
        return rejectWithValue(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Async thunk for fetching a single blog by slug
export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBlogBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/public/blog/${slug}`
      );
      const data = await response.json();

      if (data.code === 200) {
        return data.results.blog;
      } else {
        return rejectWithValue(data.message || "Failed to fetch blog");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
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

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogsError: (state) => {
      state.error = null;
      state.singleError = null;
    },
    resetBlogsState: (state) => {
      state.blogs = [];
      state.currentBlog = null;
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
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
      state.singleError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalCount: action.payload.totalCount,
          limit: state.pagination.limit,
        };
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single blog
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.singleLoading = true;
        state.singleError = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.currentBlog = action.payload;
        state.singleError = null;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.singleLoading = false;
        state.singleError = action.payload;
      });
  },
});

export const {
  clearBlogsError,
  resetBlogsState,
  setFilters,
  clearCurrentBlog,
} = blogsSlice.actions;

export default blogsSlice.reducer;
