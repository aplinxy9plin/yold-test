import { UserResponse } from "@/lib/api";
import { create } from "zustand";

interface UserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
