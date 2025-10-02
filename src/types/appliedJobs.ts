export interface AppliedJob {
  jobId: string;
  appliedAt: string;
  jobTitle?: string;
  jobSlug?: string;
}

export interface AppliedJobsState {
  appliedJobs: AppliedJob[];
  loading: boolean;
  error: string | null;
}

export interface AppliedJobsResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    appliedJobs: AppliedJob[];
  };
}
