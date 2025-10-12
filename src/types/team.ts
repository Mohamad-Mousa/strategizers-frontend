// Team Types
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface PhoneNumber {
  number: number;
  code: number;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export interface TeamMember {
  _id: string;
  name: LocalizedText;
  position: LocalizedText;
  image: string;
  description: LocalizedText;
  phone: PhoneNumber;
  email: string;
  social: SocialLinks;
  createdAt: string;
}

export interface TeamResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    data: TeamMember[];
    totalCount: number;
  };
}
