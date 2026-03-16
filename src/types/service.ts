/* eslint-disable @typescript-eslint/no-explicit-any */
// Service Types for Solutions Page
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface SubService {
  title: LocalizedText;
  outcome: LocalizedText;
  icon: string;
  slug: string;
  _id: string;
}

export interface LocalizedItem {
  en: string;
  ar: string;
  _id: string;
}

export interface SubServiceDetail {
  _id: string;
  title: LocalizedText;
  outcome: LocalizedText;
  oneLineValuePromise: LocalizedText;
  strategicIssuesWeResolve: LocalizedItem[];
  whatYouGet: LocalizedItem[];
  service: {
    _id: string;
    title: LocalizedText;
    slug: string;
  };
  slug: string;
  icon: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SingleSubServiceResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    subService: SubServiceDetail;
  };
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
  _id: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  longDescription: LocalizedText;
  benefits: ServiceBenefits;
  brochure: ServiceBrochure;
  slug: string;
  icon: string;
  banner: string;
  image: string;
  subServices: SubService[];
  isActive: boolean;
  isDeleted: boolean;
}

export interface ServicesResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: Service[];
    totalCount: number;
  };
}

export interface SingleServiceResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    service: Service;
  };
}
