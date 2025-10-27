/* eslint-disable @typescript-eslint/no-explicit-any */
// Blog Types
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface SubService {
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  _id: string;
}

export interface BlogService {
  title: LocalizedText;
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  benefits: {
    description: LocalizedText;
    video: string;
    features: any[];
  };
  brochure: {
    pdf: string;
    document: string;
  };
  _id: string;
  slug: string;
  icon: string;
  banner: string;
  image: string;
  subServices: SubService[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface Blog {
  _id: string;
  title: LocalizedText;
  subTitle: LocalizedText;
  description: LocalizedText;
  slug: string;
  image: string;
  author: string;
  tags: LocalizedText[];
  service?: BlogService;
  isActive?: boolean;
  updatedAt?: string;
}

export interface BlogsResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: Blog[];
    totalCount: number;
  };
}

export interface SingleBlogResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    blog: Blog;
  };
}
