'use client'

import { create } from 'zustand'

// Define User interface
export interface User {
  id: string;
  full_name: string;
  avatar_url: string;
  email:string;
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

interface Request {
  id:string;
  sender_id:string;
  receiver_id:string;
  status:"accepted" | "pending" | "declined";
  created_at:string;
}

// User store
interface UserStore {
  user:User;
  setUser:(user:User) => void;
  allUsers: User[];
  setAllUsers: (users: User[]) => void;
  myFriends: User[];
  setMyFriends:(friends:User[]) => void;
  requestSenders:User[];
  setRequestSenders:(requests:User[])=>void;
}

export const useUserStore = create<UserStore>((set) => ({
  user:{
    id: '',
    full_name: '',
    avatar_url: '',
    username: '',
    email:'',
    headline: '',
    bio: '',
    created_at: ''
  },
  setUser:(current:User) => set({user:current}),
  allUsers: [],
  setAllUsers: (users: User[]) => set({ allUsers: users }),
  myFriends: [],
  setMyFriends:(friends:User[])=>set({myFriends:friends}),
  requestSenders:[],
  setRequestSenders:(requests:User[])=>set({requestSenders:requests}),
}))

export interface Message {
  id:string;
  sender_id:string;
  receiver_id:string;
  content:string;
  created_at:string;
  seen:boolean;
}

interface MessageStore{
  messages:Message[];
  setMessages:(message:Message[])=>void;
  addMessage: (message: Message) => void;
}

export const useMessageStore = create<MessageStore>((set)=>({
  messages:[],
  setMessages:(message:Message[])=>set({messages:message}),
  addMessage: (message:Message) => 
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),
}))