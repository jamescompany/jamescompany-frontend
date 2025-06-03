// src/pages/services/coffee-chat/api.ts

import { api } from '../../../config/api';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  profileImage?: string;
  hourlyRate?: number;
  availableHours?: string; // 예: "평일 19:00-21:00"
}

export interface TimeSlot {
  id: string;
  mentorId: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isBooked?: boolean;
  bookedBy?: string;
}

export interface BookingRequest {
  mentorId: string;
  slotId: string;
  topic: string;
  message?: string;
  duration?: number; // 분 단위
}

export interface Booking {
  id: string;
  mentorId: string;
  mentorName: string;
  userId: string;
  startTime: string;
  endTime: string;
  topic: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  meetingLink?: string;
  createdAt: string;
}

export const coffeeChatApi = {
  // 멘토 관련
  getMentors: async () => {
    try {
      const response = await api.get('/api/coffee-chat/mentors');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch mentors:', error);
      throw error;
    }
  },

  getMentorById: async (mentorId: string) => {
    try {
      const response = await api.get(`/api/coffee-chat/mentors/${mentorId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch mentor details:', error);
      throw error;
    }
  },

  // 시간대 관련
  getMentorAvailableSlots: async (mentorId: string, startDate: string, endDate: string) => {
    try {
      const response = await api.get(`/api/coffee-chat/mentors/${mentorId}/slots`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
      throw error;
    }
  },

  // 구글 캘린더 연동
  connectGoogleCalendar: async () => {
    try {
      const response = await api.post('/api/coffee-chat/calendar/connect');
      return response.data;
    } catch (error) {
      console.error('Failed to connect Google Calendar:', error);
      throw error;
    }
  },

  syncGoogleCalendar: async () => {
    try {
      const response = await api.post('/api/coffee-chat/calendar/sync');
      return response.data;
    } catch (error) {
      console.error('Failed to sync Google Calendar:', error);
      throw error;
    }
  },

  getCalendarStatus: async () => {
    try {
      const response = await api.get('/api/coffee-chat/calendar/status');
      return response.data;
    } catch (error) {
      console.error('Failed to get calendar status:', error);
      throw error;
    }
  },

  // 예약 관련
  createBooking: async (bookingData: BookingRequest) => {
    try {
      const response = await api.post('/api/coffee-chat/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Failed to create booking:', error);
      throw error;
    }
  },

  getMyBookings: async (status?: string) => {
    try {
      const response = await api.get('/api/coffee-chat/bookings/me', {
        params: status ? { status } : {}
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch my bookings:', error);
      throw error;
    }
  },

  getBookingById: async (bookingId: string) => {
    try {
      const response = await api.get(`/api/coffee-chat/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch booking details:', error);
      throw error;
    }
  },

  cancelBooking: async (bookingId: string, reason?: string) => {
    try {
      const response = await api.delete(`/api/coffee-chat/bookings/${bookingId}`, {
        data: { reason }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      throw error;
    }
  },

  // 멘토가 사용하는 API (멘토 기능이 있다면)
  updateAvailability: async (availability: any) => {
    try {
      const response = await api.put('/api/coffee-chat/mentor/availability', availability);
      return response.data;
    } catch (error) {
      console.error('Failed to update availability:', error);
      throw error;
    }
  },

  getMentorBookings: async () => {
    try {
      const response = await api.get('/api/coffee-chat/mentor/bookings');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch mentor bookings:', error);
      throw error;
    }
  },

  confirmBooking: async (bookingId: string) => {
    try {
      const response = await api.post(`/api/coffee-chat/bookings/${bookingId}/confirm`);
      return response.data;
    } catch (error) {
      console.error('Failed to confirm booking:', error);
      throw error;
    }
  },
};