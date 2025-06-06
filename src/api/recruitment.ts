// src/api/recruitment.ts

import { API_BASE_URL } from '../config/api';

interface JobFilters {
  location?: string;
  workType?: 'onsite' | 'remote' | 'hybrid';
  salaryMin?: number;
  salaryMax?: number;
  search?: string;
}

export const recruitmentAPI = {
  // 채용공고 관련
  getJobs: async (filters?: JobFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/api/recruitment/jobs?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },
  
  getJobById: async (jobId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/jobs/${jobId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) throw new Error('Failed to fetch job details');
    return response.json();
  },
  
  postJob: async (jobData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/jobs`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) throw new Error('Failed to post job');
    return response.json();
  },
  
  updateJob: async (jobId: string, jobData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/jobs/${jobId}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(jobData),
    });
    
    if (!response.ok) throw new Error('Failed to update job');
    return response.json();
  },
  
  deleteJob: async (jobId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/jobs/${jobId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to delete job');
    return response.json();
  },
  
  // 지원 관련
  applyToJob: async (jobId: string, applicationData: any) => {
    const formData = new FormData();
    
    // 파일이 있는 경우
    if (applicationData.resumeFile) {
      formData.append('resume', applicationData.resumeFile);
    }
    
    // 나머지 데이터
    Object.entries(applicationData).forEach(([key, value]) => {
      if (key !== 'resumeFile' && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/api/recruitment/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    
    if (!response.ok) throw new Error('Failed to submit application');
    return response.json();
  },
  
  getMyApplications: async () => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/applications/my`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch applications');
    return response.json();
  },
  
  getApplicationById: async (applicationId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/applications/${applicationId}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch application details');
    return response.json();
  },
  
  // 기업 관리 관련
  getCompanyDashboard: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/company/dashboard/${token}`, {
      method: 'GET',
    });
    
    if (!response.ok) throw new Error('Failed to fetch company dashboard');
    return response.json();
  },
  
  updateApplicationStatus: async (token: string, applicationId: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/api/company/applications/${applicationId}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'X-Company-Token': token,
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) throw new Error('Failed to update application status');
    return response.json();
  },
  
  getCompanyStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/company/stats`, {
      method: 'GET',
      headers: { 
        'X-Company-Token': token,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch company stats');
    return response.json();
  },
  
  // 이력서 관련
  getMyResumes: async () => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/resumes/my`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch resumes');
    return response.json();
  },
  
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await fetch(`${API_BASE_URL}/api/recruitment/resumes`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    
    if (!response.ok) throw new Error('Failed to upload resume');
    return response.json();
  },
  
  deleteResume: async (resumeId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/recruitment/resumes/${resumeId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) throw new Error('Failed to delete resume');
    return response.json();
  },
  
  // 통계 및 분석
  getJobAnalytics: async (jobId: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/company/jobs/${jobId}/analytics`, {
      method: 'GET',
      headers: { 
        'X-Company-Token': token,
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch job analytics');
    return response.json();
  },
  
  downloadReport: async (token: string, type: 'weekly' | 'monthly') => {
    const response = await fetch(`${API_BASE_URL}/api/company/reports/${type}`, {
      method: 'GET',
      headers: { 
        'X-Company-Token': token,
      },
    });
    
    if (!response.ok) throw new Error('Failed to download report');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recruitment-report-${type}-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};