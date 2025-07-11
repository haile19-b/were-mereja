'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserPlus, Clock, Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/lib/store/zustand'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { sendFriendRequest } from '@/lib/api/user/functions'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

type RequestStatus = 'pending' | 'accepted' | 'declined' | 'none'

export default function FriendSuggestions({ searchQuery }: { searchQuery: string }) {
  const { allUsers, fetchUsers } = useUserStore()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [requestStatuses, setRequestStatuses] = useState<Record<string, RequestStatus>>({})
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [friendsList, setFriendsList] = useState<string[]>([])
  const supabase = createClient()

  // Fetch all data in one go to prevent flickering
  useEffect(() => {
    const fetchAllData = async () => {
      setIsInitialLoading(true)
      try {
        // Get current user first
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        
        setCurrentUser(user || null)
        
        // Only proceed if we have a user
        if (user) {
          // Fetch users, requests, and friends in parallel
          const [usersPromise, requestsPromise, friendsPromise] = await Promise.all([
            fetchUsers(),
            supabase
              .from('friend_requests')
              .select('receiver_id, status')
              .eq('sender_id', user.id),
            supabase
              .from('friends')
              .select('friend_id')
              .eq('user_id', user.id)
          ])
          
          // Handle requests data
          if (requestsPromise.error) throw requestsPromise.error
          
          const statusMap: Record<string, RequestStatus> = {}
          requestsPromise.data?.forEach(request => {
            statusMap[request.receiver_id] = request.status as RequestStatus
          })
          
          setRequestStatuses(statusMap)

          // Handle friends data
          if (friendsPromise.error) throw friendsPromise.error
          const friendsIds = friendsPromise.data?.map(f => f.friend_id) || []
          setFriendsList(friendsIds)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Failed to load suggestions')
      } finally {
        setIsInitialLoading(false)
      }
    }

    fetchAllData()
  }, [])

  const handleSendRequest = async (receiverId: string) => {
    if (!currentUser || requestStatuses[receiverId] === 'pending') return

    setLoadingStates(prev => ({ ...prev, [receiverId]: true }))
    
    try {
      const response = await sendFriendRequest(receiverId, currentUser.id)
      if (response?.success) {
        setRequestStatuses(prev => ({
          ...prev,
          [receiverId]: 'pending'
        }))
        toast.success('Friend request sent!')
      } else {
        toast.error('Failed to send request')
      }
    } catch (error) {
      console.error('Error sending request:', error)
      toast.error('An error occurred while sending the request')
    } finally {
      setLoadingStates(prev => ({ ...prev, [receiverId]: false }))
    }
  }

  // Filter out current user, existing friends, and apply search
  const suggestions = allUsers.filter(user => 
    user.id !== currentUser?.id && 
    !friendsList.includes(user.id)
  )
  
  const filteredSuggestions = suggestions.filter(user =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getButtonState = (userId: string) => {
    const status = requestStatuses[userId] || 'none'
    
    switch (status) {
      case 'pending':
        return {
          variant: 'outline' as const,
          className: 'border-amber-300 dark:border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20',
          icon: <Clock className="h-4 w-4 mr-2" />,
          text: 'Request Sent',
          disabled: true
        }
      case 'accepted':
        return {
          variant: 'outline' as const,
          className: 'border-emerald-300 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20',
          icon: <Check className="h-4 w-4 mr-2" />,
          text: 'Connected',
          disabled: true
        }
      case 'declined':
        return {
          variant: 'outline' as const,
          className: 'border-rose-300 dark:border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-900/20',
          icon: <X className="h-4 w-4 mr-2" />,
          text: 'Declined',
          disabled: true
        }
      default:
        return {
          variant: 'default' as const,
          className: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm',
          icon: <UserPlus className="h-4 w-4 mr-2" />,
          text: 'Connect',
          disabled: loadingStates[userId]
        }
    }
  }

  if (isInitialLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="flex justify-between items-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <div className="flex items-center gap-4 w-full">
              {/* Avatar Skeleton with wave animation */}
              <div className="relative overflow-hidden">
                <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent animate-wave" />
              </div>
              
              {/* Text Skeleton with wave animation */}
              <div className="flex-1 space-y-2">
                <div className="relative overflow-hidden">
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent animate-wave" />
                </div>
                <div className="relative overflow-hidden">
                  <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent animate-wave" />
                </div>
              </div>
              
              {/* Button Skeleton with wave animation */}
              <div className="relative overflow-hidden">
                <Skeleton className="h-10 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent animate-wave" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredSuggestions.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <UserPlus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">No matching suggestions</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {searchQuery ? 'Try a different search' : 'You might know some people already'}
          </p>
        </div>
      ) : (
        filteredSuggestions.map(user => {
          const buttonState = getButtonState(user.id)
          console.log(user)
          
          return (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    {user.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {user.full_name || 'Unknown User'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {user.bio || 'No bio available'}
                  </p>
                </div>
              </div>
              
              <Button
                variant={buttonState.variant}
                className={`rounded-full transition-all ${buttonState.className}`}
                onClick={() => handleSendRequest(user.id)}
                disabled={buttonState.disabled}
              >
                {loadingStates[user.id] ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    {buttonState.icon}
                    {buttonState.text}
                  </span>
                )}
              </Button>
            </div>
          )
        })
      )}
    </div>
  )
}