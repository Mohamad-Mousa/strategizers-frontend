/** Localized text object */
export interface LocalizedText {
  en: string;
  ar: string;
}

/** Localized list item (e.g. programObjectives, targetAudience) */
export interface LocalizedListItem {
  _id: string;
  en: string;
  ar: string;
}

/** Program outline module */
export interface ProgramOutlineModule {
  _id: string;
  title: LocalizedText;
  items: LocalizedListItem[];
}

export interface Course {
  _id: string;
  title: LocalizedText;
  image: string;
  slug: string;
  createdAt?: string;
  shortDescription?: LocalizedText;
  longDescription?: LocalizedText;
  /** New structure: program overview */
  programOverview?: LocalizedText;
  programDuration?: LocalizedText;
  programDurationDetails?: LocalizedText;
  programObjectives?: LocalizedListItem[];
  targetAudience?: LocalizedListItem[];
  expectedOrganizationalBenefits?: LocalizedListItem[];
  deliveryFormat?: LocalizedListItem[];
  programMethodology?: LocalizedListItem[];
  programOutline?: ProgramOutlineModule[];
  samplePracticalActivities?: LocalizedListItem[];
  /** Academy category (new structure) */
  academyCategory?: {
    _id: string;
    title: LocalizedText;
    isActive?: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  programCategory?: {
    _id: string;
    title: LocalizedText;
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

/** Academy category (new structure: Category -> Courses) */
export interface AcademyCategory {
  _id: string;
  title: {
    en: string;
    ar: string;
  };
  createdAt: string;
  courses: Course[];
}

export interface AcademyCategoryResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: AcademyCategory[];
    totalCount: number;
  };
}

export interface Category {
  _id: string;
  slug?: string;
  title: {
    en: string;
    ar: string;
  };
  createdAt: string;
  courses: Course[];
}

export interface Program {
  _id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  description?: {
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

export interface SingleProgramResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    program: Program;
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
