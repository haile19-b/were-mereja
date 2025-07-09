'use client'

import ChatSidebar from '@/components/chat/ChatSidebar'
import ChatWindow from '@/components/chat/ChatWindow'
import { useEffect, useState } from 'react'

const dummyUsers = [
  { id: 1, name: 'Sarah Johnson', avatar: '', lastMessage: 'Let’s catch up later.' },
  { id: 2, name: 'David Kim', avatar: '', lastMessage: 'Got the file, thanks!' },
  { id: 3, name: 'Olivia Lee', avatar: '', lastMessage: 'See you at 5!' },
]

export default function MessagePage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const selectedUser = dummyUsers.find(user => user.id === selectedUserId)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleBack = () => setSelectedUserId(null)

  return (
    <div className="flex h-[calc(100vh-80px)] max-w-6xl mx-auto border-0 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {(!isMobile || (isMobile && !selectedUserId)) && (
        <div className="w-full sm:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Messages</h2>
          </div>
          <ChatSidebar 
            users={dummyUsers} 
            selectedUserId={selectedUserId} 
            onSelectUser={setSelectedUserId} 
          />
        </div>
      )}

      {(!isMobile || (isMobile && selectedUserId)) && (
        <div className="flex-1 flex flex-col">
          {selectedUserId ? (
            <ChatWindow 
              user={selectedUser!} 
              onBack={isMobile ? handleBack : undefined} 
            />
          ) : (
            <div className="hidden sm:flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-6 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-1">No conversation selected</h3>
              <p className="text-sm">Choose a chat from the sidebar to start messaging</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}