// Settings Types
export interface LocalizedText {
  en: string;
  ar: string;
}

export interface PhoneNumber {
  code: number;
  number: number;
}

export interface ContactInfo {
  phone: PhoneNumber;
  email: string;
  address: string;
  map: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
}

export interface LegalDocuments {
  privacyPolicy: LocalizedText;
  termsAndConditions: LocalizedText;
}

export interface ContactTeamMember {
  name: LocalizedText;
  position: LocalizedText;
  phone: PhoneNumber;
  image: string;
  email: string;
  _id: string;
}

export interface Settings {
  contact: ContactInfo;
  social: SocialLinks;
  legal: LegalDocuments;
  contactTeam: ContactTeamMember[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsResponse {
  message: string;
  error: boolean;
  code: number;
  results: {
    settings: Settings;
  };
}

// Redux State Types
export interface SettingsState {
  settings: Settings | null;
  loading: boolean;
  error: string | null;
}
