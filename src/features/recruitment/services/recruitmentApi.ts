// src/features/recruitment/services/recruitmentApi.ts

import api from '../../../shared/services/api';

// Types
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
  jamesNote?: string;
  isCertified: boolean;
  postingDate: string;
  expiryDate: string;
  packageType: 'basic' | 'standard' | 'premium';
  viewCount: number;
  isPinned: boolean;
}

export interface JobRegistrationForm {
  companyName: string;
  contactName: string;
  contactEmail: string;
  companyIntro: string;
  position: string;
  mainTasks: string[];
  preferredQualifications?: string[];
  tools: string[];
  teamStructure: string;
  salaryMin: number;
  salaryMax: number;
  benefits: string[];
  location: string;
  workType: 'onsite' | 'remote' | 'hybrid';
  applicationUrl?: string;
  applicationEmail?: string;
  packageType: 'basic' | 'standard' | 'premium';
  postingDuration: number;
  memo?: string;
}

export interface PendingJob {
  id: string;
  companyName: string;
  companyEmail: string;
  contactName: string;
  contactEmail: string;
  position: string;
  summary: string;
  mainTasks: string[];
  tools: string[];
  teamStructure: string;
  preferredQualifications?: string[];
  salaryMin: number;
  salaryMax: number;
  benefits: string[];
  location: string;
  workType: 'onsite' | 'remote' | 'hybrid';
  packageType: 'basic' | 'standard' | 'premium';
  postingDate: string;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  createdByEmail?: string;
  memo?: string;
}

export interface AdminStats {
  totalJobs: number;
  activeJobs: number;
  pendingJobs: number;
  totalCompanies: number;
  verifiedCompanies: number;
  totalApplications: number;
  packageStats: {
    basic: number;
    standard: number;
    premium: number;
  };
  recentJobs: number;
  recentApplications: number;
}

export interface ApprovalData {
  isApproved: boolean;
  jamesNote?: string;
  rejectionReason?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  jamesScore?: number;
}

// API 인터페이스
interface RecruitmentAPI {
  // Job Postings
  getAllJobs: (filters?: JobFilters) => Promise<JobPosting[]>;
  getJobById: (id: string) => Promise<JobPosting>;
  createJob: (data: JobRegistrationForm) => Promise<JobPosting>;
  updateJob: (id: string, data: Partial<JobRegistrationForm>) => Promise<JobPosting>;
  deleteJob: (id: string) => Promise<void>;
  
  // Applications
  applyToJob: (jobId: string, applicationData: any) => Promise<JobApplication>;
  getMyApplications: () => Promise<JobApplication[]>;
  getJobApplications: (jobId: string) => Promise<JobApplication[]>;
  
  // Company
  getCompanyDashboard: (token: string) => Promise<any>;
  
  // Admin
  admin: {
    getPendingJobs: () => Promise<PendingJob[]>;
    getAdminStats: () => Promise<AdminStats>;
    approveJob: (jobId: string, data: ApprovalData) => Promise<void>;
    rejectJob: (jobId: string, reason: string) => Promise<void>;
    getAllCompanies: () => Promise<any[]>;
    updateJobStatus: (jobId: string, status: 'active' | 'paused' | 'expired') => Promise<void>;
  };
}

interface JobFilters {
  search?: string;
  workType?: 'all' | 'onsite' | 'remote' | 'hybrid';
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  packageType?: 'all' | 'basic' | 'standard' | 'premium';
}

// API 구현
export const recruitmentAPI: RecruitmentAPI = {
  // Job Postings
  getAllJobs: async (filters) => {
    const response = await api.get<JobPosting[]>('/api/recruitments/jobs', { params: filters });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get<JobPosting>(`/api/recruitments/jobs/${id}`);
    return response.data;
  },

  createJob: async (data) => {
    const response = await api.post<JobPosting>('/api/recruitments/jobs', data);
    return response.data;
  },

  updateJob: async (id, data) => {
    const response = await api.put<JobPosting>(`/api/recruitments/jobs/${id}`, data);
    return response.data;
  },

  deleteJob: async (id) => {
    await api.delete(`/api/recruitments/jobs/${id}`);
  },

  // Applications
  applyToJob: async (jobId, applicationData) => {
    const response = await api.post<JobApplication>(`/api/recruitments/jobs/${jobId}/apply`, applicationData);
    return response.data;
  },

  getMyApplications: async () => {
    const response = await api.get<JobApplication[]>('/api/recruitments/applications/my');
    return response.data;
  },

  getJobApplications: async (jobId) => {
    const response = await api.get<JobApplication[]>(`/api/recruitments/jobs/${jobId}/applications`);
    return response.data;
  },

  // Company
  getCompanyDashboard: async (token) => {
    const response = await api.get(`/api/recruitments/company/dashboard/${token}`);
    return response.data;
  },

  // Admin
  admin: {
    getPendingJobs: async () => {
      const response = await api.get<PendingJob[]>('/api/admin/recruitments/pending');
      return response.data;
    },
    
    getAdminStats: async () => {
      const response = await api.get<AdminStats>('/api/admin/recruitments/stats');
      return response.data;
    },
    
    approveJob: async (jobId, data) => {
      await api.post(`/api/admin/recruitments/${jobId}/approve`, data);
    },
    
    rejectJob: async (jobId, reason) => {
      await api.post(`/api/admin/recruitments/${jobId}/reject`, { reason });
    },
    
    getAllCompanies: async () => {
      const response = await api.get('/api/admin/recruitments/companies');
      return response.data;
    },
    
    updateJobStatus: async (jobId, status) => {
      await api.put(`/api/admin/recruitments/${jobId}/status`, { status });
    }
  }
};

// Helper functions
export const formatSalary = (min: number, max: number): string => {
  return `₩${(min / 10000).toFixed(0)}-${(max / 10000).toFixed(0)}만원`;
};

export const getPackageInfo = (packageType: string) => {
  const packages = {
    basic: { name: '기본형', price: '₩50,000', color: 'gray' },
    standard: { name: '스탠다드형', price: '₩100,000', color: 'blue' },
    premium: { name: '프리미엄형', price: '₩350,000', color: 'purple' }
  };
  return packages[packageType as keyof typeof packages] || packages.basic;
};

export default recruitmentAPI;