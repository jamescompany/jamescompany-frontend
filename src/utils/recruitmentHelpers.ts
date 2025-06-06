// src/utils/recruitment/recruitmentHelpers.ts

import type { JobPosting } from '../types/recruitment';

// Mock location store (실제 구현에서는 실제 store 사용)
export interface UserLocation {
  city: string;
  district: string;
  neighborhood: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// 거리 계산 함수
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2)) * 111;
};

// 거리 포맷팅 함수
export const formatDistance = (distance: number): string => {
  return `${distance.toFixed(1)}km`;
};

// 필터링 함수
export const filterJobsByType = (
  jobs: JobPosting[],
  filterType: 'all' | 'remote' | 'onsite' | 'hybrid'
): JobPosting[] => {
  if (filterType === 'all') return jobs;
  return jobs.filter(job => job.workType === filterType);
};

// D-Day 계산 함수
export const calculateDDay = (expiryDate: string): number => {
  return Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
};

// 평균 연봉 계산
export const calculateAverageSalary = (jobs: JobPosting[]): number => {
  const totalSalary = jobs.reduce((sum, job) => {
    return sum + (job.salaryRange.min + job.salaryRange.max) / 2;
  }, 0);
  return Math.round(totalSalary / jobs.length / 1000) / 10; // 천만원 단위
};

// 회사 수 계산
export const getUniqueCompanyCount = (jobs: JobPosting[]): number => {
  return new Set(jobs.map(job => job.companyName)).size;
};

// Mock hooks (실제 구현에서는 실제 hooks 사용)
export const useNavigate = () => () => {};

export const useLocationStore = () => ({
  userLocation: {
    city: '서울',
    district: '강남구',
    neighborhood: '테헤란로',
    coordinates: { lat: 37.5012767, lng: 127.0396002 }
  } as UserLocation
});