// app/(protected)/layout.tsx
import { redirect } from 'next/navigation'
import React from 'react'
import { UserProvider } from '../context/UserProvider'
import { createClient } from '@/utils/supabase/server'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

    const {data:allUsers} = await supabase.from('profiles').select('*')

  return (
    <UserProvider all_users={allUsers} profile={profile}>
      {children}
    </UserProvider>
  )
}
