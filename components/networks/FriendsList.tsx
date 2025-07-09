'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const friends = [
  { id: 1, name: 'Emily Zhang', avatar: '', title: 'UI/UX Designer' },
  { id: 2, name: 'Tom Hardy', avatar: '', title: 'DevOps Engineer' },
]

export default function MyFriends({ searchQuery }: { searchQuery: string }) {
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {filteredFriends.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No matching friends found</p>
      ) : (
        filteredFriends.map(friend => (
          <div key={friend.id} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                <AvatarImage src={friend.avatar || `https://i.pravatar.cc/150?img=${friend.id + 20}`} />
                <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  {friend.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{friend.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{friend.title}</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 rounded-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        ))
      )}
    </div>
  )
}