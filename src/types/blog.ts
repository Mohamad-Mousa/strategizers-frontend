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

export interface BlogContact {
  _id: string;
  name: LocalizedText;
  position: LocalizedText;
  image: string;
  description?: LocalizedText;
  phone: { number: number; code: number };
  email: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
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
  contacts?: BlogContact[];
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
