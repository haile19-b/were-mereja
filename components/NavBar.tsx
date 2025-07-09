'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { createClient } from '@/utils/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, User, Settings, LogOut, Home, Users, MessageSquare, Bell } from 'lucide-react'
import { signout } from '@/lib/auth-actions'
import ThemeToggle from '@/app/theme-toggle'
import { Sheet, SheetContent, SheetTrigger,SheetTitle } from './ui/sheet'
import { Menu } from 'lucide-react'

function NavBar() {
  const [user, setUser] = useState<any>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })
  }

  getUser();

  const handleLogout = async () => {
    await signout()
    router.push('/login')
    setUser(null)
    setDropdownOpen(false)
  }

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'My Network', path: '/dashboard/network', icon: <Users className="w-5 h-5" /> },
    { name: 'Messaging', path: '/dashboard/messaging', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Notifications', path: '/dashboard/notifications', icon: <Bell className="w-5 h-5" /> },
  ]

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-3 shadow-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      {/* Left side - Logo and Mobile Menu */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        {user && (
  <Sheet>
    <SheetTrigger asChild className="md:hidden">
      <Button variant="ghost" size="icon">
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[250px]">
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <div className="flex flex-col h-full pt-6">
        <div className="flex items-center space-x-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={32} 
              height={32} 
              className="p-1"
            />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Were-Mereja
          </span>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${pathname === item.path ? 'bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </SheetContent>
  </Sheet>
)}

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden group-hover:rotate-6 transition-transform">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={36} 
              height={36} 
              className="p-1.5"
            />
          </div>
          <h1 className="hidden sm:block text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Were-Mereja
          </h1>
        </Link>
      </div>

      {/* Center - Navigation Items (Desktop) */}
      {user && (
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${pathname === item.path ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'}`}
            >
              <span className="mb-1">{item.icon}</span>
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Right side - Auth/User */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        {!user ? (
          <div className="flex space-x-2 sm:space-x-3">
            <Link href="/signin">
              <Button 
                variant="outline" 
                className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300 transition-colors px-4"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 transition-all shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-800/20 px-4">
                Log In
              </Button>
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="User menu"
            >
              <div className="relative">
                <Image
                  src={user.user_metadata?.avatar_url || '/default-avatar.avif'}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-transparent group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-400 dark:bg-green-500 rounded-full w-3 h-3 border-2 border-white dark:border-gray-900"></div>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Free Plan</p>
                  </div>
                  
                  <Link 
                    href="/profile" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                    Profile
                  </Link>
                  
                  <Link 
                    href="/settings" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                    Settings
                  </Link>
                  
                  <div className="border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  )
}

export default NavBar