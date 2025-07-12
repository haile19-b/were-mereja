'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Send, Paperclip, Smile } from 'lucide-react'
import { Message, useErrorStore, useMessageStore, User, useUserStore } from '@/lib/store/zustand'
import { createClient } from '@/utils/supabase/client'

interface ChatWindowProps {
  selectedUserId: string;
  ChatWithUser: User;
  onBack?: () => void;
}

export default function ChatWindow({ ChatWithUser, onBack, selectedUserId }: ChatWindowProps) {
  const { messages, setMessages, addMessage } = useMessageStore()
  const { setError } = useErrorStore()
  const { user } = useUserStore()
  const [newMessage, setNewMessage] = useState('')
  const supabase = createClient()

  const handleSend = async () => {
    if (!newMessage.trim() || !user?.id) return

    try {
      const { data: message, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedUserId,
          content: newMessage
        })
        .select()
        .single()

      if (error) throw error
      if (message) {
        setNewMessage('')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send message')
      console.error('Error sending message:', error)
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user?.id},receiver_id.eq.${selectedUserId}),and(sender_id.eq.${selectedUserId},receiver_id.eq.${user?.id})`)
          .order('created_at', { ascending: true })

        if (error) throw error
        if (data) setMessages(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load messages')
      }
    }

    fetchMessages()

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${user?.id},receiver_id.eq.${selectedUserId}),and(sender_id.eq.${selectedUserId},receiver_id.eq.${user?.id}))`
        },
        (payload) => {
          addMessage(payload.new as Message)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedUserId, user?.id])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800">
        {onBack && (
          <button
            onClick={onBack}
            className="sm:hidden text-purple-600 dark:text-purple-300 font-medium px-1 mr-1"
            aria-label="Back to conversations"
          >
            ←
          </button>
        )}
        <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-700">
          <AvatarImage
            src={ChatWithUser.avatar_url || `https://i.pravatar.cc/150?u=${ChatWithUser.id}`}
            alt={ChatWithUser.full_name}
          />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
            {ChatWithUser.full_name.split(" ")[0].charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 dark:text-white truncate text-sm sm:text-base">
            {ChatWithUser.full_name.split(" ")[0]}
          </p>
          <p className="text-xs text-green-500 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base text-center">
              Start a conversation with {ChatWithUser.full_name.split(" ")[0]}
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                  msg.sender_id === user?.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none'
                }`}
              >
                <p className="text-sm sm:text-base break-words whitespace-pre-wrap overflow-wrap-anywhere">
                  {msg.content}
                </p>
                <span
                  className={`text-xs block mt-1 text-right ${
                    msg.sender_id === user?.id
                      ? 'text-purple-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {formatTime(msg.created_at)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-1 sm:gap-2 border-t border-gray-200 dark:border-gray-700 p-2 sm:p-3 bg-white dark:bg-gray-800">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Attach file"
        >
          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Add emoji"
        >
          <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <input
          className="flex-1 min-w-0 rounded-full border border-gray-300 dark:border-gray-700 px-3 py-2 text-xs sm:text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
          aria-label="Message input"
        />
        <Button
          onClick={handleSend}
          className="h-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-3 sm:px-4 text-xs sm:text-sm"
          disabled={!newMessage.trim()}
          aria-label="Send message"
        >
          <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
    </div>
  )
}
