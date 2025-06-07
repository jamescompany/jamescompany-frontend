// src/features/coffee-chat/stores/coffeeChatStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { coffeeChatApi, type Mentor, type Booking, type TimeSlot } from '../servcies/api';

interface CoffeeChatState {
  // 멘토 관련
  mentors: Mentor[];
  selectedMentor: Mentor | null;
  mentorsLoading: boolean;
  mentorsError: string | null;
  
  // 예약 관련
  bookings: Booking[];
  selectedBooking: Booking | null;
  bookingsLoading: boolean;
  bookingsError: string | null;
  
  // 시간대 관련
  availableSlots: TimeSlot[];
  slotsLoading: boolean;
  slotsError: string | null;
  
  // 캘린더 연동
  calendarConnected: boolean;
  calendarEmail: string | null;
  
  // 멘토 관련 액션
  fetchMentors: (filters?: { expertise?: string; priceRange?: string }) => Promise<void>;
  fetchMentorDetail: (mentorId: string) => Promise<void>;
  registerAsMentor: (mentorData: any) => Promise<void>;
  updateMentorProfile: (mentorData: Partial<Mentor>) => Promise<void>;
  
  // 예약 관련 액션
  fetchBookings: (role?: 'mentee' | 'mentor', status?: string) => Promise<void>;
  createBooking: (bookingData: any) => Promise<Booking>;
  cancelBooking: (bookingId: string, reason?: string) => Promise<void>;
  
  // 시간대 관련 액션
  fetchAvailableSlots: (mentorId: string, startDate: string, endDate?: string) => Promise<void>;
  
  // 캘린더 관련 액션
  checkCalendarStatus: () => Promise<void>;
  initiateCalendarAuth: () => Promise<{ authUrl: string }>;
  disconnectCalendar: () => Promise<void>;
  
  // 리셋
  reset: () => void;
}

const initialState = {
  mentors: [],
  selectedMentor: null,
  mentorsLoading: false,
  mentorsError: null,
  bookings: [],
  selectedBooking: null,
  bookingsLoading: false,
  bookingsError: null,
  availableSlots: [],
  slotsLoading: false,
  slotsError: null,
  calendarConnected: false,
  calendarEmail: null,
};

export const useCoffeeChatStore = create<CoffeeChatState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // 멘토 관련 액션
      fetchMentors: async (filters) => {
        set({ mentorsLoading: true, mentorsError: null });
        try {
          const mentors = await coffeeChatApi.getMentors(filters);
          set({ mentors, mentorsLoading: false });
        } catch (error: any) {
          set({ 
            mentorsError: error.response?.data?.detail || '멘토 목록을 불러오는데 실패했습니다.',
            mentorsLoading: false 
          });
          throw error;
        }
      },

      fetchMentorDetail: async (mentorId) => {
        set({ mentorsLoading: true, mentorsError: null });
        try {
          const mentor = await coffeeChatApi.getMentorById(mentorId);
          set({ selectedMentor: mentor, mentorsLoading: false });
        } catch (error: any) {
          set({ 
            mentorsError: error.response?.data?.detail || '멘토 정보를 불러오는데 실패했습니다.',
            mentorsLoading: false 
          });
          throw error;
        }
      },

      registerAsMentor: async (mentorData) => {
        set({ mentorsLoading: true, mentorsError: null });
        try {
          const mentor = await coffeeChatApi.registerAsMentor(mentorData);
          set({ mentorsLoading: false });
          return mentor;
        } catch (error: any) {
          set({ 
            mentorsError: error.response?.data?.detail || '멘토 등록에 실패했습니다.',
            mentorsLoading: false 
          });
          throw error;
        }
      },

      updateMentorProfile: async (mentorData) => {
        set({ mentorsLoading: true, mentorsError: null });
        try {
          const updatedMentor = await coffeeChatApi.updateMentorProfile(mentorData);
          set({ 
            selectedMentor: updatedMentor,
            mentorsLoading: false 
          });
          return updatedMentor;
        } catch (error: any) {
          set({ 
            mentorsError: error.response?.data?.detail || '프로필 업데이트에 실패했습니다.',
            mentorsLoading: false 
          });
          throw error;
        }
      },

      // 예약 관련 액션
      fetchBookings: async (role = 'mentee', status) => {
        set({ bookingsLoading: true, bookingsError: null });
        try {
          const bookings = await coffeeChatApi.getMyBookings(role, status);
          set({ bookings, bookingsLoading: false });
        } catch (error: any) {
          set({ 
            bookingsError: error.response?.data?.detail || '예약 목록을 불러오는데 실패했습니다.',
            bookingsLoading: false 
          });
          throw error;
        }
      },

      createBooking: async (bookingData) => {
        set({ bookingsLoading: true, bookingsError: null });
        try {
          const booking = await coffeeChatApi.createBooking(bookingData);
          const { bookings } = get();
          set({ 
            bookings: [...bookings, booking],
            bookingsLoading: false 
          });
          return booking;
        } catch (error: any) {
          set({ 
            bookingsError: error.response?.data?.detail || '예약 생성에 실패했습니다.',
            bookingsLoading: false 
          });
          throw error;
        }
      },

      cancelBooking: async (bookingId, reason) => {
        set({ bookingsLoading: true, bookingsError: null });
        try {
          await coffeeChatApi.cancelBooking(bookingId, reason);
          const { bookings } = get();
          set({ 
            bookings: bookings.map(b => 
              b.id === bookingId ? { ...b, status: 'cancelled' } : b
            ),
            bookingsLoading: false 
          });
        } catch (error: any) {
          set({ 
            bookingsError: error.response?.data?.detail || '예약 취소에 실패했습니다.',
            bookingsLoading: false 
          });
          throw error;
        }
      },

      // 시간대 관련 액션
      fetchAvailableSlots: async (mentorId, startDate, endDate) => {
        set({ slotsLoading: true, slotsError: null });
        try {
          const slots = await coffeeChatApi.getMentorAvailableSlots(mentorId, startDate, endDate);
          set({ availableSlots: slots, slotsLoading: false });
        } catch (error: any) {
          set({ 
            slotsError: error.response?.data?.detail || '가능한 시간대를 불러오는데 실패했습니다.',
            slotsLoading: false 
          });
          throw error;
        }
      },

      // 캘린더 관련 액션
      checkCalendarStatus: async () => {
        try {
          const status = await coffeeChatApi.getCalendarStatus();
          set({ 
            calendarConnected: status.isConnected,
            calendarEmail: status.email || null 
          });
        } catch (error) {
          console.error('Failed to check calendar status:', error);
        }
      },

      initiateCalendarAuth: async () => {
        try {
          const result = await coffeeChatApi.initiateGoogleCalendarAuth();
          return result;
        } catch (error: any) {
          throw error;
        }
      },

      disconnectCalendar: async () => {
        try {
          await coffeeChatApi.disconnectGoogleCalendar();
          set({ 
            calendarConnected: false,
            calendarEmail: null 
          });
        } catch (error: any) {
          throw error;
        }
      },

      // 리셋
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'coffee-chat-storage',
      partialize: (state) => ({
        // 저장할 상태만 선택 (일시적인 상태는 제외)
        calendarConnected: state.calendarConnected,
        calendarEmail: state.calendarEmail,
      }),
    }
  )
);