export interface Course {
  _id: string;
  title: {
    en: string;
    ar: string;
  };
  image: string;
  slug: string;
  createdAt: string;
  shortDescription?: {
    en: string;
    ar: string;
  };
  longDescription?: {
    en: string;
    ar: string;
  };
  programCategory?: {
    _id: string;
    title: {
      en: string;
      ar: string;
    };
    program: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  isActive?: boolean;
  isDeleted?: boolean;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  title: {
    en: string;
    ar: string;
  };
  createdAt: string;
  courses: Course[];
}

export interface Program {
  _id: string;
  title: {
    en: string;
    ar: string;
  };
  image: string;
  createdAt: string;
  categories: Category[];
}

export interface AcademyResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: Program[];
    totalCount: number;
  };
}

export interface CourseDetailsResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    course: Course;
  };
}
