'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FaUserPlus, FaComments, FaUsers, FaBell, FaArrowRight } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FeaturePage() {
  const features = [
    {
      icon: <FaUserPlus className="text-2xl" />,
      title: "Send Friend Requests",
      description: "Find and connect with other users by sending friend requests. Only accepted requests allow chatting.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaComments className="text-2xl" />,
      title: "Private Chats",
      description: "Chat privately with your friends once your request is accepted. All messages are secure and real-time.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Create and Join Groups",
      description: "Start group chats, invite your friends, and discuss ideas together. Collaborate in real time.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <FaBell className="text-2xl" />,
      title: "Stay Notified",
      description: "Receive notifications when friends accept requests, message you, or invite you to groups.",
      color: "from-yellow-500 to-orange-500"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12 sm:px-6 lg:px-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Features of Were-Mereja
          </h1>
          <p className="text-gray-600 dark:text-gray-300 sm:text-lg max-w-2xl mx-auto">
            Discover what you can do once you're logged in and connected.
          </p>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg dark:shadow-gray-950/50 border-0 dark:border-gray-700/30 rounded-xl overflow-hidden transition-all hover:shadow-xl dark:hover:shadow-gray-950/70">
                <CardContent className="p-6 flex gap-5 items-start">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{feature.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/30 transition-all px-8"
            >
              Get Started <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}