import { create } from "zustand";

interface UserStore {
    isLogedIn: boolean;
    setIsLogedIn: (newValue: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    isLogedIn: false,
    setIsLogedIn:(newValue: boolean) => set({ isLogedIn: newValue }),
}))