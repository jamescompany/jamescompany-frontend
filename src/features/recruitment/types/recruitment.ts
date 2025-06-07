// src/features/recruitment/types/recruitment.ts

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
  // 기본 정보
  companyName: string;
  contactName: string;
  contactEmail: string;
  companyIntro?: string;  // optional로 변경
  
  // 채용 정보
  position: string;
  mainTasks: string[];  // 배열로 변경
  preferredQualifications?: string[];  // 배열로 변경
  tools: string[];  // 배열로 변경
  teamMembers: TeamMember[];  // 새로 추가
  
  // 급여 및 복지
  salaryMin: number;
  salaryMax: number;
  benefits: string[];  // 배열로 변경
  
  // 근무 정보
  workType: 'onsite' | 'remote' | 'hybrid';  // 새로 추가
  location: string;  // 새로 추가
  applicationUrl?: string;
  applicationEmail?: string;
  
  // 게시 옵션
  packageType: 'basic' | 'standard' | 'premium';  // 새로 추가
  postingDuration: number;
  includeCelebrationBonus: boolean;
  
  // 기타
  uploadMethod: 'form' | 'word' | 'googledocs';  // 'html'을 'form'으로 변경
  uploadUrl?: string;
  memo?: string;
  
  // 기존 필드 중 사용하지 않는 것들 제거
  // mainTasksSummary, teamStructure, desiredStartDate, uploadContent 제거
}

export interface JobApplication {
  id: string;
  jobPostingId: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'submitted' | 'reviewing' | 'accepted' | 'rejected';
  coverLetter?: string;
  resumeUrl?: string;
  appliedAt: string;
  reviewedAt?: string;
  jamesScore?: number;
  jobPosting?: JobPosting;
}

export interface JobApplicationForm {
  resumeType: 'upload' | 'existing' | 'profile';
  resumeFileUrl?: string;
  existingResumeId?: string;
  coverLetter?: string;
  expectedSalary?: string;
  availableDate?: string;
  phoneNumber: string;
  portfolioUrl?: string;
  agreedToTracking: boolean;
}

// 기업 대시보드 관련
export interface CompanyDashboardData {
  company: {
    id: string;
    name: string;
    email: string;
    logoUrl?: string;
    description?: string;
  };
  jobs: CompanyJob[];
  stats: CompanyStats;
}

export interface CompanyJob {
  id: string;
  position: string;
  status: 'pending' | 'active' | 'paused' | 'expired';
  postedDate: string;
  expiryDate: string;
  viewCount: number;
  applicationCount: number;
  packageType: 'basic' | 'standard' | 'premium';
  applications: JobApplication[];
}

export interface CompanyStats {
  totalViews: number;
  totalApplications: number;
  activeJobs: number;
  avgApplicationsPerJob: number;
  weeklyViews: number;
  weeklyApplications: number;
  conversionRate: number;
}

export interface TeamMember {
  role: string;
  count: number;
  icon?: React.ReactNode;  // 프론트엔드에서 아이콘을 사용한다면
}

// API 응답 타입
export interface JobPostingCreateResponse {
  jobId: string;
  managementToken: string;
  status: string;
  message: string;
}

export interface JobPostingListResponse {
  items: JobPosting[];
  total: number;
  page: number;
  size: number;
  pages: number;
}