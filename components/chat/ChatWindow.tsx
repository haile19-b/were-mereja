'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Send, Paperclip, Smile } from 'lucide-react'

interface Message {
  id: number
  sender: 'me' | 'them'
  text: string
  time: string
}

interface ChatWindowProps {
  user: { id: number; name: string; avatar: string }
  onBack?: () => void
}

const initialMessages: Message[] = [
  { id: 1, sender: 'them', text: 'Hey there!', time: '10:01 AM' },
  { id: 2, sender: 'me', text: 'Hello! How are you?', time: '10:03 AM' },
  { id: 3, sender: 'them', text: 'Doing well, thanks!', time: '10:05 AM' },
  { id: 4, sender: 'them', text: 'Did you get the designs I sent?', time: '10:06 AM' },
  { id: 5, sender: 'me', text: 'Yes, they look great!', time: '10:08 AM' },
]

export default function ChatWindow({ user, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-800">
        {onBack && (
          <button onClick={onBack} className="sm:hidden text-purple-600 dark:text-purple-300 font-medium px-2 mr-2">← Back</button>
        )}
        <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-700">
          <AvatarImage src={user.avatar || `https://i.pravatar.cc/150?img=${user.id}`} />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
          <p className="text-xs text-green-500 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {messages.map(msg => (
          <div key={msg.id} className={`flex max-w-[85%] ${msg.sender === 'me' ? 'ml-auto justify-end' : 'justify-start'}`}>
            <div className={`rounded-2xl px-4 py-3 ${msg.sender === 'me' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none'}`}>
              <p>{msg.text}</p>
              <span className={`text-xs block mt-1 text-right ${msg.sender === 'me' ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'}`}>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Paperclip className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Smile className="w-5 h-5" />
        </Button>
        <input
          className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
        />
        <Button onClick={handleSend} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-5" disabled={!newMessage.trim()}>
          <Send className="w-4 h-4 mr-1" /> Send
        </Button>
      </div>
    </div>
  )
}