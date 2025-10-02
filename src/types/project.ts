// Project Types
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface SubService {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}

export interface Service {
  _id: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  slug: string;
  icon: string;
  banner: string;
  image: string;
  subServices: SubService[];
  benefits: {
    description: LocalizedText;
    video: string;
  };
  brochure: {
    pdf: string;
    document: string;
  };
  isActive: boolean;
  isDeleted: boolean;
}

export interface ProjectAnalysis {
  description: LocalizedText;
  image: string;
}

export interface ProjectSolutions {
  description: LocalizedText;
  image: string;
}

export interface ProjectResults {
  description: LocalizedText;
  image: string;
}

export interface Project {
  _id: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  projectAnalysis: ProjectAnalysis;
  projectSolutions: ProjectSolutions;
  projectResults: ProjectResults;
  image: string;
  slug: string;
  service: Service;
  customer: string;
  link: string;
  date: string;
  tags: string[];
  isActive: boolean;
  updatedAt: string;
}

export interface ProjectsResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: Project[];
    totalCount: number;
  };
}

export interface SingleProjectResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    project: Project;
  };
}
