// src/services/api.ts
import axios from 'axios';

// API 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

// Request 인터셉터 - 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response 인터셉터 - 401 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 404 에러이고 특정 서비스 API인 경우 조용히 처리
    if (error.response?.status === 404) {
      const url = error.config?.url || '';
      const serviceApis = ['/api/coffee-chat/slots', '/api/courses', '/api/beta-tests'];
      
      if (serviceApis.some(api => url.includes(api))) {
        // 404 에러를 조용히 처리하고 빈 데이터 반환
        return Promise.reject(error);
      }
    }
    
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그인 페이지로 이동
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// default export도 제공 (기존 코드 호환성)
export default api;