// src/services/api.ts
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// axios 인스턴스 생성
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // 토큰 갱신 로직 (필요시)
      // const refreshToken = localStorage.getItem('refresh_token')
      // if (refreshToken) {
      //   try {
      //     const response = await api.post('/auth/refresh', { refresh_token: refreshToken })
      //     const { access_token } = response.data
      //     localStorage.setItem('access_token', access_token)
      //     return api(originalRequest)
      //   } catch (refreshError) {
      //     // 리프레시도 실패하면 로그아웃
      //     window.location.href = '/login'
      //     return Promise.reject(refreshError)
      //   }
      // }
      
      // 토큰이 없거나 만료되면 로그인 페이지로
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api