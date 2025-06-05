// src/types/recruitment.ts

export interface JobPosting {
  id: string;
  companyName: string;
  companyLogo?: string;
  position: string;
  summary: string;
  mainTasks: string[];
  tools: string[];
  teamStructure: string;
  preferredQualifications?: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  benefits: string[];
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  workType: 'onsite' | 'remote' | 'hybrid';
  applicationMethod: {
    type: 'url' | 'email';
    value: string;
  };
  jamesNote?: string; // 제임스의 한마디
  isCertified: boolean; // QA 인증 뱃지
  postingDate: string;
  expiryDate: string;
  packageType: 'basic' | 'standard' | 'premium';
  viewCount: number;
  isPinned: boolean; // 프리미엄 상단 고정
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  bonusIncluded: boolean;
}

export interface JobRegistrationForm {
  companyName: string;
  contactName: string;
  contactEmail: string;
  companyIntro: string;
  position: string;
  mainTasksSummary: string;
  preferredQualifications?: string;
  tools: string;
  teamStructure: string;
  salaryMin: number;
  salaryMax: number;
  benefits: string;
  applicationUrl?: string;
  applicationEmail?: string;
  desiredStartDate: Date;
  postingDuration: number;
  includeCelebrationBonus: boolean;
  uploadMethod: 'html' | 'word' | 'googledocs';
  uploadContent?: string;
  uploadUrl?: string;
  memo?: string;
}