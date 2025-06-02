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

// 개발 환경에서 API 호출 비활성화 (임시)
const USE_MOCK_DATA = true; // 백엔드 API가 준비되면 false로 변경

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
    
    // Mock 데이터 사용
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        set({ 
          coffeeSlots: [], 
          loading: false,
          error: 'API가 준비 중입니다. 곧 실제 커피챗 정보를 확인하실 수 있습니다.'
        })
      }, 300)
      return
    }
    
    try {
      const response = await api.get<CoffeeChatSlot[]>('/api/coffee-chat/slots')
      set({ coffeeSlots: response.data, loading: false })
    } catch (error: any) {
      console.error('Failed to fetch coffee slots:', error)
      set({ error: error.response?.data?.detail || '커피챗 시간을 불러오는데 실패했습니다.', loading: false })
    }
  },
  
  bookCoffeeSlot: async (slotId: string) => {
    set({ loading: true, error: null })
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        set({ loading: false })
        alert('서비스 준비 중입니다.')
      }, 300)
      return
    }
    
    try {
      await api.post(`/api/coffee-chat/slots/${slotId}/book`)
      await get().fetchCoffeeSlots()
    } catch (error: any) {
      console.error('Failed to book coffee slot:', error)
      const errorMessage = error.response?.data?.detail || '예약에 실패했습니다.'
      set({ error: errorMessage, loading: false })
      throw new Error(errorMessage)
    }
  },
  
  // Education Methods
  fetchCourses: async () => {
    set({ loading: true, error: null })
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        set({ 
          courses: [], 
          loading: false,
          error: '새로운 교육 과정을 준비 중입니다. 곧 다양한 강의를 만나보실 수 있습니다.'
        })
      }, 300)
      return
    }
    
    try {
      const response = await api.get<Course[]>('/api/courses')
      set({ courses: response.data, loading: false })
    } catch (error: any) {
      console.error('Failed to fetch courses:', error)
      set({ error: error.response?.data?.detail || '강좌 목록을 불러오는데 실패했습니다.', loading: false })
    }
  },
  
  fetchMyCourses: async () => {
    set({ loading: true, error: null })
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        set({ myCourses: [], loading: false })
      }, 300)
      return
    }
    
    try {
      const response = await api.get<Course[]>('/api/courses/my')
      set({ myCourses: response.data, loading: false })
    } catch (error: any) {
      console.error('Failed to fetch my courses:', error)
      set({ error: error.response?.data?.detail || '수강 중인 강좌를 불러오는데 실패했습니다.', loading: false })
    }
  },
  
  enrollCourse: async (courseId: string) => {
    set({ loading: true, error: null })
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        set({ loading: false })
        alert('서비스 준비 중입니다.')
      }, 300)
      return
    }
    
    try {
      await api.post(`/api/courses/${courseId}/enroll`)
      await Promise.all([
        get().fetchCourses(),
        get().fetchMyCourses()
      ])
    } catch (error: any) {
      console.error('Failed to enroll course:', error)
      const errorMessage = error.response?.data?.detail || '수강 신청에 실패했습니다.'
      set({ error: errorMessage, loading: false })
      throw new Error(errorMessage)
    }
  },
  
  // Bug Bounty Methods
  fetchBetaTests: async () => {
    set({ loading: true, error: null })
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        set({ 
          betaTests: [], 
          loading: false,
          error: '새로운 베타 테스트 프로그램을 준비 중입니다. 곧 더 많은 기회를 제공할 예정입니다.'
        })
      }, 300)
      return
    }
    
    try {
      const response = await api.get<BetaTest[]>('/api/beta-tests')
      set({ betaTests: response.data, loading: false })
    } catch (error: any) {
      console.error('Failed to fetch beta tests:', error)
      set({ error: error.response?.data?.detail || '베타 테스트 목록을 불러오는데 실패했습니다.', loading: false })
    }
  },
  
  applyBetaTest: async (testId: string) => {
    set({ loading: true, error: null })
    
    if (USE_MOCK_DATA) {
      setTimeout(() => {
        set({ loading: false })
        alert('서비스 준비 중입니다.')
      }, 300)
      return
    }
    
    try {
      await api.post(`/api/beta-tests/${testId}/apply`)
      await get().fetchBetaTests()
    } catch (error: any) {
      console.error('Failed to apply beta test:', error)
      const errorMessage = error.response?.data?.detail || '베타 테스트 신청에 실패했습니다.'
      set({ error: errorMessage, loading: false })
      throw new Error(errorMessage)
    }
  }
}))