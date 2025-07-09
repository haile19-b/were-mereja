'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Check, X } from 'lucide-react'

const requests = [
  { id: 1, name: 'Michael Chan', avatar: '', title: 'Backend Engineer' },
  { id: 2, name: 'Rachel Adams', avatar: '', title: 'Marketing Strategist' },
]

export default function FriendRequests({ searchQuery }: { searchQuery: string }) {
  const filteredRequests = requests.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No matching requests found</p>
      ) : (
        filteredRequests.map(user => (
          <div key={user.id} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                <AvatarImage src={user.avatar || `https://i.pravatar.cc/150?img=${user.id + 10}`} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.title}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="h-9 w-9 p-0 bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-full"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                className="h-9 w-9 p-0 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}