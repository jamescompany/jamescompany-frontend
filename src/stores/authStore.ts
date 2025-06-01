// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  imwebId?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  loginWithImweb: (code: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

interface SignupData {
  email: string
  password: string
  name: string
}

interface LoginResponse {
  access_token: string
  refresh_token?: string
  token_type: string
  user: User
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      
      login: async (email: string, password: string) => {
        try {
          const response = await api.post<LoginResponse>('/api/auth/login', {
            username: email, // FastAPI OAuth2 expects 'username'
            password,
          })
          
          const { access_token, user } = response.data
          
          // 토큰 저장
          localStorage.setItem('access_token', access_token)
          
          set({ 
            user, 
            isAuthenticated: true, 
            token: access_token 
          })
        } catch (error: any) {
          console.error('Login error:', error)
          if (error.response?.status === 401) {
            throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
          }
          throw new Error('로그인 중 오류가 발생했습니다.')
        }
      },
      
      signup: async (data: SignupData) => {
        try {
          // 회원가입
          const signupResponse = await api.post('/api/auth/signup', data)
          
          // 회원가입 성공 후 자동 로그인
          await get().login(data.email, data.password)
        } catch (error: any) {
          console.error('Signup error:', error)
          if (error.response?.data?.detail) {
            throw new Error(error.response.data.detail)
          }
          throw new Error('회원가입 중 오류가 발생했습니다.')
        }
      },
      
      loginWithImweb: async (code: string) => {
        try {
          const response = await api.post<LoginResponse>('/api/auth/imweb/callback', {
            code,
          })
          
          const { access_token, user } = response.data
          
          // 토큰 저장
          localStorage.setItem('access_token', access_token)
          
          set({ 
            user, 
            isAuthenticated: true, 
            token: access_token 
          })
        } catch (error: any) {
          console.error('Imweb login error:', error)
          throw new Error('imweb 로그인 중 오류가 발생했습니다.')
        }
      },
      
      logout: () => {
        // 토큰 삭제
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        
        // 상태 초기화
        set({ 
          user: null, 
          isAuthenticated: false, 
          token: null 
        })
        
        // 로그아웃 API 호출 (선택사항)
        api.post('/api/auth/logout').catch(console.error)
      },
      
      checkAuth: async () => {
        const token = localStorage.getItem('access_token')
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null })
          return
        }
        
        try {
          const response = await api.get<User>('/api/users/me')
          set({ 
            user: response.data, 
            isAuthenticated: true, 
            token 
          })
        } catch (error) {
          console.error('Auth check failed:', error)
          // 토큰이 유효하지 않으면 초기화
          localStorage.removeItem('access_token')
          set({ isAuthenticated: false, user: null, token: null })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)