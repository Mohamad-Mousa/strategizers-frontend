/* eslint-disable @typescript-eslint/no-explicit-any */
// Service Types for Solutions Page
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
