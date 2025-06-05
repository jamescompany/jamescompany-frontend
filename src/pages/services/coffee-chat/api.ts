// src/pages/services/coffee-chat/api.ts

import api from '../../../services/api';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  profileImage?: string;
  hourlyRate?: number;
  session_price?: number; // 추가
  availableHours?: string;
  calendarConnected?: boolean;
  rating?: number;
  totalSessions?: number;
  qa_experience?: string; // 추가
}

export interface TimeSlot {
  id: string;
  mentorId: string;
  start: string; // 변경
  end: string; // 변경
  available: boolean; // 변경
  reason?: string; // 추가
  startTime?: string;
  endTime?: string;
  isAvailable?: boolean;
  isBooked?: boolean;
  bookedBy?: string;
  blockedReason?: string;
}

export interface BookingRequest {
  mentorId: string;
  slotId: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  topic: string;
  message?: string;
  duration?: number;
  paymentMethodId?: string;
}

export interface Booking {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorEmail?: string;
  userId: string;
  userEmail?: string;
  startTime: string;
  endTime: string;
  topic: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
  meetingLink?: string;
  calendarEventId?: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CalendarConnection {
  isConnected: boolean;
  email?: string;
  lastSynced?: string;
}

export const coffeeChatApi = {
  // 멘토 관련
  getMentors: async (filters?: { expertise?: string; priceRange?: string }) => {
    try {
      const response = await api.get('/coffee-chat/mentors', { params: filters }); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to fetch mentors:', error);
      throw error;
    }
  },

  getMentorById: async (mentorId: string): Promise<Mentor> => {
    try {
      const response = await api.get(`/coffee-chat/mentors/${mentorId}`); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to fetch mentor details:', error);
      throw error;
    }
  },

  // 시간대 관련 - 오버로드 추가
  getMentorAvailableSlots: async (mentorId: string, startDate: string, endDate?: string): Promise<TimeSlot[]> => {
    try {
      const response = await api.get(`/coffee-chat/mentors/${mentorId}/availability`, { // /api 제거
        params: { 
          date: startDate,
          startDate,
          endDate: endDate || startDate
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      throw error;
    }
  },

  // 구글 캘린더 연동
  initiateGoogleCalendarAuth: async (): Promise<{ authUrl: string }> => {
    try {
      const response = await api.post('/coffee-chat/calendar/auth/init'); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to initiate Google Calendar auth:', error);
      throw error;
    }
  },

  handleGoogleCalendarCallback: async (code: string): Promise<CalendarConnection> => {
    try {
      const response = await api.post('/coffee-chat/calendar/auth/callback', { code }); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to handle Google Calendar callback:', error);
      throw error;
    }
  },

  disconnectGoogleCalendar: async () => {
    try {
      const response = await api.delete('/coffee-chat/calendar/disconnect'); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to disconnect Google Calendar:', error);
      throw error;
    }
  },

  syncGoogleCalendar: async () => {
    try {
      const response = await api.post('/coffee-chat/calendar/sync'); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to sync Google Calendar:', error);
      throw error;
    }
  },

  getCalendarStatus: async (): Promise<CalendarConnection> => {
    try {
      const response = await api.get('/coffee-chat/calendar/status'); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to get calendar status:', error);
      throw error;
    }
  },

  // 예약 관련
  createBooking: async (bookingData: BookingRequest): Promise<Booking> => {
    try {
      const response = await api.post('/coffee-chat/bookings', bookingData); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  },

  getMyBookings: async (role: 'mentee' | 'mentor' = 'mentee', status?: string): Promise<Booking[]> => {
    try {
      const response = await api.get('/coffee-chat/bookings', { // /api 제거
        params: { role, status }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      throw error;
    }
  },

  getBookingById: async (bookingId: string): Promise<Booking> => {
    try {
      const response = await api.get(`/coffee-chat/bookings/${bookingId}`); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
      throw error;
    }
  },

  cancelBooking: async (bookingId: string, reason?: string) => {
    try {
      const response = await api.post(`/coffee-chat/bookings/${bookingId}/cancel`, {  // /api 제거
        reason 
      });
      return response.data;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      throw error;
    }
  },

  // 멘토 관련 API
  registerAsMentor: async (mentorData: {
    title: string;
    company: string;
    bio: string;
    expertise: string[];
    hourlyRate: number;
    availableHours: any;
  }) => {
    try {
      const response = await api.post('/coffee-chat/mentors/register', mentorData); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to register as mentor:', error);
      throw error;
    }
  },

  updateMentorProfile: async (mentorData: Partial<Mentor>) => {
    try {
      const response = await api.put('/coffee-chat/mentors/profile', mentorData); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to update mentor profile:', error);
      throw error;
    }
  },

  getMentorDashboard: async () => {
    try {
      const response = await api.get('/coffee-chat/mentors/dashboard'); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to fetch mentor dashboard:', error);
      throw error;
    }
  },

  // 결제 관련
  createPaymentIntent: async (bookingId: string): Promise<{ clientSecret: string }> => {
    try {
      const response = await api.post(`/coffee-chat/bookings/${bookingId}/payment`); // /api 제거
      return response.data;
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      throw error;
    }
  },

  confirmPayment: async (bookingId: string, paymentIntentId: string) => {
    try {
      const response = await api.post(`/coffee-chat/bookings/${bookingId}/confirm-payment`, { // /api 제거
        paymentIntentId
      });
      return response.data;
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      throw error;
    }
  },
};