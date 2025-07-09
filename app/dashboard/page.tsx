'use client'

import { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
  PencilLine,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'

import AddPost from '@/components/post/addPost'
import Image from 'next/image'

// Dummy data
const dummyPosts = [
  {
    id: 1,
    userName: 'Haile Gebriel',
    userAvatar: 'https://github.com/shadcn.png',
    postTime: '2 hours ago',
    description:
      'Just launched my new project Were-Mereja! A social platform for connecting professionals. Check it out and let me know what you think!',
    imageUrl:
      'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    likes: 24,
    comments: 8,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    userName: 'Haile Gebriel',
    userAvatar: 'https://github.com/shadcn.png',
    postTime: '2 hours ago',
    description:
      'Just launched my new project Were-Mereja! A social platform for connecting professionals. Check it out and let me know what you think!',
    imageUrl:
      'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    likes: 24,
    comments: 8,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 3,
    userName: 'Haile Gebriel',
    userAvatar: 'https://github.com/shadcn.png',
    postTime: '2 hours ago',
    description:
      'Just launched my new project Were-Mereja! A social platform for connecting professionals. Check it out and let me know what you think!',
    imageUrl:
      'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    likes: 24,
    comments: 8,
    isLiked: false,
    isSaved: false,
  },
]

function PostCard({
  post,
  onLike,
  onSave,
}: {
  post: typeof dummyPosts[0]
  onLike: (id: number) => void
  onSave: (id: number) => void
}) {
  return (
    <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-gray-800/90">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="border-2 border-purple-400 dark:border-purple-700">
            <AvatarImage src={post.userAvatar} />
            <AvatarFallback className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
              {post.userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {post.userName}
            </p>
            <p className="text-xs text-purple-500/80">{post.postTime}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-purple-500 hover:text-purple-700 dark:hover:text-purple-300"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-3">
          {post.description}
        </p>
        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden border-2 border-purple-100/50 dark:border-purple-900/50">
            <Image
              src={post.imageUrl}
              alt="Post image"
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-6">
          <Button
            variant="ghost"
            size="lg"
            className={`text-lg ${
              post.isLiked ? 'text-red-500' : 'text-purple-600 hover:text-purple-800'
            }`}
            onClick={() => onLike(post.id)}
          >
            <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="ml-2">{post.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-purple-600 hover:text-purple-800 text-lg"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="ml-2">{post.comments}</span>
          </Button>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="lg"
            className={`text-lg ${
              post.isSaved ? 'text-pink-500' : 'text-purple-600 hover:text-purple-800'
            }`}
            onClick={() => onSave(post.id)}
          >
            <Bookmark className={`h-5 w-5 ${post.isSaved ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-purple-600 hover:text-purple-800"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function PostPage() {
  const [posts, setPosts] = useState(dummyPosts)
  const [newPostText, setNewPostText] = useState('')
  const [open, setOpen] = useState(false)

  const handleLike = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleSave = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, isSaved: !post.isSaved } : post
    ))
  }

  const handlePostSubmit = () => {
    if (!newPostText.trim()) return

    const newPost = {
      id: posts.length + 1,
      userName: 'Current User',
      userAvatar: 'https://github.com/shadcn.png',
      postTime: 'Just now',
      description: newPostText,
      imageUrl: '',
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
    }

    setPosts([newPost, ...posts])
    setNewPostText('')
    setOpen(false)
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Mobile "Start a Post" Button */}
      <div className="block lg:hidden mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full py-3 text-md bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            >
              <PencilLine className="h-5 w-5 mr-2" />
              Start a post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <AddPost
              handlePostSubmit={handlePostSubmit}
              newPostText={newPostText}
              setNewPostText={setNewPostText}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Layout */}
      <div className="flex gap-6">
        {/* Left Sidebar: AddPost */}
        <div className="hidden lg:block w-[25%]">
          <AddPost
            handlePostSubmit={handlePostSubmit}
            newPostText={newPostText}
            setNewPostText={setNewPostText}
          />
        </div>

        {/* Center Feed: max-w-2xl centered */}
        <div className="w-full lg:max-w-2xl">
          <ScrollArea className="h-[calc(100vh-180px)] pr-2">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onSave={handleSave}
              />
            ))}
          </ScrollArea>
        </div>

        {/* Right column (optional future widgets) */}
        <div className="hidden lg:block w-[25%]">
          <Card className="p-4 text-center text-purple-700 font-semibold">
            Suggestions, Ads, or Insights Coming Soon
          </Card>
        </div>
      </div>
    </div>
  )
}
