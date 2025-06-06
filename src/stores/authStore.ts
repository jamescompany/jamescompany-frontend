// src/stores/authStore.ts

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../services/api'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  is_admin?: boolean
  mentorStatus?: 'pending' | 'approved' | 'rejected'
  mentorId?: number
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
  setAuth: (isAuthenticated: boolean, user?: User | null, token?: string | null) => void
  updateMentorStatus: (mentorStatus: 'pending' | 'approved' | 'rejected', mentorId?: number) => void
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
          // /api/v1/auth/login으로 수정 (api.ts의 baseURL이 이미 http://localhost:8000이므로)
          const response = await api.post('/api/v1/auth/login', { 
            email, 
            password 
          });

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
          // /api/v1/auth/register로 수정
          const signupResponse = await api.post('/api/v1/auth/register', data);
          console.log('Signup response:', signupResponse);

          // 회원가입 성공 후 자동 로그인
          try {
            await get().login(data.email, data.password)
          } catch (loginError) {
            console.error('Auto-login failed after signup:', loginError)
          }
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
          const response = await api.post<LoginResponse>('/api/v1/auth/imweb/callback', {
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
        api.post('/api/v1/auth/logout').catch(console.error)
      },

      checkAuth: async () => {
        const token = localStorage.getItem('access_token')
        const currentState = get()
        
        // 이미 인증된 상태이고 토큰이 있으면 API 호출 스킵
        if (currentState.isAuthenticated && currentState.token && token) {
          return
        }
        
        if (!token) {
          set({ isAuthenticated: false, user: null, token: null })
          return
        }

        try {
          const response = await api.get<User>('/api/v1/users/me')
          
          // 멘토 상태 확인 (선택사항)
          try {
            const mentorResponse = await api.get('/api/v1/mentors/my-status')
            if (mentorResponse.data) {
              response.data.mentorStatus = mentorResponse.data.status
              response.data.mentorId = mentorResponse.data.id
            }
          } catch (mentorError) {
            // 멘토가 아닌 경우 무시
          }
          
          set({
            user: response.data,
            isAuthenticated: true,
            token
          })
        } catch (error) {
          console.error('Auth check failed:', error)
          // 네트워크 에러인 경우 상태를 유지
          if (!navigator.onLine) {
            console.log('Offline - keeping auth state')
            return
          }
          // 401 에러인 경우만 로그아웃 처리
          if ((error as any).response?.status === 401) {
            localStorage.removeItem('access_token')
            set({ isAuthenticated: false, user: null, token: null })
          }
          // 다른 에러는 상태 유지
        }
      },

      // OAuth 로그인 후 인증 상태 설정을 위한 메서드
      setAuth: (isAuthenticated: boolean, user: User | null = null, token: string | null = null) => {
        set({ isAuthenticated, user, token })
      },

      // 멘토 상태 업데이트 (멘토 승인/거절 후 사용)
      updateMentorStatus: (mentorStatus: 'pending' | 'approved' | 'rejected', mentorId?: number) => {
        set((state) => ({
          user: state.user ? { 
            ...state.user, 
            mentorStatus,
            mentorId: mentorId || state.user.mentorId 
          } : null
        }))
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      }),
    }
  )
)