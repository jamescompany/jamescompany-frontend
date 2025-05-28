import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// import { User } from '../types'

interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: SignupData) => Promise<void>
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
      
      login: async (email: string, password: string) => {
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
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)