'use client'

import React, { createContext, useContext } from 'react'

interface UserContextType {
  all_users: any
  profile: any
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

export function UserProvider({
  children,
  all_users,
  profile,
}: {
  children: React.ReactNode
  all_users: any
  profile: any
}) {
  return (
    <UserContext.Provider value={{ all_users, profile }}>
      {children}
    </UserContext.Provider>
  )
}
