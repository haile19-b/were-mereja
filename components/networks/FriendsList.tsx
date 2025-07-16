'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { User, useUserStore } from '@/lib/store/zustand'
import Link from 'next/link'

interface Friend {
  id: string
  name: string
  avatar_url: string
  title: string
}

export default function MyFriends({ searchQuery }: { searchQuery: string }) {
  const [friends, setFriends] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const {myFriends} = useUserStore();

  useEffect(() => {
    const loadFriends = async () => {
      setFriends(myFriends)
      setIsLoading(false)
    }

    loadFriends()
  }, [])

  const filteredFriends = friends.filter(friend => 
    friend.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="relative overflow-hidden">
                <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent animate-wave" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="relative overflow-hidden">
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
                  <div className="absolute inset-0 animate-wave bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent" />
                </div>
                <div className="relative overflow-hidden">
                  <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-700" />
                  <div className="absolute inset-0 animate-wave bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent" />
                </div>
              </div>

              <div className="relative overflow-hidden">
                <Skeleton className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="absolute inset-0 animate-wave bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredFriends.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">No friends found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {searchQuery ? 'Try a different search' : 'Start by connecting with people'}
          </p>
        </div>
      ) : (
        filteredFriends.map(friend => (
          <div
            key={friend.id}
            className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                <AvatarImage src={friend.avatar_url || `https://i.pravatar.cc/150?img=${friend.id}`} />
                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  {friend.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{friend.full_name.split(" ")[0]}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                  {friend.headline}
                </p>
              </div>
            </div>
            <Link href='/dashboard/messaging'>
            <Button
              variant="outline"
              className="rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}