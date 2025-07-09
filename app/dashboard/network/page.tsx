'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input' // Add this import
import FriendRequests from '@/components/networks/FriendRequests'
import FriendSuggestions from '@/components/networks/FriendSuggestions'
import MyFriends from '@/components/networks/FriendsList'

export default function NetworksPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'suggestions' | 'friends'>('suggestions')
  const [searchQuery, setSearchQuery] = useState('') // Add search state

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex justify-center gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-full shadow-inner w-full sm:w-auto">
          <Button
            variant={activeTab === 'suggestions' ? 'default' : 'ghost'}
            className={`rounded-full px-6 ${activeTab === 'suggestions' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('suggestions')}
          >
            Suggestions
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'default' : 'ghost'}
            className={`rounded-full px-6 ${activeTab === 'requests' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('requests')}
          >
            Requests
          </Button>
          <Button
            variant={activeTab === 'friends' ? 'default' : 'ghost'}
            className={`rounded-full px-6 ${activeTab === 'friends' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            onClick={() => setActiveTab('friends')}
          >
            My Friends
          </Button>
        </div>
        
        <Input
          placeholder="Search by name..."
          className="w-full sm:w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        {activeTab === 'suggestions' && <FriendSuggestions searchQuery={searchQuery} />}
        {activeTab === 'requests' && <FriendRequests searchQuery={searchQuery} />}
        {activeTab === 'friends' && <MyFriends searchQuery={searchQuery} />}
      </Card>
    </div>
  )
}