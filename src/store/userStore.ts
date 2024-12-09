import { create } from 'zustand';
import { UserStore } from './types';

export const useUserStore = create<UserStore>((set) => ({
  userId: '',
  username: '',
  isLoggedIn: false,

  setUser: (userId: string, username: string) => set({ userId, username, isLoggedIn: true }),
  logout: () => set({ userId: '', username: '', isLoggedIn: false }),
}));
