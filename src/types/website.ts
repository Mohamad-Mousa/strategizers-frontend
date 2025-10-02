/* eslint-disable @typescript-eslint/no-explicit-any */

// Website Types
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface FeaturedService {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  _id: string;
}

export interface WelcomeSection {
  title: LocalizedText;
  description: LocalizedText;
  featuredServices: FeaturedService[];
}

export interface Banner {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  _id: string;
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

export interface ProjectService {
  title: LocalizedText;
  _id: string;
}

export interface Project {
  title: LocalizedText;
  shortDescription: LocalizedText;
  projectAnalysis: ProjectAnalysis;
  projectSolutions: ProjectSolutions;
  projectResults: ProjectResults;
  _id: string;
  image: string;
  slug: string;
  service: ProjectService;
  customer: string;
  link: string;
  date: string;
  tags: string[];
  isActive: boolean;
  updatedAt: string;
}

export interface Testimonial {
  name: LocalizedText;
  position: LocalizedText;
  description: LocalizedText;
  _id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  image: string;
}

export interface Blog {
  title: LocalizedText;
  subTitle: LocalizedText;
  description: LocalizedText;
  _id: string;
  slug: string;
  image: string;
  service: string;
  author: string;
  tags: string[];
  isActive: boolean;
  updatedAt: string;
}

export interface SubService {
  title: LocalizedText;
  description: LocalizedText;
  _id: string;
  icon: string;
}

export interface ServiceBenefits {
  description: LocalizedText;
  video: string;
  features: any[];
}

export interface ServiceBrochure {
  pdf: string;
  document: string;
}

export interface Service {
  title: LocalizedText;
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  benefits: ServiceBenefits;
  brochure: ServiceBrochure;
  _id: string;
  slug: string;
  icon: string;
  banner: string;
  image: string;
  subServices: SubService[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface Partner {
  title: LocalizedText;
  _id: string;
  image: string;
  isActive: boolean;
  updatedAt: string;
}

export interface HomePage {
  welcomeSection: WelcomeSection;
  banner: Banner[];
  projects: Project[];
  testimonials: Testimonial[];
  blogs: Blog[];
  services: Service[];
  partners: Partner[];
}

export interface Mission {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface Vision {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface Values {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface OpportunitiesSection {
  title: LocalizedText;
  description: LocalizedText;
}

export interface TimelineItem {
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  image: string;
  _id: string;
}

export interface HistorySection {
  title: LocalizedText;
  timeline: TimelineItem[];
}

export interface SmartApproachItem {
  title: LocalizedText;
  subTitle: LocalizedText;
  description: LocalizedText;
  image: string;
  _id: string;
}

export interface AboutPage {
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  mission: Mission;
  vision: Vision;
  values: Values;
  oppertunitiesSection: OpportunitiesSection;
  historySection: HistorySection;
  ourSmartApproach: SmartApproachItem[];
  banner: string;
}

export interface PageBanner {
  banner: string;
}

export interface Website {
  homePage: HomePage;
  aboutPage: AboutPage;
  servicePage: PageBanner;
  blogPage: PageBanner;
  projectPage: PageBanner;
  contactPage: PageBanner;
  teamPage: PageBanner;
  faqPage: PageBanner;
  testimonialPage: PageBanner;
  termsPage: PageBanner;
  privacyPage: PageBanner;
  _id: string;
  updatedAt: string;
}

export interface WebsiteResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    homePage: HomePage;
    aboutPage: AboutPage;
    servicePage: PageBanner;
    blogPage: PageBanner;
    projectPage: PageBanner;
    contactPage: PageBanner;
    teamPage: PageBanner;
    faqPage: PageBanner;
    testimonialPage: PageBanner;
    termsPage: PageBanner;
    privacyPage: PageBanner;
    _id: string;
    updatedAt: string;
  };
}

export interface WebsiteState {
  website: Website | null;
  loading: boolean;
  error: string | null;
}
