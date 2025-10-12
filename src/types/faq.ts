// FAQ Types
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface FAQ {
  _id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface FAQsResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: FAQ[];
    totalCount: number;
  };
}
