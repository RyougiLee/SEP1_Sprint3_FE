import {create} from "zustand";

interface User{
  userId: number;
  username: string;
  role: 'STUDENT' | 'TEACHER';
  fullName: string;
}

interface UserState{
  user: User | null;
  token: string | null;
  clearUserProfile: () => void;
  setUser: (user: any) => void;
  setAuth: (user:any, token:any) => void;
}

export const useUserStore = create<UserState>((set:any) => ({
  user: null,
  token: null,
  clearUserProfile: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    set({ user: null, token: null });
  },
  setAuth: (user: any, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user",JSON.stringify(user));
    set({ user, token });
  },
  setUser: (user: any) => set({ user }),
}));