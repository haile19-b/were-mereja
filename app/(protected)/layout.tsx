// app/(protected)/layout.tsx
import { redirect } from 'next/navigation'
import React from 'react'
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
  
  return (
      <>{children}</>
  )
}