'use client'

import { create } from 'zustand'
import { fetchAllUsers } from '../api/user/functions';

// Define User interface
export interface User {
  id: string;
  full_name: string;
  avatar_url: string;
  username: string;
  headline: string;
  bio: string;
  created_at: string; // string from DB, can convert to Date later if needed
}

// Error store
interface ErrorStore {
  error: any;
  setError: (newError: any) => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  error: null,
  setError: (newError) => set({ error: newError }),
}));

// User store
interface UserStore {
  allUsers: User[];
  myFriends: User[];
  setAllUsers: (users: User[]) => void;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  allUsers: [],
  setAllUsers: (users: User[]) => set({ allUsers: users }),
  myFriends: [],
  setMyFriends:(friends:User[])=>set({myFriends:friends}),

  fetchUsers: async () => {
    try {
      const result = await fetchAllUsers()
      if (!result || !result.success) {
        useErrorStore.getState().setError(result?.error || 'Failed to fetch users')
      } else {
        set({ allUsers: result.data })
      }
    } catch (err) {
      useErrorStore.getState().setError(err)
    }
  },
}))
