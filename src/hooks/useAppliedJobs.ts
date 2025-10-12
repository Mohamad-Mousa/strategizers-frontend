import { useEffect } from "react";
import {
  addAppliedJob,
  removeAppliedJob,
  clearAppliedJobs,
  rehydrateAppliedJobs,
  selectAppliedJobs,
  clearError,
} from "@/store/slices/appliedJobsSlice";
import { AppliedJob } from "@/types/appliedJobs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const useAppliedJobs = () => {
  const dispatch = useAppDispatch();
  const appliedJobs = useAppSelector(selectAppliedJobs);
  const loading = useAppSelector((state) => state.appliedJobs.loading);
  const error = useAppSelector((state) => state.appliedJobs.error);

  useEffect(() => {
    dispatch(rehydrateAppliedJobs());
  }, [dispatch]);

  const addJob = (jobData: {
    jobId: string;
    jobTitle?: string;
    jobSlug?: string;
  }) => {
    dispatch(addAppliedJob(jobData));
  };

  const removeJob = (jobId: string) => {
    dispatch(removeAppliedJob(jobId));
  };

  const clearAllJobs = () => {
    dispatch(clearAppliedJobs());
  };

  const clearErrorState = () => {
    dispatch(clearError());
  };

  // Helper functions that work with the current state
  const isJobApplied = (jobId: string): boolean => {
    return appliedJobs.some((job) => job.jobId === jobId);
  };

  const getAppliedJob = (jobId: string): AppliedJob | undefined => {
    return appliedJobs.find((job) => job.jobId === jobId);
  };

  return {
    appliedJobs,
    loading,
    error,
    addJob,
    removeJob,
    clearAllJobs,
    clearErrorState,
    isJobApplied,
    getAppliedJob,
  };
};
