// src/stores/serviceStore.ts
import { create } from 'zustand'
import api from '../services/api'

interface CoffeeChatSlot {
  id: string
  date: string
  time: string
  type: 'online' | 'offline'
  available: boolean
}

interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  enrolled?: boolean
}

interface BetaTest {
  id: string
  appName: string
  description: string
  deadline: string
  participants: number
  maxParticipants: number
}

interface ServiceState {
  // Coffee Chat
  coffeeSlots: CoffeeChatSlot[]
  fetchCoffeeSlots: () => Promise<void>
  bookCoffeeSlot: (slotId: string) => Promise<void>
  
  // Education
  courses: Course[]
  myCourses: Course[]
  fetchCourses: () => Promise<void>
  fetchMyCourses: () => Promise<void>
  enrollCourse: (courseId: string) => Promise<void>
  
  // Bug Bounty
  betaTests: BetaTest[]
  fetchBetaTests: () => Promise<void>
  applyBetaTest: (testId: string) => Promise<void>
  
  // Loading states
  loading: boolean
  error: string | null
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  // State
  coffeeSlots: [],
  courses: [],
  myCourses: [],
  betaTests: [],
  loading: false,
  error: null,
  
  // Coffee Chat Methods
  fetchCoffeeSlots: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get<CoffeeChatSlot[]>('/api/coffee-chat/slots')
      set({ coffeeSlots: response.data })
    } catch (error: any) {
      console.error('Failed to fetch coffee slots:', error)
      set({ error: error.response?.data?.detail || '커피챗 시간을 불러오는데 실패했습니다.' })
    } finally {
      set({ loading: false })
    }
  },
  
  bookCoffeeSlot: async (slotId: string) => {
    set({ loading: true, error: null })
    try {
      await api.post(`/api/coffee-chat/slots/${slotId}/book`)
      
      // 예약 후 슬롯 목록 새로고침
      await get().fetchCoffeeSlots()
      
      // 성공 메시지는 컴포넌트에서 처리
    } catch (error: any) {
      console.error('Failed to book coffee slot:', error)
      const errorMessage = error.response?.data?.detail || '예약에 실패했습니다.'
      set({ error: errorMessage })
      throw new Error(errorMessage)
    } finally {
      set({ loading: false })
    }
  },
  
  // Education Methods
  fetchCourses: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get<Course[]>('/api/courses')
      set({ courses: response.data })
    } catch (error: any) {
      console.error('Failed to fetch courses:', error)
      set({ error: error.response?.data?.detail || '강좌 목록을 불러오는데 실패했습니다.' })
    } finally {
      set({ loading: false })
    }
  },
  
  fetchMyCourses: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get<Course[]>('/api/courses/my')
      set({ myCourses: response.data })
    } catch (error: any) {
      console.error('Failed to fetch my courses:', error)
      set({ error: error.response?.data?.detail || '수강 중인 강좌를 불러오는데 실패했습니다.' })
    } finally {
      set({ loading: false })
    }
  },
  
  enrollCourse: async (courseId: string) => {
    set({ loading: true, error: null })
    try {
      await api.post(`/api/courses/${courseId}/enroll`)
      
      // 수강 신청 후 강좌 목록 새로고침
      await Promise.all([
        get().fetchCourses(),
        get().fetchMyCourses()
      ])
    } catch (error: any) {
      console.error('Failed to enroll course:', error)
      const errorMessage = error.response?.data?.detail || '수강 신청에 실패했습니다.'
      set({ error: errorMessage })
      throw new Error(errorMessage)
    } finally {
      set({ loading: false })
    }
  },
  
  // Bug Bounty Methods
  fetchBetaTests: async () => {
    set({ loading: true, error: null })
    try {
      // API 경로 수정: /api/beta-tests → /api/beta-tests
      const response = await api.get<BetaTest[]>('/api/beta-tests')
      set({ betaTests: response.data })
    } catch (error: any) {
      console.error('Failed to fetch beta tests:', error)
      set({ error: error.response?.data?.detail || '베타 테스트 목록을 불러오는데 실패했습니다.' })
    } finally {
      set({ loading: false })
    }
  },
  
  applyBetaTest: async (testId: string) => {
    set({ loading: true, error: null })
    try {
      // API 경로 수정: /api/beta-tests → /api/beta-tests
      await api.post(`/api/beta-tests/${testId}/apply`)
      
      // 신청 후 베타 테스트 목록 새로고침
      await get().fetchBetaTests()
    } catch (error: any) {
      console.error('Failed to apply beta test:', error)
      const errorMessage = error.response?.data?.detail || '베타 테스트 신청에 실패했습니다.'
      set({ error: errorMessage })
      throw new Error(errorMessage)
    } finally {
      set({ loading: false })
    }
  }
}))