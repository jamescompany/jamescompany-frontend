// src/features/coffee-chat/config/googleCalendar.ts

export const GOOGLE_CALENDAR_CONFIG = {
    // Google Cloud Console에서 발급받은 Client ID
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    // 필요한 권한 범위
    scopes: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events'
    ],
    // OAuth 리다이렉트 URL
    redirectUri: `${window.location.origin}/services/coffee-chat/calendar-callback`
  };
  
  // Google Calendar API 관련 타입 정의
  export interface GoogleCalendarEvent {
    id?: string;
    summary: string;
    description?: string;
    start: {
      dateTime: string;
      timeZone: string;
    };
    end: {
      dateTime: string;
      timeZone: string;
    };
    attendees?: Array<{
      email: string;
      displayName?: string;
      responseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted';
    }>;
    conferenceData?: {
      createRequest?: {
        requestId: string;
        conferenceSolutionKey: {
          type: 'hangoutsMeet';
        };
      };
    };
  }
  
  export interface CalendarAvailability {
    date: string;
    slots: Array<{
      start: string;
      end: string;
      available: boolean;
    }>;
  }