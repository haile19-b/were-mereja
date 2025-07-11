'use client'

import { useEffect, useState } from 'react'
import { handleRequestResponse } from '@/lib/api/user/functions'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, X, UserPlus } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { User, useUserStore } from '@/lib/store/zustand'

export default function FriendRequests({ searchQuery }: { searchQuery: string }) {

  const {requestSenders} = useUserStore();

  const [requests, setRequests] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchData = async()=>{
    await setRequests(requestSenders)
    setIsLoading(false)
    }
    fetchData();
  },[])

  const handleResponse = async (senderId: string, accepted: boolean) => {
    try {
      const response = await handleRequestResponse(senderId, accepted)
      console.log('Response:', response) // Debug log
      
      if (response.success) {
        toast.success(accepted ? 'Friend request accepted!' : 'Friend request declined', {
          position: "bottom-right",
          autoClose: 3000,
        })
        setRequests(prev => prev.filter(r => r.id !== senderId))
      } else {
        toast.error(response.error?.message || 'Failed to process request', {
          position: "bottom-right",
          autoClose: 3000,
        })
      }
    } catch (error) {
      console.error('Error in handleResponse:', error)
      toast.error('An unexpected error occurred', {
        position: "bottom-right",
        autoClose: 3000,
      })
    }
  }
  

  const filteredRequests = requests.filter(user =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
        <ToastContainer position="bottom-right" autoClose={3000} />
      {isLoading ? (
        <div className="space-y-3">
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
                  <Skeleton className="h-9 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="absolute inset-0 animate-wave bg-gradient-to-r from-transparent via-white/50 dark:via-gray-800/50 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <UserPlus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">No pending requests</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {searchQuery ? 'Try a different search' : 'No one has requested to connect yet'}
          </p>
        </div>
      ) : (
        filteredRequests.map(user => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                <AvatarImage src={user.avatar_url || `https://i.pravatar.cc/150?img=${user.id}`} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  {user.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{user.full_name || 'Unknown User'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.bio || 'No bio available'}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30"
                onClick={() => handleResponse(user.id, true)}
              >
                <Check className="h-4 w-4" />
                <span className="sr-only">Accept request</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                onClick={() => handleResponse(user.id, false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Decline request</span>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}