export interface Job {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  type: string;
  location?: string;
  responsibilities: string[];
  requirements: string[];
  createdAt: string;
}

export interface JobsData {
  data: Job[];
  totalCount: number;
}

export interface SingleJobResponse {
  message: string;
  error: boolean;
  code: number;
  results: Job;
}
