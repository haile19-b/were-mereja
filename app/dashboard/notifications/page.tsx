'use client'

import { Bell, CheckCircle2, AlertTriangle, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const dummyNotifications = [
  {
    id: 1,
    type: 'friend_request',
    title: 'New Friend Request',
    message: 'John Doe sent you a friend request.',
    icon: <Bell className="w-5 h-5 text-blue-500" />,
    read: false,
  },
  {
    id: 7,
    type: 'friend_request',
    title: 'New Friend Request',
    message: 'John Doe sent you a friend request.',
    icon: <Bell className="w-5 h-5 text-blue-500" />,
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    title: 'New Comment',
    message: 'Sarah replied to your post.',
    icon: <MessageCircle className="w-5 h-5 text-green-500" />,
    read: false,
  },
  {
    id: 3,
    type: 'alert',
    title: 'System Alert',
    message: 'Unusual login activity detected.',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    read: true,
  },
  {
    id: 4,
    type: 'alert',
    title: 'System Alert',
    message: 'Unusual login activity detected.',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    read: true,
  },
]

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(dummyNotifications)

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-purple-500" />
          Notifications
        </h1>
        <Button
          size="sm"
          variant="outline"
          onClick={markAllAsRead}
          className="text-sm"
        >
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
      <ScrollArea className="h-[calc(100vh-180px)] pr-2">
        {notifications.map(notification => (
          <Card
            key={notification.id}
            className={`flex items-start p-4 gap-4 transition-all ${
              !notification.read
                ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="mt-1">{notification.icon}</div>
            <CardContent className="p-0 w-full">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {notification.title}
                </h2>
                {!notification.read && (
                  <Badge variant="secondary" className="text-xs">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {notification.message}
              </p>

              {!notification.read && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-2 text-xs text-purple-600 hover:underline"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Mark as read
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        </ScrollArea>
      </div>
    </div>
  )
}
