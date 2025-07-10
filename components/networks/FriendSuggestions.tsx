'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserPlus } from 'lucide-react'
import { useUserStore } from '@/lib/store/zustand'
import { useEffect } from 'react'

// const suggestions = [
//   { id: 1, name: 'Jane Doe', avatar: '', title: 'Frontend Developer' },
//   { id: 2, name: 'John Smith', avatar: '', title: 'Product Manager' },
//   { id: 3, name: 'Alice Johnson', avatar: '', title: 'UX Designer' },
// ]


export default function FriendSuggestions({ searchQuery }: { searchQuery: string }) {

  const {allUsers} = useUserStore();

const suggestions = allUsers;

useEffect(()=>{
  console.log(suggestions)
},[])
  const filteredSuggestions = suggestions.filter(user => 
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {filteredSuggestions.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No matching suggestions found</p>
      ) : (
        filteredSuggestions.map(user => (
          <div key={user.id} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  {user.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{user.full_name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.headline}</p>
              </div>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>
        ))
      )}
    </div>
  )
}