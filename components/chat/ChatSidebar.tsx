'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ChatSidebarProps {
  users: { id: number; name: string; avatar: string; lastMessage: string }[]
  selectedUserId: number | null
  onSelectUser: (id: number) => void
}

export default function ChatSidebar({ users, selectedUserId, onSelectUser }: ChatSidebarProps) {
  return (
    <div className="p-4 space-y-1">
      {users.map(user => (
        <div
          key={user.id}
          onClick={() => onSelectUser(user.id)}
          className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
            selectedUserId === user.id
              ? 'bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-800/50 shadow-sm'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-700">
            <AvatarImage src={user.avatar || `https://i.pravatar.cc/150?img=${user.id}`} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3 overflow-hidden">
            <p className={`font-medium text-sm truncate ${selectedUserId === user.id ? 'text-purple-700 dark:text-purple-200' : 'text-gray-800 dark:text-gray-200'}`}>{user.name}</p>
            <p className={`text-xs truncate ${selectedUserId === user.id ? 'text-purple-500 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>{user.lastMessage}</p>
          </div>
          {selectedUserId === user.id && (
            <div className="ml-auto w-2 h-2 rounded-full bg-purple-500"></div>
          )}
        </div>
      ))}
    </div>
  )
}
