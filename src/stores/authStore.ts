import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import { User } from '../types'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  imwebId?: string  // imweb 사용자 ID
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  loginWithImweb: (code: string) => Promise<void>
  logout: () => void
}

interface SignupData {
  email: string
  password: string
  name: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, _password: string) => {
        // Mock login - 나중에 실제 API로 교체
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: User = {
          id: '1',
          email,
          name: 'Test User',
          role: 'user'
        }
        
        set({ user: mockUser, isAuthenticated: true })
      },
      
      signup: async (data: SignupData) => {
        // Mock signup - 나중에 실제 API로 교체
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: User = {
          id: '2',
          email: data.email,
          name: data.name,
          role: 'user'
        }
        
        set({ user: mockUser, isAuthenticated: true })
      },
      
      loginWithImweb: async (_code: string) => {
        // 실제 구현 시 백엔드 API 호출
        // const response = await fetch('/api/auth/imweb', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ code })
        // })
        // const data = await response.json()
        
        // Mock imweb login
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockUser: User = {
          id: 'imweb-user-1',
          email: 'user@imweb.me',
          name: 'imweb 사용자',
          role: 'user',
          imwebId: 'imweb123'
        }
        
        set({ user: mockUser, isAuthenticated: true })
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)