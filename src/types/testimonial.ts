// Testimonial Types
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface Testimonial {
  _id: string;
  name: LocalizedText;
  position: LocalizedText;
  description: LocalizedText;
}

export interface TestimonialsResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: Testimonial[];
    totalCount: number;
  };
}
