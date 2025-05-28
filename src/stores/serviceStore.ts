import { create } from 'zustand'
// import { CoffeeChatSlot, Course, BetaTest } from '../types'

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
  enrollCourse: (courseId: string) => Promise<void>
  
  // Bug Bounty
  betaTests: BetaTest[]
  fetchBetaTests: () => Promise<void>
  applyBetaTest: (testId: string) => Promise<void>
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  // Coffee Chat
  coffeeSlots: [],
  fetchCoffeeSlots: async () => {
    // Mock data
    const mockSlots: CoffeeChatSlot[] = [
      { id: '1', date: '2024-01-25', time: '14:00', type: 'online', available: true },
      { id: '2', date: '2024-01-25', time: '15:00', type: 'offline', available: true },
      { id: '3', date: '2024-01-26', time: '10:00', type: 'online', available: false },
    ]
    set({ coffeeSlots: mockSlots })
  },
  
  bookCoffeeSlot: async (slotId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const slots = get().coffeeSlots.map(slot => 
      slot.id === slotId ? { ...slot, available: false } : slot
    )
    set({ coffeeSlots: slots })
  },
  
  // Education
  courses: [],
  myCourses: [],
  fetchCourses: async () => {
    const mockCourses: Course[] = [
      { id: '1', title: 'QA 자동화 입문', description: 'Selenium과 Pytest로 시작하는 자동화', price: 99000, duration: '8주' },
      { id: '2', title: 'SDET 실무', description: 'CI/CD와 테스트 자동화 구축', price: 199000, duration: '12주' },
    ]
    set({ courses: mockCourses })
  },
  
  enrollCourse: async (courseId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const course = get().courses.find(c => c.id === courseId)
    if (course) {
      set({ myCourses: [...get().myCourses, { ...course, enrolled: true }] })
    }
  },
  
  // Bug Bounty
  betaTests: [],
  fetchBetaTests: async () => {
    const mockTests: BetaTest[] = [
      { id: '1', appName: '쇼핑 앱 v2.0', description: '새로운 결제 시스템 테스트', deadline: '2024-02-01', participants: 45, maxParticipants: 100 },
      { id: '2', appName: '피트니스 트래커', description: '운동 기록 기능 베타 테스트', deadline: '2024-01-30', participants: 23, maxParticipants: 50 },
    ]
    set({ betaTests: mockTests })
  },
  
  applyBetaTest: async (testId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Applied to beta test:', testId)
  }
}))