'use client'

import {
  Card,
  CardContent
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon } from 'lucide-react'

type Props = {
  handlePostSubmit: () => void
  newPostText: string
  setNewPostText: (value: string) => void
}

function AddPost({ handlePostSubmit, newPostText, setNewPostText }: Props) {
  return (
    <Card className="mb-6 border-2 border-gray-100 dark:border-gray-800 shadow-md bg-white dark:bg-gray-900 rounded-2xl">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <Avatar className="w-11 h-11 ring-2 ring-purple-400 dark:ring-purple-600">
            <AvatarImage src="https://github.com/shadcn.png" alt="user" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              rows={3}
              placeholder="What's on your mind?"
              className="w-full p-4 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none placeholder-gray-500 dark:placeholder-gray-400"
            />

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm">Photo</span>
                </Button>
              </div>

              <Button
                onClick={handlePostSubmit}
                disabled={!newPostText.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white px-6 py-2 rounded-xl shadow-lg transition-all"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AddPost
