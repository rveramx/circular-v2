import { create } from 'zustand';

interface UserLocation {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  mapLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setUserLocation: (location: { latitude: number; longitude: number } | null) => void;
  setMapLocation: (location: { latitude: number; longitude: number } | null) => void;
}

const useUserLocation = create<UserLocation>((set) => ({
  userLocation: null,
  mapLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  setMapLocation: (location) => set({ mapLocation: location }),
}));

export default useUserLocation; 