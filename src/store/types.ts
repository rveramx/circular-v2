export interface UserState {
  userId: string;
  username: string;
  isLoggedIn: boolean;
}

export interface UserActions {
  setUser: (userId: string, username: string) => void;
  logout: () => void;
}

export type UserStore = UserState & UserActions;
