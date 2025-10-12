import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppliedJob, AppliedJobsState } from "@/types/appliedJobs";

const APPLIED_JOBS_STORAGE_KEY = "strategizers_applied_jobs";

const loadAppliedJobsFromStorage = (): AppliedJob[] => {
  // Check if we're in the browser (client-side)
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
  // Check if we're in the browser (client-side)
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(APPLIED_JOBS_STORAGE_KEY, JSON.stringify(appliedJobs));
  } catch (error) {
    console.error("Error saving applied jobs to localStorage:", error);
  }
};

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

    const currentJobs = loadAppliedJobsFromStorage();
    const updatedJobs = [...currentJobs, appliedJob];
    saveAppliedJobsToStorage(updatedJobs);

    return appliedJob;
  }
);

// Async thunk to remove an applied job
export const removeAppliedJob = createAsyncThunk(
  "appliedJobs/removeAppliedJob",
  async (jobId: string) => {
    const currentJobs = loadAppliedJobsFromStorage();
    const updatedJobs = currentJobs.filter((job) => job.jobId !== jobId);
    saveAppliedJobsToStorage(updatedJobs);

    return jobId;
  }
);

// Async thunk to clear all applied jobs
export const clearAppliedJobs = createAsyncThunk(
  "appliedJobs/clearAppliedJobs",
  async () => {
    // Check if we're in the browser (client-side)
    if (typeof window !== "undefined") {
      localStorage.removeItem(APPLIED_JOBS_STORAGE_KEY);
    }

    return [];
  }
);

export const rehydrateAppliedJobs = createAsyncThunk(
  "appliedJobs/rehydrateAppliedJobs",
  async () => {
    const jobs = loadAppliedJobsFromStorage();
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
