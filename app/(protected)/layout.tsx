// app/(protected)/layout.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { fetchAllUsers } from '@/lib/api/user/functions'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login') // or redirect('/')
  }
  fetchAllUsers()

  return <>{children}</>
}