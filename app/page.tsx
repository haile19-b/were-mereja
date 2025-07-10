'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FaRocket } from "react-icons/fa"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl dark:shadow-gray-950/50 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700/50">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 mb-4"
              >
                <Image 
                  src='/logo.png' 
                  alt="logo" 
                  width={400} 
                  height={400} 
                  className="rounded-2xl"
                />
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Welcome to Were-Mereja
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 sm:text-lg leading-relaxed max-w-2xl mx-auto">
                This is a simple chat app built by <strong className="text-purple-600 dark:text-purple-400">Haile Gebriel</strong>, a full-stack developer and software engineering student at ASTU.
                <br />
                It's created to showcase skill and creativity. Your feedback, ideas, and support are highly welcome after logging in!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/dashboard">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 shadow-lg dark:shadow-purple-900/30 transition-all"
                    >
                      <FaRocket className="mr-2" /> Get Started
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/features">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      See Features
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
