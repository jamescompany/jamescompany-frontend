// src/features/auth/services/auth.service.ts

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  user: {
    id: string;  // UUID로 변경
    email: string;
    name: string;
    role: 'user' | 'admin' | 'mentor' | 'company';
    profile_image?: string;
    membership_tier: string;
    is_admin: boolean;
  };
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

class AuthService {
  // 이메일/비밀번호 로그인
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/api/v1/auth/login`,
      {
        email,
        password
      }
    );

    return response.data;
  }

  // 회원가입
  async signup(data: SignupData) {
    const response = await axios.post(`${API_URL}/api/v1/auth/register`, data);
    return response.data;
  }

  // 토큰 새로고침
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/api/v1/auth/refresh`,
      { refresh_token: refreshToken }
    );
    return response.data;
  }

  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/api/v1/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  // 로그아웃
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  }

  // 토큰 유효성 검사
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Axios 인터셉터 설정
  setupAxiosInterceptors() {
    // 요청 인터셉터
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              localStorage.setItem('access_token', response.access_token);
              if (response.refresh_token) {
                localStorage.setItem('refresh_token', response.refresh_token);
              }
              
              // 원래 요청 재시도
              originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // 리프레시 토큰도 만료된 경우
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export const authService = new AuthService();
export default authService;