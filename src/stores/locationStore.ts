// src/stores/locationStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Location {
  city: string;
  district: string;
  neighborhood: string;
  nearbyStation?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface LocationStore {
  userLocation: Location | null;
  preferredDistance: number;
  setUserLocation: (location: Location) => void;
  setPreferredDistance: (distance: number) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      userLocation: null,
      preferredDistance: 20, // 기본값 20km

      setUserLocation: (location) => set({ userLocation: location }),
      
      setPreferredDistance: (distance) => set({ preferredDistance: distance }),
      
      clearLocation: () => set({ userLocation: null, preferredDistance: 20 }),
    }),
    {
      name: 'location-storage', // localStorage에 저장될 키 이름
    }
  )
);