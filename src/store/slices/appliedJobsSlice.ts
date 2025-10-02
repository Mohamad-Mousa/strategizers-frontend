import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppliedJob, AppliedJobsState } from "@/types/appliedJobs";

// LocalStorage key for applied jobs
const APPLIED_JOBS_STORAGE_KEY = "strategizers_applied_jobs";

// Helper functions for localStorage
const loadAppliedJobsFromStorage = (): AppliedJob[] => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(APPLIED_JOBS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading applied jobs from localStorage:", error);
    return [];
  }
};

const saveAppliedJobsToStorage = (appliedJobs: AppliedJob[]): void => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(APPLIED_JOBS_STORAGE_KEY, JSON.stringify(appliedJobs));
  } catch (error) {
    console.error("Error saving applied jobs to localStorage:", error);
  }
};

// Initial state with localStorage rehydration
const initialState: AppliedJobsState = {
  appliedJobs: loadAppliedJobsFromStorage(),
  loading: false,
  error: null,
};

// Async thunk to add a new applied job
export const addAppliedJob = createAsyncThunk(
  "appliedJobs/addAppliedJob",
  async (jobData: { jobId: string; jobTitle?: string; jobSlug?: string }) => {
    const appliedJob: AppliedJob = {
      jobId: jobData.jobId,
      appliedAt: new Date().toISOString(),
      jobTitle: jobData.jobTitle,
      jobSlug: jobData.jobSlug,
    };

    // Save to localStorage immediately
    const currentJobs = loadAppliedJobsFromStorage();
    const updatedJobs = [...currentJobs, appliedJob];
    saveAppliedJobsToStorage(updatedJobs);

    console.log("Applied job saved:", appliedJob);
    return appliedJob;
  }
);

// Async thunk to remove an applied job
export const removeAppliedJob = createAsyncThunk(
  "appliedJobs/removeAppliedJob",
  async (jobId: string) => {
    // Remove from localStorage immediately
    const currentJobs = loadAppliedJobsFromStorage();
    const updatedJobs = currentJobs.filter((job) => job.jobId !== jobId);
    saveAppliedJobsToStorage(updatedJobs);

    console.log("Applied job removed:", jobId);
    return jobId;
  }
);

// Async thunk to clear all applied jobs
export const clearAppliedJobs = createAsyncThunk(
  "appliedJobs/clearAppliedJobs",
  async () => {
    // Clear from localStorage immediately (only in browser)
    if (typeof window !== "undefined") {
      localStorage.removeItem(APPLIED_JOBS_STORAGE_KEY);
    }

    console.log("All applied jobs cleared");
    return [];
  }
);

// Async thunk to rehydrate from localStorage
export const rehydrateAppliedJobs = createAsyncThunk(
  "appliedJobs/rehydrateAppliedJobs",
  async () => {
    const jobs = loadAppliedJobsFromStorage();
    console.log("Applied jobs rehydrated from localStorage:", jobs);
    return jobs;
  }
);

const appliedJobsSlice = createSlice({
  name: "appliedJobs",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add applied job
      .addCase(addAppliedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAppliedJob.fulfilled, (state, action) => {
        state.loading = false;
        // Check if job already exists to prevent duplicates
        const existingJob = state.appliedJobs.find(
          (job) => job.jobId === action.payload.jobId
        );
        if (!existingJob) {
          state.appliedJobs.push(action.payload);
        }
      })
      .addCase(addAppliedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add applied job";
      })

      // Remove applied job
      .addCase(removeAppliedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAppliedJob.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobs = state.appliedJobs.filter(
          (job) => job.jobId !== action.payload
        );
      })
      .addCase(removeAppliedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove applied job";
      })

      // Clear all applied jobs
      .addCase(clearAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearAppliedJobs.fulfilled, (state) => {
        state.loading = false;
        state.appliedJobs = [];
      })
      .addCase(clearAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to clear applied jobs";
      })

      // Rehydrate applied jobs
      .addCase(rehydrateAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rehydrateAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobs = action.payload;
      })
      .addCase(rehydrateAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to rehydrate applied jobs";
      });
  },
});

export const { clearError } = appliedJobsSlice.actions;
export const appliedJobsReducer = appliedJobsSlice.reducer;

// Selectors
export const selectAppliedJobs = (state: { appliedJobs: AppliedJobsState }) =>
  state.appliedJobs.appliedJobs;

export const selectAppliedJobById = (
  state: { appliedJobs: AppliedJobsState },
  jobId: string
) => state.appliedJobs.appliedJobs.find((job) => job.jobId === jobId);

export const selectIsJobApplied = (
  state: { appliedJobs: AppliedJobsState },
  jobId: string
) => state.appliedJobs.appliedJobs.some((job) => job.jobId === jobId);
