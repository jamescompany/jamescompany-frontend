// src/types/index.ts

export interface UserLocation {
  city: string;
  district: string;
  neighborhood: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  location?: UserLocation;
  preferredDistance?: number; // km 단위
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'notice' | 'story';
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoffeeChatSlot {
  id: string;
  date: string;
  time: string;
  type: 'online' | 'offline';
  available: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  enrolled?: boolean;
}

export interface BetaTest {
  id: string;
  appName: string;
  description: string;
  deadline: string;
  participants: number;
  maxParticipants: number;
}